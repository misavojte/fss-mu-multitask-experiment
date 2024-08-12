<script lang="ts">
	import { type IQuestionBattery, type ITimestampQuestionService } from '$lib/interfaces/IQuestion';
	import QuestionBattery from './QuestionBattery.svelte';

	export let questionsService: ITimestampQuestionService;
	export let questions: IQuestionBattery;

	const handleQuestionnaireDone = (data: any) => {
		promise = questionsService.saveQuestions(data);
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
			on:questionnaireDone={handleQuestionnaireDone}
			on:questionnaireStart={() => questionsService.startQuestions()}
			on:questionnaireAnswer={(e) =>
				questionsService.saveTimestampQuestion(e.detail.id, e.detail.value)}
		/>
	{/if}
</div>
