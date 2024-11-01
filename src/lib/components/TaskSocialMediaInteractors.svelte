<script lang="ts">
	import TaskSocialMediaButton from './TaskSocialMediaButton.svelte';
	export let socialMediaButtons: Array<{
		text: string;
		id: string;
		color: string;
		textColor: string;
		html: string;
	}>;
	export let height: number = 300;
</script>

<div class="grid grid-cols-2 w-full gap-4 p-4" style="height: {height}px;">
	{#each socialMediaButtons as { text, id, color, textColor, html }, i}
		<TaskSocialMediaButton {id} {text} {color} {textColor} {html} on:click />
	{/each}
</div>
