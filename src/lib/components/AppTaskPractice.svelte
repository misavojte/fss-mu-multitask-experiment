<script lang="ts">
	import Task from '$lib/components/Task.svelte';
	import type { ATaskHandler } from '$lib/interfaces/ITaskHandler';

	export let taskHandler: ATaskHandler;
	const patternMatchingObjects = taskHandler.taskPatternMatchingObjects;
	const videoDocumentarySrc = taskHandler.videoConfiguration.src;
	const socialMediaStimuliNS = taskHandler.socialMediaStimuliNS;
	const socialMediaStimuliAS = taskHandler.socialMediaStimuliAS;

	const socialMediaButtons = taskHandler.socialMediaButtons;
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
		socialAdjustBetweenDelay={true}
		wordOccurence="mokřad*"
		wordOccurenceTolerance={10000}
		wordOccurenceTimestamps={[423000, 749000]}
		videoStartTime={415000}
		endScenario={'pattern-timeout'}
		on:taskEnd
	/>
</div>
