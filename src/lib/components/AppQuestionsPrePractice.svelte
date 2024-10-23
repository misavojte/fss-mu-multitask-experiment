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
			headingText: $LL.question[2].heading(),
			confirmText: $LL.question[2].confirm(),
			type: 'instruction',
			paragraphs: [get(LL).question[2].paragraphs[1]()],
			required: true
		},
		{
			id: '4',
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
			id: '5',
			headingText: $LL.question[5].heading(),
			confirmText: $LL.question[5].confirm(),
			type: 'instruction',
			paragraphs: [get(LL).question[5].paragraphs[1](), get(LL).question[5].paragraphs[2]()],
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
				get(LL).question[6].paragraphs[3]()
			],
			required: true
		},
		{
			id: '7',
			headingText: $LL.question[7].heading(),
			confirmText: $LL.question[7].confirm(),
			type: 'instruction',
			paragraphs: [get(LL).question[7].paragraphs[1](), get(LL).question[7].paragraphs[2]()],
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
