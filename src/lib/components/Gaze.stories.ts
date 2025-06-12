import type { Meta, StoryObj } from '@storybook/svelte';
import Gaze from './Gaze.svelte';
import { GazeManager } from 'develex-js-sdk';

const gazeManager = new GazeManager();

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Gaze/Gaze',
	component: Gaze,
	tags: ['autodocs']
} satisfies Meta<Gaze>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		gazeManager
	}
};
