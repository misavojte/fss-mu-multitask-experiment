<script lang="ts">
	import type { ITaskPatternMatchingObject } from '$lib/interfaces/ITaskPatternMatching';
	import { writable } from 'svelte/store';
	import TaskPatternMatchingStimulus from '$lib/components/TaskPatternMatchingStimulus.svelte';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import InterfaceFrame from './InterfaceFrame.svelte';
	import { preloadMedia } from '$lib/utils/preloadMedia';
	import { getCancellableAsync, waitForConditionCancellable } from '$lib/utils/waitForCondition';

	export let patternMatchingObjects: ITaskPatternMatchingObject[];

	export let width: number = 300;

	export let height: number = 300;

	export let hasStarted: boolean = true;
	const hasStartedStore = writable(hasStarted);
	const hasRespondedToCurrent = writable(false);
	$: {
		if (hasStarted) {
			hasStartedStore.set(true);
		}
	}

	const patternMatchingObjectIndex = writable(0);
	const dispatch = createEventDispatcher();

	const handlePatternMatchingResponseClicked = (event: CustomEvent<'T1' | 'T2' | 'T3' | 'T4'>) => {
		// const isCorrect = event.detail === 'T1'; //
		dispatch('patternMatchingResponse', event.detail);
		hasRespondedToCurrent.set(true);
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

	let wasLoaded = false;
	const handleLoaded = () => {
		if (wasLoaded) return;
		wasLoaded = true;
		dispatch('loaded');
	};

	const abortController = new AbortController();
	const logic = async () => {
		await waitForConditionCancellable(hasStartedStore, 0, abortController.signal);
		$patternMatchingObjectIndex = 0;
		// iterate through patternMatchingObjects
		for await (const patternMatchingObject of patternMatchingObjects) {
			dispatch('patternMatchingNext', patternMatchingObject.id);
			preloadNextPatternMatchingImages($patternMatchingObjectIndex);
			await waitForConditionCancellable(hasRespondedToCurrent, 0, abortController.signal);
			hasRespondedToCurrent.set(false);
			if ($patternMatchingObjectIndex !== patternMatchingObjects.length - 1) {
				patternMatchingObjectIndex.set($patternMatchingObjectIndex + 1);
			}
		}
		dispatch('patternMatchingCompleted');
	};

	const infiniteLoopLogic = async () => {
		while (!abortController.signal.aborted) {
			await getCancellableAsync(logic, abortController.signal);
		}
	};

	onMount(() => {
		getCancellableAsync(infiniteLoopLogic, abortController.signal);
	});

	onDestroy(() => {
		abortController.abort('TaskPatternMatching was destroyed');
	});
</script>

<InterfaceFrame {width} {height} showBezels={false}>
	<TaskPatternMatchingStimulus
		on:loaded={handleLoaded}
		on:patternMatchingResponseClicked={handlePatternMatchingResponseClicked}
		patternMatchingObject={patternMatchingObjects[$patternMatchingObjectIndex]}
	/>
</InterfaceFrame>
