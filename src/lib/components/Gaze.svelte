<script lang="ts">
	import type { GazeManager } from '@473783/develex-core';
	import { createEventDispatcher } from 'svelte';
	import GazeValidate from './GazeValidate.svelte';
	import GazeConnect from './GazeConnect.svelte';
	import { applyAction } from '$app/forms';
	import { fade } from 'svelte/transition';
	import GazeCheck from './GazeCheck.svelte';

	export let gazeManager: GazeManager;

	let stage: 'connect' | 'validate' | 'check' = 'connect';

	const dispatch = createEventDispatcher();

	type GazeValidationResult = {
		topleft: {
			accuracy: number;
			precision: number;
			gazePointCount: number;
		};
		middle: {
			accuracy: number;
			precision: number;
			gazePointCount: number;
		};
		bottomright: {
			accuracy: number;
			precision: number;
			gazePointCount: number;
		};
	};

	let validationResult: GazeValidationResult | null = null;

	const handleGazeValidationDone = (e: CustomEvent<GazeValidationResult>) => {
		validationResult = e.detail;
		stage = 'check';
	};
</script>

<div class="relative w-full h-full flex flex-col items-center justify-center min-h-60">
	{#if stage === 'connect'}
		<div
			class="absolute top-0 w-full h-full flex flex-col items-center justify-center"
			transition:fade
		>
			<GazeConnect {gazeManager} on:trackerConnected={() => (stage = 'validate')} />
		</div>
	{:else if stage === 'validate'}
		<div class="absolute w-full h-full flex flex-col items-center justify-center" transition:fade>
			<GazeValidate {gazeManager} on:gazeValidationDone={handleGazeValidationDone} />
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
