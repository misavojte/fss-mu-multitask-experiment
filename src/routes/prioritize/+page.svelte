<script>
	import App from '$lib/components/App.svelte';
	import { ConnectLoggerIDB } from '$lib/services/ConnectLoggerIDB';
	import { GazeSaverIDB } from '$lib/services/GazeSaverIDB';
	import { TaskPatternMatchingHandlerIDB } from '$lib/services/TaskPatternMatchingHandlerIDB';
	import { TimestampQuestionServiceIDB } from '$lib/services/TimestampQuestionServiceIDB';

	const sessionId = new Date().getTime() + '-' + Math.floor(1000 + Math.random() * 9000);
	const questionsService = new TimestampQuestionServiceIDB(sessionId);
	const taskHandler = new TaskPatternMatchingHandlerIDB(sessionId);
	const connectLogger = new ConnectLoggerIDB(sessionId);
	const gazeSaver = new GazeSaverIDB(sessionId);
</script>

<App {gazeSaver} {connectLogger} {questionsService} {taskHandler} variant="prioritize" />
