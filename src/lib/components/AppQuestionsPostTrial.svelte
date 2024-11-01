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
			<p class="text-lg">{$LL['pt-end'].paragraphs[0]({ points: taskHandler.score })}</p>
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
