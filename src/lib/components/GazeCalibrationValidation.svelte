<script lang="ts">
	import type { GazeManager } from '@473783/develex-core';
	import { createEventDispatcher } from 'svelte';
	import GazeValidate from '$lib/components/GazeValidate.svelte';
	import { fade } from 'svelte/transition';
	import GazeCheck from '$lib/components/GazeCheck.svelte';
	import type { IConnectLogger } from '$lib/interfaces/IConnectLogger';

	export let gazeManager: GazeManager;
	export let connectLogger: IConnectLogger;

	let stage: 'validate' | 'check' = 'validate';

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
	{#if stage === 'validate'}
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
