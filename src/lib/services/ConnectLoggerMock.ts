import type { IConnectLogger } from '$lib/interfaces/IConnectLogger';

export class ConnectLoggerMock implements IConnectLogger {
	logInit(): void {
		console.log('gaze-init');
	}

	logConnect(): void {
		console.log('gaze-connect');
	}

	logStart(): void {
		console.log('gaze-start');
	}

	logEnd(): void {
		console.log('gaze-end');
	}

	logValidation(accuracy: number, precision: number, gazePointCount: number): void {
		console.log('gaze-validation', { accuracy, precision, gazePointCount });
	}

	logConnectEnd(): void {
		console.log('gaze-disconnect');
	}

	logError(error: string): void {
		console.log('gaze-error', error);
	}
}
