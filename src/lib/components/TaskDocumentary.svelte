<script lang="ts">
	export let videoDocumentarySrc: string;
	export let hideAllControls: boolean = false;
	export let autoplay: boolean = false;
	export let muted: boolean = false;
</script>

<div class="task-documentary">
	<video
		src={videoDocumentarySrc}
		controls={!hideAllControls}
		{autoplay}
		preload="metadata"
		{muted}
	>
		<track kind="captions" src={videoDocumentarySrc} srclang="en" label="English" default />
	</video>
</div>
