<script lang="ts">
	import type { GazeInputConfig, GazeManager } from '@473783/develex-core';
	import GazeConnectButton from '$lib/components/GazeConnectButton.svelte';
	import GazeConnectSelect from '$lib/components/GazeConnectSelect.svelte';
	import { createEventDispatcher } from 'svelte';
	import { waitForTimeout } from '$lib/utils/waitForCondition';
	import { writable } from 'svelte/store';
	import type { IConnectLogger } from '$lib/interfaces/IConnectLogger';

	export let gazeManager: GazeManager;
	export let connectLogger: IConnectLogger;

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
		connectLogger.logInit();
		gazeManager.createInput(configs[selected]);
		$isLoading = true;
		gazeManager.setWindowCalibration(e.detail.mouseEventObject, e.detail.windowObject);
		gazeManager
			.connect()
			.then(async () => {
				connectLogger.logConnect();
				if (selected === 'dummy') {
					await waitForTimeout(750);
				}
				gazeManager
					.start()
					.then(() => {
						connectLogger.logStart();
						dispatch('trackerConnected');
					})
					.catch((e: unknown) => {
						error = (e as Error).message;
						$isLoading = false;
						connectLogger.logError(error);
					});
			})
			.catch((e: unknown) => {
				error = (e as Error).message;
				$isLoading = false;
				connectLogger.logError(error);
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
