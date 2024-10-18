import { saveActionLog } from '$lib/database/repositories/ActionLog.repository';
import type { IConnectLogger } from '$lib/interfaces/IConnectLogger';

export class ConnectLoggerIDB implements IConnectLogger {
	private readonly _sessionId: string;

	constructor(sessionId: string) {
		this._sessionId = sessionId;
	}

	logInit(): void {
		this.logAction('gaze-init');
	}

	logConnect(): void {
		this.logAction('gaze-connect');
	}

	logStart(): void {
		this.logAction('gaze-start');
	}

	logEnd(): void {
		this.logAction('gaze-end');
	}

	logValidation(accuracy: number, precision: number, gazePointCount: number): void {
		this.logAction('gaze-validation', { accuracy, precision, gazePointCount });
	}

	logConnectEnd(): void {
		this.logAction('gaze-disconnect');
	}

	logError(error: string): void {
		this.logAction('gaze-error', error);
	}

	private logAction(type: string, unknownValue?: unknown): void {
		const value = (JSON.stringify(unknownValue) as string) || '';
		saveActionLog({
			sessionId: this._sessionId,
			type,
			value,
			timestamp: new Date().toISOString()
		});
	}
}
