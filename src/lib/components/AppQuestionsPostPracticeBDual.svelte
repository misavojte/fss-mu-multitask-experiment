<script lang="ts">
	import QuestionManager from '$lib/components/QuestionManager.svelte';
	import type { IQuestionBattery, ITimestampQuestionService } from '$lib/interfaces/IQuestion';
	import LL from '../../i18n/i18n-svelte';
	import { createEventDispatcher } from 'svelte';
	import InterfaceFooter from './InterfaceFooter.svelte';
	import { get } from 'svelte/store';

	export let questionsService: ITimestampQuestionService;

	$: showProgress = false;

	const dispatch = createEventDispatcher();

	let questions: IQuestionBattery = [
		{
			id: 'ap-1',
			headingText: $LL.question['ap-1'].heading(),
			type: 'select',
			options: [
				{
					id: '0',
					label: $LL.question['ap-1'].options[0]()
				},
				{
					id: '1',
					label: $LL.question['ap-1'].options[1]()
				}
			],
			required: true,
			paragraphs: [$LL.reminder.even()],
			preliminaryEndAnswer: '0'
		},
		{
			id: 'ap-2',
			headingText: $LL.question['2b-dual'].heading(),
			confirmText: $LL.question['2b-dual'].confirm(),
			type: 'instruction',
			paragraphs: [get(LL).question['2b-dual'].paragraphs[1]()],
			required: true
		},
		{
			id: 'ap-4',
			headingText: $LL.question['4b'].heading(),
			confirmText: $LL.question['4b'].confirm(),
			type: 'instruction',
			paragraphs: [
				get(LL).question['4b'].paragraphs[1](),
				get(LL).question['4b'].paragraphs[2](),
				get(LL).question['4b'].paragraphs[3]()
			],
			required: true
		},
		{
			id: 'ap-6',
			headingText: $LL.question['6-dual'].heading(),
			confirmText: $LL.question['6-dual'].confirm(),
			type: 'instruction',
			paragraphs: [
				get(LL).question['6-dual'].paragraphs[1](),
				get(LL).question['6-dual'].paragraphs[2](),
				get(LL).question['6-dual'].paragraphs[3]()
			],
			required: true
		},
		{
			id: 'ap-7',
			headingText: $LL.question['7b-dual'].heading(),
			confirmText: $LL.question['7b-dual'].confirm(),
			type: 'instruction',
			paragraphs: [
				get(LL).question['7b-dual'].paragraphs[1](),
				get(LL).question['7b-dual'].paragraphs[2]()
			],
			required: true
		}
	];

	const handlePreliminaryQuestionnaireDone = async (data: any) => {
		dispatch('loading');
		console.log('loading');
		console.log('done');
		dispatch('startTrial');
	};

	const handleQuestionnaireDone = async (data: any) => {
		dispatch('loading');
		console.log('loading');
		console.log('done');
		dispatch('startPractice');
	};

	const handleQuestionnaireAnswer = (data: CustomEvent) => {
		// if ap-1, switch to showProgress
		console.log(data.detail);
		if (data.detail.id === 'ap-1') {
			showProgress = true;
		}
	};
</script>

<div class="w-full h-full p-8 mx-auto flex flex-col gap-8">
	<QuestionManager
		{questions}
		{questionsService}
		{showProgress}
		on:questionnairePreliminaryEnd={handlePreliminaryQuestionnaireDone}
		on:questionnaireDone={handleQuestionnaireDone}
		on:questionnaireAnswer={handleQuestionnaireAnswer}
	/>
	<InterfaceFooter />
</div>
