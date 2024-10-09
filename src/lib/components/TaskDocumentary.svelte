<script lang="ts">
	import InterfaceFrame from './InterfaceFrame.svelte';

	export let videoDocumentarySrc: string;
	export let width: number = 400;
	export let height: number = 300;
	export let hideAllControls: boolean = false;
	export let autoplay: boolean = false;
	export let muted: boolean = false;
</script>

<InterfaceFrame {width} {height} showBezels={false}>
	<div class="w-full h-full flex relative items-center justify-center">
		<video
			src={videoDocumentarySrc}
			controls={!hideAllControls}
			{autoplay}
			preload="metadata"
			{muted}
			class="h-full object-cover"
			{width}
			{height}
		>
			<track kind="captions" src={videoDocumentarySrc} srclang="en" label="English" default />
		</video>
	</div>
</InterfaceFrame>
