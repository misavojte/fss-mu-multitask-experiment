<script lang="ts">
	import Task from '$lib/components/Task.svelte';
	import { base } from '$app/paths';
	import type { ATaskHandler } from '$lib/interfaces/ITaskHandler';
	import { fisherYatesShuffle } from '$lib/utils/shuffle';
	import LL from '../../i18n/i18n-svelte';

	export let taskHandler: ATaskHandler;
	const patternMatchingObjects = fisherYatesShuffle(
		taskHandler.getTaskPatternMatchingObjectsForTest()
	);
	const videoDocumentarySrc = base + '/video/trial.mp4';

	const socialMediaStimuliAS = Array.from({ length: 16 }, (_, i) => ({
		id: `AS_Image ${i + 1}`,
		src: `${base}/task/3/test/AS_Image ${i + 1}.PNG`
	}));
	const socialMediaStimuliNS = Array.from({ length: 16 }, (_, i) => ({
		id: `NS_Image ${i + 1}`,
		src: `${base}/task/3/test/NS_Image ${i + 1}.PNG`
	}));

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
		on:taskEnd
		socialInitialDelay={5000}
		socialBetweenDelay={5000}
		socialStimulusMaxDuration={20000}
		endScenario={'timeout'}
	/>
</div>
