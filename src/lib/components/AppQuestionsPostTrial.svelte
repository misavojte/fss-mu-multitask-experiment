<script lang="ts">
	import QuestionManager from '$lib/components/QuestionManager.svelte';
	import type {
		IQuestion,
		IQuestionBattery,
		ITimestampQuestionService
	} from '$lib/interfaces/IQuestion';
	import LL from '../../i18n/i18n-svelte';
	import { createEventDispatcher } from 'svelte';
	import InterfaceFooter from './InterfaceFooter.svelte';
	import { fisherYatesShuffle } from '$lib/utils/shuffle';
	import type { ATaskPatternMatchingHandler } from '$lib/interfaces/ITaskPatternMatching';
	import { fade } from 'svelte/transition';
	import { base } from '$app/paths';

	export let questionsService: ITimestampQuestionService;
	export let taskHandler: ATaskPatternMatchingHandler;

	const dispatch = createEventDispatcher();

	const questionToRandomize: IQuestion[] = [
		{
			id: 'pt-2',
			headingText: $LL.question['pt-2'].heading(),
			type: 'select',
			options: [
				{
					id: '0',
					label: $LL.question['pt-2'].options[0]()
				},
				{
					id: '1',
					label: $LL.question['pt-2'].options[1]()
				},
				{
					id: '2',
					label: $LL.question['pt-2'].options[2]()
				}
			],
			required: true
		},
		{
			id: 'pt-3',
			headingText: $LL.question['pt-3'].heading(),
			type: 'select',
			options: [
				{
					id: '0',
					label: $LL.question['pt-3'].options[0]()
				},
				{
					id: '1',
					label: $LL.question['pt-3'].options[1]()
				},
				{
					id: '2',
					label: $LL.question['pt-3'].options[2]()
				}
			],
			required: true
		}
	];

	const randomize = (questionToRandomize: IQuestion[]) => {
		const randomizedQuestions = fisherYatesShuffle<IQuestion>(questionToRandomize);
		randomizedQuestions.forEach((question) => {
			if (question.type === 'select') {
				// Clone the readonly array into a new mutable array before shuffling
				question.options = fisherYatesShuffle([...question.options]);
			}
		});
		return randomizedQuestions;
	};

	const questions: IQuestionBattery = [
		{
			id: 'pt-1',
			headingText: $LL['question']['pt-1']['heading'](),
			confirmText: $LL['question']['pt-1']['confirm'](),
			paragraphs: [$LL['question']['pt-1'].paragraphs[0]()],
			type: 'instruction',
			required: true
		},
		...randomize(questionToRandomize)
	];

	const handleQuestionnaireDone = async (data: any) => {
		stage = 'end';
	};

	const handleAnswer = (data: CustomEvent<{ id: string; value: string }>) => {
		if (data.detail.id === 'pt-3' || data.detail.id === 'pt-2') {
			const answer = data.detail.value;
			if (answer === '0') taskHandler.handleDocumentaryQuestionnaireResponse(true);
		}
	};

	const handleAllDone = () => {
		dispatch('finish');
	};

	let stage: 'questionnaire' | 'end' = 'questionnaire';

	// Define the fade transition settings
	const fadeInParams = {
		delay: 400, // Delay of 200ms for the 'in' transition
		duration: 400 // Duration of the transition (adjust as needed)
	};

	const fadeOutParams = {
		delay: 0, // No delay for the 'out' transition
		duration: 400 // Duration of the transition (adjust as needed)
	};
</script>

<div class="w-full h-full p-8 mx-auto flex flex-col gap-8">
	<div class="flex-grow relative">
		{#if stage === 'questionnaire'}
			<div in:fade={fadeInParams} out:fade={fadeOutParams} class="absolute inset-0">
				<QuestionManager
					{questions}
					{questionsService}
					on:questionnaireDone={handleQuestionnaireDone}
					on:questionnaireAnswer={handleAnswer}
				/>
			</div>
		{:else if stage === 'end'}
			<div
				in:fade={fadeInParams}
				out:fade={fadeOutParams}
				class="absolute inset-0 text-neutral-700 w-full h-full justify-center items-center"
			>
				<div
					class="flex flex-col gap-6 items-center justify-center flex-grow my-auto w-full h-full"
				>
					<h2 class="text-3xl font-bold">{$LL['pt-end']['heading']()}</h2>
					<img
						src={`${base}/end.jpeg`}
						alt="End of the post-trial questionnaire"
						class="h-48 w-auto"
					/>
					<p class="text-lg">{$LL['pt-end'].paragraphs[0]({ points: taskHandler.score })}</p>
					<button
						class="bg-blue-500 text-white px-4 py-3 text-lg mt-1 rounded-md font-semibold hover:bg-blue-600"
						on:click={handleAllDone}
					>
						{$LL['pt-end']['confirm']()}
					</button>
				</div>
			</div>
		{/if}
	</div>
	<InterfaceFooter />
</div>
