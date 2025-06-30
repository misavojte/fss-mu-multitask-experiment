export interface ITaskPatternMatchingObjectImage {
	type: 'image';
	id: string;
	matrixSrc: string;
	responses: {
		id: string;
		src: string;
	}[];
}

export interface ITaskPatternMatchingObjectText {
	type: 'text';
	id: string;
	matrixContent: string;
	responses: {
		id: string;
		content: string;
	}[];
}

export type ITaskPatternMatchingObject =
	| ITaskPatternMatchingObjectImage
	| ITaskPatternMatchingObjectText;

export interface ISocialMediaStimulus {
	id: string;
	src: string;
}

export interface ISocialMediaButton {
	text: string;
	id: string;
	color: string;
	textColor: string;
	html?: string;
}

export interface IVideoConfiguration {
	src: string;
	wordOccurence: string;
	wordOccurenceTolerance: number;
	wordOccurenceTimestamps: number[];
	startTime: number;
}

export abstract class ATaskHandler {
	onEnd: () => void = () => {};
	addOnEndHandler(handler: () => void) {
		this.onEnd = handler;
	}
	removeOnEndHandler() {
		this.onEnd = () => {};
	}
	sentiment: 'negative' | 'positive' = 'negative';
	scoringType: 'prioritize' | 'even' = 'prioritize';
	score = 0;
	socialMediaScore = 0;
	documentaryScore = 0;
	patternMatchingScore = 0;
	maxScore: number;
	maxSocialMediaScore: number;
	maxDocumentaryScore: number;
	maxPatternMatchingScore: number;

	// Social media and video configuration
	socialMediaStimuliNS: ISocialMediaStimulus[];
	socialMediaStimuliAS: ISocialMediaStimulus[];
	socialMediaButtons: ISocialMediaButton[];
	videoConfiguration: IVideoConfiguration;

	// Pattern matching configuration
	taskPatternMatchingObjects: ITaskPatternMatchingObject[];

	/**
	 * The ID of the correct response for pattern matching tasks.
	 * This should be consistent for all pattern matching objects within a single task handler instance.
	 * Examples: 'T1' for intelligence tasks, '2' for math tasks
	 */
	taskPatternCorrectResponseId: string;

	constructor(
		socialMediaStimuliNS: ISocialMediaStimulus[] = [],
		socialMediaStimuliAS: ISocialMediaStimulus[] = [],
		socialMediaButtons: ISocialMediaButton[] = [],
		videoConfiguration: IVideoConfiguration | null = null,
		taskPatternMatchingObjects: ITaskPatternMatchingObject[] = [],
		taskPatternCorrectResponseId: string,
		scoringType: 'prioritize' | 'even' = 'prioritize'
	) {
		this.socialMediaStimuliNS = socialMediaStimuliNS;
		this.socialMediaStimuliAS = socialMediaStimuliAS;
		this.socialMediaButtons = socialMediaButtons;
		this.videoConfiguration = videoConfiguration || {
			src: '',
			wordOccurence: '',
			wordOccurenceTolerance: 0,
			wordOccurenceTimestamps: [],
			startTime: 0
		};
		this.taskPatternMatchingObjects = taskPatternMatchingObjects;
		this.taskPatternCorrectResponseId = taskPatternCorrectResponseId;
		this.scoringType = scoringType;

		// Calculate maximum scores based on provided stimuli
		const numberOfSocialMediaInteractors =
			socialMediaStimuliNS.length + socialMediaStimuliAS.length;
		const numberOfDocumentaryStops = this.videoConfiguration.wordOccurenceTimestamps.length;
		const numberOfPatternMatchingObjects = taskPatternMatchingObjects.length;

		this.maxSocialMediaScore = numberOfSocialMediaInteractors * this.pointsOnCorrectSocialMedia;
		this.maxDocumentaryScore =
			numberOfDocumentaryStops * this.pointsOnCorrectDocumentaryQuestionnaire;
		this.maxPatternMatchingScore =
			numberOfPatternMatchingObjects * this.pointsOnCorrectPatternMatching;
		this.maxScore =
			this.maxSocialMediaScore + this.maxDocumentaryScore + this.maxPatternMatchingScore;
	}

	get pointsOnCorrectPatternMatching(): number {
		return this.scoringType === 'prioritize' ? 3 : 1;
	}
	get pointsOnCorrectSocialMedia(): number {
		return 1;
	}
	get pointsOnCorrectDocumentaryQuestionnaire(): number {
		return 1;
	}
	abstract logAction(type: string, value: string): void;

	private addPatternMatchingScore() {
		this.score += this.pointsOnCorrectPatternMatching;
		this.patternMatchingScore += this.pointsOnCorrectPatternMatching;
	}

	private addSocialMediaScore() {
		this.score += this.pointsOnCorrectSocialMedia;
		this.socialMediaScore += this.pointsOnCorrectSocialMedia;
	}

	private addDocumentaryQuestionnaireScore() {
		this.score += this.pointsOnCorrectDocumentaryQuestionnaire;
		this.documentaryScore += this.pointsOnCorrectDocumentaryQuestionnaire;
	}

	handlePatternMatchingResponse(event: CustomEvent<string>) {
		this.logAction('pattern-matching-response', event.detail);
		if (event.detail === this.taskPatternCorrectResponseId) {
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
		this.logAction('task-version', this.scoringType);
		this.logAction('task-sentiment', this.sentiment);
		// log all stimuli, JSON stringified
		this.logAction('task-stimuli-social-media-NS', JSON.stringify(this.socialMediaStimuliNS));
		this.logAction('task-stimuli-social-media-AS', JSON.stringify(this.socialMediaStimuliAS));
		this.logAction('task-stimuli-social-media-buttons', JSON.stringify(this.socialMediaButtons));
		this.logAction(
			'task-stimuli-pattern-matching',
			JSON.stringify(this.taskPatternMatchingObjects)
		);
		this.logAction('task-stimuli-video', JSON.stringify(this.videoConfiguration));
	}
	handleLoadFinish(): void {
		this.logAction('task-load-finish', '');
	}
	handleDocumentaryResponse(
		isCorrect: boolean,
		videoTime: number,
		timestampTime: number | undefined
	) {
		const correctness = isCorrect ? 'correct' : 'incorrect';
		const JSONValue = JSON.stringify({
			correctness,
			videoTime,
			timestampTime
		});
		this.logAction('documentary-response', JSONValue);
		if (isCorrect) {
			this.addDocumentaryQuestionnaireScore();
		}
	}
}

/**
 * Legacy task handler for the math task instead of the intelligence task in the pattern matching task
 * Now, the stimuli are handled outside of the task handler
 */
export abstract class ATaskHandlerMath extends ATaskHandler {
	// Correct response is always the second one
	constructor(
		socialMediaStimuliNS: ISocialMediaStimulus[] = [],
		socialMediaStimuliAS: ISocialMediaStimulus[] = [],
		socialMediaButtons: ISocialMediaButton[] = [],
		videoConfiguration: IVideoConfiguration | null = null,
		taskPatternMatchingObjects: ITaskPatternMatchingObject[] = [],
		taskPatternCorrectResponseId: string,
		scoringType: 'prioritize' | 'even' = 'prioritize'
	) {
		super(
			socialMediaStimuliNS,
			socialMediaStimuliAS,
			socialMediaButtons,
			videoConfiguration,
			taskPatternMatchingObjects,
			taskPatternCorrectResponseId,
			scoringType
		);
	}
}

/**
 * Legacy task handler for the intelligence task in the pattern matching task
 * Now, the stimuli are handled outside of the task handler
 */
export abstract class ATaskHandlerIntelligence extends ATaskHandler {
	constructor(
		socialMediaStimuliNS: ISocialMediaStimulus[] = [],
		socialMediaStimuliAS: ISocialMediaStimulus[] = [],
		socialMediaButtons: ISocialMediaButton[] = [],
		videoConfiguration: IVideoConfiguration | null = null,
		taskPatternMatchingObjects: ITaskPatternMatchingObject[] = [],
		taskPatternCorrectResponseId: string,
		scoringType: 'prioritize' | 'even' = 'prioritize'
	) {
		super(
			socialMediaStimuliNS,
			socialMediaStimuliAS,
			socialMediaButtons,
			videoConfiguration,
			taskPatternMatchingObjects,
			taskPatternCorrectResponseId,
			scoringType
		);
	}
}
