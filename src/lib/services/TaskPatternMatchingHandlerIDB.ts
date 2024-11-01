import { saveActionLog } from '$lib/database/repositories/ActionLog.repository';
import { ATaskPatternMatchingHandler } from '$lib/interfaces/ITaskPatternMatching';

export class TaskPatternMatchingHandlerIDB extends ATaskPatternMatchingHandler {
	sessionId: string;
	scoringType: 'prioritize' | 'even';
	constructor(sessionId: string, scoringType: 'prioritize' | 'even') {
		super();
		this.sessionId = sessionId;
		this.scoringType = scoringType;
	}

	private logAction(type: string, value: string) {
		saveActionLog({
			timestamp: new Date().toISOString(),
			sessionId: this.sessionId,
			type,
			value
		});
	}

	private addPatternMatchingScore() {
		this.score += this.scoringType === 'prioritize' ? 3 : 1;
	}

	private addSocialMediaScore() {
		this.score += this.scoringType === 'prioritize' ? 1 : 1;
	}

	private addDocumentaryQuestionnaireScore() {
		this.score += this.scoringType === 'prioritize' ? 1 : 1;
	}

	handlePatternMatchingResponse(event: CustomEvent<string>) {
		this.logAction('pattern-matching-response', event.detail);
		if (event.detail === 'T1') {
			this.addPatternMatchingScore();
		}
	}

	handlePatternMatchingNext(event: CustomEvent<string>) {
		this.logAction('pattern-matching-next', event.detail);
	}
	handlePatternMatchingCompleted() {
		this.logAction('pattern-matching-completed', '');
		this.onEnd();
	}
	handleSocialMediaInteractorsShow(event: CustomEvent<{ id: string; timestamp: number }>) {
		this.logAction('social-media-interactors-show', event.detail.id);
	}
	handleSocialMediaInteractorsClick(event: CustomEvent<{ buttonId: string; timestamp: number }>) {
		this.logAction('social-media-interactors-click', event.detail.buttonId);
		this.addSocialMediaScore();
	}
	handleSocialMediaInteractorsHidden() {
		this.logAction('social-media-interactors-hidden', '');
	}
	handleSocialMediaInteractorsTimeout() {
		this.logAction('social-media-interactors-timeout', '');
	}
	handleSocialMediaInteractorsCompleted() {
		this.logAction('social-media-interactors-completed', '');
	}
	handleLoadStart(): void {
		this.logAction('task-load-start', '');
	}
	handleLoadFinish(): void {
		this.logAction('task-load-finish', '');
	}
	logVersion(version: 'prioritize' | 'even') {
		this.logAction('task-version', version);
	}
	handleDocumentaryQuestionnaireResponse(isCorrect: boolean): void {
		if (isCorrect) {
			this.addDocumentaryQuestionnaireScore();
		}
	}
}
