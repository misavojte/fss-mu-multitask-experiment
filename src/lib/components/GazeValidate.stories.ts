import type { Meta, StoryObj } from '@storybook/svelte';
import GazeValidate from './GazeValidate.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Gaze/GazeValidate',
	component: GazeValidate,
	tags: ['autodocs']
} satisfies Meta<GazeValidate>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {}
};
