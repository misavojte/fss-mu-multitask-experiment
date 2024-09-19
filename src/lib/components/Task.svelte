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

	/**
	 * The position of the social media task on the x-axis in pixels.
	 */
	export let positionXSocial: number = 20;

	/**
	 * The position of the social media task on the y-axis in pixels.
	 */
	export let positionYSocial: number = 20;

	/**
	 * The position of the pattern matching task on the x-axis in pixels.
	 */
	export let widthSocial: number = 300;

	/**
	 * The position of the pattern matching task on the x-axis in pixels.
	 */
	export let heightSocialImage: number = 350;

	/**
	 * The position of the pattern matching task on the x-axis in pixels.
	 */
	export let heightSocialOptions: number = 150;

	/**
	 * The position of the pattern matching task on the x-axis in pixels.
	 */
	export let positionXPattern: number = 400;

	/**
	 * The position of the pattern matching task on the y-axis in pixels.
	 */
	export let positionYPattern: number = 20;

	/**
	 * The position of the documentary task on the x-axis in pixels.
	 */
	export let positionXDocumentary: number = 400;

	/**
	 * The position of the documentary task on the y-axis in pixels.
	 */
	export let positionYDocumentary: number = 800;

	/**
	 * The height of the social media task.
	 */
	$: heightSocial = heightSocialImage + heightSocialOptions;

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
			class="absolute"
			transition:fade={{ duration: 300 }}
			style="top: {positionYSocial}px; left: {positionXSocial}px; width: {widthSocial}px; height: {heightSocial}px;"
		>
			<TaskSocialMedia
				heightImage={heightSocialImage}
				heightInteractors={heightSocialOptions}
				socialMediaButtons={[
					{ text: 'Like', id: 'like' },
					{ text: 'Share', id: 'share' },
					{ text: 'Ignore', id: 'save' },
					{ text: 'Dislike', id: 'dislike' }
				]}
				{socialMediaStimuli}
			/>
		</div>
		<div
			class="absolute"
			transition:fade={{ duration: 300 }}
			style="top: {positionYPattern}px; left: {positionXPattern}px;"
		>
			<TaskPatternMatching {patternMatchingObjects} />
		</div>
		<div
			class="absolute"
			transition:fade={{ duration: 300 }}
			style="top: {positionYDocumentary}px; left: {positionXDocumentary}px;"
		>
			<TaskDocumentary {videoDocumentarySrc} hideAllControls={true} autoplay={true} muted={true} />
		</div>
	{/await}
</div>
