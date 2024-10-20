<script lang="ts">
	import {
		getCancellableAsync,
		waitForConditionCancellable,
		waitForTimeoutCancellable
	} from '$lib/utils/waitForCondition';
	import { writable } from 'svelte/store';
	import TaskSocialMediaStimulus from './TaskSocialMediaStimulus.svelte';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import InterfaceFrame from './InterfaceFrame.svelte';
	import { preloadMedia } from '$lib/utils/preloadMedia';
	import { fisherYatesShuffle } from '$lib/utils/shuffle';

	const dispatch = createEventDispatcher();

	export let socialMediaButtons: Array<{
		text: string;
		id: string;
	}>;
	export let socialMediaStimuliAS: Array<{
		src: string;
		id: string;
	}>;
	export let socialMediaStimuliNS: Array<{
		src: string;
		id: string;
	}>;
	export let socialMediaStimuliPresentationPattern: Array<'NS' | 'AS'> = ['NS', 'NS', 'AS', 'AS'];
	export let initialDelay: number = 18000;
	export let stimulusMaxDuration: number = 18000;
	export let width: number = 522;
	export let heightImage: number = 743;
	export let heightInteractors: number = 150;
	export let hasStarted: boolean = true;

	$: {
		if (hasStarted) {
			hasStartedStore.set(true);
		}
	}
	let hasStartedStore = writable(hasStarted);

	let errorMessages: string[] = [];

	if (socialMediaStimuliAS.length === 0 && socialMediaStimuliNS.length === 0) {
		errorMessages.push('Error! No stimuli provided');
	}

	let audioLoaded = false;
	const handleLoad = () => {
		if (!audioLoaded) {
			audioLoaded = true;
			dispatch('loaded');
		}
	};

	const createShuffledStimuliAlongPresentationPattern = () => {
		let shuffledStimuliNS = fisherYatesShuffle(socialMediaStimuliNS);
		let shuffledStimuliAS = fisherYatesShuffle(socialMediaStimuliAS);
		const shuffledStimuliAlongPresentationPattern: Array<{
			src: string;
			id: string;
		}> = [];

		let socialMediaStimuliNSPointer = 0;
		let socialMediaStimuliASPointer = 0;

		// Extend the pattern to the length of the both NS and AS stimuli
		// if empty array is provided, pattern will be first set to ['NS', 'AS'] to prevent infinite loop
		if (socialMediaStimuliPresentationPattern.length === 0) {
			socialMediaStimuliPresentationPattern = ['NS', 'AS'];
		}
		while (
			socialMediaStimuliPresentationPattern.length <
			socialMediaStimuliAS.length + socialMediaStimuliNS.length
		) {
			socialMediaStimuliPresentationPattern.push(...socialMediaStimuliPresentationPattern);
		}

		socialMediaStimuliPresentationPattern.forEach((type) => {
			if (type === 'NS') {
				// if empty array of NS stimuli is provided, we skip this step
				if (socialMediaStimuliNS.length === 0) return;
				if (socialMediaStimuliNSPointer >= shuffledStimuliNS.length) {
					// If we run out of NS, we reshuffle and start over
					shuffledStimuliNS = fisherYatesShuffle(socialMediaStimuliNS);
					socialMediaStimuliNSPointer = 0;
				}
				shuffledStimuliAlongPresentationPattern.push(
					shuffledStimuliNS[socialMediaStimuliNSPointer]
				);
				socialMediaStimuliNSPointer++;
			} else {
				// if empty array of AS stimuli is provided, we skip this step
				if (socialMediaStimuliAS.length === 0) return;
				if (socialMediaStimuliASPointer >= shuffledStimuliAS.length) {
					// If we run out of AS, we reshuffle and start over
					shuffledStimuliAS = fisherYatesShuffle(socialMediaStimuliAS);
					socialMediaStimuliASPointer = 0;
				}
				shuffledStimuliAlongPresentationPattern.push(
					shuffledStimuliAS[socialMediaStimuliASPointer]
				);
				socialMediaStimuliASPointer++;
			}
		});

		return shuffledStimuliAlongPresentationPattern;
	};

	const shuffledStimuliAlongPresentationPattern: Array<{
		src: string;
		id: string;
	}> = createShuffledStimuliAlongPresentationPattern();

	const wasClicked = writable(false);

	let stimulus: { src: string; id: string } | null = null; // always begin with no stimulus

	const handleSocialMediaInteractorsClick = (
		event: CustomEvent<{ id: string; timestamp: number }>
	) => {
		if (!stimulus) return;
		dispatch('socialMediaInteractorsClick', {
			buttonId: event.detail.id,
			timestamp: event.detail.timestamp
		});
		wasClicked.set(true);
	};

	const abortController = new AbortController();

	onMount(() => {
		getCancellableAsync(infiniteLogic, abortController.signal);
	});

	onDestroy(() => {
		abortController.abort('TaskSocialMedia was destroyed');
	});

	const preloadNextStimulusImage = (index: number) => {
		const nextIndex = index + 1;
		if (nextIndex < shuffledStimuliAlongPresentationPattern.length) {
			const nextStimulus = shuffledStimuliAlongPresentationPattern[nextIndex];
			preloadMedia([{ type: 'img', src: nextStimulus.src }]);
		}
	};

	const infiniteLogic = async () => {
		// first await for condition hasStarted to be true
		await waitForConditionCancellable(hasStartedStore, 0, abortController.signal);
		while (!abortController.signal.aborted) {
			await getCancellableAsync(logic, abortController.signal);
		}
	};

	const logic = async () => {
		for await (const loopStimulus of shuffledStimuliAlongPresentationPattern) {
			console.log('loopStimulusDelay', initialDelay);
			socialMediaButtons = fisherYatesShuffle(socialMediaButtons); // shuffle the buttons for each stimulus
			await waitForTimeoutCancellable(initialDelay, abortController.signal);
			wasClicked.set(false);
			stimulus = loopStimulus;
			audioElement.play();
			dispatch('socialMediaInteractorsShow', {
				id: loopStimulus.id,
				timestamp: Date.now()
			});
			try {
				await waitForConditionCancellable(wasClicked, stimulusMaxDuration, abortController.signal);
			} catch (error) {
				if (error === 'TaskSocialMedia was destroyed') {
					return; // stop the task, no logging
				}
				dispatch('socialMediaInteractorsTimeout');
			}
			stimulus = null;
			dispatch('socialMediaInteractorsHidden');
			preloadNextStimulusImage(shuffledStimuliAlongPresentationPattern.indexOf(loopStimulus));
		}
		dispatch('socialMediaInteractorsCompleted');
	};

	let audioElement: HTMLAudioElement;
</script>

<InterfaceFrame {width} height={heightImage + heightInteractors}>
	{#if errorMessages.length > 0}
		<div class="absolute top-0 left-0 w-full h-full flex items-center justify-center">
			{#each errorMessages as errorMessage}
				<p>{errorMessage}</p>
			{/each}
		</div>
	{:else}
		<TaskSocialMediaStimulus
			{socialMediaButtons}
			{stimulus}
			{width}
			{heightInteractors}
			{heightImage}
			on:click={handleSocialMediaInteractorsClick}
		/>
		<audio
			src="/notification.mp3"
			preload="auto"
			class="hidden"
			autoplay={false}
			bind:this={audioElement}
			on:canplaythrough={handleLoad}
		/>
	{/if}
</InterfaceFrame>
