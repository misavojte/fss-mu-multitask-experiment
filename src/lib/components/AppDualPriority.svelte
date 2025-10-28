<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { ITimestampQuestionService } from '$lib/interfaces/IQuestion';
	import AppInstructionsDualPriority from './AppInstructionsDualPriority.svelte';
	import AppQuestionsPostPracticeDualOctober from './AppQuestionsPostPracticeDualOctober.svelte';
	import AppQuestionsPostTrial from './AppQuestionsPostTrial.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import Task from './Task.svelte';
	import {
		createTrainingMediaStimuliOctober25,
		createTrialMediaStimuliOctober25,
		createMediaStimuliObjects,
		getTrainingMediaStimuliOctober25SrcBase,
		getTrialMediaStimuliOctober25SrcBase,
		createShuffledSocialMediaButtons
	} from '$lib/utils/createMediaStimuli';
	import { get } from 'svelte/store';
	import LL from '../../i18n/i18n-svelte';
	import {
		getMathTaskPatternMatchingObjectsForPractice,
		getMathTaskPatternMatchingObjectsForTest
	} from '$lib/utils/createPatterStimuli';
	import { TaskHandlerMathIDB } from '$lib/services/TaskHandlerIDB';

	let stage: 'questions-1' | 'questions-2' | 'practice' | 'trial' | 'end' = 'questions-1';

	// Define the stage order for navigation
	const stageOrder = ['questions-1', 'practice', 'questions-2', 'trial', 'end'] as const;

	export let questionsService: ITimestampQuestionService;
	export let sessionId: string;
	export let priority: 'math' | 'social' | 'none';

	// Define the fade transition settings
	const fadeInParams = {
		delay: 400, // Delay of 400ms for the 'in' transition
		duration: 400 // Duration of the transition (adjust as needed)
	};

	const fadeOutParams = {
		delay: 0, // No delay for the 'out' transition
		duration: 400 // Duration of the transition (adjust as needed)
	};

	// Centralized function to move to the next stage
	let isManualAdvancement = false;

	const startNextStage = async () => {
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

	// Helper function to get points based on priority
	const getPoints = (taskType: 'pattern' | 'social' | 'documentary') => {
		if (priority === 'math') {
			return taskType === 'pattern' ? 3 : 1;
		} else if (priority === 'social') {
			return taskType === 'social' ? 3 : 1;
		} else {
			// priority === 'none'
			return 1;
		}
	};

	// 1. TRAINING SET OF STIMULI
	// 1.1 social media (using October 25 practice stimuli)
	const trainingStimuli = createTrainingMediaStimuliOctober25();
	const trainingASIds = trainingStimuli.AS;
	const trainingNSIds = trainingStimuli.NS;

	const trainingSrcBase = getTrainingMediaStimuliOctober25SrcBase(base);
	const trainingAS = createMediaStimuliObjects(trainingASIds, trainingSrcBase);
	const trainingNS = createMediaStimuliObjects(trainingNSIds, trainingSrcBase);

	const socialMediaButtons = createShuffledSocialMediaButtons(
		get(LL).socialButtons['react'](),
		get(LL).socialButtons['ignore']()
	);

	// 1.2 math (non dependent on the sentiment)
	const trainingMathStimuli = getMathTaskPatternMatchingObjectsForPractice();

	// 1.3 task handler (dual task - no video configuration)
	const trainingTaskHandler = new TaskHandlerMathIDB(sessionId, {
		socialMediaStimuliNS: trainingNS,
		socialMediaStimuliAS: trainingAS,
		socialMediaButtons,
		videoConfiguration: null, // No video configuration for dual task
		taskPatternMatchingObjects: trainingMathStimuli,
		taskPatternCorrectResponseId: '2',
		pointsPatternMatching: getPoints('pattern'),
		pointsSocialMedia: getPoints('social'),
		pointsDocumentary: getPoints('documentary'),
		socialMediaStimuliPresentationPattern: [] // DELIBERATELY ABSOLUTELY RANDOM
	});

	// 2. TRIAL SET OF STIMULI - PART 1 (DUAL TASK)
	// 2.1 social media (using October 25 trial stimuli)
	const trialStimuli = createTrialMediaStimuliOctober25();
	const firstSocialMediaStimuliNSIds = trialStimuli.NS;
	const firstSocialMediaStimuliASIds = trialStimuli.AS;

	const socialMediaSrcBase = getTrialMediaStimuliOctober25SrcBase(base);
	const socialMediaStimuliNS = createMediaStimuliObjects(
		firstSocialMediaStimuliNSIds,
		socialMediaSrcBase
	);
	const socialMediaStimuliAS = createMediaStimuliObjects(
		firstSocialMediaStimuliASIds,
		socialMediaSrcBase
	);

	// 2.2 math (non dependent on the sentiment)
	const firstMathStimuli = getMathTaskPatternMatchingObjectsForTest();

	// 2.3 task handler (dual task - no video configuration)
	const firstTaskHandler = new TaskHandlerMathIDB(sessionId, {
		socialMediaStimuliNS,
		socialMediaStimuliAS,
		socialMediaButtons,
		videoConfiguration: null, // No video configuration for dual task
		taskPatternMatchingObjects: firstMathStimuli,
		taskPatternCorrectResponseId: '2',
		pointsPatternMatching: getPoints('pattern'),
		pointsSocialMedia: getPoints('social'),
		pointsDocumentary: getPoints('documentary'),
		socialMediaStimuliPresentationPattern: [] // DELIBERATELY ABSOLUTELY RANDOM
	});
</script>

<svelte:window on:keydown={handleKeydown} />
<!-- Add 'relative' to make the parent container the positioning context -->
<div
	class="w-screen h-screen grow overflow-hidden flex flex-col gap-4 items-center justify-center relative"
>
	{#if stage === 'questions-1'}
		<!-- Use 'absolute inset-0' to make the wrapper fill the parent -->
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppInstructionsDualPriority {questionsService} {priority} on:continue={startNextStage} />
		</div>
	{:else if stage === 'practice'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<div class="flex flex-col items-center justify-center w-screen h-screen">
				<Task
					on:taskEnd={handleTaskEnd}
					taskHandler={trainingTaskHandler}
					patternMatchingObjects={trainingTaskHandler.taskPatternMatchingObjects}
					socialMediaButtons={trainingTaskHandler.socialMediaButtons}
					socialInitialDelay={5000}
					socialBetweenDelay={5000}
					socialStimulusMaxDuration={20000}
					socialStimulusRemindAfter={15000}
					socialAdjustBetweenDelay={true}
					endScenario={'pattern-timeout'}
					positionXSocial={150}
					positionYSocial={150}
					positionXPattern={950}
					positionYPattern={195}
					widthSocial={450}
					heightSocialImage={600}
					heightSocialOptions={160}
					widthPattern={800}
					heightPattern={700}
				/>
			</div>
		</div>
	{:else if stage === 'questions-2'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPostPracticeDualOctober
				{questionsService}
				{priority}
				on:startPractice={() => (stage = 'practice')}
				on:startTrial={startNextStage}
			/>
		</div>
	{:else if stage === 'trial'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<div class="flex flex-col items-center justify-center w-screen h-screen">
				<Task
					on:taskEnd={handleTaskEnd}
					taskHandler={firstTaskHandler}
					patternMatchingObjects={firstTaskHandler.taskPatternMatchingObjects}
					socialMediaButtons={firstTaskHandler.socialMediaButtons}
					socialInitialDelay={5000}
					socialBetweenDelay={5000}
					socialStimulusMaxDuration={20000}
					socialStimulusRemindAfter={15000}
					socialAdjustBetweenDelay={true}
					endScenario={'timeout'}
					positionXSocial={150}
					positionYSocial={150}
					positionXPattern={950}
					positionYPattern={195}
					widthSocial={450}
					heightSocialImage={600}
					heightSocialOptions={160}
					widthPattern={800}
					heightPattern={700}
				/>
			</div>
		</div>
	{:else if stage === 'end'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPostTrial taskHandler={firstTaskHandler} on:finish={startNextStage} />
		</div>
	{:else}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<p>Unknown stage: {stage}</p>
		</div>
	{/if}
</div>
