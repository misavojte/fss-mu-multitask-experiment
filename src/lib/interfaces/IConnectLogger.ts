export interface IConnectLogger {
	logInit(): void;

	logConnect(): void;

	logStart(): void;

	logEnd(): void;

	logValidation(accuracy: number, precision: number, gazePointCount: number): void;

	logConnectEnd(): void;

	logError(error: string): void;
}
