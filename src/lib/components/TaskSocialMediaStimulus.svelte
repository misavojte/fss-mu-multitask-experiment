<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade, type TransitionConfig } from 'svelte/transition';
	import TaskSocialMediaInteractors from './TaskSocialMediaInteractors.svelte';
	import { cubicOut } from 'svelte/easing';
	export let stimulus: {
		src: string;
		id: string;
	} | null = null;
	export let width: number = 300;
	export let heightImage: number = 500;
	export let heightInteractors: number = 150;
	export let noStimulusMessage: string = 'Brzy se zobrazí nový příspěvek!';
	export let socialMediaButtons: Array<{
		text: string;
		id: string;
		color: string;
		textColor: string;
		html?: string;
	}>;

	const dispatch = createEventDispatcher();
	let src: string | null = null;

	$: {
		if (stimulus !== null) {
			src = stimulus.src;
			// Dispatch loaded event immediately since we're using preloaded images
			dispatch('loaded', { id: stimulus.id });
		} else {
			src = null;
		}
	}

	$: totalHeight = heightImage + heightInteractors;

	function fadeZoom(node: HTMLElement, params: { duration?: number } = {}): TransitionConfig {
		const { duration = 300 } = params;

		return {
			duration,
			css: (t: number) => {
				const eased = cubicOut(t);
				return `
          opacity: ${eased};
          transform: scale(${0.5 + 0.5 * eased});
        `;
			}
		};
	}
</script>

<div
	class="w-full relative overflow-hidden bg-gray-200"
	style="width: {width}px; height: {totalHeight}px;"
>
	{#if src === null}
		<div
			class="absolute flex items-center justify-center w-full h-full cursor-not-allowed"
			out:fade={{ duration: 200 }}
			in:fade={{ duration: 200 }}
		>
			<p class="text-gray-500">{noStimulusMessage}</p>
		</div>
	{/if}
	{#if src !== null}
		<div
			class="flex flex-col items-center justify-center w-full h-full"
			out:fade={{ duration: 200 }}
			in:fadeZoom
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
