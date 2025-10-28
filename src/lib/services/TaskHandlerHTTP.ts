import { HttpLogger } from './HttpLogger';
import {
	ATaskHandlerIntelligence,
	ATaskHandlerMath,
	type ITaskHandlerConfig
} from '$lib/interfaces/ITaskHandler';

/**
 * HTTP-based task handler for math tasks that posts to HTTPS endpoint
 */
export class TaskHandlerMathHTTP extends ATaskHandlerMath {
	private httpLogger: HttpLogger;

	constructor(sessionId: string, config: ITaskHandlerConfig, endpoint?: string) {
		super(config);
		this.httpLogger = new HttpLogger(sessionId, endpoint);
	}

	logAction(type: string, value: string): void {
		this.httpLogger.logAction(type, value);
	}
}

/**
 * HTTP-based task handler for intelligence tasks that posts to HTTPS endpoint
 */
export class TaskHandlerIntelligenceHTTP extends ATaskHandlerIntelligence {
	private httpLogger: HttpLogger;

	constructor(sessionId: string, config: ITaskHandlerConfig, endpoint?: string) {
		super(config);
		this.httpLogger = new HttpLogger(sessionId, endpoint);
	}

	logAction(type: string, value: string): void {
		this.httpLogger.logAction(type, value);
	}
}
