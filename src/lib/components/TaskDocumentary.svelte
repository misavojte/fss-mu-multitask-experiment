<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import InterfaceFrame from './InterfaceFrame.svelte';

	export let videoDocumentarySrc: string;
	export let width: number = 400;
	export let height: number = 300;
	export let hideAllControls: boolean = false;
	export let play: boolean = false;
	export let muted: boolean = false;

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
		>
			<track kind="captions" src={videoDocumentarySrc} srclang="en" label="English" default />
		</video>
	</div>
</InterfaceFrame>
