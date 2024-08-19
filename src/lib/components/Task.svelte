<script lang="ts">
	import TaskDocumentary from './TaskDocumentary.svelte';
	import TaskPatternMatching from './TaskPatternMatching.svelte';
	import TaskSocialMedia from './TaskSocialMedia.svelte';
	import type { ITaskPatternMatchingObject } from '$lib/interfaces/ITaskPatternMatching';
	import { preloadMedia, type MediaPreloadSource } from '$lib/utils/preloadMedia';
	import { fade } from 'svelte/transition';
	import InterfaceLoader from './InterfaceLoader.svelte';
	import { waitForTimeout } from '$lib/utils/waitForCondition';

	export let socialMediaStimuli: Array<{
		src: string;
		id: string;
	}>;

	export let patternMatchingObjects: ITaskPatternMatchingObject[];

	export let videoDocumentarySrc: string;

	/**
	 * The width of the task container.
	 * @default '100vw'
	 */
	export let width: string = '100vw';

	/**
	 * The height of the task container.
	 * @default '100vh'
	 */
	export let height: string = '100vh';

	const preloadMediaArray: MediaPreloadSource[] = [
		{
			type: 'video' as const,
			src: videoDocumentarySrc
		},
		...socialMediaStimuli.map(({ src }) => ({
			type: 'img' as const,
			src
		}))
	];
	const loadPromise = Promise.all([preloadMedia(preloadMediaArray), waitForTimeout(500)]); // Simulate loading time
</script>

<div
	class="flex gap-4 p-4 justify-center items-start box-border max-h-screen relative"
	style="width: {width}; height: {height};"
>
	{#await loadPromise}
		<div
			class="w-full h-full flex justify-center items-center absolute top-0 left-0"
			transition:fade={{ duration: 300 }}
		>
			<InterfaceLoader />
		</div>
	{:then a}
		<div
			class="w-full h-full flex gap-4 p-4 justify-center items-start box-border max-h-screen absolute top-0 left-0"
			transition:fade={{ duration: 300 }}
		>
			<TaskSocialMedia
				socialMediaButtons={[
					{ text: 'Like', id: 'like' },
					{ text: 'Share', id: 'share' },
					{ text: 'Ignore', id: 'save' },
					{ text: 'Dislike', id: 'dislike' }
				]}
				{socialMediaStimuli}
			/>
			<div class="flex flex-col gap-16 w-full h-full items-center">
				<TaskPatternMatching {patternMatchingObjects} />
				<TaskDocumentary
					{videoDocumentarySrc}
					hideAllControls={true}
					autoplay={true}
					muted={true}
				/>
			</div>
		</div>
	{/await}
</div>
