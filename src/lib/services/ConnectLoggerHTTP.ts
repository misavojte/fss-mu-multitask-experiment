import { HttpLogger } from './HttpLogger';
import type { IConnectLogger } from '$lib/interfaces/IConnectLogger';

/**
 * HTTP-based connect logger that posts to HTTPS endpoint
 */
export class ConnectLoggerHTTP implements IConnectLogger {
	private httpLogger: HttpLogger;

	constructor(sessionId: string, endpoint?: string) {
		this.httpLogger = new HttpLogger(sessionId, endpoint);
	}

	logInit(): void {
		this.httpLogger.logAction('gaze-init', '');
	}

	logConnect(): void {
		this.httpLogger.logAction('gaze-connect', '');
	}

	logStart(): void {
		this.httpLogger.logAction('gaze-start', '');
	}

	logEnd(): void {
		this.httpLogger.logAction('gaze-end', '');
	}

	logValidation(accuracy: number, precision: number, gazePointCount: number): void {
		this.httpLogger.logAction('gaze-validation', JSON.stringify({ accuracy, precision, gazePointCount }));
	}

	logConnectEnd(): void {
		this.httpLogger.logAction('gaze-disconnect', '');
	}

	logError(error: string): void {
		this.httpLogger.logAction('gaze-error', error);
	}
}
