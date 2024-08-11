import { init, register } from 'svelte-i18n';

export const initI18n = () => {
	// Register translations
	register('cs', () => import('./cs.json'));
	// Initialize the i18n library in the application
	init({
		initialLocale: 'cs',
		fallbackLocale: 'cs'
	});
};
