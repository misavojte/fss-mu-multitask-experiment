<script lang="ts">
	import { fade } from 'svelte/transition';

	export let centerCoordinates: { x: number; y: number };
	export let color: string = 'red';
	export let content: string = '+1';
	export let duration: number = 1000;
</script>

<div
	transition:fade
	class="slowly-moving-up absolute z-50 pointer-events-none flex justify-center items-center text-white text-lg font-bold text-center p-6 rounded-full bg-opacity-50 {color ===
	'green'
		? 'bg-green-500'
		: 'bg-red-500'}"
	style="left: {centerCoordinates.x}px; top: {centerCoordinates.y}px; transform: translate(-50%, -50%); --duration: {duration}ms;"
>
	{content}
</div>

<style>
	@keyframes slowly-moving-up {
		0% {
			transform: translate(-50%, -50%) translateY(0);
			opacity: 0;
		}
		25% {
			transform: translate(-50%, -50%) translateY(-2px);
			opacity: 1;
		}
		50% {
			transform: translate(-50%, -50%) translateY(-5px);
			opacity: 1;
		}
		100% {
			transform: translate(-50%, -50%) translateY(-10px);
			opacity: 0;
		}
	}
	.slowly-moving-up {
		animation: slowly-moving-up var(--duration) linear forwards;
	}
</style>
