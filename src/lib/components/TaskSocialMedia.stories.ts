import type { Meta, StoryObj } from '@storybook/svelte';
import TaskSocialMedia from './TaskSocialMedia.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Experiment/TaskSocialMedia',
	component: TaskSocialMedia,
	tags: ['autodocs'],
	argTypes: {
		socialMediaButtons: {
			control: 'object',
			defaultValue: [
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
		},
		socialMediaStimuliAS: {
			control: 'object',
			defaultValue: [
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
			]
		},
		socialMediaStimuliNS: {
			control: 'object',
			defaultValue: [
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
			]
		}
	}
} satisfies Meta<TaskSocialMedia>;

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
		],
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
		]
	}
};

export const QuickInspect: Story = {
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
		],
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
		initialDelay: 1000,
		stimulusMaxDuration: 2000
	}
};
