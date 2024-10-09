export interface ActionLog {
	id?: number; // Automatically incremented ID (optional)
	timestamp: number; // Time of the action
	sessionId: string; // ID representing the user's session
	type: string; // Type of the action (e.g., "click", "view", etc.)
	value: string; // Additional details or value related to the action
}
