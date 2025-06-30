import type { Meta, StoryObj } from '@storybook/svelte';
import { setLocale } from '../../i18n/i18n-svelte';
import { loadLocale } from '../../i18n/i18n-util.sync';
import TaskPatternMatchingStimulus from './TaskPatternMatchingStimulus.svelte';
import { TaskHandlerIntelligenceMock } from '$lib/services/TaskHandlerMock';

const taskPatternMatchingService = new TaskHandlerIntelligenceMock();

loadLocale('cs');
setLocale('cs');

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Experiment/TaskPatternMatchingStimulus',
	component: TaskPatternMatchingStimulus,
	tags: ['autodocs'],
	argTypes: {
		patternMatchingObject: {
			control: 'object',
			defaultValue: taskPatternMatchingService.taskPatternMatchingObjects[0]
		}
	}
} satisfies Meta<TaskPatternMatchingStimulus>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		patternMatchingObject: taskPatternMatchingService.taskPatternMatchingObjects[0]
	}
};
