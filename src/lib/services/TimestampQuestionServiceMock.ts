import type { ITimestampQuestionService } from '$lib/interfaces/IQuestion';

export class TimestampQuestionServiceMock implements ITimestampQuestionService {
	async saveQuestions(entry: unknown): Promise<void> {
		console.log('saveQuestions', entry);
	}

	async saveTimestampQuestion(question: string, answer: string): Promise<void> {
		console.log('saveTimestampQuestion', question, answer);
	}

	async startQuestions(): Promise<void> {
		console.log('startQuestions');
	}
}
