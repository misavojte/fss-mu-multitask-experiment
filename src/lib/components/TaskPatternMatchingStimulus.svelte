<script lang="ts">
	import type { ITaskPatternMatchingObject } from '$lib/interfaces/ITaskHandler';
	import { fisherYatesShuffle } from '$lib/utils/shuffle';
	import { createEventDispatcher, onMount } from 'svelte';

	export let patternMatchingObject: ITaskPatternMatchingObject;

	$: shuffledResponses = fisherYatesShuffle<ITaskPatternMatchingObject['responses'][0]>(
		patternMatchingObject.responses
	);

	const dispatch = createEventDispatcher();

	const handleResponseClick = (e: MouseEvent, id: string) => {
		const response = patternMatchingObject.responses.find((response) => response.id === id);
		if (!response) throw new Error('Response not found');
		dispatch('patternMatchingResponseClicked', {
			e,
			response: response.id
		});
	};

	let imageLoadedStatus = {};
	onMount(() => {
		imageLoadedStatus = {
			main: false,
			...Object.fromEntries(shuffledResponses.map((response) => [response.id, false]))
		};
		if (patternMatchingObject.type === 'text') {
			dispatch('loaded');
		}
	});

	const handleLoad = (id: 'main' | string) => {
		imageLoadedStatus = { ...imageLoadedStatus, [id]: true };
		if (Object.values(imageLoadedStatus).every((status) => status)) dispatch('loaded');
	};
</script>

<div class="flex flex-col gap-4 w-auto h-full items-center border p-4 text-neutral-500">
	<div class="object-cover h-auto custom-container flex justify-center items-center aspect-square">
		{#if patternMatchingObject.type === 'image'}
			<img
				src={patternMatchingObject.matrixSrc}
				alt="Pattern matching task"
				class="object-cover w-full h-auto"
				on:load={() => handleLoad('main')}
			/>
		{:else if patternMatchingObject.type === 'text'}
			<p class="text-center text-3xl font-semibold select-none">
				{patternMatchingObject.matrixContent}
			</p>
		{/if}
	</div>
	<div class="flex gap-4 w-full justify-center">
		{#each shuffledResponses as response, i}
			<button
				class="border border-gray-200 rounded-md custom-button overflow-hidden box-content transition-all hover:bg-gray-300 aspect-square"
				on:click={(e) => handleResponseClick(e, response.id)}
			>
				{#if patternMatchingObject.type === 'image'}
					<img
						src={patternMatchingObject.responses[i].src}
						alt="Pattern matching task"
						class="w-full peer transition-all hover:opacity-75"
						on:load={() => handleLoad(response.id)}
					/>
				{:else if patternMatchingObject.type === 'text'}
					<p class="text-center text-2xl font-semibold select-none">
						{patternMatchingObject.responses[i].content}
					</p>
				{/if}
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
