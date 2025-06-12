<script lang="ts">
	import { GazeManager } from 'develex-js-sdk';
	import { getContext, onDestroy, onMount } from 'svelte';

	export let id: string;

	const gazeManager = getContext<GazeManager>('gazeManager');

	let element: HTMLElement;
	onMount(() => {
		if (!gazeManager) return;
		gazeManager.register({
			interaction: 'intersect',
			element,
			settings: {
				bufferSize: 50
			}
		});
	});

	onDestroy(() => {
		if (!gazeManager) return;
		gazeManager.unregister({
			interaction: 'intersect',
			element
		});
	});
</script>

<div {id} bind:this={element}>
	<slot />
</div>
