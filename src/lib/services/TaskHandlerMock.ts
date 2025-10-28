import {
	ATaskHandlerIntelligence,
	ATaskHandlerMath,
	type ITaskHandlerConfig
} from '$lib/interfaces/ITaskHandler';

const logAction = (type: string, value: string) => {
	console.log(type, value);
};

export class TaskHandlerIntelligenceMock extends ATaskHandlerIntelligence {
	constructor(config: ITaskHandlerConfig) {
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
	}

	logAction(type: string, value: string): void {
		logAction(type, value);
	}
}

export class TaskHandlerMathMock extends ATaskHandlerMath {
	constructor(config: ITaskHandlerConfig) {
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
	}

	logAction(type: string, value: string): void {
		logAction(type, value);
	}
}
