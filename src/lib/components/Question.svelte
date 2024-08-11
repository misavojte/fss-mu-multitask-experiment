<script lang="ts">
	export let questionText: string;
</script>

<!-- Question.svelte -->
<!-- The wrapping is not a form tag because it is better to have them in separate types for better control -->
<div class="flex flex-col text-neutral-700 justify-center items-center gap-8 h-full">
	<div class="text-2xl font-bold text-center">
		{questionText}
	</div>
	<slot>
		<p class="text-neutral-500">This is the default slot content. No custom content provided.</p>
	</slot>
</div>
