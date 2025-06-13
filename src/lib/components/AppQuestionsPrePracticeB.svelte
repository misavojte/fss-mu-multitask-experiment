<script lang="ts">
	import QuestionManager from '$lib/components/QuestionManager.svelte';
	import type { IQuestionBattery, ITimestampQuestionService } from '$lib/interfaces/IQuestion';
	import LL from '../../i18n/i18n-svelte';
	import { createEventDispatcher } from 'svelte';
	import InterfaceFooter from './InterfaceFooter.svelte';
	import { get } from 'svelte/store';

	export let questionsService: ITimestampQuestionService;

	const dispatch = createEventDispatcher();

	let questions: IQuestionBattery = [
		{
			id: '1',
			headingText: $LL['question']['1']['heading'](),
			confirmText: $LL['question']['1']['confirm'](),
			paragraphs: [get(LL).question[1].paragraphs[1]()],
			type: 'instruction',
			required: true
		},
		{
			id: 'linking',
			headingText: $LL.question[3].heading(),
			confirmText: $LL.question[3].confirm(),
			type: 'text',
			required: true
		},
		{
			id: '2',
			headingText: $LL.question['2b'].heading(),
			confirmText: $LL.question['2b'].confirm(),
			type: 'instruction',
			paragraphs: [get(LL).question['2b'].paragraphs[1]()],
			required: true
		},
		{
			id: '4',
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
			id: '5',
			headingText: $LL.question['5b'].heading(),
			confirmText: $LL.question['5b'].confirm(),
			type: 'instruction',
			paragraphs: [get(LL).question['5b'].paragraphs[1](), get(LL).question['5b'].paragraphs[2]()],
			required: true
		},
		{
			id: '6',
			headingText: $LL.question[6].heading(),
			confirmText: $LL.question[6].confirm(),
			type: 'instruction',
			paragraphs: [
				get(LL).question[6].paragraphs[1](),
				get(LL).question[6].paragraphs[2](),
				get(LL).question[6].paragraphs[3](),
				get(LL).question[6].paragraphs[4](),
				get(LL).question[6].paragraphs[5]()
			],
			required: true
		},
		{
			id: '7',
			headingText: $LL.question['7b'].heading(),
			confirmText: $LL.question['7b'].confirm(),
			type: 'instruction',
			paragraphs: [get(LL).question['7b'].paragraphs[1](), get(LL).question['7b'].paragraphs[2]()],
			required: true
		}
	];

	const handleQuestionnaireDone = async (data: any) => {
		dispatch('startPractice');
	};
</script>

<div class="w-full h-full p-8 mx-auto flex flex-col gap-8">
	<QuestionManager {questions} {questionsService} on:questionnaireDone={handleQuestionnaireDone} />
	<InterfaceFooter />
</div>
