<script lang="ts">
	import Task from '$lib/components/Task.svelte';
	import type { ATaskHandler } from '$lib/interfaces/ITaskHandler';

	export let taskHandler: ATaskHandler;
</script>

<div class="flex flex-col items-center justify-center w-screen h-screen">
	<Task
		{taskHandler}
		patternMatchingObjects={taskHandler.taskPatternMatchingObjects}
		socialMediaStimuliNS={taskHandler.socialMediaStimuliNS}
		socialMediaStimuliAS={taskHandler.socialMediaStimuliAS}
		socialMediaButtons={taskHandler.socialMediaButtons}
		videoDocumentarySrc=""
		muted={false}
		on:taskEnd
		socialInitialDelay={5000}
		socialBetweenDelay={5000}
		socialStimulusMaxDuration={20000}
		socialStimulusRemindAfter={15000}
		socialAdjustBetweenDelay={true}
		wordOccurence=""
		wordOccurenceTolerance={0}
		wordOccurenceTimestamps={[]}
		endScenario={'timeout'}
		dualTaskMode={true}
		positionXSocial={200}
		positionYSocial={200}
		positionXPattern={1070}
		positionYPattern={245}
	/>
</div>
