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
		createTrainingMediaStimuli,
		createMediaStimuliObjects,
		getTrainingMediaStimuliSrcBase,
		createShuffledSocialMediaButtons,
		getFinalMediaStimuliSrcBase
	} from '$lib/utils/createMediaStimuli';
	import AppGazeValidationOnly from './AppGazeValidationOnly.svelte';
	import AppTaskPracticeSentimentVariant from './AppTaskPracticeSentimentVariant.svelte';
	import { get } from 'svelte/store';
	import LL from '../../i18n/i18n-svelte';
	import {
		getMathTaskPatternMatchingObjectsForPractice,
		getMathTaskPatternMatchingObjectsForTest
	} from '$lib/utils/createPatterStimuli';
	import { createPracticeVideoConfiguration } from '$lib/utils/createVideoStimuli';
	import { TaskHandlerMathIDB } from '$lib/services/TaskHandlerIDB';
	import { createTrialVideoConfiguration } from '$lib/utils/createVideoStimuli';

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

	// Define the stage order for navigation
	const stageOrder = [
		'connect',
		'questions-1',
		'practice',
		'questions-2',
		'trial',
		'presingle',
		'gaze-validation',
		'single',
		'end'
	] as const;

	const gazeManager = new GazeManager();

	export let questionsService: ITimestampQuestionService;
	export let sessionId: string;
	export let connectLogger: IConnectLogger;
	export let gazeSaver: IGazeSaver;
	export let sentiment: 'negative' | 'positive';

	// Define the fade transition settings
	const fadeInParams = {
		delay: 400, // Delay of 200ms for the 'in' transition
		duration: 400 // Duration of the transition (adjust as needed)
	};

	const fadeOutParams = {
		delay: 0, // No delay for the 'out' transition
		duration: 400 // Duration of the transition (adjust as needed)
	};

	// Centralized function to move to the next stage
	let isManualAdvancement = false;

	const startNextStage = () => {
		const currentIndex = stageOrder.indexOf(stage);
		if (currentIndex < stageOrder.length - 1) {
			const nextStage = stageOrder[currentIndex + 1];
			console.log(`[DEBUG] Advancing from '${stage}' to '${nextStage}'`);
			stage = nextStage;
		} else if (stage === 'end') {
			// Handle the final stage - navigate to download
			console.log(`[DEBUG] Final stage reached, navigating to download page`);
			goto(`${base}/download`);
		} else {
			console.warn(`[DEBUG] Cannot advance from stage '${stage}' - no next stage defined`);
		}
	};

	// Handler for task completion that checks if we're manually advancing
	const handleTaskEnd = () => {
		if (!isManualAdvancement) {
			startNextStage();
		} else {
			console.log(`[DEBUG] Task end ignored due to manual advancement`);
			isManualAdvancement = false; // Reset the flag
		}
	};

	// Keyboard event handler for Ctrl+X
	const handleKeydown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key.toLowerCase() === 'x') {
			event.preventDefault();
			console.log(`[DEBUG] Ctrl+X pressed - Advancing from stage '${stage}' to next stage`);
			isManualAdvancement = true; // Set flag before manual advancement
			startNextStage();
		}
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

	// 1. TRAINING SET OF STIMULI
	// 1.1 social media (dependant on the sentiment)
	const trainingStimuli = createTrainingMediaStimuli(sentiment);
	const trainingASIds = trainingStimuli.AS;
	const trainingNSIds = trainingStimuli.NS;

	const trainingSrcBase = getTrainingMediaStimuliSrcBase(base);
	const trainingAS = createMediaStimuliObjects(trainingASIds, trainingSrcBase);
	const trainingNS = createMediaStimuliObjects(trainingNSIds, trainingSrcBase);

	const socialMediaButtons = createShuffledSocialMediaButtons(
		get(LL).socialButtons['react'](),
		get(LL).socialButtons['ignore']()
	);

	// 1.2 math (non dependant on the sentiment)
	const trainingMathStimuli = getMathTaskPatternMatchingObjectsForPractice();

	// 1.3 video
	const trainingVideoConfiguration = createPracticeVideoConfiguration(base);

	// 1.4 task handler
	const trainingTaskHandler = new TaskHandlerMathIDB(
		sessionId,
		trainingNS,
		trainingAS,
		socialMediaButtons,
		trainingVideoConfiguration,
		trainingMathStimuli,
		'2', // this is correct, math task correct response id is 2
		'even'
	);

	// 2. FINAL SET OF STIMULI - PART 1
	// 2.1 social media (dependant on the sentiment)
	const firstSocialMediaStimuliNSIds = createFinalMediaStimuli(sentiment).NS;
	const firstSocialMediaStimuliASIds = createFinalMediaStimuli(sentiment).AS;

	const socialMediaSrcBase = getFinalMediaStimuliSrcBase(base);
	const socialMediaStimuliNS = createMediaStimuliObjects(
		firstSocialMediaStimuliNSIds,
		socialMediaSrcBase
	);
	const socialMediaStimuliAS = createMediaStimuliObjects(
		firstSocialMediaStimuliASIds,
		socialMediaSrcBase
	);

	// 2.2 math (non dependant on the sentiment)
	const firstMathStimuli = getMathTaskPatternMatchingObjectsForTest();

	// 2.3 video
	const firstVideoConfiguration = createTrialVideoConfiguration(base);

	// 2.4 task handler
	const firstTaskHandler = new TaskHandlerMathIDB(
		sessionId,
		socialMediaStimuliNS,
		socialMediaStimuliAS,
		socialMediaButtons,
		firstVideoConfiguration,
		firstMathStimuli,
		'2', // this is correct, math task correct response id is 2
		'even'
	);

	// 3. FINAL SET OF STIMULI - PART 2
	// 3.1 social media (dependant on the sentiment)
	const idsToOmitFromSecondStimuli = [
		...firstSocialMediaStimuliNSIds,
		...firstSocialMediaStimuliASIds
	];
	const secondSocialMediaStimuliNSIds = createFinalMediaStimuli(
		sentiment,
		idsToOmitFromSecondStimuli
	).NS;
	const secondSocialMediaStimuliASIds = createFinalMediaStimuli(
		sentiment,
		idsToOmitFromSecondStimuli
	).AS;

	const secondSocialMediaStimuliNS = createMediaStimuliObjects(
		secondSocialMediaStimuliNSIds,
		getFinalMediaStimuliSrcBase(base)
	);
	const secondSocialMediaStimuliAS = createMediaStimuliObjects(
		secondSocialMediaStimuliASIds,
		getFinalMediaStimuliSrcBase(base)
	);

	// 3.2 math (non dependant on the sentiment) = this is gonna be void as this is only placeholder for compatibility
	const secondMathStimuli = firstMathStimuli;

	// 3.3 video = this is gonna be void as this is only placeholder for compatibility
	const secondVideoConfiguration = firstVideoConfiguration;

	// 3.4 task handler
	const secondTaskHandler = new TaskHandlerMathIDB(
		sessionId,
		secondSocialMediaStimuliNS,
		secondSocialMediaStimuliAS,
		socialMediaButtons,
		secondVideoConfiguration,
		secondMathStimuli,
		'2', // this is correct, math task correct response id is 2
		'even'
	);
</script>

<svelte:window on:beforeunload={onDestroyOrUnload} on:keydown={handleKeydown} />
<!-- Add 'relative' to make the parent container the positioning context -->
<div
	class="w-screen h-screen grow overflow-hidden flex flex-col gap-4 items-center justify-center relative"
>
	{#if stage === 'connect'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppGaze {connectLogger} {gazeManager} on:continue={startNextStage} />
		</div>
	{:else if stage === 'questions-1'}
		<!-- Use 'absolute inset-0' to make the wrapper fill the parent -->
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPrePracticeB {questionsService} on:startPractice={startNextStage} />
		</div>
	{:else if stage === 'practice'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppTaskPracticeSentimentVariant
				on:taskEnd={handleTaskEnd}
				taskHandler={trainingTaskHandler}
			/>
		</div>
	{:else if stage === 'questions-2'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPostPracticeB
				{questionsService}
				on:startPractice={() => (stage = 'practice')}
				on:startTrial={startNextStage}
			/>
		</div>
	{:else if stage === 'trial'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppTaskTrialSentimentVariant on:taskEnd={handleTaskEnd} taskHandler={firstTaskHandler} />
		</div>
	{:else if stage === 'presingle'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPreSingle
				taskHandler={firstTaskHandler}
				{questionsService}
				on:startSingle={startNextStage}
			/>
		</div>
	{:else if stage === 'gaze-validation'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppGazeValidationOnly {gazeManager} {connectLogger} on:continue={startNextStage} />
		</div>
	{:else if stage === 'single'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppTaskTrialMediaOnlySentimentVariant
				taskHandler={secondTaskHandler}
				on:taskEnd={handleTaskEnd}
			/>
		</div>
	{:else if stage === 'end'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPostTrial taskHandler={secondTaskHandler} on:finish={startNextStage} />
		</div>
	{:else}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<p>Unknown stage: {stage}</p>
		</div>
	{/if}
</div>
