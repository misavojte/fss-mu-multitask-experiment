<script lang="ts">
	import { base } from '$app/paths';
	export let videoDocumentarySrc: string;
	export let width: number = 400;
	export let height: number = 300;
	export let hideAllControls: boolean = false;
	export let autoplay: boolean = false;
	export let muted: boolean = false;
</script>

<div class="w-full h-full flex relative items-center justify-center">
	<video
		src={base + videoDocumentarySrc}
		controls={!hideAllControls}
		{autoplay}
		preload="metadata"
		{muted}
		class="h-full object-cover"
		{width}
		{height}
	>
		<track kind="captions" src={base + videoDocumentarySrc} srclang="en" label="English" default />
		<input type="hidden" value={base} />
	</video>
</div>
