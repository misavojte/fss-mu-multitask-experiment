<script lang="ts">
	import AppDualPriority from '$lib/components/AppDualPriority.svelte';
	import { fade } from 'svelte/transition';
	import { page } from '$app/stores';

	// Set page title
	$: {
		const priorityParam = $page.url.searchParams.get('priority');
		let title = 'FSS MU Multitask Experiment';

		if (priorityParam === 'math') {
			title = 'Math Priority Multitask Experiment - FSS MU';
		} else if (priorityParam === 'social') {
			title = 'Social Priority Multitask Experiment - FSS MU';
		} else {
			title = 'Equal Priority Multitask Experiment - FSS MU';
		}

		if (typeof document !== 'undefined') {
			document.title = title;
		}
	}

	// Get sessionId, returnUrl, endpoint, and priority from URL parameters
	const sessionIdPromise = new Promise<{
		sessionId: string;
		returnUrl: string;
		endpoint: string;
		priority: 'math' | 'social' | 'none';
	}>((resolve, reject) => {
		// Use a small delay to ensure page store is ready
		setTimeout(() => {
			const sessionId = $page.url.searchParams.get('sessionId');
			const returnUrl = $page.url.searchParams.get('returnUrl');
			const endpoint = $page.url.searchParams.get('endpoint');
			const priorityParam = $page.url.searchParams.get('priority');

			// Validate priority parameter
			let priority: 'math' | 'social' | 'none' = 'none';
			if (priorityParam === 'math' || priorityParam === 'social' || priorityParam === 'none') {
				priority = priorityParam;
			} else if (priorityParam) {
				reject(new Error('Invalid priority provided'));
				return;
			}

			if (sessionId && returnUrl && endpoint) {
				resolve({ sessionId, returnUrl, endpoint, priority });
			} else if (!sessionId) {
				reject(new Error('No sessionId provided'));
			} else if (!returnUrl) {
				reject(new Error('No returnUrl provided'));
			} else {
				reject(new Error('No endpoint provided'));
			}
		}, 100);
	});
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
{:then { sessionId, returnUrl, endpoint, priority }}
	<AppDualPriority {sessionId} {priority} {endpoint} {returnUrl} />
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
				Pro přístup k této stránce musíte použít odkaz s identifikátorem relace (sessionId),
				návratovou URL (returnUrl), endpointem a prioritou z externího dotazníku.
			</p>
			<p class="text-sm text-red-600">Kontaktujte prosím administrátora experimentu.</p>
		</div>
	</div>
{/await}
