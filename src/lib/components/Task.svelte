<script lang="ts">
	import TaskDocumentary from './TaskDocumentary.svelte';
	import TaskPatternMatching from './TaskPatternMatching.svelte';
	import TaskSocialMedia from './TaskSocialMedia.svelte';
	import type { ITaskPatternMatchingObject } from '$lib/interfaces/ITaskPatternMatching';

	export let socialMediaStimuli: Array<{
		src: string;
		id: string;
	}>;

	export let patternMatchingObjects: ITaskPatternMatchingObject[];

	export let videoDocumentarySrc: string;
</script>

<div class="w-full h-full flex gap-4 p-4 justify-center items-start box-border max-h-screen">
	<TaskSocialMedia
		socialMediaButtons={[
			{ text: 'Like', id: 'like' },
			{ text: 'Share', id: 'share' },
			{ text: 'Ignore', id: 'save' },
			{ text: 'Dislike', id: 'dislike' }
		]}
		{socialMediaStimuli}
	/>
	<div class="flex flex-col gap-16 w-full h-full items-center">
		<TaskPatternMatching {patternMatchingObjects} />
		<TaskDocumentary {videoDocumentarySrc} hideAllControls={true} autoplay={true} muted={true} />
	</div>
</div>
