<script>
	import { TaskPatternMatchingServiceBase } from '$lib/services/TaskPatternMatchingServiceBase';
	import TaskDocumentary from './TaskDocumentary.svelte';
	import TaskPatternMatching from './TaskPatternMatching.svelte';
	import TaskSocialMedia from './TaskSocialMedia.svelte';

	const taskPatternMatchingService = new TaskPatternMatchingServiceBase();
</script>

<div class="w-full h-full flex gap-4 p-4 justify-center items-start box-border">
	<TaskSocialMedia
		socialMediaButtons={[
			{ text: 'Like', id: 'like' },
			{ text: 'Share', id: 'share' },
			{ text: 'Ignore', id: 'save' },
			{ text: 'Dislike', id: 'dislike' }
		]}
		socialMediaStimuli={[
			{
				id: '1',
				src: '/task/3/1.png'
			},
			{
				id: '2',
				src: '/task/3/2.png'
			},
			{
				id: '3',
				src: '/task/3/3.png'
			}
		]}
	/>
	<div class="flex flex-col gap-16 w-full h-full items-center">
		<TaskPatternMatching
			patternMatchingObjects={taskPatternMatchingService.getTaskPatternMatchingObjectsForPractice()}
		/>
		<TaskDocumentary
			videoDocumentarySrc={'/video/video.mp4'}
			hideAllControls={true}
			autoplay={true}
			muted={true}
		/>
	</div>
</div>
