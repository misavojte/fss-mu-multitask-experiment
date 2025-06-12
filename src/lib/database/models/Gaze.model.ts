export interface Gaze {
	id?: number; // Automatically incremented ID (optional)
	deviceId: string;
	deviceTimestamp: string;
	intersectTimestamp: string;
	timestamp: string;
	ISOtimestamp: string;
	sessionId: string; // the main session ID to interlink everything.. NOT the gazeSessionId
	gazeSessionId: string; // ID representing the user's session
	xL: number;
	xLScreenRelative: number;
	xR: number;
	xRScreenRelative: number;
	yL: number;
	yLScreenRelative: number;
	yR: number;
	yRScreenRelative: number;
	validityL: boolean;
	validityR: boolean;
	aoi: string; // Area of interest, if multiple AOIs are present, divided by a `;` if empty, set to ``
}
