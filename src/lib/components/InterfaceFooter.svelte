<script lang="ts">
	import LL from '../../i18n/i18n-svelte';
	import { base } from '$app/paths';

	const currentYear = new Date().getFullYear();
</script>

<footer class="text-neutral-600 body-font border-t border-neutral-200">
	<div class="container mx-auto py-4 px-5 gap-4 flex flex-wrap flex-col sm:flex-row">
		<img src="{base}/logo.png" alt="Logo" class="h-8 w-auto" />
		<p class="text-xs text-neutral-500 sm:ml-auto sm:mt-0 mt-2 sm:text-left">
			{$LL.footerText()}
		</p>
		<p class="text-xs text-neutral-500 sm:ml-auto sm:mt-0 mt-2 sm:text-left">© {currentYear}</p>
	</div>
</footer>
