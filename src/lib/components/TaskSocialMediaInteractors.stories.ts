import type { Meta, StoryObj } from '@storybook/svelte';
import TaskSocialMediaInteractors from './TaskSocialMediaInteractors.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Experiment/TaskSocialMediaInteractors',
	component: TaskSocialMediaInteractors,
	tags: ['autodocs'],
	argTypes: {
		socialMediaButtons: {
			control: 'object',
			defaultValue: [
				{
					title: 'Share',
					id: 'share'
				}
			]
		}
	}
} satisfies Meta<TaskSocialMediaInteractors>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		socialMediaButtons: [
			{
				text: 'Share',
				id: 'share'
			},
			{
				text: 'Like',
				id: 'like'
			},
			{
				text: 'Comment',
				id: 'comment'
			},
			{
				text: 'Save',
				id: 'save'
			}
		]
	}
};
