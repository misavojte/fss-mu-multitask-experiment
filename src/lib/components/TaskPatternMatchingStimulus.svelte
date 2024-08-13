<script lang="ts">
	import type { ITaskPatternMatchingObject } from '$lib/interfaces/ITaskPatternMatching';
	import { createEventDispatcher } from 'svelte';

	export let patternMatchingObject: ITaskPatternMatchingObject;

	const shuffledResponses = patternMatchingObject.responses.sort(() => Math.random() - 0.5);

	const dispatch = createEventDispatcher();

	const handleResponseClick = (id: string) => {
		const response = patternMatchingObject.responses.find((response) => response.id === id);
		if (!response) throw new Error('Response not found');
		dispatch('patternMatchingResponseClicked', response);
	};
</script>

<div class="flex flex-col gap-4 w-full h-full items-center">
	<div class="object-cover h-auto custom-container">
		<img
			src={patternMatchingObject.matrixSrc}
			alt="Pattern matching task"
			class="object-cover w-full h-auto"
		/>
	</div>
	<div class="flex gap-4 w-full justify-center">
		{#each shuffledResponses as response}
			<button
				class="border border-gray-200 rounded-md custom-button overflow-hidden box-content transition-all hover:bg-gray-300"
				on:click={() => handleResponseClick(response.id)}
			>
				<img
					src={response.src}
					alt="Pattern matching task"
					class="w-full peer transition-all hover:opacity-75"
				/>
			</button>
		{/each}
	</div>
</div>

<style>
	.custom-button {
		width: 20%;
	}
	.custom-container {
		width: 59.32%;
	}
</style>
