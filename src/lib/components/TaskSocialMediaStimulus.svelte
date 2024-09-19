<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly } from 'svelte/transition';
	import TaskSocialMediaInteractors from './TaskSocialMediaInteractors.svelte';
	export let stimulus: {
		src: string;
		id: string;
	} | null = null;
	export let width: number = 300;
	export let heightImage: number = 500;
	export let heightInteractors: number = 150;
	export let noStimulusMessage: string = 'Žádné novinky k zobrazení';
	export let socialMediaButtons: Array<{
		text: string;
		id: string;
	}>;

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

	$: totalHeight = heightImage + heightInteractors;
</script>

<div
	class="w-full relative overflow-hidden bg-gray-200"
	style="width: {width}px; height: {totalHeight}px;"
>
	{#if src === null}
		<div
			class="absolute flex items-center justify-center w-full h-full cursor-not-allowed"
			out:fly={{ y: totalHeight, duration: 500, opacity: 1 }}
			in:fly={{ y: -totalHeight, duration: 500, opacity: 1 }}
		>
			<p class="text-gray-500">{noStimulusMessage}</p>
		</div>
	{/if}
	{#if src !== null}
		<div
			class="flex flex-col items-center justify-center w-full h-full"
			out:fly={{ y: totalHeight, duration: 500, opacity: 1 }}
			in:fly={{ y: -totalHeight, duration: 500, opacity: 1 }}
		>
			<img
				{src}
				alt="Stimulus"
				class="object-cover w-full h-full bg-gray-100 rounded-3xl border border-gray-300"
			/>
			<TaskSocialMediaInteractors {socialMediaButtons} height={heightInteractors} on:click />
		</div>
	{/if}
</div>
