<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let text: string;
	export let id: string;
	export let color: string = '#0088ff';
	export let textColor: string = 'white';
	export let html: string = '';

	const dispatch = createEventDispatcher();

	const handleClick = (e: MouseEvent) => {
		dispatch('click', { id, timestamp: Date.now(), e });
	};

	const calculateDarkerShadeOfHex = (hex: string, factor: number = 0.8): string => {
		if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
			throw new Error('Invalid hex color format');
		}

		let color = hex.substring(1);
		if (color.length === 3) {
			color = color
				.split('')
				.map((char) => char + char)
				.join('');
		}

		const darken = (channel: string) =>
			Math.max(0, Math.min(255, Math.round(parseInt(channel, 16) * factor)));
		const [red, green, blue] = [color.slice(0, 2), color.slice(2, 4), color.slice(4, 6)].map(
			darken
		);

		return `#${[red, green, blue].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
	};

	$: darkerColor = calculateDarkerShadeOfHex(color);
</script>

<div style="--darker-color: {darkerColor}; --color: {color}; --text-color: {textColor};">
	<button
		{id}
		class="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md btn w-full inline-flex items-center justify-center h-full"
		on:click={handleClick}
	>
		{#if html !== ''}
			<span class="mr-2"> {@html html}</span>
		{/if}
		{text}
	</button>
</div>

<style>
	.btn {
		transition:
			background-color 0.2s,
			color 0.2s;
		color: var(--text-color);
		background-color: var(--color);
	}

	.btn:hover {
		background-color: var(--darker-color);
	}
</style>
