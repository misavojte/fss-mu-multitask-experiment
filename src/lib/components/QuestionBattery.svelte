<script lang="ts">
	import { writable } from 'svelte/store';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher, onMount } from 'svelte';
	import type { IQuestionBattery } from '$lib/interfaces/IQuestion';
	import InterfaceProgress from './InterfaceProgress.svelte';
	import QuestionTypeText from './QuestionTypeText.svelte';
	import QuestionTypeInstruction from './QuestionTypeInstruction.svelte';
	import LL from '../../i18n/i18n-svelte';

	export let questions: IQuestionBattery;

	const progressStore = writable(0);
	const dispatch = createEventDispatcher();

	$: questionSingleArray = questions[$progressStore] ? [questions[$progressStore]] : [];

	const handleOnInput = () => {
		// Dispatch the event of the new value
		dispatch('questionnaireAnswer', questionValues[$progressStore]);
		// If no more questionConfig, dispatch the event
		if ($progressStore === questions.length - 1) {
			dispatch('questionnaireDone', questionValues);
			return;
		}
		// If there are more questionConfig, update the progress store
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
	<div class="flex flex-col justify-center items-center row-span-2 w-full">
		<InterfaceProgress currentValue={$progressStore} maxValue={questions.length} />
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
			</div>
		{/each}
	</div>
	<div class="flex justify-center items-center gap-4">
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

<style>
	.battery-layout {
		grid-template-rows: 100px 1fr 100px;
	}
</style>
