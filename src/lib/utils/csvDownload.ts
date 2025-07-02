import type { ActionLog } from '$lib/database/models/ActionLog.model';
import type { Gaze } from '$lib/database/models/Gaze.model';

/**
 * Escapes a value for CSV format by wrapping in quotes and escaping internal quotes
 */
export function escapeCsvValue(value: string | number | boolean | null | undefined): string {
	if (value === null || value === undefined) {
		return '';
	}

	const stringValue = String(value);
	// If the value contains commas, quotes, or newlines, wrap in quotes and escape internal quotes
	if (
		stringValue.includes(',') ||
		stringValue.includes('"') ||
		stringValue.includes('\n') ||
		stringValue.includes('\r')
	) {
		return `"${stringValue.replace(/"/g, '""')}"`;
	}

	return stringValue;
}

/**
 * Converts ActionLog entries to CSV format
 */
export function actionLogsToCSV(logs: ActionLog[]): string {
	if (logs.length === 0) {
		return '';
	}

	const header = 'id,timestamp,sessionId,type,value';

	const rows = logs.map((log) => {
		const { id, timestamp, sessionId, type, value } = log;
		return [
			escapeCsvValue(id),
			escapeCsvValue(timestamp),
			escapeCsvValue(sessionId),
			escapeCsvValue(type),
			escapeCsvValue(value)
		].join(',');
	});

	return [header, ...rows].join('\n');
}

/**
 * Converts Gaze entries to CSV format
 */
export function gazesToCSV(logs: Gaze[]): string {
	if (logs.length === 0) {
		return '';
	}

	// Fixed header to match actual data structure
	const header =
		'id,timestamp,ISOtimestamp,intersectTimestamp,deviceTimestamp,deviceId,sessionId,gazeSessionId,xL,xLScreenRelative,xR,xRScreenRelative,yL,yLScreenRelative,yR,yRScreenRelative,validityL,validityR,aoi';

	const rows = logs.map((log) => {
		const {
			id,
			timestamp,
			ISOtimestamp,
			intersectTimestamp,
			deviceTimestamp,
			deviceId,
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
			aoi
		} = log;

		return [
			escapeCsvValue(id),
			escapeCsvValue(timestamp),
			escapeCsvValue(ISOtimestamp),
			escapeCsvValue(intersectTimestamp),
			escapeCsvValue(deviceTimestamp),
			escapeCsvValue(deviceId),
			escapeCsvValue(sessionId),
			escapeCsvValue(gazeSessionId),
			escapeCsvValue(xL),
			escapeCsvValue(xLScreenRelative),
			escapeCsvValue(xR),
			escapeCsvValue(xRScreenRelative),
			escapeCsvValue(yL),
			escapeCsvValue(yLScreenRelative),
			escapeCsvValue(yR),
			escapeCsvValue(yRScreenRelative),
			escapeCsvValue(validityL),
			escapeCsvValue(validityR),
			escapeCsvValue(aoi)
		].join(',');
	});

	return [header, ...rows].join('\n');
}

/**
 * Downloads a CSV string as a file
 */
export function downloadCSV(csvContent: string, filename: string): void {
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const url = URL.createObjectURL(blob);

	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	link.style.display = 'none';

	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);

	URL.revokeObjectURL(url);
}

/**
 * Formats session ID to readable date string
 */
export function parseSessionIdToDate(sessionId: string): string {
	try {
		const timestamp = parseInt(sessionId.split('-')[0]);
		if (isNaN(timestamp)) {
			return 'Invalid date';
		}
		return new Date(timestamp).toLocaleString();
	} catch (error) {
		return 'Invalid date';
	}
}
