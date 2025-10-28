<script lang="ts">
	import QuestionManager from '$lib/components/QuestionManager.svelte';
	import type { IQuestionBattery, ITimestampQuestionService } from '$lib/interfaces/IQuestion';
	import LL from '../../i18n/i18n-svelte';
	import { createEventDispatcher } from 'svelte';
	import InterfaceFooter from './InterfaceFooter.svelte';
	import { get } from 'svelte/store';

	export let questionsService: ITimestampQuestionService;
	export let priority: 'math' | 'social' | 'none';

	$: showProgress = false;

	const dispatch = createEventDispatcher();

	// Priority-based reminder text generation
	$: priorityReminderText =
		priority === 'math'
			? `Připomínáme, že **matematická úloha je prioritní**.`
			: priority === 'social'
				? `Připomínáme, že **reakce na sociální média je prioritní**.`
				: `Připomínáme, že **žádný úkol není prioritní**.`;

	$: questions = [
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
			paragraphs: [priorityReminderText],
			preliminaryEndAnswer: '0'
		}
	] as IQuestionBattery;

	const handlePreliminaryQuestionnaireDone = async (data: any) => {
		console.log('[DEBUG] handlePreliminaryQuestionnaireDone called');
		dispatch('loading');
		console.log('loading');
		console.log('done');
		dispatch('startTrial');
	};

	const handleQuestionnaireDone = async (data: any) => {
		console.log('[DEBUG] handleQuestionnaireDone called');
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
