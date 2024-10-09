<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Question from './Question.svelte';
	import type { IQuestionConfigSelect } from '$lib/interfaces/IQuestion';

	export let question: IQuestionConfigSelect;
	export let value: string = '';

	const dispatch = createEventDispatcher();

	const handleOptionChange = () => {
		dispatch('input');
	};
</script>

<Question questionText={question.headingText} isRequired={question.required}>
	<ul class="flex flex-col">
		{#each question.options as option, optionIndex}
			<li>
				<input
					type="radio"
					id={'option-' + optionIndex}
					name={question.id}
					value={optionIndex.toString()}
					class="hidden peer"
					required
					bind:group={value}
					on:change={handleOptionChange}
					on:click|stopPropagation
				/>
				<label
					for={'option-' + optionIndex}
					class="font-semibold select-none peer block w-96 border-2 border-gray-300 rounded-lg p-4 mb-4 cursor-pointer {value ===
					optionIndex.toString()
						? 'bg-blue-500 text-white'
						: 'bg-white text-gray-600 hover:bg-gray-100'}"
				>
					{option}
				</label>
			</li>
		{/each}
	</ul>
</Question>
