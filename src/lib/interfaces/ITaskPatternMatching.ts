export interface ITaskPatternMatching {
	get correctResponseId(): string;
	getTaskPatternMatchingObject(id: string): ITaskPatternMatchingObject;
	getTaskPatternMatchingObjectsForPractice(): ITaskPatternMatchingObject[];
	getTaskPatternMatchingObjectsForTest(): ITaskPatternMatchingObject[];
}

export interface ITaskPatternMatchingObject {
	id: string;
	matrixSrc: string;
	responses: {
		id: string;
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
	variant: 'prioritize' | 'even' = 'prioritize';
	score = 0;
	abstract handlePatternMatchingResponse(event: CustomEvent<string>): void;
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
