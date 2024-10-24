import { ATaskPatternMatchingHandler } from '$lib/interfaces/ITaskPatternMatching';

export class getTaskPatternMatchingHandlerMock extends ATaskPatternMatchingHandler {
	handlePatternMatchingResponse(event: CustomEvent<'T1' | 'T2' | 'T3' | 'T4'>) {
		console.log('handlePatternMatchingResponse', event);
	}
	handlePatternMatchingNext(event: CustomEvent<string>) {
		console.log('handlePatternMatchingNext', event);
	}
	handlePatternMatchingCompleted() {
		console.log('handlePatternMatchingCompleted');
		this.onEnd();
	}
	handleSocialMediaInteractorsShow(event: CustomEvent<{ id: string; timestamp: number }>) {
		console.log('handleSocialMediaInteractorsShow', event);
	}
	handleSocialMediaInteractorsClick(event: CustomEvent<{ buttonId: string; timestamp: number }>) {
		console.log('handleSocialMediaInteractorsClick', event);
	}
	handleSocialMediaInteractorsHidden() {
		console.log('handleSocialMediaInteractorsHidden');
	}
	handleSocialMediaInteractorsTimeout() {
		console.log('handleSocialMediaInteractorsTimeout');
	}
	handleSocialMediaInteractorsCompleted() {
		console.log('handleSocialMediaInteractorsCompleted');
	}
	handleLoadStart() {
		console.log('handleLoadStart');
	}
	handleLoadFinish() {
		console.log('handleLoadFinish');
	}
	logVersion(version: 'prioritize' | 'even') {
		console.log('logVersion', version);
	}
}
