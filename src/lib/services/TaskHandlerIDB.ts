import { saveActionLog } from '$lib/database/repositories/ActionLog.repository';
import {
	ATaskHandlerIntelligence,
	ATaskHandlerMath,
	type ISocialMediaStimulus,
	type ISocialMediaButton,
	type IVideoConfiguration,
	type ITaskPatternMatchingObject
} from '$lib/interfaces/ITaskHandler';

const logAction = (type: string, value: string, sessionId: string) => {
	saveActionLog({
		timestamp: new Date().toISOString(),
		sessionId,
		type,
		value
	});
};

export class TaskHandlerIntelligenceIDB extends ATaskHandlerIntelligence {
	sessionId: string;

	constructor(
		sessionId: string,
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
		this.sessionId = sessionId;
	}

	logAction(type: string, value: string): void {
		logAction(type, value, this.sessionId);
	}
}

export class TaskHandlerMathIDB extends ATaskHandlerMath {
	sessionId: string;

	constructor(
		sessionId: string,
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
		this.sessionId = sessionId;
	}

	logAction(type: string, value: string): void {
		logAction(type, value, this.sessionId);
	}
}
