<script lang="ts">
	import { writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { IQuestionBattery } from '$lib/interfaces/IQuestion';
	import InterfaceProgress from './InterfaceProgress.svelte';
	import QuestionTypeText from './QuestionTypeText.svelte';
	import QuestionTypeInstruction from './QuestionTypeInstruction.svelte';
	import LL from '../../i18n/i18n-svelte';
	import QuestionTypeSelect from './QuestionTypeSelect.svelte';

	export let questions: IQuestionBattery;
	export let showProgress: boolean = true;
	export let showSkip: boolean = true;

	const progressStore = writable(0);
	const dispatch = createEventDispatcher();

	$: questionSingleArray = questions[$progressStore] ? [questions[$progressStore]] : [];

	const handleOnInput = () => {
		// Dispatch the event of the new value
		dispatch('questionnaireAnswer', questionValues[$progressStore]);

		const currentQuestion = questions[$progressStore];
		const currentAnswer = questionValues[$progressStore].value;

		// Check for preliminary end condition
		if (
			currentQuestion.preliminaryEndAnswer &&
			currentAnswer === currentQuestion.preliminaryEndAnswer
		) {
			dispatch('questionnairePreliminaryEnd', questionValues);
			return; // Stop further progression
		}

		// If no more questions, dispatch the questionnaireDone event
		if ($progressStore === questions.length - 1) {
			dispatch('questionnaireDone', questionValues);
			return;
		}

		// Proceed to the next question
		lastChangeDirection = 1;
		progressStore.update((value) => value + 1);
	};

	const handleGoBack = () => {
		lastChangeDirection = -1;
		progressStore.update((value) => value - 1);
	};

	$: lastChangeDirection = 1; // 1 for forward, -1 for backward

	const questionValues = questions.map((question) => {
		return {
			id: question.id,
			value: '',
			required: question.required
		};
	});

	const inAnimationXValue = () => {
		return 100 * lastChangeDirection;
	};

	const outAnimationXValue = () => {
		return -100 * lastChangeDirection;
	};

	const shouldSkipBeDisabledFn = () => {
		if (!questionValues[$progressStore].required) return false;
		return questionValues[$progressStore].value === '';
	};

	let shouldSkipBeDisabled = true;

	progressStore.subscribe((value) => {
		shouldSkipBeDisabled = shouldSkipBeDisabledFn();
	});

	onMount(() => {
		shouldSkipBeDisabled = shouldSkipBeDisabledFn();
		dispatch('questionnaireStart', questionValues);
	});
</script>

<div class="w-full h-full flex flex-col gap-8 battery-layout">
	<div class="flex flex-col justify-center items-center row-span-2 w-full h-8">
		{#if showProgress}
			<div class="w-full flex justify-center items-center" transition:fade>
				<InterfaceProgress currentValue={$progressStore} maxValue={questions.length} />
			</div>
		{/if}
	</div>
	<div
		class="justify-center items-center relative grid grid-rows-1 grid-cols-1 overflow-hidden grow"
	>
		{#each questionSingleArray as question (question.id)}
			<div
				in:fly={{ delay: 500, x: inAnimationXValue() }}
				out:fly={{ delay: 150, x: outAnimationXValue() }}
				class=" w-full top-0 left-0 h-full row-start-1 row-end-2 col-start-1 col-end-2"
			>
				{#if question.type === 'text'}
					<QuestionTypeText
						{question}
						on:input={handleOnInput}
						bind:value={questionValues[$progressStore].value}
					/>
				{/if}
				{#if question.type === 'instruction'}
					<QuestionTypeInstruction
						{question}
						on:input={handleOnInput}
						bind:value={questionValues[$progressStore].value}
					/>
				{/if}
				{#if question.type === 'select'}
					<QuestionTypeSelect
						{question}
						on:input={handleOnInput}
						bind:value={questionValues[$progressStore].value}
					/>
				{/if}
			</div>
		{/each}
	</div>
	<div class="h-8">
		{#if showSkip}
			<div class="flex justify-center items-center gap-4" transition:fade>
				<button
					class="border-0 text-neutral-700 text-sm disabled:text-neutral-300 disabled:cursor-not-allowed transition-colors"
					on:click={handleGoBack}
					disabled={$progressStore === 0}
				>
					{$LL.question.battery.back()}
				</button>
				<button
					class="border-0 blue-button text-sm text-neutral-700 disabled:text-neutral-300 disabled:cursor-not-allowed transition-colors"
					on:click={handleOnInput}
					disabled={shouldSkipBeDisabled}
				>
					{$LL.question.battery.next()}
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.battery-layout {
		grid-template-rows: 100px 1fr 100px;
	}
</style>
