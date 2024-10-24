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
			options: [$LL.question['ap-1'].options[0](), $LL.question['ap-1'].options[1]()],
			required: true,
			preliminaryEndAnswer: '0'
		},
		{
			id: 'ap-2',
			headingText: $LL.question[2].heading(),
			confirmText: $LL.question[2].confirm(),
			type: 'instruction',
			paragraphs: [get(LL).question[2].paragraphs[1]()],
			required: true
		},
		{
			id: 'ap-4',
			headingText: $LL.question[4].heading(),
			confirmText: $LL.question[4].confirm(),
			type: 'instruction',
			paragraphs: [
				get(LL).question[4].paragraphs[1](),
				get(LL).question[4].paragraphs[2](),
				get(LL).question[4].paragraphs[3]()
			],
			required: true
		},
		{
			id: 'ap-5',
			headingText: $LL.question[5].heading(),
			confirmText: $LL.question[5].confirm(),
			type: 'instruction',
			paragraphs: [get(LL).question[5].paragraphs[1](), get(LL).question[5].paragraphs[2]()],
			required: true
		},
		{
			id: 'ap-6',
			headingText: $LL.question[6].heading(),
			confirmText: $LL.question[6].confirm(),
			type: 'instruction',
			paragraphs: [get(LL).question[6].paragraphs[1](), get(LL).question[6].paragraphs[2]()],
			required: true
		},
		{
			id: 'ap-7',
			headingText: $LL.question['7'].heading(),
			confirmText: $LL.question['7'].confirm(),
			type: 'instruction',
			paragraphs: [get(LL).question['7'].paragraphs[1](), get(LL).question['7b'].paragraphs[2]()],
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
