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

<div class="w-full h-full relative">
	<div
		class="w-full h-full grid absolute top-0 left-0"
		class:battery-layout-full={showProgress && showSkip}
		class:battery-layout-progress-only={showProgress && !showSkip}
		class:battery-layout-skip-only={!showProgress && showSkip}
		class:battery-layout-content-only={!showProgress && !showSkip}
	>
		{#if showProgress}
			<div class="grid place-items-center w-full h-8">
				<div class="grid place-items-center w-full" transition:fade>
					<InterfaceProgress currentValue={$progressStore} maxValue={questions.length} />
				</div>
			</div>
		{/if}
		<div class="grid place-items-center relative grid-rows-1 grid-cols-1 overflow-hidden">
			{#each questionSingleArray as question (question.id)}
				<div
					in:fly={{ delay: 500, x: inAnimationXValue() }}
					out:fly={{ delay: 150, x: outAnimationXValue() }}
					class=" w-full top-0 left-0 h-full row-start-1 row-end-2 col-start-1 col-end-2 scroll-y-auto"
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
		{#if showSkip}
			<div class="h-8">
				<div class="grid grid-cols-2 place-items-center gap-4" transition:fade>
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
			</div>
		{/if}
	</div>
</div>

<style>
	.battery-layout-full {
		grid-template-rows: auto 1fr auto;
	}

	.battery-layout-progress-only {
		grid-template-rows: auto 1fr;
	}

	.battery-layout-skip-only {
		grid-template-rows: 1fr auto;
	}

	.battery-layout-content-only {
		grid-template-rows: 1fr;
	}
</style>
