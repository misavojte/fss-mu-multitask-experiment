<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ATaskHandler } from '$lib/interfaces/ITaskHandler';
	import type { ITimestampQuestionService } from '$lib/interfaces/IQuestion';
	import { GazeManager } from 'develex-js-sdk';
	import AppGaze from './AppGaze.svelte';
	import type { IConnectLogger } from '$lib/interfaces/IConnectLogger';
	import type { IGazeSaver } from '$lib/interfaces/IGazeSaver';
	import { onDestroy, onMount, setContext } from 'svelte';
	import type { AcceptedIntersect } from '$lib/database/repositories/Gaze.repository';
	import AppQuestionsPrePracticeB from './AppQuestionsPrePracticeB.svelte';
	import AppQuestionsPostPracticeB from './AppQuestionsPostPracticeB.svelte';
	import AppQuestionsPostTrial from './AppQuestionsPostTrial.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import AppQuestionsPreSingle from './AppQuestionsPreSingle.svelte';
	import AppTaskTrialMediaOnlySentimentVariant from './AppTaskTrialMediaOnlySentimentVariant.svelte';
	import AppTaskTrialSentimentVariant from './AppTaskTrialSentimentVariant.svelte';
	import {
		createFinalMediaStimuli,
		createTrainingMediaStimuli
	} from '$lib/utils/createMediaStimuli';
	import AppGazeValidationOnly from './AppGazeValidationOnly.svelte';
	import AppTaskPracticeSentimentVariant from './AppTaskPracticeSentimentVariant.svelte';

	let stage:
		| 'connect'
		| 'questions-1'
		| 'questions-2'
		| 'practice'
		| 'trial'
		| 'presingle'
		| 'gaze-validation'
		| 'single'
		| 'end' = 'connect';

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

	const variant: 'prioritize' | 'even' = 'even'; // changed recently to const as the alterning variant was turned off
	let sentiment: 'negative' | 'positive';

	// Remove taskVariants variable and related functions
	// obtain sentiment from localStorage, default to 'negative' if not set
	const obtainSentiment = (): 'negative' | 'positive' => {
		const storedSentiment = localStorage.getItem('multitaskingExperimentFSSMUSentiment');
		return storedSentiment === 'positive' ? 'positive' : 'negative';
	};

	const setSentiment = (sentiment: 'negative' | 'positive') => {
		localStorage.setItem('multitaskingExperimentFSSMUSentiment', sentiment);
	};

	let nonexcludedAS: string[];
	let nonexcludedNS: string[];
	let excludedAS: string[];
	let excludedNS: string[];
	let trainingAS: string[];
	let trainingNS: string[];

	onMount(() => {
		sentiment = obtainSentiment();

		taskHandler.scoringType = variant;
		taskHandler.sentiment = sentiment;
		setSentiment(sentiment);
		taskHandler.logScoringTypeAndSentiment();

		const stimuli = createFinalMediaStimuli(sentiment);
		nonexcludedAS = stimuli.AS;
		nonexcludedNS = stimuli.NS;
		const idsToExclude = [...stimuli.AS, ...stimuli.NS];
		const excludedStimuli = createFinalMediaStimuli(sentiment, idsToExclude);
		excludedAS = excludedStimuli.AS;
		excludedNS = excludedStimuli.NS;
		const trainingStimuli = createTrainingMediaStimuli(sentiment);
		trainingAS = trainingStimuli.AS;
		trainingNS = trainingStimuli.NS;
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
			<AppQuestionsPrePracticeB {questionsService} on:startPractice={triggerPractice} />
		</div>
	{:else if stage === 'practice'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppTaskPracticeSentimentVariant
				on:taskEnd={triggerQuestions2}
				{taskHandler}
				AS={trainingAS}
				NS={trainingNS}
			/>
		</div>
	{:else if stage === 'questions-2'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPostPracticeB
				{questionsService}
				on:startPractice={triggerPractice}
				on:startTrial={triggerTrial}
			/>
		</div>
	{:else if stage === 'trial'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppTaskTrialSentimentVariant
				on:taskEnd={() => (stage = 'presingle')}
				{taskHandler}
				AS={nonexcludedAS}
				NS={nonexcludedNS}
			/>
		</div>
	{:else if stage === 'presingle'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPreSingle
				{questionsService}
				on:startSingle={() => (stage = 'gaze-validation')}
			/>
		</div>
	{:else if stage === 'gaze-validation'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppGazeValidationOnly {gazeManager} {connectLogger} on:continue={() => (stage = 'single')} />
		</div>
	{:else if stage === 'single'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppTaskTrialMediaOnlySentimentVariant
				{taskHandler}
				AS={excludedAS}
				NS={excludedNS}
				on:taskEnd={() => (stage = 'end')}
			/>
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
