import type { Meta, StoryObj } from '@storybook/svelte';
import { setLocale } from '../../i18n/i18n-svelte';
import { loadLocale } from '../../i18n/i18n-util.sync';
import TaskPatternMatching from './TaskPatternMatching.svelte';
import { TaskHandlerIntelligenceMock, TaskHandlerMathMock } from '$lib/services/TaskHandlerMock';

const taskHandler = new TaskHandlerIntelligenceMock();
const taskHandlerMath = new TaskHandlerMathMock();

loadLocale('cs');
setLocale('cs');

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Experiment/TaskPatternMatching',
	component: TaskPatternMatching,
	tags: ['autodocs'],
	argTypes: {
		patternMatchingObjects: {
			control: 'object',
			defaultValue: taskHandler.getTaskPatternMatchingObjectsForPractice()
		}
	}
} satisfies Meta<TaskPatternMatching>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Patterns: Story = {
	args: {
		patternMatchingObjects: taskHandler.getTaskPatternMatchingObjectsForPractice(),
		taskHandler
	}
};

export const Math: Story = {
	args: {
		patternMatchingObjects: taskHandlerMath.getTaskPatternMatchingObjectsForPractice(),
		taskHandler: taskHandlerMath
	}
};
