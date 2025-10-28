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

/**
 * Creates a balanced and fully randomized set of final-phase media stimuli.
 * Selects an equal number of negatives, positives, and neutrals, returning
 * neutrals under NS and all emotions (negatives + positives) under AS.
 *
 * For a 12-stimuli block, selects 4 neutral, 4 negative, 4 positive.
 */
export const createFinalMediaStimuliBalancedRandom = (
    omitTheseIdsFromSelection: string[] = []
): { AS: string[]; NS: string[] } => {
    const availableNeutrals = [...mediaStimuli.final.neutral].filter((id) => !omitTheseIdsFromSelection.includes(id));
    const availableNegatives = [...mediaStimuli.final.negative].filter((id) => !omitTheseIdsFromSelection.includes(id));
    const availablePositives = [...mediaStimuli.final.positive].filter((id) => !omitTheseIdsFromSelection.includes(id));

    const neutrals = fisherYatesShuffle(availableNeutrals).slice(0, 4);
    const negatives = fisherYatesShuffle(availableNegatives).slice(0, 4);
    const positives = fisherYatesShuffle(availablePositives).slice(0, 4);

    return {
        NS: fisherYatesShuffle(neutrals),
        AS: fisherYatesShuffle([...negatives, ...positives])
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

export const getTrainingMediaStimuliSrcBase = (base: string) => {
	return base + `/task/3/training/`;
};

export const getFinalMediaStimuliSrcBase = (base: string) => {
	return base + `/task/3/final/`;
};

export const createMediaStimuliObjects = (ids: string[], src: string) => {
	return ids.map((id) => ({
		id: `${id}`,
		src: src + `${id}`
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
