import { ATaskHandlerIntelligence, ATaskHandlerMath } from '$lib/interfaces/ITaskHandler';

const logAction = (type: string, value: string) => {
	console.log(type, value);
};

export class TaskHandlerIntelligenceMock extends ATaskHandlerIntelligence {
	scoringType: 'prioritize' | 'even';
	constructor(base: string = '', scoringType: 'prioritize' | 'even' = 'prioritize') {
		super(base);
		this.scoringType = scoringType;
	}

	logAction(type: string, value: string): void {
		logAction(type, value);
	}
}

export class TaskHandlerMathMock extends ATaskHandlerMath {
	scoringType: 'prioritize' | 'even';
	constructor(base: string = '', scoringType: 'prioritize' | 'even' = 'prioritize') {
		super(base);
		this.scoringType = scoringType;
	}

	logAction(type: string, value: string): void {
		logAction(type, value);
	}
}
