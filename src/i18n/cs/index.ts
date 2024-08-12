import type { BaseTranslation } from '../i18n-types';

const cs = {
	// TODO: your translations go here
	HI: 'Hi {name:string}! Please leave a star if you like this project: https://github.com/ivanhofer/typesafe-i18n',
	footerText: 'Aplikace je součástí výzkumu na Fakultě sociálních studií Masarykovy univerzity.',
	question: {
		battery: {
			back: 'Předchozí sekce',
			next: 'Přeskočit na další sekci'
		},
		1: {
			heading: 'Vítejte v eHealth Experimentu',
			confirm: 'Pokračovat',
			paragraphs: {
				1: 'We are simulating a typical digital environment where media multitasking is often required, helping us understand how well people can manage multiple tasks simultaneously. Please read the instructions carefully before proceeding to the practice and main trials.'
			}
		},
		2: {
			heading: 'Co budete dělat?',
			confirm: 'Pokračovat',
			paragraphs: {
				1: 'In this experiment, you will engage in three tasks simultaneously: pattern-matching, watching a documentary, and responding to memes on social media.'
			}
		},
		3: {
			heading: 'Zadejte párovací ID pro experiemnt.',
			confirm: 'Potvrdit'
		},
		4: {
			heading: 'Pattern Matching Task',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'his is your primary task. You will be presented with a 3 × 3 matrix where eight of the nine cells contain abstract shapes, and one cell in the bottom right-hand corner is empty.',
				2: 'Your goal is to complete the matrix by deducing the missing shape from the four possible alternatives and selecting it with a mouse click. To find the correct shape, analyze the relationships between the shapes within the matrix, considering four dimensions: shape, color, size, and position.',
				3: 'There is no time limit for each response. The next trial will begin after the response is made. For each correct answer, you will earn three points.'
			}
		},
		5: {
			heading: 'Documentary Task',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'This is your secondary task. You will watch a documentary on the screen and answer questions about the content. The documentary will be paused at random intervals, and you will be asked to answer a question about the content. You will have 20 seconds to respond to each question.',
				2: 'For each correct answer, you will earn one point.'
			}
		},
		6: {
			heading: 'Social Media Task',
			confirm: 'Rozumím',
			paragraphs: {
				1: 'This is your tertiary task. You will be presented with a meme and asked to interact with it by choosing one of the four possible responses: share, like, comment, or save.',
				2: 'For each correct answer, you will earn one point.'
			}
		},
		7: {
			heading: 'Získejte dostatek bodů a vyhrajte 2500 Kč!',
			confirm: 'Rozumím, začít první zkušební kolo',
			paragraphs: {
				1: 'Your objective is to accumulate as many points as possible. The total points you earn will determine your eligibility for a greater reward. If you are among the top five performers, youll have a chance to win a €100 prize draw.',
				2: 'Therefore, prioritize the pattern-matching task while managing your attention across all tasks.',
				3: 'If you understand these instructions, please indicate by pressing "Yes, continue" and we can proceed with some practice trials.'
			}
		}
	}
} satisfies BaseTranslation;

export default cs;
