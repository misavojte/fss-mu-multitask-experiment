import type { BaseTranslation } from '../i18n-types';

const cs = {
	// TODO: your translations go here
	HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
	footerText: 'This is a footer text',
	question: {
		battery: {
			back: 'Předchozí sekce',
			next: 'Přeskočit na další sekci'
		},
		1: {
			heading: 'Vítejte v eHealth Experimentu',
			confirm: 'Pokračovat'
		},
		2: {
			heading: 'Jak se dnes cítíte?',
			confirm: 'Potvrdit'
		},
		3: {
			heading: 'Jak se zítra budete cítit?',
			confirm: 'Potvrdit'
		}
	}
} satisfies BaseTranslation;

export default cs;
