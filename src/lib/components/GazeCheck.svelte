<script lang="ts">
	import type { GazeManager } from 'develex-js-sdk';
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Button
	} from 'flowbite-svelte';
	import { ArrowRightOutline, EyeOutline, UndoOutline } from 'flowbite-svelte-icons';
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	export let gazeManager: GazeManager;

	type LocaleKeys =
		| 'place'
		| 'accuracy'
		| 'precision'
		| 'gazePointCount'
		| 'topleft'
		| 'middle'
		| 'bottomright'
		| 'topright'
		| 'topmiddle'
		| 'average'
		| 'continue'
		| 'validate'
		| 'calibrate';

	export let locale: Record<LocaleKeys, string> = {
		place: 'Místo validace',
		accuracy: 'Správnost [px]',
		precision: 'Konzistence [px]',
		gazePointCount: 'Počet datových bodů',
		topleft: 'Levý horní roh',
		middle: 'Střed',
		bottomright: 'Pravý dolní roh',
		topright: 'Pravý horní roh',
		topmiddle: 'Střed nahoře',
		average: 'Průměr',
		continue: 'Pokračovat na experiment',
		validate: 'Znovu validovat',
		calibrate: 'Spustit kalibraci'
	};

	type GazeValidationMetrics = {
		accuracy: number;
		precision: number;
		gazePointCount: number;
	};

	type GazeValidationResult = Record<
		'topleft' | 'middle' | 'bottomright' | 'topright' | 'topmiddle',
		GazeValidationMetrics
	>;

	export let validationResult: GazeValidationResult | null = {
		topleft: { accuracy: 999, precision: 999, gazePointCount: 0 },
		middle: { accuracy: 999, precision: 999, gazePointCount: 0 },
		bottomright: { accuracy: 999, precision: 999, gazePointCount: 0 },
		topright: { accuracy: 999, precision: 999, gazePointCount: 0 },
		topmiddle: { accuracy: 999, precision: 999, gazePointCount: 0 }
	};

	$: validationResultArray = validationResult
		? (Object.entries(validationResult) as [
				'topleft' | 'middle' | 'bottomright' | 'topright' | 'topmiddle',
				GazeValidationMetrics
			][])
		: [];

	const dispatch = createEventDispatcher();

	const handleAction = (action: 'continue' | 'validate' | 'calibrate') => {
		if (action === 'calibrate') {
			gazeManager.calibrate();
		} else {
			dispatch(action);
		}
	};

	const roundToTwo = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

	const calculateAverage = (key: keyof GazeValidationMetrics) => {
		if (!validationResult) return 0;
		const sum = Object.values(validationResult).reduce((acc, metrics) => acc + metrics[key], 0);
		return roundToTwo(sum / Object.keys(validationResult).length);
	};

	onMount(() => gazeManager.stop());
	onDestroy(() => gazeManager.start());

	// Configuration for thresholds and conditions
	export let metricConfig = {
		accuracy: { threshold: 100, condition: '>' }, // accuracy critical if > 50
		precision: { threshold: 50, condition: '>' }, // precision critical if > 50
		gazePointCount: { threshold: 120, condition: '<' } // gazePointCount critical if < 20
	};

	const isMetricCritical = (metricValue: number, metricType: keyof typeof metricConfig) => {
		const { threshold, condition } = metricConfig[metricType];
		// Check if the condition matches based on the configuration
		return condition === '>' ? metricValue > threshold : metricValue < threshold;
	};
</script>

<div class="flex flex-col items-center justify-center gap-4">
	<Table>
		<TableHead>
			<TableHeadCell>{locale.place}</TableHeadCell>
			<TableHeadCell>{locale.accuracy}</TableHeadCell>
			<TableHeadCell>{locale.precision}</TableHeadCell>
			<TableHeadCell>{locale.gazePointCount}</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#if validationResult}
				{#each validationResultArray as [position, metrics]}
					<TableBodyRow>
						<TableBodyCell>{locale[position]}</TableBodyCell>
						<TableBodyCell
							class={isMetricCritical(metrics.accuracy, 'accuracy') ? 'bg-red-100' : 'bg-green-100'}
						>
							{roundToTwo(metrics.accuracy)}
						</TableBodyCell>
						<TableBodyCell
							class={isMetricCritical(metrics.precision, 'precision')
								? 'bg-red-100'
								: 'bg-green-100'}
						>
							{roundToTwo(metrics.precision)}
						</TableBodyCell>
						<TableBodyCell
							class={isMetricCritical(metrics.gazePointCount, 'gazePointCount')
								? 'bg-red-100'
								: 'bg-green-100'}
						>
							{metrics.gazePointCount}
						</TableBodyCell>
					</TableBodyRow>
				{/each}
				<TableBodyRow>
					<TableBodyCell>{locale.average}</TableBodyCell>
					<TableBodyCell>{calculateAverage('accuracy')}</TableBodyCell>
					<TableBodyCell>{calculateAverage('precision')}</TableBodyCell>
					<TableBodyCell>{calculateAverage('gazePointCount')}</TableBodyCell>
				</TableBodyRow>
			{:else}
				<TableBodyRow>
					<TableBodyCell>Loading...</TableBodyCell>
				</TableBodyRow>
			{/if}
		</TableBody>
	</Table>

	<!-- Button Section -->
	<div class="flex gap-1">
		<Button class="justify-start" on:click={() => handleAction('validate')}>
			<UndoOutline class="w-4 h-4 me-3" />{locale.validate}
		</Button>
		<Button class="justify-start" on:click={() => handleAction('calibrate')}>
			<EyeOutline class="w-4 h-4 me-3" />{locale.calibrate}
		</Button>
		<Button class="justify-start" on:click={() => handleAction('continue')}>
			<ArrowRightOutline class="w-4 h-4 me-3" />{locale.continue}
		</Button>
	</div>
</div>
