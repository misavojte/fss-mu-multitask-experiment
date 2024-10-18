<script lang="ts">
	import {
		deleteActionLogsBySessionId,
		getActionLogsAsCSV,
		getAllActionLogsAsCSV,
		getQuestionnaireLinkingValue,
		getUniqueSessionIds
	} from '$lib/database/repositories/ActionLog.repository';
	import {
		deleteGazesBySessionId,
		getAllGazesAsCSV,
		getGazesAsCSV
	} from '$lib/database/repositories/Gaze.repository';

	const parseSessionIdToDate = (sessionId: string) => {
		const timestamp = parseInt(sessionId.split('-')[0]);
		return new Date(timestamp).toLocaleString();
	};

	$: sessionIds = getUniqueSessionIds();

	const downloadActionsStringAsCsv = async (filename: string, sessionId: string) => {
		const string =
			sessionId === 'all' ? await getAllActionLogsAsCSV() : await getActionLogsAsCSV(sessionId);
		const blob = new Blob([string], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	};

	const downloadGazesStringAsCsv = async (filename: string, sessionId: string) => {
		const string = sessionId === 'all' ? await getAllGazesAsCSV() : await getGazesAsCSV(sessionId);
		const blob = new Blob([string], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = filename;
		a.click();
		URL.revokeObjectURL(url);
	};

	const handleDeleteSession = (sessionId: string) => async () => {
		const response = await confirm('Are you sure you want to delete this session?');
		if (response) {
			void deleteActionLogsBySessionId(sessionId);
			void deleteGazesBySessionId(sessionId);
			// requery the session ids
			sessionIds = getUniqueSessionIds();
		}
	};
</script>

<div class="p-4">
	<h2 class="text-2xl font-bold mb-4">Session List</h2>
	<div class="flex flex-row gap-4 mb-8">
		<button
			class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			on:click={() => downloadActionsStringAsCsv('multitask_action_allSessions.csv', 'all')}
		>
			Download Actions
		</button>
		<button
			class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			on:click={() => downloadGazesStringAsCsv('multitask_gaze_allSessions.csv', 'all')}
		>
			Download Gazes
		</button>
	</div>
	{#await sessionIds}
		<p>Loading...</p>
	{:then sessionIds}
		<ul class="w-full border">
			<li
				class="grid grid-cols-4 gap-8 last:border-b-0 border-b p-3 text-gray-700 items-center bg-slate-100"
			>
				<p>Session ID</p>
				<p>Date</p>
				<p>User</p>
				<p class="ml-auto">Actions</p>
			</li>
			{#each sessionIds as sessionId}
				<li class="grid grid-cols-4 gap-8 last:border-b-0 border-b p-3 text-gray-700 items-center">
					<p>
						{sessionId}
					</p>
					<p>
						{parseSessionIdToDate(sessionId)}
					</p>
					{#await getQuestionnaireLinkingValue(sessionId)}
						<p>Loading user</p>
					{:then linkingValue}
						{#if linkingValue === undefined}
							<p class="text-red-500">No user found</p>
						{:else}
							<p>{linkingValue}</p>
						{/if}
					{:catch error}
						<p>Could not load user</p>
					{/await}
					<div class="ml-auto">
						<button
							class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
							on:click={() =>
								downloadActionsStringAsCsv('multitask_action_' + sessionId + '.csv', sessionId)}
						>
							Actions
						</button>
						<button
							class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
							on:click={() =>
								downloadGazesStringAsCsv('multitask_gaze_' + sessionId + '.csv', sessionId)}
						>
							Gaze
						</button>
						<button
							class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
							on:click={handleDeleteSession(sessionId)}
						>
							Delete
						</button>
					</div>
				</li>
			{/each}
		</ul>
	{:catch error}
		<p>
			{error.message}
		</p>
	{/await}
</div>
