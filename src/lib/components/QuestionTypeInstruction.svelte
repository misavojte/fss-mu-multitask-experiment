<script lang="ts">
	import Question from './Question.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { IQuestionConfigInstruction } from '$lib/interfaces/IQuestion';

	export let question: IQuestionConfigInstruction;
	const dispatch = createEventDispatcher();
	const handleClick = () => {
		value = true;
		dispatch('input');
	};

	export let value: boolean = false;

	function convertMarkdownToHtml(markdown: string): string {
		// Convert bold (**) to <strong>
		let html = markdown.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

		// Convert italics (*) to <em>
		html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

		// Convert unordered list (-) to <ul> and <li>
		html = html.replace(/^\s*-\s+(.*?)(\n|$)/gm, '<li>$1</li>');

		// Wrap <li> elements with <ul> if they are found
		if (html.includes('<li>')) {
			html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
		}

		return html;
	}

	// Split the string into an array of strings // iterate through each in the array
	const paragraphs = question.paragraphs.map(convertMarkdownToHtml);
</script>

<Question questionText={question.headingText}>
	<form class="flex flex-col gap-8">
		{#if question.paragraphs.length > 0}
			<ul class="text-neutral-700 w-full flex flex-col gap-4 overflow-auto max-w-screen-md mx-auto">
				{#each paragraphs as paragraph}
					<li class="md-converted-content md:text-lg">
						{@html paragraph}
					</li>
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
			class="bg-blue-500 text-white font-bold rounded-md p-4 cursor-pointer w-fit mx-auto transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-blue-600 transform"
			>{question.confirmText}</button
		>
	</form>
</Question>

<style>
	.md-converted-content :global(ul) {
		list-style-type: disc;
		padding-left: 1rem;
	}
	.md-converted-content :global(li) {
		margin-left: 1rem;
	}
	.md-converted-content :global(strong) {
		font-weight: 700;
	}
	.md-converted-content :global(em) {
		font-style: italic;
	}
</style>
