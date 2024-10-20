import type { AcceptedIntersect } from '$lib/database/repositories/Gaze.repository';

export interface IGazeSaver {
	saveGazeInteraction(interaction: AcceptedIntersect): Promise<void>;
}
