<script lang="ts">
	import type {
		ATaskHandler,
		ITaskPatternMatchingObject,
		ITaskPatternMatchingObjectImage
	} from '$lib/interfaces/ITaskHandler';
	import { writable } from 'svelte/store';
	import TaskPatternMatchingStimulus from '$lib/components/TaskPatternMatchingStimulus.svelte';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import InterfaceFrame from './InterfaceFrame.svelte';
	import { preloadMedia } from '$lib/utils/preloadMedia';
	import {
		getCancellableAsync,
		waitForConditionCancellable,
		waitForTimeoutCancellable
	} from '$lib/utils/waitForCondition';
	import { AnimationTargetHandler } from './AnimationTarget.handler';

	export let patternMatchingObjects: ITaskPatternMatchingObject[];
	export let taskHandler: ATaskHandler;

	export let width: number = 300;

	export let height: number = 300;

	export let hasStarted: boolean = true;

	export let showCorrectnessFeedback: boolean = true;

	const hasStartedStore = writable(hasStarted);
	const hasRespondedToCurrent = writable(false);
	$: {
		if (hasStarted) {
			hasStartedStore.set(true);
		}
	}

	const patternMatchingObjectIndex = writable(0);
	const dispatch = createEventDispatcher();
	const animationTargetHandler = new AnimationTargetHandler();

	const handlePatternMatchingResponseClicked = (
		event: CustomEvent<{
			e: MouseEvent;
			response: string;
		}>
	): void => {
		if ($hasRespondedToCurrent) return;
		// const isCorrect = event.detail === 'T1'; //
		console.log('response', event.detail.response, taskHandler.taskPatternCorrectResponseId);
		const isCorrect = event.detail.response === taskHandler.taskPatternCorrectResponseId;
		dispatch('patternMatchingResponse', event.detail.response);
		if (showCorrectnessFeedback) {
			animationTargetHandler.createAnimationTarget(
				{ x: event.detail.e.clientX, y: event.detail.e.clientY },
				isCorrect ? 'green' : 'red',
				isCorrect
					? `+ ${taskHandler.pointsOnCorrectPatternMatching} bod${taskHandler.pointsOnCorrectPatternMatching > 1 ? 'y' : ''}`
					: 'špatně',
				abortController.signal
			);
		}
		hasRespondedToCurrent.set(true);
	};

	const preloadNextPatternMatchingImages = (index: number) => {
		const nextIndex = index + 1;
		if (nextIndex < patternMatchingObjects.length) {
			const nextPatternMatchingObject = patternMatchingObjects[nextIndex];
			// if it is image type, preload it
			if (nextPatternMatchingObject.type === 'image') {
				preloadMedia([
					{
						type: 'img' as const,
						src: (nextPatternMatchingObject as ITaskPatternMatchingObjectImage).matrixSrc
					},
					...nextPatternMatchingObject.responses.map((response) => ({
						type: 'img' as const,
						src: response.src
					}))
				]);
			}
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
			await waitForTimeoutCancellable(600, abortController.signal);
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
