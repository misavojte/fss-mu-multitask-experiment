import type { Meta, StoryObj } from '@storybook/svelte';
import GazeConnectButton from './GazeConnectButton.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Gaze/GazeConnectButton',
	component: GazeConnectButton,
	tags: ['autodocs']
} satisfies Meta<GazeConnectButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {}
};
