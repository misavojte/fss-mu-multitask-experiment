<script lang="ts">
	import Task from '$lib/components/Task.svelte';
	import { base } from '$app/paths';
	import { TaskPatternMatchingServiceBase } from '$lib/services/TaskPatternMatchingServiceBase';
	import type { ATaskPatternMatchingHandler } from '$lib/interfaces/ITaskPatternMatching';
	import { fisherYatesShuffle } from '$lib/utils/shuffle';

	export let taskHandler: ATaskPatternMatchingHandler;
	const patternMatchingService = new TaskPatternMatchingServiceBase(base + '/');
	const patternMatchingObjects = fisherYatesShuffle(
		patternMatchingService.getTaskPatternMatchingObjectsForTest()
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
	const socialMediaStimuli = fisherYatesShuffle(socialMediaStimuliAS.concat(socialMediaStimuliNS));
</script>

<div class="flex flex-col items-center justify-center w-screen h-screen">
	<Task
		{taskHandler}
		{patternMatchingObjects}
		{socialMediaStimuli}
		{videoDocumentarySrc}
		muted={false}
		on:taskEnd
		socialInitialDelay={17000}
	/>
</div>
