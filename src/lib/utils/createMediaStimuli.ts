import { mediaStimuli } from '$lib/data/mediaStimuli.js';
import { fisherYatesShuffle } from './shuffle.js';
import type { ISocialMediaButton } from '$lib/interfaces/ITaskHandler';

type Sentiment = 'positive' | 'negative';

/**
 * Creates a randomly shuffled array of neutral and emotional stimuli from final phase
 * @param sentiment - 'positive' or 'negative' emotional valence
 * @param omitTheseIdsFromSelection - Array of image IDs to exclude from selection
 * @returns Array of 12 randomly shuffled stimuli (7 neutrals, 5 emotions)
 */
export const createFinalMediaStimuli = (
	sentiment: Sentiment,
	omitTheseIdsFromSelection: string[] = []
): { AS: string[]; NS: string[] } => {
	// Deep copy the arrays and filter out omitted IDs
	const neutralStimuli = [...mediaStimuli.final.neutral].filter(
		(id) => !omitTheseIdsFromSelection.includes(id)
	);
	const emotionalStimuli = [...mediaStimuli.final[sentiment]].filter(
		(id) => !omitTheseIdsFromSelection.includes(id)
	);

	// Shuffle both arrays using Fisher-Yates
	const shuffledNeutrals = fisherYatesShuffle(neutralStimuli);
	const shuffledEmotions = fisherYatesShuffle(emotionalStimuli);

	// Take the required amounts (7 neutrals, 5 emotions)
	const selectedNeutrals = shuffledNeutrals.slice(0, 7);
	const selectedEmotions = shuffledEmotions.slice(0, 5);

	return {
		AS: fisherYatesShuffle(selectedEmotions),
		NS: fisherYatesShuffle(selectedNeutrals)
	};
};

export const createTrainingMediaStimuli = (
	sentiment: Sentiment,
	omitTheseIdsFromSelection: string[] = []
): { AS: string[]; NS: string[] } => {
	const neutralStimuli = [...mediaStimuli.training.neutral].filter(
		(id) => !omitTheseIdsFromSelection.includes(id)
	);
	const emotionalStimuli = [...mediaStimuli.training[sentiment]].filter(
		(id) => !omitTheseIdsFromSelection.includes(id)
	);

	const shuffledNeutrals = fisherYatesShuffle(neutralStimuli);
	const shuffledEmotions = fisherYatesShuffle(emotionalStimuli);

	const selectedNeutrals = shuffledNeutrals.slice(0, 4);
	const selectedEmotions = shuffledEmotions.slice(0, 4);

	return {
		AS: fisherYatesShuffle(selectedEmotions),
		NS: fisherYatesShuffle(selectedNeutrals)
	};
};

/**
 * Creates training media stimuli from October 25 practice set
 * Takes 4 neutrals, 2 negatives, and 2 positives from the october_25_practice folder
 * @returns Object with AS (2 neg + 2 pos) and NS (4 neutral) arrays
 */
export const createTrainingMediaStimuliOctober25 = (): { AS: string[]; NS: string[] } => {
	// Available stimuli from october_25_practice folder
	const neutrals = ['N20', 'N3', 'N12', 'N2'];
	const negatives = ['Neg24', 'Neg13', 'Neg10', 'Neg18'];
	const positives = ['P9', 'P11', 'P4', 'P8'];

	// Select 4 neutrals, 2 negatives, 2 positives
	const selectedNeutrals = fisherYatesShuffle(neutrals).slice(0, 4);
	const selectedNegatives = fisherYatesShuffle(negatives).slice(0, 2);
	const selectedPositives = fisherYatesShuffle(positives).slice(0, 2);

	// Combine negatives and positives for AS (Affective Stimuli)
	const affectiveStimuli = [...selectedNegatives, ...selectedPositives];

	return {
		AS: fisherYatesShuffle(affectiveStimuli),
		NS: fisherYatesShuffle(selectedNeutrals)
	};
};

export const getTrainingMediaStimuliSrcBase = (base: string) => {
	return base + `/task/3/training/`;
};

export const getTrainingMediaStimuliOctober25SrcBase = (base: string) => {
	return base + `/task/3/october_25_practice/`;
};

/**
 * Creates trial media stimuli from October 25 trial set
 * Takes 6 neutrals and 6 affective posts (3 positive-frame, 3 negative-frame) from the october_25_trial folder
 * @returns Object with AS (3 neg + 3 pos) and NS (6 neutral) arrays
 */
export const createTrialMediaStimuliOctober25 = (): { AS: string[]; NS: string[] } => {
	// Available stimuli from october_25_trial folder
	const neutrals = ['N23', 'N6', 'N17', 'N21', 'N4', 'N7'];
	const negatives = ['Neg23', 'Neg14', 'Neg8'];
	const positives = ['P1', 'P15', 'P24'];

	// Select all available stimuli (6 neutrals, 3 negatives, 3 positives)
	const selectedNeutrals = fisherYatesShuffle(neutrals);
	const selectedNegatives = fisherYatesShuffle(negatives);
	const selectedPositives = fisherYatesShuffle(positives);

	// Combine negatives and positives for AS (Affective Stimuli)
	const affectiveStimuli = [...selectedNegatives, ...selectedPositives];

	return {
		AS: fisherYatesShuffle(affectiveStimuli),
		NS: fisherYatesShuffle(selectedNeutrals)
	};
};

export const getTrialMediaStimuliOctober25SrcBase = (base: string) => {
	return base + `/task/3/october_25_trial/`;
};

export const getFinalMediaStimuliSrcBase = (base: string) => {
	return base + `/task/3/final/`;
};

export const createMediaStimuliObjects = (ids: string[], src: string) => {
	return ids.map((id) => ({
		id: `${id}`,
		src: src + `${id}.png`
	}));
};

/**
 * Creates social media buttons with standard styling
 * @param reactText - Text for the positive reaction button (e.g., "Like", "React")
 * @param ignoreText - Text for the ignore/negative button (e.g., "Ignore", "Skip")
 * @param positiveActionId - ID for the positive action button (default: 'like')
 * @returns Array of ISocialMediaButton objects
 */
export const createSocialMediaButtons = (
	reactText: string,
	ignoreText: string
): ISocialMediaButton[] => {
	return [
		{
			text: reactText,
			id: 'like',
			color: '#647AA3',
			textColor: 'white'
		},
		{
			text: ignoreText,
			id: 'ignore',
			color: '#6A7B76',
			textColor: 'white'
		}
	];
};

/**
 * Creates shuffled social media buttons with standard styling
 * @param reactText - Text for the positive reaction button (e.g., "Like", "React")
 * @param ignoreText - Text for the ignore/negative button (e.g., "Ignore", "Skip")
 * @param positiveActionId - ID for the positive action button (default: 'like')
 * @returns Randomly shuffled array of ISocialMediaButton objects
 */
export const createShuffledSocialMediaButtons = (
	reactText: string,
	ignoreText: string
): ISocialMediaButton[] => {
	const buttons = createSocialMediaButtons(reactText, ignoreText);
	return fisherYatesShuffle(buttons); // TODO: log, which buttons there are
};
