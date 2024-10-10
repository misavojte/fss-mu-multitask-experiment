<script lang="ts">
	import Task from '$lib/components/Task.svelte';
	import { base } from '$app/paths';
	import { TaskPatternMatchingServiceBase } from '$lib/services/TaskPatternMatchingServiceBase';

	const patternMatchingService = new TaskPatternMatchingServiceBase(base + '/');
	const patternMatchingObjects = patternMatchingService.getTaskPatternMatchingObjectsForTest();
	const videoDocumentarySrc = base + '/video/video.mp4';

	const socialMediaStimuliAS = Array.from({ length: 16 }, (_, i) => ({
		id: `AS_Image ${i + 1}`,
		src: `${base}/task/3/test/AS_Image ${i + 1}.PNG`
	}));
	const socialMediaStimuliNS = Array.from({ length: 16 }, (_, i) => ({
		id: `NS_Image ${i + 1}`,
		src: `${base}/task/3/test/NS_Image ${i + 1}.PNG`
	}));
	const socialMediaStimuli = socialMediaStimuliAS.concat(socialMediaStimuliNS);
</script>

<Task
	{patternMatchingObjects}
	{socialMediaStimuli}
	{videoDocumentarySrc}
	on:patternMatchingCompleted
/>
