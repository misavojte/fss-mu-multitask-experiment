<script lang="ts">
	import type { GazeInputConfig, GazeManager } from '@473783/develex-core';
	import GazeConnectButton from './GazeConnectButton.svelte';
	import GazeConnectSelect from './GazeConnectSelect.svelte';
	import { createEventDispatcher } from 'svelte';
	import { waitForTimeout } from '$lib/utils/waitForCondition';
	import { writable } from 'svelte/store';
	import { saveActionLog } from '$lib/database/repositories/ActionLog.repository';

	export let gazeManager: GazeManager;
	const isLoading = writable(false);

	let selected: 'gazepoint' | 'dummy' = 'gazepoint';
	let error: null | string = null;

	const configs: Record<'gazepoint' | 'dummy', GazeInputConfig> = {
		gazepoint: {
			uri: 'ws://localhost:13892',
			tracker: 'opengaze',
			fixationDetection: 'device'
		},
		dummy: {
			tracker: 'dummy',
			fixationDetection: 'idt',
			frequency: 60,
			precisionMinimalError: 0.5,
			precisionDecayRate: 0.5,
			precisionMaximumError: 2
		}
	};

	const dispatch = createEventDispatcher();

	const handleConnect = async (
		e: CustomEvent<{ windowObject: Window; mouseEventObject: MouseEvent }>
	) => {
		error = null;
		saveActionLog({
			type: 'gaze_connect',
			data: {
				tracker: selected
			},
			timestamp: new Date().toISOString()
		};
		gazeManager.createInput(configs[selected]);
		$isLoading = true;
		gazeManager.setWindowCalibration(e.detail.mouseEventObject, e.detail.windowObject);
		gazeManager
			.connect()
			.then(async () => {
				if (selected === 'dummy') {
					await waitForTimeout(750);
				}
				gazeManager
					.start()
					.then(() => {
						dispatch('trackerConnected');
					})
					.catch((e: unknown) => {
						error = (e as Error).message;
						$isLoading = false;
					});
			})
			.catch((e: unknown) => {
				error = (e as Error).message;
				$isLoading = false;
			});
	};
</script>

<div class="flex flex-col gap-8 w-80">
	<div class="w-full flex flex-col gap-2 items-start">
		<GazeConnectSelect bind:selected />
		<GazeConnectButton isLoading={$isLoading} on:connect={handleConnect} />
	</div>
	<div class="relative w-full">
		{#if error}
			<div
				class="bg-red-100 text-red-800 p-2 rounded text-left absolute top-0 left-0 w-full text-xs"
			>
				{error}
			</div>
		{/if}
	</div>
</div>
