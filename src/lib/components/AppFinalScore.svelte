<script lang="ts">
	import LL from '../../i18n/i18n-svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import InterfaceFooter from './InterfaceFooter.svelte';
	import type { ATaskHandler } from '$lib/interfaces/ITaskHandler';
	import { base } from '$app/paths';

	export let taskHandler: ATaskHandler;
	export let returnUrl: string;

	const dispatch = createEventDispatcher();

	let countdown = 15; // 15 seconds countdown
	let countdownInterval: number | null = null;
	let isRedirecting = false;

	/**
	 * Sanitizes a URL to ensure it's safe for redirection
	 * @param url - The URL to sanitize
	 * @returns Sanitized URL or null if invalid
	 */
	const sanitizeUrl = (url: string | null): string | null => {
		if (!url) return null;

		try {
			// Create URL object to validate and normalize
			const urlObj = new URL(url);

			// Only allow http and https protocols
			if (!['http:', 'https:'].includes(urlObj.protocol)) {
				console.warn('Invalid protocol in return URL:', urlObj.protocol);
				return null;
			}

			// Return the sanitized URL
			return urlObj.toString();
		} catch (error) {
			console.warn('Invalid return URL:', url, error);
			return null;
		}
	};

	const handleFinish = () => {
		if (!isRedirecting) {
			const sanitizedUrl = sanitizeUrl(returnUrl);
			if (sanitizedUrl) {
				isRedirecting = true;
				window.location.href = sanitizedUrl;
			} else {
				dispatch('finish');
			}
		} else {
			dispatch('finish');
		}
	};

	const startCountdown = () => {
		if (isRedirecting) return;

		countdownInterval = setInterval(() => {
			countdown--;
			if (countdown <= 0) {
				clearInterval(countdownInterval!);
				handleFinish();
			}
		}, 1000);
	};

	onMount(() => {
		startCountdown();

		return () => {
			if (countdownInterval) {
				clearInterval(countdownInterval);
			}
		};
	});
</script>

<div class="w-full h-full p-8 mx-auto flex flex-col gap-8">
	<div class="flex-grow relative">
		<div class="flex flex-col gap-6 items-center justify-center flex-grow my-auto w-full h-full">
			<h2 class="text-3xl font-bold">{$LL.finalScore.heading()}</h2>
			<img src={`${base}/end.jpeg`} alt="End of experiment" class="h-48 w-auto" />
			<div class="text-lg text-center space-y-4">
				<p class="text-xl font-semibold">
					{$LL.finalScore.scoreMessage({
						totalPoints: taskHandler.score
					})}
				</p>
				<p class="text-gray-600">
					{$LL.finalScore.thankYou()}
				</p>
				<div class="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
					<p class="text-blue-800 font-medium mb-2">
						{$LL.finalScore.redirectMessage()}
					</p>
					<p class="text-blue-600 text-sm">
						{$LL.finalScore.countdownMessage({ seconds: countdown })}
					</p>
				</div>
			</div>
			<div class="flex justify-center mt-6">
				<button
					class="bg-blue-500 text-white px-6 py-3 text-lg rounded-md font-semibold hover:bg-blue-600 transition-colors"
					on:click={handleFinish}
				>
					{$LL.finalScore.redirectNow()}
				</button>
			</div>
		</div>
	</div>
	<InterfaceFooter />
</div>
