<script lang="ts">
	import Task from '$lib/components/Task.svelte';
	import { base } from '$app/paths';
	import { TaskPatternMatchingServiceBase } from '$lib/services/TaskPatternMatchingServiceBase';
	import type { ATaskPatternMatchingHandler } from '$lib/interfaces/ITaskPatternMatching';
	import LL from '../../i18n/i18n-svelte';

	export let taskHandler: ATaskPatternMatchingHandler;
	const patternMatchingService = new TaskPatternMatchingServiceBase(base + '/');
	const patternMatchingObjects = patternMatchingService.getTaskPatternMatchingObjectsForPractice();
	const videoDocumentarySrc = base + '/video/video.mp4';
	const socialMediaStimuliNS = [
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
	const socialMediaStimuliAS = [] as Array<{
		id: string;
		src: string;
	}>; // No AS stimuli for practice

	const socialMediaButtons: { text: string; id: string }[] = [
		{ text: $LL.socialButtons['like'](), id: 'like' },
		{ text: $LL.socialButtons['dislike'](), id: 'dislike' },
		{ text: $LL.socialButtons['share'](), id: 'share' },
		{ text: $LL.socialButtons['report'](), id: 'report' }
	];
</script>

<div class="flex flex-col items-center justify-center w-screen h-screen">
	<Task
		{taskHandler}
		{patternMatchingObjects}
		{socialMediaStimuliNS}
		{socialMediaStimuliAS}
		{socialMediaButtons}
		{videoDocumentarySrc}
		muted={false}
		socialInitialDelay={5000}
		socialBetweenDelay={15000}
		socialStimulusMaxDuration={15000}
		endScenario={'pattern-timeout'}
		on:taskEnd
	/>
</div>
