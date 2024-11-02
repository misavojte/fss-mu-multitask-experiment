import type { Meta, StoryObj } from '@storybook/svelte';
import { setLocale } from '../../i18n/i18n-svelte';
import { loadLocale } from '../../i18n/i18n-util.sync';
import Task from './Task.svelte';
import { TaskHandlerIntelligenceMock, TaskHandlerMathMock } from '$lib/services/TaskHandlerMock';

loadLocale('cs');
setLocale('cs');

const taskHandler = new TaskHandlerIntelligenceMock();
const taskHandlerMath = new TaskHandlerMathMock();

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Experiment/Task',
	component: Task,
	tags: ['autodocs'],
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'fullscreen'
	}
} satisfies Meta<Task>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		socialMediaStimuliAS: [
			{
				id: '1',
				src: 'task/3/1.png'
			},
			{
				id: '2',
				src: 'task/3/2.png'
			},
			{
				id: '3',
				src: 'task/3/3.png'
			}
		],
		socialMediaStimuliNS: [
			{
				id: '1',
				src: 'task/3/1.png'
			},
			{
				id: '2',
				src: 'task/3/2.png'
			},
			{
				id: '3',
				src: 'task/3/3.png'
			}
		],
		patternMatchingObjects: taskHandler.getTaskPatternMatchingObjectsForPractice(),
		videoDocumentarySrc: 'video/video.mp4',
		taskHandler
	}
};

export const Math: Story = {
	args: {
		socialMediaStimuliAS: [
			{
				id: '1',
				src: 'task/3/1.png'
			},
			{
				id: '2',
				src: 'task/3/2.png'
			},
			{
				id: '3',
				src: 'task/3/3.png'
			}
		],
		socialMediaStimuliNS: [
			{
				id: '1',
				src: 'task/3/1.png'
			},
			{
				id: '2',
				src: 'task/3/2.png'
			},
			{
				id: '3',
				src: 'task/3/3.png'
			}
		],
		patternMatchingObjects: taskHandlerMath.getTaskPatternMatchingObjectsForPractice(),
		videoDocumentarySrc: 'video/video.mp4',
		taskHandler: taskHandlerMath
	}
};
