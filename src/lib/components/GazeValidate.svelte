<script lang="ts">
	import type { GazeManager, GazeInteractionObjectValidationSettings } from 'develex-js-sdk';
	import GazeValidateCross from './GazeValidateCross.svelte';
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import type { IConnectLogger } from '$lib/interfaces/IConnectLogger';

	export let gazeManager: GazeManager;
	export let connectLogger: IConnectLogger;

	let stage: 'topleft' | 'middle' | 'bottomright' | 'topright' | 'topmiddle' = 'topleft';

	const results = {
		topleft: {
			accuracy: 999,
			precision: 999,
			gazePointCount: 0
		},
		middle: {
			accuracy: 999,
			precision: 999,
			gazePointCount: 0
		},
		bottomright: {
			accuracy: 999,
			precision: 999,
			gazePointCount: 0
		},
		topright: {
			accuracy: 999,
			precision: 999,
			gazePointCount: 0
		},
		topmiddle: {
			accuracy: 999,
			precision: 999,
			gazePointCount: 0
		}
	};

	const dispatch = createEventDispatcher();

	const validationSettings: Partial<GazeInteractionObjectValidationSettings> & {
		validationDuration: number;
	} = {
		validationDuration: 1000,
		onValidation: (result) => {
			connectLogger.logValidation(result.accuracy, result.precision, result.gazeDataPoints.length);
			if (stage === 'topleft') {
				saveResult('topleft', result);
				stage = 'middle';
			} else if (stage === 'middle') {
				saveResult('middle', result);
				stage = 'bottomright';
			} else if (stage === 'bottomright') {
				saveResult('bottomright', result);
				stage = 'topright';
			} else if (stage === 'topright') {
				saveResult('topright', result);
				stage = 'topmiddle';
			} else if (stage === 'topmiddle') {
				saveResult('topmiddle', result);
				dispatch('validated', results);
			}
		}
	};

	const saveResult = (
		where: 'topleft' | 'middle' | 'bottomright' | 'topright' | 'topmiddle',
		result: { accuracy: number; precision: number; gazeDataPoints: unknown[] }
	) => {
		results[where].accuracy = result.accuracy;
		results[where].precision = result.precision;
		results[where].gazePointCount = result.gazeDataPoints.length;
	};
</script>

<div class="relative w-full h-full min-h-60 p-8">
	<!-- TOPLEFT -->
	{#if stage === 'topleft'}
		<div class="absolute top-0 left-0" transition:fade>
			<GazeValidateCross
				{gazeManager}
				{validationSettings}
				aoi="crossfix-mt-1"
				animation="smaller"
				color="red"
			/>
		</div>
	{:else if stage === 'middle'}
		<!-- MIDDLE -->
		<div
			class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
			transition:fade
		>
			<GazeValidateCross
				{gazeManager}
				{validationSettings}
				aoi="crossfix-mt-2"
				animation="smaller"
				color="red"
			/>
		</div>
	{:else if stage === 'bottomright'}
		<!-- BOTTOMRIGHT -->
		<div class="absolute bottom-0 right-0" transition:fade>
			<GazeValidateCross
				{gazeManager}
				{validationSettings}
				aoi="crossfix-mt-3"
				animation="smaller"
				color="red"
			/>
		</div>
	{:else if stage === 'topright'}
		<!-- TOP RIGHT -->
		<div class="absolute top-0 right-0" transition:fade>
			<GazeValidateCross
				{gazeManager}
				{validationSettings}
				aoi="crossfix-mt-5"
				animation="smaller"
				color="red"
			/>
		</div>
	{:else if stage === 'topmiddle'}
		<!-- TOP MIDDLE -->
		<div class="absolute top-0 left-1/2 transform -translate-x-1/2" transition:fade>
			<GazeValidateCross
				{gazeManager}
				{validationSettings}
				aoi="crossfix-mt-6"
				animation="smaller"
				color="red"
			/>
		</div>
	{/if}
</div>
