<script lang="ts">
	import Question from './Question.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { IQuestionConfigInstruction } from '$lib/interfaces/IQuestion';

	export let question: IQuestionConfigInstruction;
	const dispatch = createEventDispatcher();
	const handleClick = () => {
		value = 'true';
		dispatch('input');
	};

	export let value: string;
</script>

<Question questionText={question.headingText}>
	<form class="flex flex-col gap-8">
		{#if question.paragraphs.length > 0}
			<ul class="text-neutral-700 w-full flex flex-col gap-4 overflow-auto max-w-screen-md mx-auto">
				{#each question.paragraphs as paragraph}
					<li>{paragraph}</li>
				{/each}
			</ul>
		{/if}
		<input
			type="checkbox"
			id={question.id}
			name={question.id}
			required
			class="hidden"
			bind:checked={value}
		/>
		<button
			on:click|preventDefault={handleClick}
			class="{value
				? 'bg-blue-500'
				: 'bg-neutral-300 hover:bg-neutral-400'} text-white font-bold rounded-md p-4 cursor-pointer w-fit mx-auto transition-colors"
			>{question.confirmText}</button
		>
	</form>
</Question>
