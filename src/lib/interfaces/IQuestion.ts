export interface ITimestampQuestionService {
	startQuestions(): Promise<void>;
	saveTimestampQuestion(question: string, answer: string): Promise<void>;
	saveQuestions(entry: unknown): Promise<void>;
}

export interface TimestampQuestionEntryObject {
	timestamp: number;
	type: 'answer';
	question: string;
	answer: string;
	userId: string;
	sessionId: string;
}

export interface StartQuestionEntryObject {
	timestamp: number;
	type: 'start';
	userId: string;
	sessionId: string;
}

export interface IQuestionConfigBase {
	id: string;
	type: string;
	required: boolean;
}

export interface IQuestionConfigSelect extends IQuestionConfigBase {
	type: 'select';
	options: string[];
}

export interface IQuestionConfigEmail extends IQuestionConfigBase {
	type: 'email';
}

export interface IQuestionConfigNumber extends IQuestionConfigBase {
	type: 'number';
}

export type IQuestionConfig = (
	| IQuestionConfigSelect
	| IQuestionConfigEmail
	| IQuestionConfigNumber
)[];
