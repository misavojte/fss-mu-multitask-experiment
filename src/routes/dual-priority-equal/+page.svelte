<script lang="ts">
	import AppDualPriority from '$lib/components/AppDualPriority.svelte';
	import { TimestampQuestionServiceIDB } from '$lib/services/TimestampQuestionServiceIDB';

	const sessionId = new Date().getTime() + '-' + Math.floor(1000 + Math.random() * 9000);
	const questionsService = new TimestampQuestionServiceIDB(sessionId);
	const priority: 'math' | 'social' | 'none' = 'none';
</script>

<AppDualPriority {questionsService} {sessionId} {priority} />
