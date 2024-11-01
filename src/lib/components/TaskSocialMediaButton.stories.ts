import type { Meta, StoryObj } from '@storybook/svelte';
import TaskSocialMediaButton from './TaskSocialMediaButton.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Experiment/TaskSocialMediaButton',
	component: TaskSocialMediaButton,
	tags: ['autodocs'],
	argTypes: {
		text: {
			control: 'text',
			defaultValue: 'Share'
		},
		id: {
			control: 'text',
			defaultValue: 'share'
		},
		color: {
			control: 'color',
			defaultValue: '#000000'
		}
	}
} satisfies Meta<TaskSocialMediaButton>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		text: 'Share',
		id: 'share'
	}
};
