/**
 * Generic function to extract IDs from any array of objects that have an id field
 */
export function extractIds<T extends { id: string }>(items: T[]): string[] {
	return items.map((item) => item.id);
}

/**
 * Converts an array of objects with IDs to a JSON string of just the IDs
 */
export function toIdArrayJson<T extends { id: string }>(items: T[]): string {
	return JSON.stringify(extractIds(items));
}
