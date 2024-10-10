<script lang="ts">
	import { fade } from 'svelte/transition';
	import AppQuestionsPrePractice from '$lib/components/AppQuestionsPrePractice.svelte';
	import AppTaskPractice from '$lib/components/AppTaskPractice.svelte';
	import AppQuestionsPostPractice from '$lib/components/AppQuestionsPostPractice.svelte';
	import type { ATaskPatternMatchingHandler } from '$lib/interfaces/ITaskPatternMatching';
	import type { ITimestampQuestionService } from '$lib/interfaces/IQuestion';

	let stage: 'questions-1' | 'questions-2' | 'practice' | 'trial' = 'questions-1';

	export let questionsService: ITimestampQuestionService;
	export let taskHandler: ATaskPatternMatchingHandler;

	// Define the fade transition settings
	const fadeInParams = {
		delay: 400, // Delay of 200ms for the 'in' transition
		duration: 400 // Duration of the transition (adjust as needed)
	};

	const fadeOutParams = {
		delay: 0, // No delay for the 'out' transition
		duration: 400 // Duration of the transition (adjust as needed)
	};

	const triggerPractice = () => {
		stage = 'practice';
	};

	const triggerQuestions2 = () => {
		stage = 'questions-2';
	};

	const triggerTrial = () => {
		stage = 'trial';
	};
</script>

<!-- Add 'relative' to make the parent container the positioning context -->
<div
	class="w-screen h-screen grow overflow-hidden flex flex-col gap-4 items-center justify-center relative"
>
	{#if stage === 'questions-1'}
		<!-- Use 'absolute inset-0' to make the wrapper fill the parent -->
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPrePractice {questionsService} on:startPractice={triggerPractice} />
		</div>
	{:else if stage === 'practice'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppTaskPractice on:taskEnd={triggerQuestions2} {taskHandler} />
		</div>
	{:else if stage === 'questions-2'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPostPractice
				{questionsService}
				on:startPractice={triggerPractice}
				on:startTrial={triggerTrial}
			/>
		</div>
	{:else if stage === 'trial'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppTaskPractice on:taskEnd={() => (stage = 'questions-2')} {taskHandler} />
		</div>
	{:else}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<p>Unknown stage: {stage}</p>
		</div>
	{/if}
</div>
