<script lang="ts">
	import type { GazeManager } from '@473783/develex-core';
	import { createEventDispatcher } from 'svelte';

	export let gazeManager: GazeManager;

	const dispatch = createEventDispatcher();
</script>
