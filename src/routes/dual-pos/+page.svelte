<script lang="ts">
	import AppDual from '$lib/components/AppDual.svelte';
	import { ConnectLoggerIDB } from '$lib/services/ConnectLoggerIDB';
	import { GazeSaverIDB } from '$lib/services/GazeSaverIDB';
	import { TimestampQuestionServiceIDB } from '$lib/services/TimestampQuestionServiceIDB';
	const sessionId = new Date().getTime() + '-' + Math.floor(1000 + Math.random() * 9000);

	const questionsService = new TimestampQuestionServiceIDB(sessionId);
	const connectLogger = new ConnectLoggerIDB(sessionId);
	const gazeSaver = new GazeSaverIDB(sessionId);

	let sentiment: 'negative' | 'positive' = 'positive';
</script>

{#if sentiment}
	<AppDual {gazeSaver} {connectLogger} {questionsService} {sessionId} {sentiment} />
{/if}
