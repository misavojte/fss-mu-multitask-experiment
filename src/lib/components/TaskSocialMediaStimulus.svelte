<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	export let stimulus: {
		src: string;
		id: string;
	} | null = null;
	export let width: number = 300;
	export let height: number = 500;
	export let noStimulusMessage: string = 'No stimulus shown';

	const dispatch = createEventDispatcher();
	let src: string | null = null;

	$: {
		if (stimulus !== null) {
			const img = new Image();
			img.src = stimulus.src;
			img.onload = () => {
				dispatch('loaded', { id: stimulus.id });
				src = stimulus.src;
			};
		} else {
			src = null;
		}
	}
</script>

<div
	class="w-full relative overflow-hidden border-t border-b border-gray-200"
	style="width: {width}px; height: {height}px;"
>
	{#if src === null}
		<div
			class="absolute flex items-center justify-center w-full h-full bg-gray-50"
			out:fly={{ y: height, duration: 500, opacity: 1 }}
			in:fly={{ y: -height, duration: 500, opacity: 1 }}
		>
			<p class="text-gray-500">{noStimulusMessage}</p>
		</div>
	{/if}
	{#if src !== null}
		<div
			class="absolute flex items-center justify-center w-full h-full bg-gray-50"
			out:fly={{ y: height, duration: 500, opacity: 1 }}
			in:fly={{ y: -height, duration: 500, opacity: 1 }}
		>
			<img {src} alt="Stimulus" class="object-cover w-full h-full" />
		</div>
	{/if}
</div>
