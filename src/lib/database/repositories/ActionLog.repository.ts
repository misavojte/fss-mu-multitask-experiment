// src/lib/db/repositories/actionLogRepository.ts
import db from '../database';
import type { ActionLog } from '../models/ActionLog.model';

/**
 * Saves a new action log entry to the IndexedDB.
 *
 * @param log - The action log object.
 */
export async function saveActionLog(log: Omit<ActionLog, 'id'>): Promise<void> {
	try {
		await db.actionLogs.add(log);
		console.log('Action log saved:', log);
	} catch (error) {
		console.error('Failed to save action log:', error);
	}
}

/**
 * Retrieves all action logs for a specific session ID.
 *
 * @param sessionId - The session ID to filter logs by.
 * @returns A promise that resolves to an array of ActionLog entries.
 */
export async function getActionLogsBySessionId(sessionId: string): Promise<ActionLog[]> {
	return db.actionLogs.where('sessionId').equals(sessionId).toArray();
}

/**
 * Retrieves all unique session IDs from the action logs.
 *
 * @returns A promise that resolves to an array of unique session IDs.
 */
export async function getUniqueSessionIds(): Promise<string[]> {
	try {
		// Use Dexie's `orderBy` and `uniqueKeys` to get unique session IDs directly
		const sessionIds = await db.actionLogs.orderBy('sessionId').uniqueKeys();
		return sessionIds as string[];
	} catch (error) {
		console.error('Failed to fetch unique session IDs:', error);
		return [];
	}
}

/**
 * Retrieves the first value of the type "questionnaire-linking" for the specified session ID.
 *
 * @param sessionId - The session ID to filter logs by.
 *
 * @returns A promise that resolves to the value of the first "questionnaire-linking" log entry.
 */
export async function getQuestionnaireLinkingValue(sessionId: string): Promise<string | undefined> {
	const log = await db.actionLogs
		.where('sessionId')
		.equals(sessionId)
		.and((log) => log.type === 'questionnaire-linking')
		.first();
	return log?.value;
}
/**
 * Exports action logs for a specific session ID as a CSV string.
 *
 * @param sessionId - The session ID to filter logs by.
 * @returns A promise that resolves to a CSV string.
 */
export async function getActionLogsAsCSV(sessionId: string): Promise<string> {
	const logs = await getActionLogsBySessionId(sessionId);
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
export async function getAllActionLogsAsCSV(): Promise<string> {
	try {
		const logs = await db.actionLogs.toArray();
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
 * Converts an array of ActionLog entries into a CSV string.
 *
 * @param logs - The array of ActionLog entries to convert.
 * @returns A CSV string representation of the logs.
 */
function logsToCSV(logs: ActionLog[]): string {
	if (logs.length === 0) {
		return '';
	}

	// Construct CSV header
	const header = 'id,timestamp,sessionId,type,value';

	// Construct CSV rows from log entries
	const rows = logs.map((log) => {
		const { id, timestamp, sessionId, type, value } = log;
		// Ensure values are properly escaped and formatted for CSV
		return `${id},${timestamp},"${sessionId}","${type}","${value.replace(/"/g, '""')}"`;
	});

	// Join header and rows to form the final CSV string
	return [header, ...rows].join('\n');
}
