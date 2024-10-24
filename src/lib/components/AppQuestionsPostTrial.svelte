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
				$LL.question['pt-2'].options[0](),
				$LL.question['pt-2'].options[1](),
				$LL.question['pt-2'].options[2]()
			],
			required: true
		},
		{
			id: 'pt-3',
			headingText: $LL.question['pt-3'].heading(),
			type: 'select',
			options: [
				$LL.question['pt-3'].options[0](),
				$LL.question['pt-3'].options[1](),
				$LL.question['pt-3'].options[2]()
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
		dispatch('startPractice');
	};
</script>

<div class="w-full h-full p-8 mx-auto flex flex-col gap-8">
	<QuestionManager {questions} {questionsService} on:questionnaireDone={handleQuestionnaireDone} />
	<InterfaceFooter />
</div>
