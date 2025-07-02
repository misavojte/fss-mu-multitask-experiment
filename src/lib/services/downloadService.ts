import {
	getActionLogsBySessionId,
	deleteActionLogsBySessionId
} from '$lib/database/repositories/ActionLog.repository';
import {
	getGazesBySessionId,
	deleteGazesBySessionId
} from '$lib/database/repositories/Gaze.repository';
import { actionLogsToCSV, gazesToCSV, downloadCSV } from '$lib/utils/csvDownload';
import type { ActionLog } from '$lib/database/models/ActionLog.model';
import type { Gaze } from '$lib/database/models/Gaze.model';

/**
 * Downloads ActionLogs as CSV for a specific session or all sessions
 */
export async function downloadActionLogs(sessionId: string, filename: string): Promise<void> {
	try {
		let logs: ActionLog[];

		if (sessionId === 'all') {
			// Get all action logs directly rather than using the CSV function
			const db = await import('$lib/database/database');
			logs = await db.default.actionLogs.toArray();
		} else {
			logs = await getActionLogsBySessionId(sessionId);
		}

		const csvContent = actionLogsToCSV(logs);

		if (csvContent === '') {
			console.warn('No action logs found for download');
			return;
		}

		downloadCSV(csvContent, filename);
	} catch (error) {
		console.error('Failed to download action logs:', error);
		throw new Error('Failed to download action logs');
	}
}

/**
 * Downloads Gazes as CSV for a specific session or all sessions
 */
export async function downloadGazes(sessionId: string, filename: string): Promise<void> {
	try {
		let logs: Gaze[];

		if (sessionId === 'all') {
			// Get all gazes directly rather than using the CSV function
			const db = await import('$lib/database/database');
			logs = await db.default.gazes.toArray();
		} else {
			logs = await getGazesBySessionId(sessionId);
		}

		const csvContent = gazesToCSV(logs);

		if (csvContent === '') {
			console.warn('No gaze data found for download');
			return;
		}

		downloadCSV(csvContent, filename);
	} catch (error) {
		console.error('Failed to download gazes:', error);
		throw new Error('Failed to download gazes');
	}
}

/**
 * Deletes a session's data (both action logs and gazes)
 */
export async function deleteSession(sessionId: string): Promise<void> {
	try {
		await Promise.all([deleteActionLogsBySessionId(sessionId), deleteGazesBySessionId(sessionId)]);
	} catch (error) {
		console.error('Failed to delete session:', error);
		throw new Error('Failed to delete session');
	}
}

/**
 * Generates filename for action logs download
 */
export function generateActionLogsFilename(sessionId: string): string {
	if (sessionId === 'all') {
		return 'multitask_action_allSessions.csv';
	}
	return `multitask_action_${sessionId}.csv`;
}

/**
 * Generates filename for gazes download
 */
export function generateGazesFilename(sessionId: string): string {
	if (sessionId === 'all') {
		return 'multitask_gaze_allSessions.csv';
	}
	return `multitask_gaze_${sessionId}.csv`;
}
