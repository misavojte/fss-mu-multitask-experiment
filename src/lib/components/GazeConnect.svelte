<script lang="ts">
	import type { GazeInputConfig, GazeManager } from '@473783/develex-core';
	import GazeConnectButton from './GazeConnectButton.svelte';
	import GazeConnectSelect from './GazeConnectSelect.svelte';
	import { createEventDispatcher } from 'svelte';
	import { Heading } from 'flowbite-svelte';

	export let gazeManager: GazeManager;

	let isLoading = false;
	let selected: 'gazepoint' | 'dummy' = 'gazepoint';
	let error: null | string = 'aa';

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

	const handleConnect = (
		e: CustomEvent<{ windowObject: Window; mouseEventObject: MouseEvent }>
	) => {
		error = null;
		gazeManager.createInput(configs[selected]);
		isLoading = true;
		gazeManager
			.connect()
			.then(() => {
				isLoading = false;
				dispatch('trackerConnected');
			})
			.catch((e: unknown) => {
				error = (e as Error).message;
				isLoading = false;
			});
	};
</script>

<div class="flex flex-col gap-8 w-80">
	<div class="w-full flex flex-col gap-2 items-start">
		<GazeConnectSelect bind:selected />
		<GazeConnectButton {isLoading} on:connect={handleConnect} />
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
