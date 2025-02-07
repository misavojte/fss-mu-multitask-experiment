<script lang="ts">
	import { fade } from 'svelte/transition';
	import AppTaskPractice from '$lib/components/AppTaskPractice.svelte';
	import type { ATaskHandler } from '$lib/interfaces/ITaskHandler';
	import type { ITimestampQuestionService } from '$lib/interfaces/IQuestion';
	import AppTaskTrial from '$lib/components/AppTaskTrial.svelte';
	import { GazeManager } from '@473783/develex-core';
	import AppGaze from './AppGaze.svelte';
	import type { IConnectLogger } from '$lib/interfaces/IConnectLogger';
	import type { IGazeSaver } from '$lib/interfaces/IGazeSaver';
	import { onDestroy, onMount, setContext } from 'svelte';
	import type { AcceptedIntersect } from '$lib/database/repositories/Gaze.repository';
	import AppQuestionsPrePracticeB from './AppQuestionsPrePracticeB.svelte';
	import AppQuestionsPrePracticeA from '$lib/components/AppQuestionsPrePracticeA.svelte';
	import AppQuestionsPostPracticeA from '$lib/components/AppQuestionsPostPracticeA.svelte';
	import AppQuestionsPostPracticeB from './AppQuestionsPostPracticeB.svelte';
	import AppQuestionsPostTrial from './AppQuestionsPostTrial.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	let stage: 'connect' | 'questions-1' | 'questions-2' | 'practice' | 'trial' | 'end' = 'connect';

	const gazeManager = new GazeManager();

	export let questionsService: ITimestampQuestionService;
	export let taskHandler: ATaskHandler;
	export let connectLogger: IConnectLogger;
	export let gazeSaver: IGazeSaver;

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

	const triggerQuestions1 = () => {
		stage = 'questions-1';
	};

	const onIntersect = (entry: AcceptedIntersect) => {
		gazeSaver.saveGazeInteraction(entry);
	};

	setContext('gazeManager', gazeManager);

	onMount(() => {
		gazeManager.on('intersect', onIntersect);
	});

	onDestroy(() => {
		onDestroyOrUnload();
	});

	const onDestroyOrUnload = () => {
		gazeManager.disconnect();
		gazeManager.off('intersect', onIntersect);
	};

	let variant: 'prioritize' | 'even';

	// obtain from localStorage value of "multitaskingExperimentFSSMUVariant" which is either
	// "prioritize" or "even"
	// if it is not set, set it to "prioritize"
	// set the opposite variant to the variant
	const obtainVariant = () => {
		const variant = localStorage.getItem('multitaskingExperimentFSSMUVariant');
		if (variant === 'prioritize') {
			return 'even';
		} else {
			return 'prioritize';
		}
	};

	const setVariant = (variant: 'prioritize' | 'even') => {
		localStorage.setItem('multitaskingExperimentFSSMUVariant', variant);
	};

	onMount(() => {
		variant = obtainVariant();
		taskHandler.scoringType = variant;
		setVariant(variant);
		taskHandler.logScoringType();
	});
</script>

<svelte:window on:beforeunload={onDestroyOrUnload} />
<!-- Add 'relative' to make the parent container the positioning context -->
<div
	class="w-screen h-screen grow overflow-hidden flex flex-col gap-4 items-center justify-center relative"
>
	{#if stage === 'connect'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppGaze {connectLogger} {gazeManager} on:continue={triggerQuestions1} />
		</div>
	{:else if stage === 'questions-1'}
		<!-- Use 'absolute inset-0' to make the wrapper fill the parent -->
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			{#if variant === 'prioritize'}
				<AppQuestionsPrePracticeA {questionsService} on:startPractice={triggerPractice} />
			{:else if variant === 'even'}
				<AppQuestionsPrePracticeB {questionsService} on:startPractice={triggerPractice} />
			{/if}
		</div>
	{:else if stage === 'practice'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppTaskPractice on:taskEnd={triggerQuestions2} {taskHandler} />
		</div>
	{:else if stage === 'questions-2'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			{#if variant === 'prioritize'}
				<AppQuestionsPostPracticeA
					{questionsService}
					on:startPractice={triggerPractice}
					on:startTrial={triggerTrial}
				/>
			{:else if variant === 'even'}
				<AppQuestionsPostPracticeB
					{questionsService}
					on:startPractice={triggerPractice}
					on:startTrial={triggerTrial}
				/>
			{/if}
		</div>
	{:else if stage === 'trial'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppTaskTrial on:taskEnd={() => (stage = 'end')} {taskHandler} />
		</div>
	{:else if stage === 'end'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPostTrial
				{taskHandler}
				on:finish={() => {
					goto(`${base}/download`);
				}}
			/>
		</div>
	{:else}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<p>Unknown stage: {stage}</p>
		</div>
	{/if}
</div>
