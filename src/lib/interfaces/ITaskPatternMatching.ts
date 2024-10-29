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

export abstract class ATaskPatternMatchingHandler {
	onEnd: () => void = () => {};
	addOnEndHandler(handler: () => void) {
		this.onEnd = handler;
	}
	removeOnEndHandler() {
		this.onEnd = () => {};
	}
	score = 0;
	abstract handlePatternMatchingResponse(event: CustomEvent<'T1' | 'T2' | 'T3' | 'T4'>): void;
	abstract handlePatternMatchingNext(event: CustomEvent<string>): void;
	abstract handlePatternMatchingCompleted(): void;
	abstract handleSocialMediaInteractorsShow(
		event: CustomEvent<{ id: string; timestamp: number }>
	): void;
	abstract handleSocialMediaInteractorsClick(
		event: CustomEvent<{ buttonId: string; timestamp: number }>
	): void;
	abstract handleSocialMediaInteractorsHidden(): void;
	abstract handleSocialMediaInteractorsTimeout(): void;
	abstract handleSocialMediaInteractorsCompleted(): void;
	abstract handleLoadStart(): void;
	abstract handleLoadFinish(): void;
	abstract logVersion(version: 'prioritize' | 'even'): void;
	abstract handleDocumentaryQuestionnaireResponse(isCorrect: boolean): void;
}
