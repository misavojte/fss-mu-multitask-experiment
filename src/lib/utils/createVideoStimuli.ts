import type { IVideoConfiguration } from '$lib/interfaces/ITaskHandler';

/**
 * Creates video configuration for practice tasks
 * @param base - Base path for assets (e.g., from $app/paths)
 * @returns IVideoConfiguration object for practice scenario
 */
export function createPracticeVideoConfiguration(base: string): IVideoConfiguration {
	return {
		src: base + '/video/trial.mp4',
		wordOccurence: 'mokřad*',
		wordOccurenceTolerance: 10000,
		wordOccurenceTimestamps: [423000, 749000],
		startTime: 415000
	};
}

/**
 * Creates video configuration for trial/test tasks
 * @param base - Base path for assets (e.g., from $app/paths)
 * @returns IVideoConfiguration object for trial scenario with full mokřady timestamps
 */
export function createTrialVideoConfiguration(base: string): IVideoConfiguration {
	// Complete list of mokřady occurrence timestamps in the trial video
	const mokradyTimestamps = [16000, 72000, 83000, 157000, 169000, 423000, 749000];

	return {
		src: base + '/video/trial.mp4',
		wordOccurence: 'mokřad*',
		wordOccurenceTolerance: 10000,
		wordOccurenceTimestamps: mokradyTimestamps,
		startTime: 0
	};
}

/**
 * Creates a custom video configuration with specific parameters
 * @param src - Video source path
 * @param wordOccurence - Word or pattern to track (e.g., 'mokřad*')
 * @param wordOccurenceTolerance - Tolerance in milliseconds for word occurrence detection
 * @param wordOccurenceTimestamps - Array of timestamps where the word occurs
 * @param startTime - Video start time in milliseconds
 * @returns IVideoConfiguration object with custom parameters
 */
export function createCustomVideoConfiguration(
	src: string,
	wordOccurence: string = 'mokřad*',
	wordOccurenceTolerance: number = 10000,
	wordOccurenceTimestamps: number[] = [],
	startTime: number = 0
): IVideoConfiguration {
	return {
		src,
		wordOccurence,
		wordOccurenceTolerance,
		wordOccurenceTimestamps,
		startTime
	};
}
