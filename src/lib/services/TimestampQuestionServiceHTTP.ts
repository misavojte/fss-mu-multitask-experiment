import { HttpLogger } from './HttpLogger';
import type { ITimestampQuestionService } from '$lib/interfaces/IQuestion';

/**
 * HTTP-based question service that posts to HTTPS endpoint
 */
export class TimestampQuestionServiceHTTP implements ITimestampQuestionService {
	private httpLogger: HttpLogger;

	constructor(sessionId: string, endpoint?: string) {
		this.httpLogger = new HttpLogger(sessionId, endpoint);
	}

	async saveQuestions(): Promise<void> {
		await this.httpLogger.logAction('questionnaire-end', '');
	}

	async saveTimestampQuestion(question: string, answer: string): Promise<void> {
		await this.httpLogger.logAction('questionnaire-' + question, answer);
	}

	async startQuestions(): Promise<void> {
		await this.httpLogger.logAction('questionnaire-start', '');
	}
}
