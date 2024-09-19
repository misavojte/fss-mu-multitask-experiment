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
	headingText: string;
	required: boolean;
	preliminaryEndAnswer?: string;
}

export interface IQuestionConfigSelect extends IQuestionConfigBase {
	type: 'select';
	options: readonly string[];
}

export interface IQuestionConfigText extends IQuestionConfigBase {
	type: 'text';
	confirmText: string;
}

export interface IQuestionConfigInstruction extends IQuestionConfigBase {
	type: 'instruction';
	paragraphs: readonly string[];
	confirmText: string;
}

export type IQuestion = IQuestionConfigSelect | IQuestionConfigText | IQuestionConfigInstruction;

export type IQuestionBattery = readonly IQuestion[];
