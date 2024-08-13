import type {
	ITaskPatternMatching,
	ITaskPatternMatchingObject
} from '$lib/interfaces/ITaskPatternMatching';

export class TaskPatternMatchingServiceBase implements ITaskPatternMatching {
	public getTaskPatternMatchingObject(id: string): ITaskPatternMatchingObject {
		// assuming that id is in "N_ssN" format
		const idParts = id.split('_');
		const matrixSrc = `/task/1/tf1_${idParts[0]}_M_${idParts[1]}.jpeg`;
		const T1Src = `/task/1/tf1_${idParts[0]}_T1_${idParts[1]}_md.jpeg`;
		const T2Src = `/task/1/tf1_${idParts[0]}_T2_${idParts[1]}_md.jpeg`;
		const T3Src = `/task/1/tf1_${idParts[0]}_T3_${idParts[1]}_md.jpeg`;
		const T4Src = `/task/1/tf1_${idParts[0]}_T4_${idParts[1]}_md.jpeg`;
		return {
			id: '1',
			matrixSrc,
			responses: [
				{
					id: 'T1' as const,
					src: T1Src
				},
				{
					id: 'T2' as const,
					src: T2Src
				},
				{
					id: 'T3' as const,
					src: T3Src
				},
				{
					id: 'T4' as const,
					src: T4Src
				}
			]
		};
	}

	public getTaskPatternMatchingObjectsForPractice(): ITaskPatternMatchingObject[] {
		const ids = ['1_ss3', '3_ss2', '35_ss1'];
		return ids.map((id) => this.getTaskPatternMatchingObject(id));
	}

	public getTaskPatternMatchingObjectsForTest(): ITaskPatternMatchingObject[] {
		throw new Error('Method not implemented.');
	}
}
