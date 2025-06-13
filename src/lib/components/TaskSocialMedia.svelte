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
	import { base } from '$app/paths';
	import { AnimationTargetHandler } from './AnimationTarget.handler';

	const dispatch = createEventDispatcher();

	export let socialMediaButtons: Array<{
		text: string;
		id: string;
		color: string;
		textColor: string;
		html?: string;
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
	export let initialDelay: number = 5000;
	export let betweenDelay: number = 15000;
	export let stimulusMaxDuration: number = 15000;
	export let stimulusRemindAfter: number = 10000;
	export let width: number = 500;
	export let heightImage: number = 700;
	export let heightInteractors: number = 200;
	export let hasStarted: boolean = true;
	export let showCorrectnessFeedback: boolean = true;
	export let adjustBetweenDelay: boolean = false;

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
		// Shuffle both arrays once
		let shuffledStimuliNS = fisherYatesShuffle([...socialMediaStimuliNS]);
		let shuffledStimuliAS = fisherYatesShuffle([...socialMediaStimuliAS]);
		const shuffledStimuliAlongPresentationPattern: Array<{
			src: string;
			id: string;
		}> = [];

		// If no pattern provided, use default
		if (socialMediaStimuliPresentationPattern.length === 0) {
			socialMediaStimuliPresentationPattern = ['NS', 'AS'];
		}

		// Calculate total stimuli and pattern length
		const totalStimuli = socialMediaStimuliNS.length + socialMediaStimuliAS.length;
		
		// Create a pattern that ensures all stimuli are used
		let currentPattern: Array<'NS' | 'AS'> = [];
		let remainingNS = shuffledStimuliNS.length;
		let remainingAS = shuffledStimuliAS.length;

		// First, try to follow the original pattern as much as possible
		for (const type of socialMediaStimuliPresentationPattern) {
			if (type === 'NS' && remainingNS > 0) {
				currentPattern.push('NS');
				remainingNS--;
			} else if (type === 'AS' && remainingAS > 0) {
				currentPattern.push('AS');
				remainingAS--;
			}
		}

		// Then add remaining stimuli in any order
		while (remainingNS > 0 || remainingAS > 0) {
			if (remainingNS > 0) {
				currentPattern.push('NS');
				remainingNS--;
			}
			if (remainingAS > 0) {
				currentPattern.push('AS');
				remainingAS--;
			}
		}

		console.log('Total stimuli:', totalStimuli);
		console.log('Final pattern length:', currentPattern.length);
		console.log('NS stimuli used:', shuffledStimuliNS.length - remainingNS);
		console.log('AS stimuli used:', shuffledStimuliAS.length - remainingAS);

		// Create the sequence following the pattern
		for (const type of currentPattern) {
			if (type === 'NS') {
				shuffledStimuliAlongPresentationPattern.push(shuffledStimuliNS.pop()!);
			} else {
				shuffledStimuliAlongPresentationPattern.push(shuffledStimuliAS.pop()!);
			}
		}

		console.log('Final sequence length:', shuffledStimuliAlongPresentationPattern.length);
		return shuffledStimuliAlongPresentationPattern;
	};

	const shuffledStimuliAlongPresentationPattern: Array<{
		src: string;
		id: string;
	}> = createShuffledStimuliAlongPresentationPattern();

	const wasClicked = writable(false);

	let stimulus: { src: string; id: string } | null = null; // always begin with no stimulus
	const animationTargetHandler = new AnimationTargetHandler();
	const handleSocialMediaInteractorsClick = (
		event: CustomEvent<{ id: string; timestamp: number; e: MouseEvent }>
	) => {
		if (!stimulus) return;
		dispatch('socialMediaInteractorsClick', {
			buttonId: event.detail.id,
			timestamp: event.detail.timestamp
		});
		if (showCorrectnessFeedback) {
			animationTargetHandler.createAnimationTarget(
				{ x: event.detail.e.clientX, y: event.detail.e.clientY },
				'green',
				'+ 1 bod',
				abortController.signal
			);
		}
		wasClicked.set(true);
	};

	const abortController = new AbortController();

	onMount(() => {
		getCancellableAsync(infiniteLogic, abortController.signal);
	});

	onDestroy(() => {
		// Clean up audio elements before destroying
		if (audioElement) {
			audioElement.pause();
			audioElement.currentTime = 0;
		}
		if (audioElement2) {
			audioElement2.pause();
			audioElement2.currentTime = 0;
		}
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

	let remainingTime = writable(0);
	let isInitialIteration = true;

	const logic = async () => {
		for await (const loopStimulus of shuffledStimuliAlongPresentationPattern) {
			if (isInitialIteration) {
				await waitForTimeoutCancellable(initialDelay, abortController.signal);
			} else {
				// Calculate delay, but avoid negative cumulative adjustments by resetting remainingTime if it's negative
				const calculatedBetweenDelay = adjustBetweenDelay
					? Math.max(betweenDelay, betweenDelay + $remainingTime)
					: betweenDelay;
				await waitForTimeoutCancellable(calculatedBetweenDelay, abortController.signal);
			}

			// Reset remainingTime at the start of each stimulus to prevent carry-over adjustments

			isInitialIteration = false;
			wasClicked.set(false);
			const startTime = performance.now();
			stimulus = loopStimulus;
			audioElement.play();
			dispatch('socialMediaInteractorsShow', {
				id: loopStimulus.id,
				timestamp: performance.now()
			});

			try {
				await waitForConditionCancellable(wasClicked, stimulusRemindAfter, abortController.signal);
			} catch (error) {
				if (error === 'TaskSocialMedia was destroyed') {
					return; // stop the task, no logging
				}
				dispatch('socialMediaInteractorsReminder');
				audioElement2.play();
				try {
					await waitForConditionCancellable(
						wasClicked,
						stimulusMaxDuration - stimulusRemindAfter,
						abortController.signal
					);
				} catch (error) {
					if (error === 'TaskSocialMedia was destroyed') {
						return; // stop the task, no logging
					}
					animationTargetHandler.createAnimationTarget(
						getCenterCoordinates(divElement),
						'red',
						'Věnujte pozornost úloze!',
						abortController.signal,
						2000
					);
					dispatch('socialMediaInteractorsTimeout');
				}
			}

			// Calculate the remaining time after the stimulus completes, resetting to 0 if negative
			remainingTime.set(Math.max(0, stimulusMaxDuration - (performance.now() - startTime)));
			stimulus = null;
			audioElement2.pause();
			audioElement2.currentTime = 0;
			dispatch('socialMediaInteractorsHidden');
			preloadNextStimulusImage(shuffledStimuliAlongPresentationPattern.indexOf(loopStimulus));
		}
		dispatch('socialMediaInteractorsCompleted');
	};

	let audioElement: HTMLAudioElement;
	let audioElement2: HTMLAudioElement;
	let divElement: HTMLDivElement;

	// return x and y coordinates of the center of the element
	// coordinates are relative to the body
	const getCenterCoordinates = (element: HTMLElement) => {
		const rect = element.getBoundingClientRect();
		return {
			x: rect.left + rect.width / 2 + window.scrollX,
			y: rect.top + rect.height / 2 + window.scrollY
		};
	};
</script>

<InterfaceFrame {width} height={heightImage + heightInteractors}>
	<div
		class="pointer-events-none absolute w-full h-full select-none -z-10"
		bind:this={divElement}
	/>
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
			src={`${base}/notification.mp3`}
			preload="auto"
			class="hidden"
			autoplay={false}
			bind:this={audioElement}
			on:canplaythrough={handleLoad}
		/>
		<audio
			src={`${base}/notification2.mp3`}
			preload="auto"
			class="hidden"
			autoplay={false}
			bind:this={audioElement2}
		/>
	{/if}
</InterfaceFrame>
