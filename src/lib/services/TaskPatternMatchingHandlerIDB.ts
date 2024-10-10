import { saveActionLog } from '$lib/database/repositories/ActionLog.repository';
import { ATaskPatternMatchingHandler } from '$lib/interfaces/ITaskPatternMatching';

export class TaskPatternMatchingHandlerIDB extends ATaskPatternMatchingHandler {
	sessionId: string;
	constructor(sessionId: string) {
		super();
		this.sessionId = sessionId;
	}

	handlePatternMatchingResponse(event: CustomEvent<'T1' | 'T2' | 'T3' | 'T4'>) {
		console.log('handlePatternMatchingResponse', event);
		saveActionLog({
			timestamp: new Date().toISOString(),
			sessionId: this.sessionId,
			type: 'pattern-matching-response',
			value: event.detail
		});
	}

	handlePatternMatchingNext(event: CustomEvent<string>) {
		console.log('handlePatternMatchingNext', event);
		saveActionLog({
			timestamp: new Date().toISOString(),
			sessionId: this.sessionId,
			type: 'pattern-matching-next',
			value: event.detail
		});
	}
	handlePatternMatchingCompleted() {
		console.log('handlePatternMatchingCompleted');
		saveActionLog({
			timestamp: new Date().toISOString(),
			sessionId: this.sessionId,
			type: 'pattern-matching-completed',
			value: ''
		});
		this.onEnd();
	}
	handleSocialMediaInteractorsShow(event: CustomEvent<{ id: string; timestamp: number }>) {
		console.log('handleSocialMediaInteractorsShow', event);
		saveActionLog({
			timestamp: new Date(event.detail.timestamp).toISOString(),
			sessionId: this.sessionId,
			type: 'social-media-interactors-show',
			value: event.detail.id
		});
	}
	handleSocialMediaInteractorsClick(event: CustomEvent<{ buttonId: string; timestamp: number }>) {
		console.log('handleSocialMediaInteractorsClick', event);
		saveActionLog({
			timestamp: new Date(event.detail.timestamp).toISOString(),
			sessionId: this.sessionId,
			type: 'social-media-interactors-click',
			value: event.detail.buttonId
		});
	}
	handleSocialMediaInteractorsHidden() {
		console.log('handleSocialMediaInteractorsHidden');
		saveActionLog({
			timestamp: new Date().toISOString(),
			sessionId: this.sessionId,
			type: 'social-media-interactors-hidden',
			value: ''
		});
	}
	handleSocialMediaInteractorsTimeout() {
		console.log('handleSocialMediaInteractorsTimeout');
		saveActionLog({
			timestamp: new Date().toISOString(),
			sessionId: this.sessionId,
			type: 'social-media-interactors-timeout',
			value: ''
		});
	}
	handleSocialMediaInteractorsCompleted() {
		console.log('handleSocialMediaInteractorsCompleted');
		saveActionLog({
			timestamp: new Date().toISOString(),
			sessionId: this.sessionId,
			type: 'social-media-interactors-completed',
			value: ''
		});
	}
}
