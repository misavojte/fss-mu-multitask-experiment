import { mediaStimuli } from '$lib/data/mediaStimuli.js';
import { fisherYatesShuffle } from './shuffle.js';

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
