import type { Readable } from 'svelte/store';

export const waitForCondition = (
	store: Readable<boolean>,
	maxTimeout: number
): Promise<boolean> => {
	return new Promise((resolve) => {
		// Initialize `unsubscribe` to an empty function
		let unsubscribe: () => void = () => {};

		// Define `unsubscribe` within the subscription callback
		unsubscribe = store.subscribe((value) => {
			if (value) {
				unsubscribe(); // Unsubscribe and resolve if condition is met
				resolve(true);
			}
		});

		// Timeout to resolve with `false` if condition is not met
		setTimeout(() => {
			unsubscribe();
			resolve(false);
		}, maxTimeout);
	});
};

export const waitForTimeout = (maxTimeout: number): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, maxTimeout);
	});
};
