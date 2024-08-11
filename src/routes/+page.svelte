<script lang="ts">
	import QuestionManager from '$lib/components/QuestionManager.svelte';
	import type { IQuestionBattery } from '$lib/interfaces/IQuestion';
	import { LL } from '../i18n/i18n-svelte';

	let questions: IQuestionBattery = [
		{
			id: '1',
			headingText: $LL['question']['1']['heading'](),
			confirmText: $LL['question']['1']['confirm'](),
			type: 'text',
			required: true
		},
		{
			id: '2',
			headingText: $LL.question[2].heading(),
			confirmText: $LL.question[2].confirm(),
			type: 'text',
			required: true
		},
		{
			id: '3',
			headingText: $LL.question[3].heading(),
			confirmText: $LL.question[3].confirm(),
			type: 'text',
			required: false
		}
	];
</script>

<QuestionManager {questions} />
