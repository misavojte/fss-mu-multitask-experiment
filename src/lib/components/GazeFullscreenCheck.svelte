<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import { ArrowRightOutline, ExpandOutline } from 'flowbite-svelte-icons';
	import LL from '../../i18n/i18n-svelte';

	const dispatch = createEventDispatcher();

	/**
	 * Enters fullscreen mode using the Fullscreen API
	 * @throws {Error} If fullscreen is not supported or fails
	 */
	const enterFullscreen = async (): Promise<void> => {
		try {
			if (!document.fullscreenElement) {
				await document.documentElement.requestFullscreen();
			}
		} catch (error) {
			console.error('Failed to enter fullscreen:', error);
		}
	};

	/**
	 * Checks if the browser is currently in fullscreen mode
	 * @returns {boolean} True if in fullscreen mode
	 */
	const isFullscreen = (): boolean => {
		return !!document.fullscreenElement;
	};

	/**
	 * Handles the continue button click, dispatching the continue event
	 */
	const handleContinue = (): void => {
		dispatch('continue');
	};

	/**
	 * Handles the enter fullscreen button click
	 */
	const handleEnterFullscreen = async (): Promise<void> => {
		await enterFullscreen();
	};
</script>

<div class="flex flex-col items-center justify-center gap-4 max-w-md">
	<!-- Main heading -->
	<h2 class="text-xl font-bold text-gray-800 text-center">
		{$LL.fullscreen.heading()}
	</h2>

	<!-- Instructions -->
	<div class="text-center space-y-2">
		<p class="text-base text-gray-700">
			{$LL.fullscreen.instruction()}
		</p>

		<p class="text-sm text-gray-600">
			{@html $LL.fullscreen.helpText()}
		</p>
	</div>

	<!-- Action buttons -->
	<div class="flex gap-3">
		<Button class="justify-center" color="alternative" on:click={handleEnterFullscreen}>
			<ExpandOutline class="w-4 h-4 me-2" />
			{$LL.fullscreen.enterFullscreen()}
		</Button>

		<Button class="justify-center" on:click={handleContinue}>
			<ArrowRightOutline class="w-4 h-4 me-2" />
			{$LL.fullscreen.continue()}
		</Button>
	</div>
</div>
