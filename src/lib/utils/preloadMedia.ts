type MediaPreloadType = 'img' | 'video';

export interface MediaPreloadSource {
	type: MediaPreloadType;
	src: string;
}

interface LoadResult {
	src: string;
	type: MediaPreloadType;
}

export const loadImage = (src: string): Promise<LoadResult> =>
	new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve({ src, type: 'img' });
		img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
		img.src = src;
	});

export const loadVideo = (src: string): Promise<LoadResult> =>
	new Promise((resolve, reject) => {
		const video = document.createElement('video');
		video.muted = true; // Mute the video to prevent autoplay policy
		video.onerror = () => reject(new Error(`Failed to preload video: ${src}`));
		video.src = src;
		video.oncanplay = () => {
			video.play().then(() => {
				video.pause();
				resolve({ src, type: 'video' });
			});
		};
		video.load();
	});

export const preloadMedia = (
	srcs: readonly MediaPreloadSource[],
	concurrencyLimit: number = 50
): Promise<LoadResult[]> => {
	const loadMedia = ({ type, src }: MediaPreloadSource): Promise<LoadResult> => {
		if (type === 'img') {
			return loadImage(src);
		} else if (type === 'video') {
			return loadVideo(src);
		} else {
			return Promise.reject(new Error(`Unsupported media type: ${type}`));
		}
	};

	const preloadTasks = srcs.map((source) => () => loadMedia(source));

	const limitConcurrency = async <T>(
		tasks: readonly (() => Promise<T>)[],
		limit: number
	): Promise<T[]> => {
		const results: T[] = [];
		const executing: Promise<T>[] = [];

		for (const task of tasks) {
			const p = task().then((result) => {
				executing.splice(executing.indexOf(p), 1);
				return result;
			});
			executing.push(p);
			p.then((p) => results.push(p));

			if (executing.length >= limit) {
				await Promise.race(executing);
			}
		}

		return Promise.all(results);
	};

	return limitConcurrency(preloadTasks, concurrencyLimit);
};
