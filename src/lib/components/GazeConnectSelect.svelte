<script lang="ts">
	import { Label, Select } from 'flowbite-svelte';
	export let selected: 'gazepoint' | 'dummy' | 'eyelogic' = 'eyelogic';
	export let locale = {
		label: 'Vyberte eye-tracking zařízení',
		select: 'Vyberte možnost',
		gazePoint: 'GazePoint Tracker',
		dummy: 'Myš pro testování',
		eyelogic: 'Eyelogic Tracker'
	};
	let countries = [
		{ value: 'gazepoint', name: locale.gazePoint },
		{ value: 'dummy', name: locale.dummy },
		{ value: 'eyelogic', name: locale.eyelogic }
	];
</script>

<Label class="w-full">
	{locale.label}
	<Select class="mt-2" items={countries} bind:value={selected} placeholder={locale.select} />
</Label>
