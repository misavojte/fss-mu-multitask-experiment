import { SvelteComponent } from 'svelte';
import AnimationTarget from './AnimationTarget.svelte';
import { waitForTimeoutCancellable } from '$lib/utils/waitForCondition';

export class AnimationTargetHandler {
	private animationTargets: Record<string, SvelteComponent> = {};

	async createAnimationTarget(
		centerCoordinates: { x: number; y: number },
		color: string,
		content: string,
		abortSignal: AbortSignal,
		timeout: number = 1000
	) {
		const randomId = Date.now().toString() + Math.random().toString();
		this.animationTargets[randomId] = new AnimationTarget({
			target: document.body,
			props: {
				centerCoordinates,
				color,
				content
			}
		});
		try {
			await waitForTimeoutCancellable(timeout, abortSignal);
		} catch (e) {
			// Do nothing
			void e;
		}
		this.animationTargets[randomId].$destroy();
		delete this.animationTargets[randomId];
	}
}
