<script lang="ts">
	import { fade } from 'svelte/transition';
	import { TimestampQuestionServiceMock } from '$lib/services/TimestampQuestionServiceMock';

	import AppQuestionsPrePractice from '$lib/components/AppQuestionsPrePractice.svelte';
	import AppTaskPractice from '$lib/components/AppTaskPractice.svelte';
	import AppQuestionsPostPractice from '$lib/components/AppQuestionsPostPractice.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { saveActionLog } from '$lib/database/repositories/ActionLog.repository';

	let stage: 'questions-1' | 'questions-2' | 'practice' | 'trial' = 'questions-1';
	let loading = false;

	const questionsService = new TimestampQuestionServiceMock();

	// Define the fade transition settings
	const fadeInParams = {
		delay: 400, // Delay of 200ms for the 'in' transition
		duration: 400 // Duration of the transition (adjust as needed)
	};

	const fadeOutParams = {
		delay: 0, // No delay for the 'out' transition
		duration: 400 // Duration of the transition (adjust as needed)
	};

	const triggerLoading = () => {
		loading = true;
	};

	const triggerPractice = () => {
		loading = false;
		stage = 'practice';
	};

	const triggerQuestions2 = () => {
		loading = false;
		stage = 'questions-2';
	};

	const triggerTrial = () => {
		loading = false;
		stage = 'trial';
	};

	const sessionId = new Date().getTime() + '-' + Math.floor(1000 + Math.random() * 9000);

	onMount(() => {
		saveActionLog({
			sessionId: sessionId,
			type: 'page',
			timestamp: new Date().toISOString(),
			value: 'start'
		});
	});

	onDestroy(() => {
		saveActionLog({
			sessionId: sessionId,
			type: 'page',
			timestamp: new Date().toISOString(),
			value: 'end'
		});
	});
</script>

<!-- Add 'relative' to make the parent container the positioning context -->
<div
	class="w-screen h-screen grow overflow-hidden flex flex-col gap-4 items-center justify-center relative"
>
	{#if stage === 'questions-1'}
		<!-- Use 'absolute inset-0' to make the wrapper fill the parent -->
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPrePractice
				{questionsService}
				on:startPractice={triggerPractice}
				on:loading={triggerLoading}
			/>
		</div>
	{:else if stage === 'practice'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppTaskPractice on:patternMatchingCompleted={triggerQuestions2} />
		</div>
	{:else if stage === 'questions-2'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPostPractice
				{questionsService}
				on:loading={triggerLoading}
				on:startPractice={triggerPractice}
				on:startTrial={triggerTrial}
			/>
		</div>
	{:else if stage === 'trial'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppTaskPractice on:patternMatchingCompleted={() => (stage = 'questions-2')} />
		</div>
	{:else}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<p>Unknown stage: {stage}</p>
		</div>
	{/if}
</div>
