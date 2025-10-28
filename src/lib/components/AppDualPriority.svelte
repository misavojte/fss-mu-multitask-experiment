<script lang="ts">
	import { fade } from 'svelte/transition';
	import { TimestampQuestionServiceHTTP } from '$lib/services/TimestampQuestionServiceHTTP';
	import AppInstructionsDualPriority from './AppInstructionsDualPriority.svelte';
	import AppQuestionsPostPracticeDualOctober from './AppQuestionsPostPracticeDualOctober.svelte';
	import AppFinalScore from './AppFinalScore.svelte';
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
	import { TaskHandlerMathHTTP } from '$lib/services/TaskHandlerHTTP';

	let stage: 'questions-1' | 'questions-2' | 'practice' | 'trial' | 'end' = 'questions-1';

	export let sessionId: string;
	export let priority: 'math' | 'social' | 'none';
	export let endpoint: string;
	export let returnUrl: string;

	// Create the question service here
	const questionsService = new TimestampQuestionServiceHTTP(sessionId, endpoint);

	// Define the fade transition settings
	const fadeInParams = {
		delay: 400, // Delay of 400ms for the 'in' transition
		duration: 400 // Duration of the transition (adjust as needed)
	};

	const fadeOutParams = {
		delay: 0, // No delay for the 'out' transition
		duration: 400 // Duration of the transition (adjust as needed)
	};

	/**
	 * ROBUST STAGE MANAGEMENT SYSTEM
	 * Prevents race conditions and ensures explicit, controlled transitions
	 */

	// Guard to prevent multiple simultaneous transitions
	let isTransitioning = false;

	/**
	 * Safely transitions to a specific stage with guards against race conditions
	 * @param targetStage - The exact stage to transition to
	 * @param source - Description of what triggered this transition (for debugging)
	 */
	const transitionToStage = (
		targetStage: 'questions-1' | 'questions-2' | 'practice' | 'trial' | 'end',
		source: string
	) => {
		if (isTransitioning) {
			console.warn(
				`[STAGE] Blocked transition to '${targetStage}' from ${source} - already transitioning`
			);
			return;
		}

		if (stage === targetStage) {
			console.warn(
				`[STAGE] Blocked transition to '${targetStage}' from ${source} - already at target stage`
			);
			return;
		}

		isTransitioning = true;
		console.log(`[STAGE] Transitioning: '${stage}' -> '${targetStage}' (${source})`);
		stage = targetStage;

		// Reset transition guard after transition completes
		setTimeout(() => {
			isTransitioning = false;
		}, 500);
	};

	// EXPLICIT STAGE TRANSITION HANDLERS
	// Each handler knows exactly where it should go

	/**
	 * Handles completion of questions-1 stage
	 * Always goes to practice
	 */
	const handleQuestions1Complete = () => {
		transitionToStage('practice', 'questions-1 complete');
	};

	/**
	 * Handles completion of practice task
	 * Always goes to questions-2
	 */
	const handlePracticeComplete = () => {
		transitionToStage('questions-2', 'practice complete');
	};

	/**
	 * Handles user choice from questions-2 to restart practice
	 */
	const handleRestartPractice = () => {
		transitionToStage('practice', 'restart practice from questions-2');
	};

	/**
	 * Handles user choice from questions-2 to start trial
	 */
	const handleStartTrial = () => {
		transitionToStage('trial', 'start trial from questions-2');
	};

	/**
	 * Handles completion of trial task
	 * Always goes to end
	 */
	const handleTrialComplete = () => {
		transitionToStage('end', 'trial complete');
	};

	/**
	 * Handles Ctrl+X keyboard shortcut for debugging/skipping
	 * Explicitly defines where to go from each stage
	 */
	const handleKeydown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key.toLowerCase() === 'x') {
			event.preventDefault();

			// Explicit mapping of where Ctrl+X should go from each stage
			const skipMap: Record<typeof stage, typeof stage> = {
				'questions-1': 'practice',
				practice: 'questions-2',
				'questions-2': 'trial',
				trial: 'end',
				end: 'end' // Already at the end
			};

			const targetStage = skipMap[stage];
			transitionToStage(targetStage, 'Ctrl+X manual skip');
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
	const trainingTaskHandler = new TaskHandlerMathHTTP(
		sessionId,
		{
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
		},
		endpoint
	);

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
	const firstTaskHandler = new TaskHandlerMathHTTP(
		sessionId,
		{
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
		},
		endpoint
	);
</script>

<svelte:window on:keydown={handleKeydown} />
<!-- Add 'relative' to make the parent container the positioning context -->
<div
	class="w-screen h-screen grow overflow-hidden flex flex-col gap-4 items-center justify-center relative"
>
	{#if stage === 'questions-1'}
		<!-- Use 'absolute inset-0' to make the wrapper fill the parent -->
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppInstructionsDualPriority
				{questionsService}
				{priority}
				on:continue={handleQuestions1Complete}
			/>
		</div>
	{:else if stage === 'practice'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<div class="flex flex-col items-center justify-center w-screen h-screen">
				<!-- 185 seconds (3 minutes and 5 seconds) -->
				<!-- This is the practice task -->
				<Task
					on:taskEnd={handlePracticeComplete}
					taskHandler={trainingTaskHandler}
					patternMatchingObjects={trainingTaskHandler.taskPatternMatchingObjects}
					socialMediaButtons={trainingTaskHandler.socialMediaButtons}
					socialInitialDelay={5000}
					socialBetweenDelay={5000}
					socialStimulusMaxDuration={10000}
					socialStimulusRemindAfter={-1}
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
					timeOut={185000}
				/>
			</div>
		</div>
	{:else if stage === 'questions-2'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppQuestionsPostPracticeDualOctober
				{questionsService}
				{priority}
				on:startPractice={handleRestartPractice}
				on:startTrial={handleStartTrial}
			/>
		</div>
	{:else if stage === 'trial'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<div class="flex flex-col items-center justify-center w-screen h-screen">
				<!-- 185 seconds (3 minutes and 5 seconds) -->
				<!-- This is the trial, MAIN TASK -->
				<Task
					on:taskEnd={handleTrialComplete}
					taskHandler={firstTaskHandler}
					patternMatchingObjects={firstTaskHandler.taskPatternMatchingObjects}
					socialMediaButtons={firstTaskHandler.socialMediaButtons}
					socialInitialDelay={5000}
					socialBetweenDelay={5000}
					socialStimulusMaxDuration={10000}
					socialStimulusRemindAfter={-1}
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
					timeOut={185000}
				/>
			</div>
		</div>
	{:else if stage === 'end'}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<AppFinalScore taskHandler={firstTaskHandler} {returnUrl} />
		</div>
	{:else}
		<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
			<p>Unknown stage: {stage}</p>
		</div>
	{/if}
</div>
