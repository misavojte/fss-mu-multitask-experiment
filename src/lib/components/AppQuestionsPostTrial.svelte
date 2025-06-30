<script lang="ts">
	import LL from '../../i18n/i18n-svelte';
	import { createEventDispatcher } from 'svelte';
	import InterfaceFooter from './InterfaceFooter.svelte';
	import type { ATaskHandler } from '$lib/interfaces/ITaskHandler';
	import { base } from '$app/paths';

	export let taskHandler: ATaskHandler;

	const dispatch = createEventDispatcher();
	const handleAllDone = () => {
		dispatch('finish');
	};
</script>

<div class="w-full h-full p-8 mx-auto flex flex-col gap-8">
	<div class="flex-grow relative">
		<div class="flex flex-col gap-6 items-center justify-center flex-grow my-auto w-full h-full">
			<h2 class="text-3xl font-bold">{$LL['pt-end']['heading']()}</h2>
			<img src={`${base}/end.jpeg`} alt="End of the post-trial questionnaire" class="h-48 w-auto" />
			<div class="text-lg text-center space-y-2">
				<p>{$LL['pt-end'].paragraphs[0]()}</p>
				<p>
					{$LL['pt-end'].paragraphs[1]({
						socialMediaPoints: taskHandler.socialMediaScore,
						socialMediaDisplayed: taskHandler.socialMediaStimuliDisplayedCount
					})}
				</p>
				<p>{$LL['pt-end'].paragraphs[2]()}</p>
			</div>
			<button
				class="bg-blue-500 text-white px-4 py-3 text-lg mt-1 rounded-md font-semibold hover:bg-blue-600"
				on:click={handleAllDone}
			>
				{$LL['pt-end']['confirm']()}
			</button>
		</div>
	</div>
	<InterfaceFooter />
</div>

<style>
	.md-converted-content :global(ul) {
		list-style-type: disc;
		padding-left: 1rem;
		margin: 1rem 0;
	}
	.md-converted-content :global(li) {
		margin-left: 1rem;
		margin-bottom: 0.5rem;
	}
	.md-converted-content :global(strong) {
		font-weight: 700;
	}
	.md-converted-content :global(em) {
		font-style: italic;
	}
</style>
