<script lang="ts">
	import { fade } from 'svelte/transition';
</script>

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
