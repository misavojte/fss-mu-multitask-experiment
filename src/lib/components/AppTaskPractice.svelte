<script lang="ts">
	import Task from '$lib/components/Task.svelte';
	import { base } from '$app/paths';
	import type { ATaskHandler } from '$lib/interfaces/ITaskHandler';
	import LL from '../../i18n/i18n-svelte';
	import { fisherYatesShuffle } from '$lib/utils/shuffle';

	export let taskHandler: ATaskHandler;
	const patternMatchingObjects = taskHandler.getTaskPatternMatchingObjectsForPractice();
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

	const socialMediaButtons: { text: string; id: string }[] = fisherYatesShuffle([
		{ text: $LL.socialButtons['like'](), id: 'like' },
		{ text: $LL.socialButtons['dislike'](), id: 'dislike' }
	]);
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
		socialBetweenDelay={5000}
		socialStimulusMaxDuration={20000}
		socialStimulusRemindAfter={15000}
		endScenario={'pattern-timeout'}
		on:taskEnd
	/>
</div>
