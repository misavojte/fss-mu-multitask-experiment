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
        super(config);
	}

	logAction(type: string, value: string): void {
		logAction(type, value);
	}
}

export class TaskHandlerMathMock extends ATaskHandlerMath {
	constructor(config: ITaskHandlerConfig) {
        super(config);
	}

	logAction(type: string, value: string): void {
		logAction(type, value);
	}
}
