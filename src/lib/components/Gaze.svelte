<script lang="ts">
	import type { GazeManager } from 'develex-js-sdk';
	import { createEventDispatcher } from 'svelte';
	import GazeValidate from '$lib/components/GazeValidate.svelte';
	import GazeConnect from '$lib/components/GazeConnect.svelte';
	import { fade } from 'svelte/transition';
	import GazeCheck from '$lib/components/GazeCheck.svelte';
	import GazeFullscreenCheck from '$lib/components/GazeFullscreenCheck.svelte';
	import type { IConnectLogger } from '$lib/interfaces/IConnectLogger';

	export let gazeManager: GazeManager;
	export let connectLogger: IConnectLogger;

	let stage: 'fullscreen-check' | 'connect' | 'validate' | 'check' = 'fullscreen-check';

	const dispatch = createEventDispatcher();

	type GazeValidationMetrics = {
		accuracy: number;
		precision: number;
		gazePointCount: number;
	};

	type GazeValidationResult = Record<
		'topleft' | 'middle' | 'bottomright' | 'topright' | 'topmiddle',
		GazeValidationMetrics
	>;

	let validationResult: GazeValidationResult | null = null;

	const handleGazeValidationDone = (e: CustomEvent<GazeValidationResult>) => {
		validationResult = e.detail;
		stage = 'check';
	};
</script>

<div class="relative w-full h-full flex flex-col items-center justify-center min-h-60">
	{#if stage === 'fullscreen-check'}
		<div
			class="absolute top-0 w-full h-full flex flex-col items-center justify-center"
			transition:fade
		>
			<GazeFullscreenCheck on:continue={() => (stage = 'connect')} />
		</div>
	{:else if stage === 'connect'}
		<div
			class="absolute top-0 w-full h-full flex flex-col items-center justify-center"
			transition:fade
		>
			<GazeConnect {connectLogger} {gazeManager} on:trackerConnected={() => (stage = 'validate')} />
		</div>
	{:else if stage === 'validate'}
		<div class="absolute w-full h-full flex flex-col items-center justify-center" transition:fade>
			<GazeValidate {connectLogger} {gazeManager} on:validated={handleGazeValidationDone} />
		</div>
	{:else if stage === 'check'}
		<div class="absolute w-full h-full flex flex-col items-center justify-center" transition:fade>
			<GazeCheck
				{gazeManager}
				{validationResult}
				on:continue={() => dispatch('continue')}
				on:validate={() => (stage = 'validate')}
			/>
		</div>
	{/if}
</div>
