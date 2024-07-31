<script lang="ts">
	import TaskSocialMediaInteractors from './TaskSocialMediaInteractors.svelte';
	import TaskSocialMediaStimulus from './TaskSocialMediaStimulus.svelte';
	import { createEventDispatcher, onMount } from 'svelte';

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
	export let stimulusAspectRatio: number = 1.5;

	const stimulusHeight = width * stimulusAspectRatio;

	let stimulus: { src: string; id: string } | null = null; // always begin with no stimulus

	let timeout: number | null = null;
	let alreadyPickedStimuliIndexes: number[] = [];

	const shuffledStimuli = socialMediaStimuli.slice().sort(() => Math.random() - 0.5);
	let currentStimulusIndex = 0;

	const handleSocialMediaInteractorsClick = (
		event: CustomEvent<{ id: string; timestamp: number }>
	) => {
		dispatch('clickSocialMediaInteractors', event.detail);
	};

	onMount(() => {
		triggerNext(initialDelay);
	});

	const triggerNext = (delay: number) => {
		timeout = window.setTimeout(() => {
			if (currentStimulusIndex < shuffledStimuli.length) {
				stimulus = shuffledStimuli[currentStimulusIndex];
				dispatch('stimulusShown');
				timeout = window.setTimeout(() => {
					stimulus = null;
					dispatch('stimulusHidden');
					currentStimulusIndex++;
					triggerNext(0);
				}, stimulusMaxDuration);
			} else {
				dispatch('allStimuliShown');
			}
		}, delay);
	};
</script>

<div
	class="grid w-full border border-gray-200 box-border rounded-2xl overflow-hidden pt-8"
	style="width: {width}px;"
>
	<TaskSocialMediaStimulus {stimulus} {width} height={stimulusHeight} />
	<TaskSocialMediaInteractors {socialMediaButtons} on:click={handleSocialMediaInteractorsClick} />
</div>
