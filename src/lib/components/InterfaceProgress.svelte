<script lang="ts">
	export let currentValue = 0; // ideally 0-based index
	export let maxValue = 0; // total number of questions

	const minimumValue = 0.05 / maxValue;
	$: progress = (Math.max(minimumValue, currentValue) / maxValue) * 100; // progress in percentage

	$: progressStyle = `width: ${progress}%;`;
</script>

<div class="rounded-md bg-neutral-300 h-2 w-full overflow-hidden">
	<div class="rounded-md bg-blue-500 h-2 transition-all" style={progressStyle} />
</div>
