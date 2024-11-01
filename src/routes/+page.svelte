<script lang="ts">
	import App from '$lib/components/App.svelte';
	import { ConnectLoggerIDB } from '$lib/services/ConnectLoggerIDB';
	import { GazeSaverIDB } from '$lib/services/GazeSaverIDB';
	import { TaskPatternMatchingHandlerIDB } from '$lib/services/TaskPatternMatchingHandlerIDB';
	import { TimestampQuestionServiceIDB } from '$lib/services/TimestampQuestionServiceIDB';

	let variant: 'prioritize' | 'even' = 'prioritize';
	const sessionId = new Date().getTime() + '-' + Math.floor(1000 + Math.random() * 9000);

	// obtain from localStorage value of "multitaskingExperimentFSSMUVariant" which is either
	// "prioritize" or "even"
	// if it is not set, set it to "prioritize"
	// set the opposite variant to the variant
	const obtainVariant = () => {
		const variant = localStorage.getItem('multitaskingExperimentFSSMUVariant');
		if (variant === 'prioritize') {
			return 'even';
		} else {
			return 'prioritize';
		}
	};

	const setVariant = (variant: 'prioritize' | 'even') => {
		localStorage.setItem('multitaskingExperimentFSSMUVariant', variant);
	};

	variant = obtainVariant();
	setVariant(variant);

	const questionsService = new TimestampQuestionServiceIDB(sessionId);
	const taskHandler = new TaskPatternMatchingHandlerIDB(sessionId, variant);
	const connectLogger = new ConnectLoggerIDB(sessionId);
	const gazeSaver = new GazeSaverIDB(sessionId);
</script>

<App {gazeSaver} {connectLogger} {questionsService} {taskHandler} />
