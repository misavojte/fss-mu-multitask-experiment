<script lang="ts">
	import TaskDocumentary from './TaskDocumentary.svelte';
	import TaskPatternMatching from './TaskPatternMatching.svelte';
	import TaskSocialMedia from './TaskSocialMedia.svelte';
	import type { ATaskHandler, ITaskPatternMatchingObject } from '$lib/interfaces/ITaskHandler';
	import { fade } from 'svelte/transition';
	import InterfaceLoader from './InterfaceLoader.svelte';
	import { getCancellableAsync, waitForConditionCancellable } from '$lib/utils/waitForCondition';
	import { onDestroy, onMount, createEventDispatcher } from 'svelte';
	import Intersecter from './Intersecter.svelte';
	import { writable } from 'svelte/store';

	export let socialMediaStimuliAS: Array<{
		src: string;
		id: string;
	}>;

	export let socialMediaStimuliNS: Array<{
		src: string;
		id: string;
	}>;

	export let socialMediaButtons: Array<{
		text: string;
		id: string;
		color: string;
		textColor: string;
		html?: string;
	}> = [
		{ text: 'Like', id: 'like', color: '#3b5998', textColor: '#fff' },
		{ text: 'Dislike', id: 'dislike', color: '#dd4b39', textColor: '#fff' }
	];

	export let patternMatchingObjects: ITaskPatternMatchingObject[];

	export let videoDocumentarySrc: string;

	/**
	 * The time in milliseconds before the task times out.
	 * Default is 410 seconds (6 minutes and 50 seconds).
	 */
	export let timeOut: number = 410000;

	/**
	 * The width of the task container.
	 */
	export let width: number = 1920;

	/**
	 * The height of the task container.
	 */
	export let height: number = 1040;

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
	export let heightSocialOptions: number = 140;

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
	export let positionYDocumentary: number = 640;

	/**
	 * The width of the documentary task.
	 */
	export let widthDocumentary: number = 650;

	/**
	 * The height of the documentary task. 16:9 aspect ratio is recommended.
	 */
	export let heightDocumentary: number = 366;

	/**
	 * Muted state of the documentary task.
	 */
	export let muted: boolean = true;

	/**
	 * The initial delay before the first social media task is shown.
	 */
	export let socialInitialDelay: number = 5000;

	/**
	 * The maximum duration of the social media task.
	 */
	export let socialStimulusMaxDuration: number = 15000;

	export let socialBetweenDelay: number = 15000;

	export let socialStimulusRemindAfter: number = 10000;

	export let socialAdjustBetweenDelay: boolean = false;

	export let videoStartTime: number = 0;
	export let wordOccurence: string = 'SLOVO';
	export let wordOccurenceTolerance: number = 10000;
	export let wordOccurenceTimestamps: number[] = [7000, 7100];

	export let taskHandler: ATaskHandler;

	export let endScenario: 'timeout' | 'pattern-timeout' | 'social-media-finished' = 'timeout';

	/**
	 * When true, displays only the social media task and hides pattern matching and documentary tasks.
	 */
	export let socialMediaOnly: boolean = false;

	let hasStarted = false;

	const dispatch = createEventDispatcher();

	class ControllablePromise<T> {
		private _resolve!: (value: T | PromiseLike<T>) => void;
		private _reject!: (reason?: any) => void;
		public promise: Promise<T>;

		constructor() {
			this.promise = new Promise<T>((resolve, reject) => {
				this._resolve = resolve;
				this._reject = reject;
			});
		}

		triggerResolve(value: T) {
			this._resolve(value);
		}

		triggerReject(reason?: any) {
			this._reject(reason);
		}
	}

	// Creating controllable promises for each resource
	const videoLoaded = new ControllablePromise<boolean>();
	const patternLoaded = new ControllablePromise<boolean>();
	const socialLoaded = new ControllablePromise<boolean>();

	// Promise.all to wait for all resources to be loaded
	const loadPromise = socialMediaOnly
		? socialLoaded.promise
		: Promise.all([videoLoaded.promise, patternLoaded.promise, socialLoaded.promise]);

	const shouldEndTask = writable(false);

	const handlePatternEnd = () => {
		if (endScenario === 'pattern-timeout') {
			shouldEndTask.set(true);
		} // else do nothing, timeout or something else will end the task
	};

	const handleSocialMediaFinished = () => {
		if (endScenario === 'social-media-finished') {
			shouldEndTask.set(true);
		} // else do nothing, timeout or something else will end the task
	};

	const abortController = new AbortController();

	const logic = async () => {
		await loadPromise;
		hasStarted = true;
		try {
			await waitForConditionCancellable(shouldEndTask, timeOut, abortController.signal);
		} catch (error) {
			console.error(error);
		}
		console.log('Task ended');
		// Stop all processes before dispatching taskEnd
		hasStarted = false; // Stop video playback
		abortController.abort('Task ended'); // Abort all child processes
		dispatch('taskEnd');
	};

	let mainElement: HTMLDivElement;

	onMount(() => {
		taskHandler.addOnEndHandler(handlePatternEnd);

		// If socialMediaOnly is true, resolve the promises for components that won't be loaded
		if (socialMediaOnly) {
			videoLoaded.triggerResolve(true);
			patternLoaded.triggerResolve(true);
		}

		// Scale the task to fit the parent element if it is smaller than the task
		const parentElement = mainElement.parentElement;
		if (parentElement) {
			const parentHeight = parentElement.clientHeight;
			if (parentHeight < height) {
				const scaleFactor = parentHeight / height;
				mainElement.style.transform = `scale(${scaleFactor})`;
			}
		}
		getCancellableAsync(logic, abortController.signal);
	});

	onDestroy(() => {
		taskHandler.removeOnEndHandler();
		abortController.abort('Task was destroyed');
	});

	const handleDocumentaryResponse = (
		e: CustomEvent<{ correctness: boolean; videoTime: number; timestampTime?: number }>
	) => {
		const { correctness, videoTime, timestampTime } = e.detail;
		taskHandler.handleDocumentaryResponse(correctness, videoTime, timestampTime);
	};
</script>

<div
	class="flex justify-center items-start box-border absolute"
	style="width: {width}px; height: {height}px;"
	bind:this={mainElement}
>
	{#await loadPromise}
		<div
			class="w-full h-full flex justify-center items-center absolute top-0 left-0 z-50 bg-white"
			transition:fade={{ duration: 300 }}
		>
			<InterfaceLoader />
		</div>
	{/await}
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
				{socialMediaButtons}
				{socialMediaStimuliAS}
				{socialMediaStimuliNS}
				stimulusRemindAfter={socialStimulusRemindAfter}
				initialDelay={socialInitialDelay}
				stimulusMaxDuration={socialStimulusMaxDuration}
				betweenDelay={socialBetweenDelay}
				{hasStarted}
				adjustBetweenDelay={socialAdjustBetweenDelay}
				on:socialMediaInteractorsCompleted={() => {
					taskHandler.handleSocialMediaInteractorsCompleted.call(taskHandler);
					handleSocialMediaFinished();
				}}
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
				on:loaded={() => socialLoaded.triggerResolve(true)}
			/>
		</Intersecter>
	</div>
	{#if !socialMediaOnly}
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
					{taskHandler}
					on:patternMatchingCompleted={taskHandler.handlePatternMatchingCompleted.bind(taskHandler)}
					on:patternMatchingNext={taskHandler.handlePatternMatchingNext.bind(taskHandler)}
					on:patternMatchingResponse={taskHandler.handlePatternMatchingResponse.bind(taskHandler)}
					on:loaded={() => patternLoaded.triggerResolve(true)}
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
					{videoStartTime}
					hideAllControls={true}
					play={hasStarted}
					{muted}
					width={widthDocumentary}
					height={heightDocumentary}
					{wordOccurence}
					{wordOccurenceTolerance}
					{wordOccurenceTimestamps}
					on:loaded={() => videoLoaded.triggerResolve(true)}
					on:response={handleDocumentaryResponse}
				/>
			</Intersecter>
		</div>
	{/if}
</div>
