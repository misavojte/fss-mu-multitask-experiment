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

	const dispatch = createEventDispatcher();

	export let socialMediaButtons: Array<{
		text: string;
		id: string;
	}>;
	export let socialMediaStimuli: Array<{
		src: string;
		id: string;
	}>;
	export let initialDelay: number = 20000;
	export let stimulusMaxDuration: number = 20000;
	export let width: number = 522;
	export let heightImage: number = 743;
	export let heightInteractors: number = 150;

	const wasClicked = writable(false);

	let stimulus: { src: string; id: string } | null = null; // always begin with no stimulus

	const shuffledStimuli = socialMediaStimuli.sort(() => Math.random() - 0.5);

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
		getCancellableAsync(logic, abortController.signal);
	});

	onDestroy(() => {
		abortController.abort('TaskSocialMedia was destroyed');
	});

	const preloadNextStimulusImage = (index: number) => {
		const nextIndex = index + 1;
		if (nextIndex < shuffledStimuli.length) {
			const nextStimulus = shuffledStimuli[nextIndex];
			preloadMedia([{ type: 'img', src: nextStimulus.src }]);
		}
	};

	const logic = async () => {
		for await (const loopStimulus of shuffledStimuli) {
			await waitForTimeoutCancellable(initialDelay, abortController.signal);
			wasClicked.set(false);
			stimulus = loopStimulus;
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
			preloadNextStimulusImage(shuffledStimuli.indexOf(loopStimulus));
		}
		dispatch('socialMediaInteractorsCompleted');
	};
</script>

<InterfaceFrame {width} height={heightImage + heightInteractors}>
	<TaskSocialMediaStimulus
		{socialMediaButtons}
		{stimulus}
		{width}
		{heightInteractors}
		{heightImage}
		on:click={handleSocialMediaInteractorsClick}
	/>
</InterfaceFrame>
