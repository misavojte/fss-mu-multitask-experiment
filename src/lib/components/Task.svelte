<script lang="ts">
	import TaskDocumentary from './TaskDocumentary.svelte';
	import TaskPatternMatching from './TaskPatternMatching.svelte';
	import TaskSocialMedia from './TaskSocialMedia.svelte';
	import type {
		ATaskPatternMatchingHandler,
		ITaskPatternMatchingObject
	} from '$lib/interfaces/ITaskPatternMatching';
	import { preloadMedia, type MediaPreloadSource } from '$lib/utils/preloadMedia';
	import { fade } from 'svelte/transition';
	import InterfaceLoader from './InterfaceLoader.svelte';
	import { waitForTimeout } from '$lib/utils/waitForCondition';
	import { onDestroy, onMount, createEventDispatcher } from 'svelte';
	import Intersecter from './Intersecter.svelte';

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
	export let width: string = '1920px';

	/**
	 * The height of the task container.
	 * @default '100vh'
	 */
	export let height: string = '920px';

	/**
	 * The position of the social media task on the x-axis in pixels.
	 */
	export let positionXSocial: number = 380;

	/**
	 * The position of the social media task on the y-axis in pixels.
	 */
	export let positionYSocial: number = 10;

	/**
	 * The width of the social media task.
	 */
	export let widthSocial: number = 348;

	/**
	 * The height of the social media task, excluding the interactors.
	 */
	export let heightSocialImage: number = 495;

	/**
	 * The height of the social media task interactors.
	 */
	export let heightSocialOptions: number = 200;

	/**
	 * The position of the pattern matching task on the x-axis in pixels.
	 */
	export let positionXPattern: number = 825;

	/**
	 * The position of the pattern matching task on the y-axis in pixels.
	 */
	export let positionYPattern: number = 10;

	/**
	 * The width of the pattern matching task.
	 */
	export let widthPattern: number = 650;

	/**
	 * The height of the pattern matching task.
	 */
	export let heightPattern: number = 550;

	/**
	 * The position of the documentary task on the x-axis in pixels.
	 */
	export let positionXDocumentary: number = 825;

	/**
	 * The position of the documentary task on the y-axis in pixels.
	 */
	export let positionYDocumentary: number = 630;

	/**
	 * The width of the documentary task.
	 */
	export let widthDocumentary: number = 650;

	/**
	 * The height of the documentary task.
	 */
	export let heightDocumentary: number = 250;

	/**
	 * Muted state of the documentary task.
	 */
	export let muted: boolean = true;

	/**
	 * The initial delay before the first social media task is shown.
	 */
	export let socialInitialDelay: number = 20000;

	/**
	 * The maximum duration of the social media task.
	 */
	export let socialStimulusMaxDuration: number = 20000;

	export let taskHandler: ATaskPatternMatchingHandler;

	const preloadMediaArray: MediaPreloadSource[] = [
		{
			type: 'img' as const,
			src: patternMatchingObjects[0].matrixSrc
		},
		...patternMatchingObjects[0].responses.map((obj) => ({
			type: 'img' as const,
			src: obj.src
		})),
		{
			type: 'video' as const,
			src: videoDocumentarySrc
		},
		{
			type: 'img' as const,
			src: socialMediaStimuli[0].src
		}
	];

	const dispatch = createEventDispatcher();
	const loadPromise = Promise.all([preloadMedia(preloadMediaArray), waitForTimeout(500)]); // Simulate loading time

	const handleEnd = () => {
		console.log('Task ended');
		dispatch('taskEnd');
	};

	onMount(() => {
		taskHandler.addOnEndHandler(handleEnd);
		console.log('Task started', taskHandler);
	});

	onDestroy(() => {
		taskHandler.removeOnEndHandler();
	});
</script>

<div
	class="flex justify-center items-start box-border max-h-screen relative"
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
			style="top: {positionYSocial}px; left: {positionXSocial}px;"
		>
			<Intersecter id="task-social-media">
				<TaskSocialMedia
					heightImage={heightSocialImage}
					heightInteractors={heightSocialOptions}
					width={widthSocial}
					socialMediaButtons={[
						{ text: 'Like', id: 'like' },
						{ text: 'Share', id: 'share' },
						{ text: 'Ignore', id: 'save' },
						{ text: 'Dislike', id: 'dislike' }
					]}
					{socialMediaStimuli}
					initialDelay={socialInitialDelay}
					stimulusMaxDuration={socialStimulusMaxDuration}
					on:socialMediaInteractorsCompleted={taskHandler.handleSocialMediaInteractorsCompleted.bind(
						taskHandler
					)}
					on:socialMediaInteractorsShow={taskHandler.handleSocialMediaInteractorsShow.bind(
						taskHandler
					)}
					on:socialMediaInteractorsHidden={taskHandler.handleSocialMediaInteractorsHidden.bind(
						taskHandler
					)}
					on:socialMediaInteractorsTimeout={taskHandler.handleSocialMediaInteractorsTimeout.bind(
						taskHandler
					)}
					on:socialMediaInteractorsClick={taskHandler.handleSocialMediaInteractorsClick.bind(
						taskHandler
					)}
				/>
			</Intersecter>
		</div>
		<div
			class="absolute"
			transition:fade={{ duration: 300 }}
			style="top: {positionYPattern}px; left: {positionXPattern}px;"
		>
			<Intersecter id="task-pattern-matching">
				<TaskPatternMatching
					{patternMatchingObjects}
					width={widthPattern}
					height={heightPattern}
					on:patternMatchingCompleted={taskHandler.handlePatternMatchingCompleted.bind(taskHandler)}
					on:patternMatchingNext={taskHandler.handlePatternMatchingNext.bind(taskHandler)}
					on:patternMatchingResponse={taskHandler.handlePatternMatchingResponse.bind(taskHandler)}
				/>
			</Intersecter>
		</div>
		<div
			class="absolute"
			transition:fade={{ duration: 300 }}
			style="top: {positionYDocumentary}px; left: {positionXDocumentary}px"
		>
			<Intersecter id="task-documentary">
				<TaskDocumentary
					{videoDocumentarySrc}
					hideAllControls={true}
					autoplay={true}
					{muted}
					width={widthDocumentary}
					height={heightDocumentary}
				/>
			</Intersecter>
		</div>
	{/await}
</div>
