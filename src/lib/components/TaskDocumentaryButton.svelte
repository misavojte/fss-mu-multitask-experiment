<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { waitForTimeout } from '$lib/utils/waitForCondition';

	const dispatch = createEventDispatcher();

	export let wordOccurence: string = 'SLOVO';

	let isClicked = false;
	const handleClick = async (e: MouseEvent) => {
		isClicked = true;
		dispatch('click', e);
		await waitForTimeout(100);
		isClicked = false;
	};
</script>

<div class="absolute bottom-0 w-fit flex justify-center m-4">
	<button
		class="z-20 relative transition-transform ease-in-out duration-100 bottom-0 px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
		class:clicked={isClicked}
		on:click={handleClick}
	>
		Slyšel/a jsem slovo <i>{wordOccurence}</i>
	</button>
</div>

<style>
	.clicked {
		transform: scale(0.95);
	}
</style>
