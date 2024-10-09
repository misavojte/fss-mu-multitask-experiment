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
