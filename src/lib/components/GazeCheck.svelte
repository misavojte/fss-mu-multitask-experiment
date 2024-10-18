<script lang="ts">
	import type { GazeManager } from '@473783/develex-core';
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
	import { createEventDispatcher } from 'svelte';

	export let gazeManager: GazeManager;
	export let validationResult: GazeValidationResult | null = {
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
		}
	};

	export let locale = {
		place: 'Místo validace',
		accuracy: 'Správnost [px]',
		precision: 'Konzistence [px]',
		gazePointCount: 'Počet datových bodů',
		topleft: 'Levý horní roh',
		middle: 'Střed',
		bottomright: 'Pravý dolní roh',
		average: 'Průměr',
		continue: 'Pokračovat na experiment',
		validate: 'Znovu validovat',
		calibrate: 'Spustit kalibraci'
	};

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

	const dispatch = createEventDispatcher();
	const handleContinue = () => {
		dispatch('continue');
	};

	const handleValidate = () => {
		dispatch('validate');
	};

	const handleCalibrate = () => {
		gazeManager.calibrate();
	};

	const roundToTwo = (num: number) => {
		return Math.round((num + Number.EPSILON) * 100) / 100;
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
				<TableBodyRow>
					<TableBodyCell>{locale.topleft}</TableBodyCell>
					<TableBodyCell>{roundToTwo(validationResult.topleft.accuracy)}</TableBodyCell>
					<TableBodyCell>{roundToTwo(validationResult.topleft.precision)}</TableBodyCell>
					<TableBodyCell>{validationResult.topleft.gazePointCount}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>{locale.middle}</TableBodyCell>
					<TableBodyCell>{roundToTwo(validationResult.middle.accuracy)}</TableBodyCell>
					<TableBodyCell>{roundToTwo(validationResult.middle.precision)}</TableBodyCell>
					<TableBodyCell>{validationResult.middle.gazePointCount}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>{locale.bottomright}</TableBodyCell>
					<TableBodyCell>{roundToTwo(validationResult.bottomright.accuracy)}</TableBodyCell>
					<TableBodyCell>{roundToTwo(validationResult.bottomright.precision)}</TableBodyCell>
					<TableBodyCell>{validationResult.bottomright.gazePointCount}</TableBodyCell>
				</TableBodyRow>
				<TableBodyRow>
					<TableBodyCell>{locale.average}</TableBodyCell>
					<TableBodyCell
						>{roundToTwo(
							(validationResult.topleft.accuracy +
								validationResult.middle.accuracy +
								validationResult.bottomright.accuracy) /
								3
						)}</TableBodyCell
					>
					<TableBodyCell
						>{roundToTwo(
							(validationResult.topleft.precision +
								validationResult.middle.precision +
								validationResult.bottomright.precision) /
								3
						)}</TableBodyCell
					>
					<TableBodyCell
						>{roundToTwo(
							(validationResult.topleft.gazePointCount +
								validationResult.middle.gazePointCount +
								validationResult.bottomright.gazePointCount) /
								3
						)}</TableBodyCell
					>
				</TableBodyRow>
			{:else}
				<TableBodyRow>
					<TableBodyCell>Loading...</TableBodyCell>
				</TableBodyRow>
			{/if}
		</TableBody>
	</Table>
	<!-- Holder for buttons -->
	<div class="flex gap-1">
		<Button class="justify-start" on:click={handleValidate}>
			<UndoOutline class="w-4 h-4 me-3" />{locale.validate}
		</Button>
		<Button class="justify-start" on:click={handleCalibrate}>
			<EyeOutline class="w-4 h-4 me-3" />{locale.calibrate}
		</Button>
		<Button class="justify-start" on:click={handleContinue}>
			<ArrowRightOutline class="w-4 h-4 me-3" />{locale.continue}
		</Button>
	</div>
</div>
