<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte';
	import InterfaceFrame from './InterfaceFrame.svelte';
	import TaskDocumentaryButton from './TaskDocumentaryButton.svelte';
	import { AnimationTargetHandler } from './AnimationTarget.handler';

	export let videoDocumentarySrc: string;
	export let width: number = 400;
	export let height: number = 300;
	export const hideAllControls: boolean = true;
	export let play: boolean = false;
	export let muted: boolean = false;
	export let wordOccurence: string = 'SLOVO';
	export let wordOccurenceTolerance: number = 10000;
	export let wordOccurenceTimestamps: number[] = [7000, 7100];
	export let showCorrectnessFeedback: boolean = true;

	const wordOccurenceTimestampCheck: {
		time: number;
		checked: boolean;
	}[] = wordOccurenceTimestamps.map((time) => ({ time, checked: false }));

	$: handlePlayChange(play);

	const handlePlayChange = (newPlay: boolean) => {
		if (video) {
			if (newPlay) {
				video.play();
			} else {
				video.pause();
			}
		}
	};

	let video: HTMLVideoElement | null = null;

	const dispatch = createEventDispatcher();
	let abortController = new AbortController();
	console.log('TaskDocumentary', wordOccurenceTimestampCheck);

	const animationTargetHandler = new AnimationTargetHandler();
	const handleClick = async (e: CustomEvent<MouseEvent>) => {
		const wasCorrect = evaluateCorrectnessOfClick();
		if (wasCorrect) {
			dispatch('correct');
		} else {
			dispatch('incorrect');
		}

		if (!showCorrectnessFeedback) return;

		animationTargetHandler.createAnimationTarget(
			{ x: e.detail.clientX, y: e.detail.clientY },
			wasCorrect ? 'green' : 'red',
			wasCorrect ? '+ 1 bod' : 'špatně',
			abortController.signal
		);
	};

	const evaluateCorrectnessOfClick = () => {
		if (!video) return false;
		const toleranceTimeEnd = video.currentTime * 1000;
		const toleranceTimeStart = toleranceTimeEnd - wordOccurenceTolerance; // So if video is at 7.1s and tolerance is 1000ms, it will check from 6.1s to 7.1s

		const timestampChecksWithinTolerance = wordOccurenceTimestampCheck.filter(
			(timestampCheck) =>
				timestampCheck.time >= toleranceTimeStart && timestampCheck.time <= toleranceTimeEnd
		);

		if (timestampChecksWithinTolerance.length === 0) return false;

		const correctTimestampCheck = timestampChecksWithinTolerance.find(
			(timestampCheck) => !timestampCheck.checked
		);
		if (!correctTimestampCheck) return false;

		correctTimestampCheck.checked = true;
		return true;
	};

	let startTime: number | null = null;
	const handleStart = () => {
		dispatch('started');
		startTime = Date.now();
	};

	onDestroy(() => {
		abortController.abort();
	});
</script>

<InterfaceFrame {width} {height} showBezels={false}>
	<div class="w-full h-full flex relative items-center justify-center cursor-not-allowed">
		<video
			bind:this={video}
			src={videoDocumentarySrc}
			controls={!hideAllControls}
			autoplay={false}
			preload="auto"
			{muted}
			class="h-full object-cover"
			{width}
			{height}
			on:canplay={() => {
				dispatch('loaded');
			}}
			on:play={handleStart}
		>
			<track kind="captions" src={videoDocumentarySrc} srclang="en" label="English" default />
		</video>
		<TaskDocumentaryButton {wordOccurence} on:click={handleClick} />
	</div>
</InterfaceFrame>
