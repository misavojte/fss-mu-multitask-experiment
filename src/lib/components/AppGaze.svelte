<script lang="ts">
	import type { GazeManager } from 'develex-js-sdk';
	import Gaze from './Gaze.svelte';
	import InterfaceFooter from './InterfaceFooter.svelte';
	import type { IConnectLogger } from '$lib/interfaces/IConnectLogger';

	export let gazeManager: GazeManager;
	export let connectLogger: IConnectLogger;
</script>

<div class="w-full h-full p-8 mx-auto flex flex-col gap-8">
	<Gaze {connectLogger} {gazeManager} on:continue />
	<InterfaceFooter />
</div>
