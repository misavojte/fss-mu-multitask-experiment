import {
	ATaskHandlerIntelligence,
	ATaskHandlerMath,
	type ISocialMediaStimulus,
	type ISocialMediaButton,
	type IVideoConfiguration,
	type ITaskPatternMatchingObject
} from '$lib/interfaces/ITaskHandler';

const logAction = (type: string, value: string) => {
	console.log(type, value);
};

export class TaskHandlerIntelligenceMock extends ATaskHandlerIntelligence {
	constructor(
		socialMediaStimuliNS: ISocialMediaStimulus[] = [],
		socialMediaStimuliAS: ISocialMediaStimulus[] = [],
		socialMediaButtons: ISocialMediaButton[] = [],
		videoConfiguration: IVideoConfiguration | null = null,
		taskPatternMatchingObjects: ITaskPatternMatchingObject[] = [],
		taskPatternCorrectResponseId: string = 'T1',
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

	logAction(type: string, value: string): void {
		logAction(type, value);
	}
}

export class TaskHandlerMathMock extends ATaskHandlerMath {
	constructor(
		socialMediaStimuliNS: ISocialMediaStimulus[] = [],
		socialMediaStimuliAS: ISocialMediaStimulus[] = [],
		socialMediaButtons: ISocialMediaButton[] = [],
		videoConfiguration: IVideoConfiguration | null = null,
		taskPatternMatchingObjects: ITaskPatternMatchingObject[] = [],
		taskPatternCorrectResponseId: string = '2',
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

	logAction(type: string, value: string): void {
		logAction(type, value);
	}
}
