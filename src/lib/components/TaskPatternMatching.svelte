<script lang="ts">
	import type { ITaskPatternMatchingObject } from '$lib/interfaces/ITaskPatternMatching';
	import { writable } from 'svelte/store';
	import TaskPatternMatchingStimulus from './TaskPatternMatchingStimulus.svelte';
	import { createEventDispatcher } from 'svelte';
	import InterfaceFrame from './InterfaceFrame.svelte';

	export let patternMatchingObjects: ITaskPatternMatchingObject[];

	export let width: number = 300;

	export let height: number = 300;

	const patternMatchingObjectIndex = writable(0);
	const dispatch = createEventDispatcher();

	const handlePatternMatchingResponseClicked = (event: CustomEvent<'T1' | 'T2' | 'T3' | 'T4'>) => {
		const isCorrect = event.detail === 'T1';
		if (isCorrect) {
			dispatch('patternMatchingResponseCorrect');
		} else {
			dispatch('patternMatchingResponseIncorrect');
		}
		if ($patternMatchingObjectIndex === patternMatchingObjects.length - 1) {
			// End of task
			dispatch('patternMatchingCompleted');
			return;
		}
		patternMatchingObjectIndex.update((index) => index + 1);
	};
</script>

<InterfaceFrame {width} {height} showBezels={false}>
	<TaskPatternMatchingStimulus
		on:patternMatchingResponseClicked={handlePatternMatchingResponseClicked}
		patternMatchingObject={patternMatchingObjects[$patternMatchingObjectIndex]}
	/>
</InterfaceFrame>
