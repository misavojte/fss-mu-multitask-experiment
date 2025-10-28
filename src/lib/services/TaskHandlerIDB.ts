import { saveActionLog } from '$lib/database/repositories/ActionLog.repository';
import {
	ATaskHandlerIntelligence,
	ATaskHandlerMath,
	type ISocialMediaStimulus,
	type ISocialMediaButton,
	type IVideoConfiguration,
	type ITaskPatternMatchingObject,
	type ITaskHandlerConfig
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

	constructor(sessionId: string, config: ITaskHandlerConfig) {
        super({
            socialMediaStimuliNS: config.socialMediaStimuliNS,
            socialMediaStimuliAS: config.socialMediaStimuliAS,
            socialMediaButtons: config.socialMediaButtons,
            videoConfiguration: config.videoConfiguration,
            taskPatternMatchingObjects: config.taskPatternMatchingObjects,
            taskPatternCorrectResponseId: config.taskPatternCorrectResponseId ?? 'T1',
            pointsPatternMatching: config.pointsPatternMatching,
            pointsSocialMedia: config.pointsSocialMedia,
            pointsDocumentary: config.pointsDocumentary
        });
		this.sessionId = sessionId;
	}

	logAction(type: string, value: string): void {
		logAction(type, value, this.sessionId);
	}
}

export class TaskHandlerMathIDB extends ATaskHandlerMath {
	sessionId: string;

	constructor(sessionId: string, config: ITaskHandlerConfig) {
        super({
            socialMediaStimuliNS: config.socialMediaStimuliNS,
            socialMediaStimuliAS: config.socialMediaStimuliAS,
            socialMediaButtons: config.socialMediaButtons,
            videoConfiguration: config.videoConfiguration,
            taskPatternMatchingObjects: config.taskPatternMatchingObjects,
            taskPatternCorrectResponseId: config.taskPatternCorrectResponseId ?? '2',
            pointsPatternMatching: config.pointsPatternMatching,
            pointsSocialMedia: config.pointsSocialMedia,
            pointsDocumentary: config.pointsDocumentary
        });
		this.sessionId = sessionId;
	}

	logAction(type: string, value: string): void {
		logAction(type, value, this.sessionId);
	}
}
