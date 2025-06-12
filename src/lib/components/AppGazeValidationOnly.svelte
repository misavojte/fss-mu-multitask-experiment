<script lang="ts">
	import type { GazeManager } from '@473783/develex-core';
	import GazeCalibrationValidation from './GazeCalibrationValidation.svelte';
	import InterfaceFooter from './InterfaceFooter.svelte';
	import type { IConnectLogger } from '$lib/interfaces/IConnectLogger';

	export let gazeManager: GazeManager;
	export let connectLogger: IConnectLogger;
</script>

<div class="w-full h-full p-8 mx-auto flex flex-col gap-8">
	<GazeCalibrationValidation {connectLogger} {gazeManager} on:continue />
	<InterfaceFooter />
</div>
