// src/lib/db/repositories/actionLogRepository.ts
import db from '../database';
import type { Gaze } from '../models/Gaze.model';
import type { GazeDataPoint } from '@473783/develex-core';

type GazeInteractionEvent = {
	type: string;
	sessionId: string;
	timestamp: number;
};

export type AcceptedIntersect = GazeInteractionEvent & {
	type: 'intersect';
	target: Element[];
	gazeData: GazeDataPoint;
};

export async function saveGazeInteraction(
	interaction: AcceptedIntersect,
	sessionId: string
): Promise<void> {
	const { timestamp, target, gazeData } = interaction;
	const {
		xL,
		xLScreenRelative,
		xR,
		xRScreenRelative,
		yL,
		yLScreenRelative,
		yR,
		yRScreenRelative,
		validityL,
		validityR,
		fixationDuration,
		fixationId
	} = gazeData;
	const aoi = target.map((el) => el.id).join(';');
	await saveGaze({
		sessionId,
		gazeSessionId: interaction.sessionId,
		timestamp,
		ISOtimestamp: new Date(timestamp).toISOString(),
		xL,
		xLScreenRelative,
		xR,
		xRScreenRelative,
		yL,
		yLScreenRelative,
		yR,
		yRScreenRelative,
		validityL,
		validityR,
		fixationDuration,
		fixationId,
		aoi
	});
}

/**
 * Saves a new action log entry to the IndexedDB.
 *
 * @param log - The action log object.
 */
export async function saveGaze(log: Omit<Gaze, 'id'>): Promise<void> {
	try {
		await db.gazes.add(log);
		console.log('Action log saved:', log);
	} catch (error) {
		console.error('Failed to save action log:', error);
	}
}

/**
 * Retrieves all action logs for a specific session ID.
 *
 * @param sessionId - The session ID to filter logs by.
 * @returns A promise that resolves to an array of Gaze entries.
 */
export async function getGazesBySessionId(sessionId: string): Promise<Gaze[]> {
	return db.gazes.where('sessionId').equals(sessionId).toArray();
}

/**
 * Retrieves all unique session IDs from the action logs.
 *
 * @returns A promise that resolves to an array of unique session IDs.
 */
export async function getUniqueSessionIds(): Promise<string[]> {
	try {
		// Use Dexie's `orderBy` and `uniqueKeys` to get unique session IDs directly
		const sessionIds = await db.gazes.orderBy('sessionId').uniqueKeys();
		return sessionIds as string[];
	} catch (error) {
		console.error('Failed to fetch unique session IDs:', error);
		return [];
	}
}

/**
 * Exports action logs for a specific session ID as a CSV string.
 *
 * @param sessionId - The session ID to filter logs by.
 * @returns A promise that resolves to a CSV string.
 */
export async function getGazesAsCSV(sessionId: string): Promise<string> {
	const logs = await getGazesBySessionId(sessionId);
	if (logs.length === 0) {
		return '';
	}

	return logsToCSV(logs);
}

/**
 * Exports all action logs as a single CSV string.
 *
 * @returns A promise that resolves to a CSV string containing all logs.
 */
export async function getAllGazesAsCSV(): Promise<string> {
	try {
		const logs = await db.gazes.toArray();
		if (logs.length === 0) {
			return '';
		}

		return logsToCSV(logs);
	} catch (error) {
		console.error('Failed to export all logs as CSV:', error);
		return '';
	}
}

/**
 * Converts an array of Gaze entries into a CSV string.
 *
 * @param logs - The array of Gaze entries to convert.
 * @returns A CSV string representation of the logs.
 */
function logsToCSV(logs: Gaze[]): string {
	if (logs.length === 0) {
		return '';
	}

	// Construct CSV header
	const header =
		'id,timestamp,ISOtimestamp,sessionId,gazeSessionId,xL,xLScreenRelative,xR,xRScreenRelative,yL,yLScreenRelative,yR,yRScreenRelative,validityL,validityR,fixationDuration,fixationId,aoi';

	// Construct CSV rows from log entries
	const rows = logs.map((log) => {
		const {
			id,
			timestamp,
			ISOtimestamp,
			sessionId,
			gazeSessionId,
			xL,
			xLScreenRelative,
			xR,
			xRScreenRelative,
			yL,
			yLScreenRelative,
			yR,
			yRScreenRelative,
			validityL,
			validityR,
			fixationDuration,
			fixationId,
			aoi
		} = log;
		// Ensure values are properly escaped and formatted for CSV
		return `${id},${timestamp},${ISOtimestamp},${sessionId},${gazeSessionId},${xL},${xLScreenRelative},${xR},${xRScreenRelative},${yL},${yLScreenRelative},${yR},${yRScreenRelative},${validityL},${validityR},${fixationDuration},${fixationId},${aoi}`;
	});

	// Join header and rows to form the final CSV string
	return [header, ...rows].join('\n');
}

export async function deleteGazesBySessionId(sessionId: string): Promise<void> {
	try {
		await db.gazes.where('sessionId').equals(sessionId).delete();
		console.log('Gazes deleted for session:', sessionId);
	} catch (error) {
		console.error('Failed to delete gazes:', error);
	}
}
