import type {
	ITaskPatternMatching,
	ITaskPatternMatchingObject
} from '$lib/interfaces/ITaskPatternMatching';

export class TaskPatternMatchingServiceBase implements ITaskPatternMatching {
	private base: string;

	constructor(base: string = '') {
		this.base = base;
	}

	public getTaskPatternMatchingObject(id: string, base: string = ''): ITaskPatternMatchingObject {
		// assuming that id is in "N_ssN" format
		const idParts = id.split('_');
		const matrixSrc = base + `${idParts[0]}_M_${idParts[1]}.jpeg`;
		const T1Src = base + `${idParts[0]}_T1_${idParts[1]}_md.jpeg`;
		const T2Src = base + `${idParts[0]}_T2_${idParts[1]}_md.jpeg`;
		const T3Src = base + `${idParts[0]}_T3_${idParts[1]}_md.jpeg`;
		const T4Src = base + `${idParts[0]}_T4_${idParts[1]}_md.jpeg`;
		return {
			id: id,
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
		const base = this.base + 'task/1/practice/tf1_';
		return ids.map((id) => this.getTaskPatternMatchingObject(id, base));
	}

	public getTaskPatternMatchingObjectsForTest(): ITaskPatternMatchingObject[] {
		const ids = ['1_ss3', '3_ss2', '35_ss1'];
		const base = this.base + 'task/1/test/tf1_';
		return ids.map((id) => this.getTaskPatternMatchingObject(id, base));
	}
}
