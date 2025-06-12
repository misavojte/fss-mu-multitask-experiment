import type { Meta, StoryObj } from '@storybook/svelte';
import GazeCheck from './GazeCheck.svelte';
import { GazeManager } from 'develex-js-sdk';
const gazeManager = new GazeManager();
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Gaze/GazeCheck',
	component: GazeCheck,
	tags: ['autodocs']
} satisfies Meta<GazeCheck>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		gazeManager
	}
};
