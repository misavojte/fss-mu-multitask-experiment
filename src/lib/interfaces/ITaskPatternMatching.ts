export interface ITaskPatternMatching {
	getTaskPatternMatchingObject(id: string): ITaskPatternMatchingObject;
	getTaskPatternMatchingObjectsForPractice(): ITaskPatternMatchingObject[];
	getTaskPatternMatchingObjectsForTest(): ITaskPatternMatchingObject[];
}

export interface ITaskPatternMatchingObject {
	id: string;
	matrixSrc: string;
	responses: {
		id: 'T1' | 'T2' | 'T3' | 'T4';
		src: string;
	}[];
}
