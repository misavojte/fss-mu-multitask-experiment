<script lang="ts">
	export let questionText: string;
	export let isRequired: boolean = false;
</script>

<!-- Question.svelte -->
<!-- The wrapping is not a form tag because it is better to have them in separate types for better control -->
<div class="relative w-full h-full">
	<div class="absolute top-0 left-0 w-full h-full overflow-y-auto">
		<div class="min-h-full flex flex-col text-neutral-700 justify-center items-center gap-8 p-4">
			<div class="text-2xl font-bold text-center">
				{questionText}
				{#if isRequired}
					<span class="text-red-500">*</span>
				{/if}
			</div>
			<slot>
				<p class="text-neutral-500">
					This is the default slot content. No custom content provided.
				</p>
			</slot>
		</div>
	</div>
</div>
