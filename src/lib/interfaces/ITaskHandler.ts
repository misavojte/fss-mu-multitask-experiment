export interface ITaskPatternMatchingObject {
	id: string;
	matrixSrc: string;
	responses: {
		id: string;
		src: string;
	}[];
}

export abstract class ATaskHandler {
	onEnd: () => void = () => {};
	addOnEndHandler(handler: () => void) {
		this.onEnd = handler;
	}
	removeOnEndHandler() {
		this.onEnd = () => {};
	}
	scoringType: 'prioritize' | 'even' = 'prioritize';
	score = 0;

	abstract get correctResponseId(): string;
	abstract getTaskPatternMatchingObject(id: string): ITaskPatternMatchingObject;
	abstract getTaskPatternMatchingObjectsForPractice(): ITaskPatternMatchingObject[];
	abstract getTaskPatternMatchingObjectsForTest(): ITaskPatternMatchingObject[];
	abstract logAction(type: string, value: string): void;

	private addPatternMatchingScore() {
		this.score += this.scoringType === 'prioritize' ? 3 : 1;
	}

	private addSocialMediaScore() {
		this.score += this.scoringType === 'prioritize' ? 1 : 1;
	}

	private addDocumentaryQuestionnaireScore() {
		this.score += this.scoringType === 'prioritize' ? 1 : 1;
	}

	handlePatternMatchingResponse(event: CustomEvent<string>) {
		this.logAction('pattern-matching-response', event.detail);
		if (event.detail === 'T1') {
			this.addPatternMatchingScore();
		}
	}

	handlePatternMatchingNext(event: CustomEvent<string>) {
		this.logAction('pattern-matching-next', event.detail);
	}
	handlePatternMatchingCompleted() {
		this.logAction('pattern-matching-completed', '');
		this.onEnd();
	}
	handleSocialMediaInteractorsShow(event: CustomEvent<{ id: string; timestamp: number }>) {
		this.logAction('social-media-interactors-show', event.detail.id);
	}
	handleSocialMediaInteractorsClick(event: CustomEvent<{ buttonId: string; timestamp: number }>) {
		this.logAction('social-media-interactors-click', event.detail.buttonId);
		this.addSocialMediaScore();
	}
	handleSocialMediaInteractorsHidden() {
		this.logAction('social-media-interactors-hidden', '');
	}
	handleSocialMediaInteractorsTimeout() {
		this.logAction('social-media-interactors-timeout', '');
	}
	handleSocialMediaInteractorsCompleted() {
		this.logAction('social-media-interactors-completed', '');
	}
	handleLoadStart(): void {
		this.logAction('task-load-start', '');
	}
	handleLoadFinish(): void {
		this.logAction('task-load-finish', '');
	}
	logScoringType() {
		this.logAction('task-version', this.scoringType);
	}
	handleDocumentaryQuestionnaireResponse(isCorrect: boolean): void {
		if (isCorrect) {
			this.addDocumentaryQuestionnaireScore();
		}
	}
}

export abstract class ATaskHandlerIntelligence extends ATaskHandler {
	private base: string;

	get correctResponseId(): string {
		return 'T1';
	}

	constructor(base: string = '') {
		super();
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
		const base = this.base + 'task/1/intelligence/practice/tf1_';
		return ids.map((id) => this.getTaskPatternMatchingObject(id, base));
	}

	public getTaskPatternMatchingObjectsForTest(): ITaskPatternMatchingObject[] {
		const ids = [
			`2_ss1`,
			`4_ss3`,
			`5_ss1`,
			'6_ss2',
			'7_ss3',
			'8_ss1',
			'9_ss2',
			'10_ss3',
			'11_ss1',
			'12_ss2',
			'13_ss3',
			'14_ss1',
			'15_ss2',
			'16_ss3',
			'17_ss1',
			'18_ss2',
			'19_ss3',
			'20_ss1',
			'21_ss2',
			'22_ss3',
			'23_ss1',
			'24_ss2',
			'25_ss3',
			'26_ss1',
			'27_ss2',
			'28_ss3',
			'29_ss1',
			'30_ss2',
			'31_ss3',
			'32_ss1',
			'33_ss2',
			'34_ss3',
			'35_ss1',
			'36_ss2',
			'37_ss3',
			'38_ss1',
			'39_ss2',
			'40_ss3',
			'41_ss1',
			'42_ss2',
			'43_ss3',
			'44_ss1',
			'45_ss2',
			'46_ss3',
			'47_ss1',
			'48_ss2',
			'49_ss3',
			'50_ss1',
			'51_ss2',
			'52_ss3',
			'53_ss1',
			'54_ss2',
			'55_ss3',
			'56_ss1',
			'57_ss2',
			'58_ss3',
			'59_ss1',
			'60_ss2',
			'61_ss3',
			'62_ss1',
			'63_ss2',
			'64_ss3',
			'65_ss1',
			'66_ss2',
			'67_ss3',
			'68_ss1',
			'69_ss2',
			'70_ss3',
			'71_ss1',
			'72_ss2',
			'73_ss3',
			'74_ss1',
			'75_ss2',
			'76_ss3',
			'77_ss1',
			'78_ss2',
			'79_ss3',
			'80_ss1'
		];

		const base = this.base + 'task/1/intelligence/test/tf1_';
		return ids.map((id) => this.getTaskPatternMatchingObject(id, base));
	}
}