<script>
	import TaskDocumentary from './TaskDocumentary.svelte';
	import TaskSocialMedia from './TaskSocialMedia.svelte';
</script>

<div class="w-screen h-screen flex gap-4 p-4 justify-center items-start">
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
	<div class="flex flex-col gap-4 w-full h-full items-center">
		<div class="w-1/2 h-1/2 bg-gray-200"></div>
		<TaskDocumentary
			videoDocumentarySrc={'/video/video.mp4'}
			hideAllControls={true}
			autoplay={true}
		/>
	</div>
</div>
