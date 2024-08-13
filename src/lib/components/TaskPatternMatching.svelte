<script lang="ts">
	import type { ITaskPatternMatchingObject } from '$lib/interfaces/ITaskPatternMatching';
	import TaskPatternMatchingStimulus from './TaskPatternMatchingStimulus.svelte';

	export let patternMatchingObjects: ITaskPatternMatchingObject[];
</script>

<TaskPatternMatchingStimulus patternMatchingObject={patternMatchingObjects[0]} />
