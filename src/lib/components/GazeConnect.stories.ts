import type { Meta, StoryObj } from '@storybook/svelte';
import GazeConnect from './GazeConnect.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Gaze/GazeConnect',
	component: GazeConnect,
	tags: ['autodocs']
} satisfies Meta<GazeConnect>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {}
};
