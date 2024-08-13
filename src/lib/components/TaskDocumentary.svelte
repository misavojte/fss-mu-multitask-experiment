<script lang="ts">
	export let videoDocumentarySrc: string;
	export let hideAllControls: boolean = false;
	export let autoplay: boolean = false;
	export let muted: boolean = false;
</script>

<div class="w-full h-full flex relative items-center justify-center">
	<video
		src={videoDocumentarySrc}
		controls={!hideAllControls}
		{autoplay}
		preload="metadata"
		{muted}
		class="absolute h-full object-cover"
	>
		<track kind="captions" src={videoDocumentarySrc} srclang="en" label="English" default />
	</video>
</div>
