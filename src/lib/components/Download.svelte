<script lang="ts">
	import {
		getQuestionnaireLinkingValue,
		getUniqueSessionIds
	} from '$lib/database/repositories/ActionLog.repository';
	import {
		downloadActionLogs,
		downloadGazes,
		deleteSession,
		generateActionLogsFilename,
		generateGazesFilename
	} from '$lib/services/downloadService';
	import { parseSessionIdToDate } from '$lib/utils/csvDownload';

	$: sessionIds = getUniqueSessionIds();

	const handleDownloadActions = async (sessionId: string) => {
		try {
			const filename = generateActionLogsFilename(sessionId);
			await downloadActionLogs(sessionId, filename);
		} catch (error) {
			console.error('Failed to download actions:', error);
			alert('Failed to download actions. Please try again.');
		}
	};

	const handleDownloadGazes = async (sessionId: string) => {
		try {
			const filename = generateGazesFilename(sessionId);
			await downloadGazes(sessionId, filename);
		} catch (error) {
			console.error('Failed to download gazes:', error);
			alert('Failed to download gazes. Please try again.');
		}
	};

	const handleDeleteSession = (sessionId: string) => async () => {
		const response = confirm('Are you sure you want to delete this session?');
		if (response) {
			try {
				await deleteSession(sessionId);
				// requery the session ids
				sessionIds = getUniqueSessionIds();
			} catch (error) {
				console.error('Failed to delete session:', error);
				alert('Failed to delete session. Please try again.');
			}
		}
	};
</script>

<div class="p-4">
	<h2 class="text-2xl font-bold mb-4">Session List</h2>
	<div class="flex flex-row gap-4 mb-8">
		<button
			class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			on:click={() => handleDownloadActions('all')}
		>
			Download Actions
		</button>
		<button
			class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			on:click={() => handleDownloadGazes('all')}
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
							on:click={() => handleDownloadActions(sessionId)}
						>
							Actions
						</button>
						<button
							class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
							on:click={() => handleDownloadGazes(sessionId)}
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
