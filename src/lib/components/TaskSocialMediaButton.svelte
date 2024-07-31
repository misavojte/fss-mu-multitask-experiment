<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let text: string;
	export let id: string;
	const dispatch = createEventDispatcher();
	const handleClick = () => {
		dispatch('click', { id, timestamp: Date.now() });
	};
</script>

<button
	{id}
	class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
	on:click={handleClick}
>
	{text}
</button>
