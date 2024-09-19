<script lang="ts">
	import { type IQuestionBattery, type ITimestampQuestionService } from '$lib/interfaces/IQuestion';
	import QuestionBattery from './QuestionBattery.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let questionsService: ITimestampQuestionService;
	export let questions: IQuestionBattery;
	export let showProgress: boolean = true;
	export let showSkip: boolean = false;

	const handleQuestionnaireDone = (data: any) => {
		promise = questionsService.saveQuestions(data);
		dispatch('questionnaireDone');
	};

	let promise: Promise<void> | null = null;
</script>

<div class="w-full h-full grid grow overflow-hidden">
	{#if promise}
		{#await promise}
			<div class="center">
				<p>Loading...</p>
			</div>
		{:then x}
			<div>
				<p>Done!</p>
			</div>
		{:catch e}
			<div>
				<p>Error: {e.message}</p>
			</div>
		{/await}
	{:else}
		<QuestionBattery
			{questions}
			{showProgress}
			{showSkip}
			on:questionnaireDone={handleQuestionnaireDone}
			on:questionnaireStart={() => questionsService.startQuestions()}
			on:questionnaireAnswer={(e) => {
				questionsService.saveTimestampQuestion(e.detail.id, e.detail.value);
				dispatch('questionnaireAnswered', e.detail);
			}}
		/>
	{/if}
</div>
