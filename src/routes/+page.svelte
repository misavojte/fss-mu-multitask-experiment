<script>
	import App from '$lib/components/App.svelte';
	import { TaskPatternMatchingHandlerIDB } from '$lib/services/TaskPatternMatchingHandlerIDB';
	import { TimestampQuestionServiceIDB } from '$lib/services/TimestampQuestionServiceIDB';

	const sessionId = new Date().getTime() + '-' + Math.floor(1000 + Math.random() * 9000);
	const questionsService = new TimestampQuestionServiceIDB(sessionId);
	const taskHandler = new TaskPatternMatchingHandlerIDB(sessionId);
</script>

<App {sessionId} {questionsService} {taskHandler} />
