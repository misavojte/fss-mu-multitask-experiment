<script lang="ts">
	import { waitForCondition, waitForTimeout } from '$lib/utils/waitForCondition';
	import { writable } from 'svelte/store';
	import TaskSocialMediaStimulus from './TaskSocialMediaStimulus.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import InterfaceFrame from './InterfaceFrame.svelte';

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
	export let width: number = 300;
	export let heightImage: number = 522;
	export let heightInteractors: number = 150;

	const wasClicked = writable(false);

	let stimulus: { src: string; id: string } | null = null; // always begin with no stimulus

	const shuffledStimuli = socialMediaStimuli.sort(() => Math.random() - 0.5);

	const handleSocialMediaInteractorsClick = (
		event: CustomEvent<{ id: string; timestamp: number }>
	) => {
		if (!stimulus) return;
		dispatch('clickSocialMediaInteractors', event.detail);
		wasClicked.set(true);
	};

	onMount(() => {
		logic();
	});

	const logic = async () => {
		for await (const loopStimulus of shuffledStimuli) {
			await waitForTimeout(initialDelay);
			wasClicked.set(false);
			stimulus = loopStimulus;
			dispatch('stimulusShown');
			const wasClickedWithinTime = await waitForCondition(wasClicked, stimulusMaxDuration);
			if (!wasClickedWithinTime) {
				dispatch('timeoutSocialMediaInteractors');
			}
			stimulus = null;
			dispatch('stimulusHidden');
		}

		dispatch('allStimuliShown');
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
