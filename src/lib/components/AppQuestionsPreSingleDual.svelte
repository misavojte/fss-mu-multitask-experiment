<script lang="ts">
	import QuestionManager from '$lib/components/QuestionManager.svelte';
	import type { IQuestionBattery, ITimestampQuestionService } from '$lib/interfaces/IQuestion';
	import type { ATaskHandler } from '$lib/interfaces/ITaskHandler';
	import LL from '../../i18n/i18n-svelte';
	import { createEventDispatcher } from 'svelte';
	import InterfaceFooter from './InterfaceFooter.svelte';
	import { get } from 'svelte/store';

	export let questionsService: ITimestampQuestionService;
	export let taskHandler: ATaskHandler;

	const dispatch = createEventDispatcher();

	let questions: IQuestionBattery = [
		{
			id: 'presingle-1',
			headingText: get(LL).question['presingle-1']['heading'](),
			confirmText: get(LL).question['presingle-1']['confirm'](),
			paragraphs: [
				get(LL).question['presingle-1'].paragraphs['1'](),
				get(LL).question['presingle-1'].paragraphs['2']({
					patternMatchingPoints: taskHandler.patternMatchingScore,
					maxPatternMatchingPoints: taskHandler.maxPatternMatchingScore
				}),
				get(LL).question['presingle-1'].paragraphs['4']({
					socialMediaPoints: taskHandler.socialMediaScore,
					maxSocialMediaPoints: taskHandler.maxSocialMediaScore
				}),
				get(LL).question['presingle-1'].paragraphs['5']()
			],
			type: 'instruction',
			required: true
		},
		{
			id: 'presingle-2',
			headingText: $LL.question['presingle-2']['heading'](),
			confirmText: $LL.question['presingle-2']['confirm'](),
			paragraphs: [
				get(LL).question['presingle-2'].paragraphs['1'](),
				get(LL).question['presingle-2'].paragraphs['2'](),
				get(LL).question['presingle-2'].paragraphs['3'](),
				get(LL).question['presingle-2'].paragraphs['4'](),
				get(LL).question['presingle-2'].paragraphs['5'](),
				get(LL).question['presingle-2'].paragraphs['6']()
			],
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
