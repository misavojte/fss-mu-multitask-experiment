import { saveActionLog } from '$lib/database/repositories/ActionLog.repository';
import type { ITimestampQuestionService } from '$lib/interfaces/IQuestion';

export class TimestampQuestionServiceIDB implements ITimestampQuestionService {
	sessionId: string;
	constructor(sessionId: string) {
		this.sessionId = sessionId;
	}

	async saveQuestions(): Promise<void> {
		saveActionLog({
			timestamp: new Date().toISOString(),
			sessionId: this.sessionId,
			type: 'questionnaire-end',
			value: ''
		});
	}

	async saveTimestampQuestion(question: string, answer: string): Promise<void> {
		saveActionLog({
			timestamp: new Date().toISOString(),
			sessionId: this.sessionId,
			type: 'questionnaire-' + question,
			value: answer
		});
	}

	async startQuestions(): Promise<void> {
		saveActionLog({
			timestamp: new Date().toISOString(),
			sessionId: this.sessionId,
			type: 'questionnaire-start',
			value: ''
		});
	}
}
