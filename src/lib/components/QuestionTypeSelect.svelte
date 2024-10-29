<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Question from './Question.svelte';
	import type { IQuestionConfigSelect } from '$lib/interfaces/IQuestion';

	export let question: IQuestionConfigSelect;
	export let value: string = '';

	const dispatch = createEventDispatcher();

	const handleOptionChange = () => {
		dispatch('input', value);
	};

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
	const paragraphs = question.paragraphs ? question.paragraphs.map(convertMarkdownToHtml) : [];
</script>

<Question questionText={question.headingText} isRequired={question.required}>
	{#if paragraphs.length > 0}
		<ul
			class="text-neutral-700 w-full flex flex-col gap-4 overflow-auto max-w-screen-md mx-auto mb-2 text-center"
		>
			{#each paragraphs as paragraph}
				<li class="md-converted-content">
					{@html paragraph}
				</li>
			{/each}
		</ul>
	{/if}
	<ul class="flex flex-col">
		{#each question.options as option}
			<li>
				<input
					type="radio"
					id={'option-' + option.id}
					name={question.id}
					value={option.id.toString()}
					class="hidden peer"
					required
					bind:group={value}
					on:change={handleOptionChange}
					on:click|stopPropagation
				/>
				<label
					for={'option-' + option.id}
					class="font-semibold select-none peer block w-96 border-2 border-gray-300 rounded-lg p-4 mb-4 cursor-pointer {value ===
					option.id.toString()
						? 'bg-blue-500 text-white'
						: 'bg-white text-gray-600 hover:bg-gray-100'}"
				>
					{option.label}
				</label>
			</li>
		{/each}
	</ul>
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
