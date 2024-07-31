<script lang="ts">
	import TaskSocialMediaButton from './TaskSocialMediaButton.svelte';
	export let socialMediaButtons: Array<{
		text: string;
		id: string;
	}>;
</script>

<div class="grid grid-cols-2 w-full gap-4">
	{#each socialMediaButtons as { text, id }, i}
		<TaskSocialMediaButton {id} {text} on:click />
	{/each}
</div>
