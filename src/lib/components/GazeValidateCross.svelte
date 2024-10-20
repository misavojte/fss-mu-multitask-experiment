<script lang="ts">
	import { onDestroy, SvelteComponent } from 'svelte';
	import type { GazeInteractionObjectValidationSettings } from '@473783/develex-core';
	import GazeValidateCrossCircle from './GazeValidateCrossCircle.svelte';
	import type { GazeInteractionObjectValidationEvent } from '@473783/develex-core';
	import type { GazeManager } from '@473783/develex-core';

	export let validationSettings: Partial<GazeInteractionObjectValidationSettings> & {
		validationDuration: number;
	};
	export let gazeManager: GazeManager;
	export let aoi: string;
	export let animation: 'smaller' | 'bigger' | 'pulse' = 'smaller';
	export let color: string = 'red';

	let validationCircleElement: SvelteComponent | null;
	let element: HTMLElement;

	const originalOnValidation = validationSettings.onValidation;

	validationSettings.onValidation = (result: GazeInteractionObjectValidationEvent) => {
		if (originalOnValidation) {
			originalOnValidation(result);
		}
		if (validationCircleElement) {
			validationCircleElement.$destroy();
		}
	};

	const handleClick = (e: MouseEvent) => {
		/*const centerCoordinates = {
			x: e.clientX + window.scrollX,
			y: e.clientY + window.scrollY
		};*/

		// center coordinates of the button
		const centerCoordinates = {
			x: element.getBoundingClientRect().left + element.offsetWidth / 2,
			y: element.getBoundingClientRect().top + element.offsetHeight / 2
		};
		validationCircleElement = new GazeValidateCrossCircle({
			target: document.body,
			props: {
				validationSettings,
				gazeManager,
				centerCoordinates,
				animation,
				color
			}
		});
	};

	onDestroy(() => {
		if (validationCircleElement) {
			validationCircleElement.$destroy();
		}
	});
</script>

<button
	id={aoi}
	class="relative"
	on:click={handleClick}
	aria-label="Validation Area"
	bind:this={element}
>
	<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
		<!-- Outer Circle -->
		<circle cx="50" cy="50" r="45" stroke="black" stroke-width="2" fill="none" />
		<!-- Vertical Line -->
		<line x1="50" y1="5" x2="50" y2="95" stroke="black" stroke-width="2" />
		<!-- Horizontal Line -->
		<line x1="5" y1="50" x2="95" y2="50" stroke="black" stroke-width="2" />
	</svg>
</button>
