<script lang="ts">
	import App from '$lib/components/App.svelte';
	import { ConnectLoggerIDB } from '$lib/services/ConnectLoggerIDB';
	import { GazeSaverIDB } from '$lib/services/GazeSaverIDB';
	import { TimestampQuestionServiceIDB } from '$lib/services/TimestampQuestionServiceIDB';
	const sessionId = new Date().getTime() + '-' + Math.floor(1000 + Math.random() * 9000);

	const sentiment = 'positive';
	const questionsService = new TimestampQuestionServiceIDB(sessionId);
	const connectLogger = new ConnectLoggerIDB(sessionId);
	const gazeSaver = new GazeSaverIDB(sessionId);
</script>

{#if sentiment}
	<App {gazeSaver} {connectLogger} {questionsService} {sessionId} {sentiment} />
{/if}
