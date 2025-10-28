<script lang="ts">
	import AppDualPriority from '$lib/components/AppDualPriority.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	// Get sessionId from URL parameters
	const sessionIdPromise = new Promise<string>((resolve, reject) => {
		// Use a small delay to ensure page store is ready
		setTimeout(() => {
			const sessionId = $page.url.searchParams.get('sessionId');
			if (sessionId) {
				resolve(sessionId);
			} else {
				reject(new Error('No sessionId provided'));
			}
		}, 100);
	});

	const priority: 'math' | 'social' | 'none' = 'social';
	const endpoint = 'https://your-endpoint.com/api/logs';
</script>

{#await sessionIdPromise}
	<div
		class="w-screen h-screen flex items-center justify-center bg-gray-100"
		in:fade={{ duration: 300 }}
		out:fade={{ duration: 300 }}
	>
		<div class="text-center">
			<div
				class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
			></div>
			<p class="text-gray-600">Načítání relace...</p>
		</div>
	</div>
{:then sessionId}
	<AppDualPriority {sessionId} {priority} {endpoint} />
{:catch error}
	<div
		class="w-screen h-screen flex items-center justify-center bg-red-50"
		in:fade={{ duration: 300 }}
		out:fade={{ duration: 300 }}
	>
		<div class="text-center max-w-md mx-auto p-6">
			<div class="text-red-600 text-6xl mb-4">⚠️</div>
			<h1 class="text-xl font-bold text-red-800 mb-4">Chyba přístupu</h1>
			<p class="text-red-700 mb-4">
				Pro přístup k této stránce musíte použít odkaz s identifikátorem relace (sessionId) z
				externího dotazníku.
			</p>
			<p class="text-sm text-red-600">Kontaktujte prosím administrátora experimentu.</p>
		</div>
	</div>
{/await}
