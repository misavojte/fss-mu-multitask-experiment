import type { Meta, StoryObj } from '@storybook/svelte';
import TaskSocialMediaStimulus from './TaskSocialMediaStimulus.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Experiment/TaskSocialMediaStimulus',
	component: TaskSocialMediaStimulus,
	tags: ['autodocs'],
	argTypes: {
		stimulus: {
			control: 'select',
			options: [
				null,
				{
					id: '1',
					src: '/task/3/1.png'
				}
			]
		}
	}
} satisfies Meta<TaskSocialMediaStimulus>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Null: Story = {
	args: {
		stimulus: null
	}
};

export const Default: Story = {
	args: {
		stimulus: null
	}
};
