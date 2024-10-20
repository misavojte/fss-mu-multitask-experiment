import type { AcceptedIntersect } from '$lib/database/repositories/Gaze.repository';
import type { IGazeSaver } from '$lib/interfaces/IGazeSaver';

export class GazeSaverMock implements IGazeSaver {
	async saveGazeInteraction(interaction: AcceptedIntersect): Promise<void> {
		console.log('saveGazeInteraction', interaction);
	}
}
