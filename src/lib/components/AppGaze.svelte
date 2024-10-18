<script lang="ts">
	import type { GazeManager } from '@473783/develex-core';
	import Gaze from './Gaze.svelte';
	import InterfaceFooter from './InterfaceFooter.svelte';

	export let gazeManager: GazeManager;
</script>

<div class="w-full h-full p-8 mx-auto flex flex-col gap-8">
	<Gaze {gazeManager} on:continue />
	<InterfaceFooter />
</div>
