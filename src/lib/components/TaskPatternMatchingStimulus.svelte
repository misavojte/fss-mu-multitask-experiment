<script lang="ts">
	import type { ITaskPatternMatchingObject } from '$lib/interfaces/ITaskPatternMatching';
	import { fisherYatesShuffle } from '$lib/utils/shuffle';
	import { createEventDispatcher } from 'svelte';

	export let patternMatchingObject: ITaskPatternMatchingObject;

	$: shuffledResponses = fisherYatesShuffle(patternMatchingObject.responses);

	const dispatch = createEventDispatcher();

	const handleResponseClick = (id: string) => {
		const response = patternMatchingObject.responses.find((response) => response.id === id);
		if (!response) throw new Error('Response not found');
		dispatch('patternMatchingResponseClicked', id);
	};

	let imageLoadedStatus = {
		main: false,
		T1: false,
		T2: false,
		T3: false,
		T4: false
	};
	const handleLoad = (id: 'main' | 'T1' | 'T2' | 'T3' | 'T4') => {
		imageLoadedStatus[id] = true;
		if (Object.values(imageLoadedStatus).every((status) => status)) dispatch('loaded');
	};
</script>

<div class="flex flex-col gap-4 w-auto h-full items-center border p-4">
	<div class="object-cover h-auto custom-container">
		<img
			src={patternMatchingObject.matrixSrc}
			alt="Pattern matching task"
			class="object-cover w-full h-auto"
			on:load={() => handleLoad('main')}
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
					on:load={() => handleLoad(response.id)}
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
