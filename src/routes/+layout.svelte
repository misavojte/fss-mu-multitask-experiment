<script>
	import '../app.css';
	import { setLocale } from '../i18n/i18n-svelte';
	import { loadLocale } from '../i18n/i18n-util.sync';

	loadLocale('cs');
	setLocale('cs');
</script>

<slot />
