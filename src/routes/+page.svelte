<script lang="ts">
	import App from '$lib/components/App.svelte';
	import { ConnectLoggerIDB } from '$lib/services/ConnectLoggerIDB';
	import { GazeSaverIDB } from '$lib/services/GazeSaverIDB';
	import { TaskHandlerMathIDB } from '$lib/services/TaskHandlerIDB';
	import { TimestampQuestionServiceIDB } from '$lib/services/TimestampQuestionServiceIDB';
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	const sessionId = new Date().getTime() + '-' + Math.floor(1000 + Math.random() * 9000);

	const questionsService = new TimestampQuestionServiceIDB(sessionId);
	const connectLogger = new ConnectLoggerIDB(sessionId);
	const gazeSaver = new GazeSaverIDB(sessionId);
	const taskHandler = new TaskHandlerMathIDB(sessionId, base);

	// obtain sentiment from localStorage, default to 'negative' if not set
	const obtainSentiment = (): 'negative' | 'positive' => {
		const storedSentiment = localStorage.getItem('multitaskingExperimentFSSMUSentiment');
		return storedSentiment === 'positive' ? 'positive' : 'negative';
	};

	const setSentiment = (sentiment: 'negative' | 'positive') => {
		localStorage.setItem('multitaskingExperimentFSSMUSentiment', sentiment);
	};

	let sentiment: 'negative' | 'positive'; // default value for SSR

	onMount(() => {
		sentiment = obtainSentiment();
		setSentiment(sentiment);
	});
</script>

{#if sentiment}
	<App {gazeSaver} {connectLogger} {questionsService} {taskHandler} {sentiment} />
{/if}
