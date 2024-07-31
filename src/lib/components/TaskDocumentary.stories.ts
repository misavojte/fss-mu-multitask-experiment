import type { Meta, StoryObj } from '@storybook/svelte';
import TaskDocumentary from './TaskDocumentary.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Experiment/TaskDocumentary',
	component: TaskDocumentary,
	tags: ['autodocs'],
	argTypes: {
		videoDocumentarySrc: {
			control: 'text',
			defaultValue: '/video/video.mp4'
		},
		hideAllControls: {
			control: 'boolean',
			defaultValue: false
		},
		autoplay: {
			control: 'boolean',
			defaultValue: false
		}
	}
} satisfies Meta<TaskDocumentary>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DefaultVideo: Story = {
	args: {
		videoDocumentarySrc: '/video/video.mp4',
		hideAllControls: true,
		autoplay: true
	}
};

export const AllowedControls: Story = {
	args: {
		videoDocumentarySrc: '/video/video.mp4',
		hideAllControls: false,
		autoplay: false
	}
};
