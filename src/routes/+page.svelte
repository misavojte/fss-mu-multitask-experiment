<script lang="ts">
	import App from '$lib/components/App.svelte';
	import { ConnectLoggerIDB } from '$lib/services/ConnectLoggerIDB';
	import { GazeSaverIDB } from '$lib/services/GazeSaverIDB';
	import { TaskHandlerMathIDB } from '$lib/services/TaskHandlerIDB';
	import { TimestampQuestionServiceIDB } from '$lib/services/TimestampQuestionServiceIDB';
	import { base } from '$app/paths';
	const sessionId = new Date().getTime() + '-' + Math.floor(1000 + Math.random() * 9000);

	const questionsService = new TimestampQuestionServiceIDB(sessionId);
	const connectLogger = new ConnectLoggerIDB(sessionId);
	const gazeSaver = new GazeSaverIDB(sessionId);
	const taskHandler = new TaskHandlerMathIDB(sessionId, base);
</script>

<App {gazeSaver} {connectLogger} {questionsService} {taskHandler} />
