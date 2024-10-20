<script lang="ts">
	import { Button, Spinner } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher } from 'svelte';

	export let isLoading = false;
	export let locale = {
		connect: 'Připojit',
		loading: 'Připojuji ...'
	};

	const dispatch = createEventDispatcher();

	const handleClick = (e: MouseEvent) => {
		const windowObject = window as any;
		const mouseEventObject = e;
		dispatch('connect', { windowObject, mouseEventObject });
	};
</script>

<Button disabled={isLoading} class="justify-start" type="submit" on:click={handleClick}>
	{#if !isLoading}
		<ArrowRightOutline class="w-4 h-4 me-3" />{locale.connect}
	{:else}
		<Spinner class="me-3" size="4" color="white" />{locale.loading}
	{/if}
</Button>
