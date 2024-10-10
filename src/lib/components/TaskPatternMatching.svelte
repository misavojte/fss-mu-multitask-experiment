<script lang="ts">
	import type { ITaskPatternMatchingObject } from '$lib/interfaces/ITaskPatternMatching';
	import { writable } from 'svelte/store';
	import TaskPatternMatchingStimulus from './TaskPatternMatchingStimulus.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import InterfaceFrame from './InterfaceFrame.svelte';
	import { preloadMedia } from '$lib/utils/preloadMedia';

	export let patternMatchingObjects: ITaskPatternMatchingObject[];

	export let width: number = 300;

	export let height: number = 300;

	const patternMatchingObjectIndex = writable(0);
	const dispatch = createEventDispatcher();

	const handlePatternMatchingResponseClicked = (event: CustomEvent<'T1' | 'T2' | 'T3' | 'T4'>) => {
		// const isCorrect = event.detail === 'T1'; //
		dispatch('patternMatchingResponse', event.detail);
		if ($patternMatchingObjectIndex === patternMatchingObjects.length - 1) {
			// End of task
			dispatch('patternMatchingCompleted');
			return;
		}
		patternMatchingObjectIndex.update((index) => index + 1);
		preloadNextPatternMatchingImages($patternMatchingObjectIndex);
	};

	const preloadNextPatternMatchingImages = (index: number) => {
		const nextIndex = index + 1;
		if (nextIndex < patternMatchingObjects.length) {
			const nextPatternMatchingObject = patternMatchingObjects[nextIndex];
			const media = [
				{
					type: 'img' as const,
					src: nextPatternMatchingObject.matrixSrc
				},
				...nextPatternMatchingObject.responses.map((response) => ({
					type: 'img' as const,
					src: response.src
				}))
			];
			preloadMedia(media);
		}
	};

	$: dispatch('patternMatchingNext', patternMatchingObjects[$patternMatchingObjectIndex].id);

	onMount(() => {
		dispatch('patternMatchingNext', patternMatchingObjects[$patternMatchingObjectIndex].id);
		preloadNextPatternMatchingImages($patternMatchingObjectIndex);
	});
</script>

<InterfaceFrame {width} {height} showBezels={false}>
	<TaskPatternMatchingStimulus
		on:patternMatchingResponseClicked={handlePatternMatchingResponseClicked}
		patternMatchingObject={patternMatchingObjects[$patternMatchingObjectIndex]}
	/>
</InterfaceFrame>
