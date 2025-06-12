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
			id: 'presingle-1',
			headingText: $LL['presingle-1']['heading'](),
			confirmText: $LL['presingle-1']['confirm'](),
			paragraphs: [get(LL)['presingle-1'].paragraphs[1]()],
			type: 'instruction',
			required: true
		},
		{
			id: 'presingle-2',
			headingText: $LL['presingle-2']['heading'](),
			confirmText: $LL['presingle-2']['confirm'](),
			paragraphs: [get(LL)['presingle-2'].paragraphs[1]()],
			type: 'instruction',
			required: true
		}
	];

	const handleQuestionnaireDone = async (data: any) => {
		dispatch('startSingle');
	};
</script>

<div class="w-full h-full p-8 mx-auto flex flex-col gap-8">
	<QuestionManager {questions} {questionsService} on:questionnaireDone={handleQuestionnaireDone} />
	<InterfaceFooter />
</div>
