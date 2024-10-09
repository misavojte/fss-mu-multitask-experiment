export interface ActionLog {
	id?: number; // Automatically incremented ID (optional)
	timestamp: string; // Time of the action in ISO string format
	sessionId: string; // ID representing the user's session
	type: string; // Type of the action (e.g., "click", "view", etc.)
	value: string; // Additional details or value related to the action
}
