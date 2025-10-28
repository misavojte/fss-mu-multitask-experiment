import { toIdArrayJson } from '$lib/utils/taskLogging';

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
	positionXDocumentary?: number;
	positionYDocumentary?: number;
	widthDocumentary?: number;
	heightDocumentary?: number;
	muted?: boolean;
}

export interface ITaskHandlerConfig {
	socialMediaStimuliNS?: ISocialMediaStimulus[];
	socialMediaStimuliAS?: ISocialMediaStimulus[];
	socialMediaButtons?: ISocialMediaButton[];
	videoConfiguration?: IVideoConfiguration | null;
	taskPatternMatchingObjects?: ITaskPatternMatchingObject[];
	taskPatternCorrectResponseId: string;
	pointsPatternMatching: number;
	pointsSocialMedia: number;
	pointsDocumentary: number;
	/**
	 * Presentation pattern for social media stimuli.
	 *
	 * - Purpose: Controls the order in which NS (non-sentiment) and AS (affective/sentiment)
	 *   stimuli are presented in the social media task.
	 * - Non-empty value: The underlying component will follow this pattern as far as
	 *   available counts allow, then append any remaining stimuli.
	 * - Empty array: Triggers absolute random order — NS and AS pools are merged and a
	 *   Fisher–Yates shuffle is applied across the combined list (no alternation enforced).
	 */
	socialMediaStimuliPresentationPattern: Array<'NS' | 'AS'>;
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
	score = 0;
	socialMediaScore = 0;
	documentaryScore = 0;
	patternMatchingScore = 0;
    maxScore: number = 0;
    maxSocialMediaScore: number = 0;
    maxDocumentaryScore: number = 0;
    maxPatternMatchingScore: number = 0;

    // Explicit point configuration per task type
    pointsPatternMatching: number = 1;
    pointsSocialMedia: number = 1;
    pointsDocumentary: number = 1;

	// Tracking displayed/started stimuli counts
	socialMediaStimuliDisplayedCount = 0;
	patternMatchingStimuliDisplayedCount = 0;
	documentaryStimuliDisplayedCount = 0;

	// Track unique stimuli IDs to avoid double counting
	private displayedPatternMatchingIds = new Set<string>();
	private displayedDocumentaryTimestamps = new Set<number>();

	// Social media and video configuration
	socialMediaStimuliNS: ISocialMediaStimulus[];
	socialMediaStimuliAS: ISocialMediaStimulus[];
	socialMediaButtons: ISocialMediaButton[];
	videoConfiguration: IVideoConfiguration | null;

	// Pattern matching configuration
	taskPatternMatchingObjects: ITaskPatternMatchingObject[];

	// Social media presentation pattern
	socialMediaStimuliPresentationPattern: Array<'NS' | 'AS'>;

	// Ordered social media stimuli (computed from pattern)
	orderedSocialMediaStimuli: ISocialMediaStimulus[] = [];

	/**
	 * The ID of the correct response for pattern matching tasks.
	 * This should be consistent for all pattern matching objects within a single task handler instance.
	 * Examples: 'T1' for intelligence tasks, '2' for math tasks
	 */
	taskPatternCorrectResponseId: string;

	constructor(config: ITaskHandlerConfig) {
		this.socialMediaStimuliNS = config.socialMediaStimuliNS || [];
		this.socialMediaStimuliAS = config.socialMediaStimuliAS || [];
		this.socialMediaButtons = config.socialMediaButtons || [];
		this.videoConfiguration = config.videoConfiguration || {
			src: '',
			wordOccurence: '',
			wordOccurenceTolerance: 0,
			wordOccurenceTimestamps: [],
			startTime: 0,
			positionXDocumentary: 825,
			positionYDocumentary: 640,
			widthDocumentary: 650,
			heightDocumentary: 366,
			muted: true
		};
		this.taskPatternMatchingObjects = config.taskPatternMatchingObjects || [];
		this.taskPatternCorrectResponseId = config.taskPatternCorrectResponseId;
		this.socialMediaStimuliPresentationPattern = config.socialMediaStimuliPresentationPattern || ['NS', 'NS', 'AS', 'AS'];

		// Set points from config
		this.pointsPatternMatching = config.pointsPatternMatching;
		this.pointsSocialMedia = config.pointsSocialMedia;
		this.pointsDocumentary = config.pointsDocumentary;
		
		// Create ordered stimuli from pattern
		this.createOrderedSocialMediaStimuli();
		this.recalculateMaxScores();
	}

    get pointsOnCorrectPatternMatching(): number {
        return this.pointsPatternMatching;
    }
    get pointsOnCorrectSocialMedia(): number {
        return this.pointsSocialMedia;
    }
    get pointsOnCorrectDocumentaryQuestionnaire(): number {
        return this.pointsDocumentary;
    }
	abstract logAction(type: string, value: string): void;

    /**
     * Update the point configuration for correctness scoring.
     */
    setPointValues(points: { pattern: number; social: number; documentary: number }): void {
        this.pointsPatternMatching = points.pattern;
        this.pointsSocialMedia = points.social;
        this.pointsDocumentary = points.documentary;
    }

	/**
	 * Recalculate maximum attainable scores based on stimuli counts and point config.
	 */
	recalculateMaxScores(): void {
		const numberOfSocialMediaInteractors =
			this.socialMediaStimuliNS.length + this.socialMediaStimuliAS.length;
		const numberOfDocumentaryStops = this.videoConfiguration?.wordOccurenceTimestamps?.length || 0;
		const numberOfPatternMatchingObjects = this.taskPatternMatchingObjects.length;

		this.maxSocialMediaScore = numberOfSocialMediaInteractors * this.pointsOnCorrectSocialMedia;
		this.maxDocumentaryScore =
			numberOfDocumentaryStops * this.pointsOnCorrectDocumentaryQuestionnaire;
		this.maxPatternMatchingScore =
			numberOfPatternMatchingObjects * this.pointsOnCorrectPatternMatching;
		this.maxScore =
			this.maxSocialMediaScore + this.maxDocumentaryScore + this.maxPatternMatchingScore;
	}

	/**
	 * Create ordered social media stimuli based on presentation pattern.
	 * Moves the complex shuffling logic from TaskSocialMedia component to here.
	 */
	private createOrderedSocialMediaStimuli(): void {
		// Shuffle both arrays once
		const shuffledStimuliNS = [...this.socialMediaStimuliNS].sort(() => Math.random() - 0.5);
		const shuffledStimuliAS = [...this.socialMediaStimuliAS].sort(() => Math.random() - 0.5);
		
		// If no pattern provided, return an absolute random shuffle across both pools
		if (this.socialMediaStimuliPresentationPattern.length === 0) {
			this.orderedSocialMediaStimuli = [...this.socialMediaStimuliNS, ...this.socialMediaStimuliAS]
				.sort(() => Math.random() - 0.5);
			return;
		}

		// Create a pattern that ensures all stimuli are used
		let currentPattern: Array<'NS' | 'AS'> = [];
		let remainingNS = shuffledStimuliNS.length;
		let remainingAS = shuffledStimuliAS.length;

		// First, try to follow the original pattern as much as possible
		for (const type of this.socialMediaStimuliPresentationPattern) {
			if (type === 'NS' && remainingNS > 0) {
				currentPattern.push('NS');
				remainingNS--;
			} else if (type === 'AS' && remainingAS > 0) {
				currentPattern.push('AS');
				remainingAS--;
			}
		}

		// Then add remaining stimuli in any order
		while (remainingNS > 0 || remainingAS > 0) {
			if (remainingNS > 0) {
				currentPattern.push('NS');
				remainingNS--;
			}
			if (remainingAS > 0) {
				currentPattern.push('AS');
				remainingAS--;
			}
		}

		// Create the sequence following the pattern
		const orderedStimuli: ISocialMediaStimulus[] = [];
		let nsIndex = 0;
		let asIndex = 0;

		for (const type of currentPattern) {
			if (type === 'NS' && nsIndex < shuffledStimuliNS.length) {
				orderedStimuli.push(shuffledStimuliNS[nsIndex]);
				nsIndex++;
			} else if (type === 'AS' && asIndex < shuffledStimuliAS.length) {
				orderedStimuli.push(shuffledStimuliAS[asIndex]);
				asIndex++;
			}
		}

		this.orderedSocialMediaStimuli = orderedStimuli;
	}

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
		// Increment display count only once per stimulus (when first response is made)
		const currentStimulusIndex = this.patternMatchingStimuliDisplayedCount;
		if (currentStimulusIndex < this.taskPatternMatchingObjects.length) {
			const currentStimulusId = this.taskPatternMatchingObjects[currentStimulusIndex].id;
			if (!this.displayedPatternMatchingIds.has(currentStimulusId)) {
				this.displayedPatternMatchingIds.add(currentStimulusId);
				this.patternMatchingStimuliDisplayedCount++;
			}
		}
		if (event.detail === this.taskPatternCorrectResponseId) {
			this.addPatternMatchingScore();
		}
	}

	handlePatternMatchingNext(event: CustomEvent<string>) {
		this.logAction('pattern-matching-next', event.detail);
		// Count is handled in handlePatternMatchingResponse to avoid missing the first stimulus
	}
	handlePatternMatchingCompleted() {
		this.logAction('pattern-matching-completed', '');
		this.logFinalDisplayCounts();
		this.onEnd();
	}
	handleSocialMediaInteractorsShow(event: CustomEvent<{ id: string; timestamp: number }>) {
		this.logAction('social-media-interactors-show', event.detail.id);
		this.socialMediaStimuliDisplayedCount++;
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
		this.logFinalDisplayCounts();
	}
    handleLoadStart(): void {
		this.logAction('task-load-start', '');
		this.logAction('task-sentiment', this.sentiment);
        // Log numeric point configuration
        this.logAction('task-points-pattern', String(this.pointsPatternMatching));
        this.logAction('task-points-social', String(this.pointsSocialMedia));
        this.logAction('task-points-documentary', String(this.pointsDocumentary));
		// log all stimuli - for specified event types, save only arrays of IDs
		this.logAction('task-stimuli-social-media-ordered', toIdArrayJson(this.orderedSocialMediaStimuli));
		this.logAction('task-stimuli-social-media-buttons', toIdArrayJson(this.socialMediaButtons));
		this.logAction('task-stimuli-pattern-matching', toIdArrayJson(this.taskPatternMatchingObjects));
		this.logAction('task-stimuli-video', JSON.stringify(this.videoConfiguration));
		// Reset stimulus display counters at task start
		this.socialMediaStimuliDisplayedCount = 0;
		this.patternMatchingStimuliDisplayedCount = 0;
		this.documentaryStimuliDisplayedCount = 0;
		this.displayedPatternMatchingIds.clear();
		this.displayedDocumentaryTimestamps.clear();
	}
	handleLoadFinish(): void {
		this.logAction('task-load-finish', '');
	}

	/**
	 * Log final stimulus display counts - call this when task ends
	 */
	logFinalDisplayCounts(): void {
		this.logAction(
			'task-stimuli-displayed-social-media',
			this.socialMediaStimuliDisplayedCount.toString()
		);
		this.logAction(
			'task-stimuli-displayed-pattern-matching',
			this.patternMatchingStimuliDisplayedCount.toString()
		);
		this.logAction(
			'task-stimuli-displayed-documentary',
			this.documentaryStimuliDisplayedCount.toString()
		);
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
		// Count unique documentary stimuli (word occurrences) only once
		if (timestampTime !== undefined && !this.displayedDocumentaryTimestamps.has(timestampTime)) {
			this.displayedDocumentaryTimestamps.add(timestampTime);
			this.documentaryStimuliDisplayedCount++;
		}
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
	constructor(config: ITaskHandlerConfig) {
		super(config);
	}
}

/**
 * Legacy task handler for the intelligence task in the pattern matching task
 * Now, the stimuli are handled outside of the task handler
 */
export abstract class ATaskHandlerIntelligence extends ATaskHandler {
	constructor(config: ITaskHandlerConfig) {
		super(config);
	}
}
