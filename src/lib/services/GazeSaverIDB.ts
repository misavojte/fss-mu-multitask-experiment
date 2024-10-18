import {
	saveGazeInteraction,
	type AcceptedIntersect
} from '$lib/database/repositories/Gaze.repository';

export class GazeSaverIDB {
	private readonly _sessionId: string;

	constructor(sessionId: string) {
		this._sessionId = sessionId;
	}

	async saveGazeInteraction(interaction: AcceptedIntersect): Promise<void> {
		return saveGazeInteraction(interaction, this._sessionId);
	}
}
