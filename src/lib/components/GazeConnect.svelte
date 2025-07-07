<script lang="ts">
	import type { GazeInputConfig, GazeManager } from 'develex-js-sdk';
	import GazeConnectButton from '$lib/components/GazeConnectButton.svelte';
	import GazeConnectSelect from '$lib/components/GazeConnectSelect.svelte';
	import { createEventDispatcher } from 'svelte';
	import { waitForTimeout } from '$lib/utils/waitForCondition';
	import { writable } from 'svelte/store';
	import type { IConnectLogger } from '$lib/interfaces/IConnectLogger';

	export let gazeManager: GazeManager;
	export let connectLogger: IConnectLogger;

	const isLoading = writable(false);

	let selected: 'gazepoint' | 'dummy' | 'eyelogic' = 'eyelogic';
	let error = writable<string[]>([]);

	const configs: Record<'gazepoint' | 'dummy' | 'eyelogic', GazeInputConfig> = {
		eyelogic: {
			uri: 'ws://localhost:13892',
			tracker: 'eyelogic',
			fixationDetection: 'idt'
		},
		gazepoint: {
			uri: 'ws://localhost:13892',
			tracker: 'gazepoint',
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
		error.set([]);
		connectLogger.logInit();
		gazeManager.createInput(configs[selected]);
		$isLoading = true;
		gazeManager.setWindowCalibration(e.detail.mouseEventObject, e.detail.windowObject);
		try {
			// THIS IS A BIT HACKY ... IF THE TRACKER IS ALREADY CONNECTED, WE NEED TO DISCONNECT IT
			// sorry Adame, tohle jsem sem prostě pedla, ať je klid :D
			const manager = await gazeManager.status();
			const trackerStatus = manager.lastStatus?.tracker.status;

			if (trackerStatus === 'trackerEmitting') {
				await gazeManager.stop();
			}
			if (
				trackerStatus === 'trackerEmitting' ||
				trackerStatus === 'trackerCalibrating' ||
				trackerStatus === 'trackerConnecting' ||
				trackerStatus === 'trackerConnected'
			) {
				await gazeManager.disconnect();
				await gazeManager.close();
			}
			// END OF HACKY PART
			await gazeManager.open();
			await gazeManager.connect();
			console.log('Connected');
			connectLogger.logConnect();
			if (selected === 'dummy') {
				await waitForTimeout(750);
			}
			await gazeManager.start();
			connectLogger.logStart();
			dispatch('trackerConnected');
		} catch (e: unknown) {
			console.error(e);
			const message = JSON.stringify(e as Error);
			$error.push(message);
			connectLogger.logError(message);
			$isLoading = false;
		}
	};
</script>

<div class="flex flex-col gap-8 w-80">
	<div class="w-full flex flex-col gap-2 items-start">
		<GazeConnectSelect bind:selected />
		<GazeConnectButton isLoading={$isLoading} on:connect={handleConnect} />
	</div>
	<div class="relative w-full">
		{#if $error.length > 0}
			<div
				class="bg-red-100 text-red-800 p-2 rounded text-left absolute top-0 left-0 w-full text-xs"
			>
				{#each $error as message}
					<p>{message}</p>
				{/each}
			</div>
		{/if}
	</div>
</div>
