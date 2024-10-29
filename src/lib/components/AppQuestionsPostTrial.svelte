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

	export let questionsService: ITimestampQuestionService;

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
		...randomize(questionToRandomize),
		{
			id: 'pt-end',
			headingText: $LL['question']['pt-end']['heading'](),
			confirmText: $LL['question']['pt-end']['confirm'](),
			type: 'instruction',
			paragraphs: [
				$LL['question']['pt-end'].paragraphs[0](),
				$LL['question']['pt-end'].paragraphs[1]()
			],
			required: true
		}
	];

	const handleQuestionnaireDone = async (data: any) => {
		dispatch('finish');
	};

	const handleAnswer = (data: CustomEvent<{ id: string; answer: string }>) => {
		//questionsService.addAnswer(data.detail.id, data.detail.answer);

		if (data.detail.id === 'pt-3' || data.detail.id === 'pt-2') {
			const answer = data.detail.answer;
		}
	};
</script>

<div class="w-full h-full p-8 mx-auto flex flex-col gap-8">
	<QuestionManager
		{questions}
		{questionsService}
		on:questionnaireDone={handleQuestionnaireDone}
		on:questionnaireAnswer={handleAnswer}
	/>
	<InterfaceFooter />
</div>
