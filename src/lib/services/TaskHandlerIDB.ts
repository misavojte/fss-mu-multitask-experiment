import { saveActionLog } from '$lib/database/repositories/ActionLog.repository';
import { ATaskHandlerIntelligence, ATaskHandlerMath } from '$lib/interfaces/ITaskHandler';

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
	scoringType: 'prioritize' | 'even';
	constructor(
		sessionId: string,
		base: string = '',
		scoringType: 'prioritize' | 'even' = 'prioritize'
	) {
		super(base);
		this.sessionId = sessionId;
		this.scoringType = scoringType;
	}

	logAction(type: string, value: string): void {
		logAction(type, value, this.sessionId);
	}
}

export class TaskHandlerMathIDB extends ATaskHandlerMath {
	sessionId: string;
	scoringType: 'prioritize' | 'even';
	constructor(
		sessionId: string,
		base: string = '',
		scoringType: 'prioritize' | 'even' = 'prioritize'
	) {
		super(base);
		this.sessionId = sessionId;
		this.scoringType = scoringType;
	}

	logAction(type: string, value: string): void {
		logAction(type, value, this.sessionId);
	}
}
