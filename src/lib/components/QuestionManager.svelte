<script lang="ts">
	import { type IQuestionBattery, type ITimestampQuestionService } from '$lib/interfaces/IQuestion';
	import QuestionBattery from './QuestionBattery.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let questionsService: ITimestampQuestionService;
	export let questions: IQuestionBattery;
	export let showProgress: boolean = true;
	export let showSkip: boolean = false;

	const saveData = (data: any) => {
		promise = questionsService.saveQuestions(data);
	};

	const handleQuestionnaireDone = (data: any) => {
		saveData(data);
		dispatch('questionnaireDone');
	};

	const handleQuestionnairePreliminaryEnd = (data: any) => {
		saveData(data);
		dispatch('questionnairePreliminaryEnd');
	};

	let promise: Promise<void> | null = null;
</script>

<div class="w-full h-full grid grow overflow-hidden">
	<!-- 	{#if promise}
		<div class="relative w-full h-full flex justify-center items-center">
			{#await promise}
				<div class="center absolute" transition:fade>
					<p>Loading...</p>
				</div>
			{:then x}
				<div class="center absolute" transition:fade>
					<p>Done!</p>
				</div>
			{:catch e}
				<div class="center absolute" transition:fade>
					<p>Error: {e.message}</p>
				</div>
			{/await}
		</div>
	{:else}
		<QuestionBattery
			{questions}
			{showProgress}
			{showSkip}
			on:questionnaireDone={handleQuestionnaireDone}
			on:questionnaireStart={() => questionsService.startQuestions()}
			on:questionnaireAnswer={(e) => {
				questionsService.saveTimestampQuestion(e.detail.id, e.detail.value);
				dispatch('questionnaireAnswer', e.detail);
			}}
			on:questionnairePreliminaryEnd={handleQuestionnairePreliminaryEnd}
		/>
	{/if} -->
	<QuestionBattery
		{questions}
		{showProgress}
		{showSkip}
		on:questionnaireDone={handleQuestionnaireDone}
		on:questionnaireStart={() => questionsService.startQuestions()}
		on:questionnaireAnswer={(e) => {
			questionsService.saveTimestampQuestion(e.detail.id, e.detail.value);
			dispatch('questionnaireAnswer', e.detail);
		}}
		on:questionnairePreliminaryEnd={handleQuestionnairePreliminaryEnd}
	/>
</div>
