<script lang="ts">
	import Task from '$lib/components/Task.svelte';
	import { base } from '$app/paths';
	import { TaskPatternMatchingServiceBase } from '$lib/services/TaskPatternMatchingServiceBase';
	import type { ATaskPatternMatchingHandler } from '$lib/interfaces/ITaskPatternMatching';

	export let taskHandler: ATaskPatternMatchingHandler;
	const patternMatchingService = new TaskPatternMatchingServiceBase(base + '/');
	const patternMatchingObjects = patternMatchingService.getTaskPatternMatchingObjectsForPractice();
	const videoDocumentarySrc = base + '/video/video.mp4';
	const socialMediaStimuli = [
		{
			id: '1',
			src: base + '/task/3/1.png'
		},
		{
			id: '2',
			src: base + '/task/3/2.png'
		},
		{
			id: '3',
			src: base + '/task/3/3.png'
		}
	];
</script>

<Task
	{taskHandler}
	{patternMatchingObjects}
	{socialMediaStimuli}
	{videoDocumentarySrc}
	on:taskEnd
/>
