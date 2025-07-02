import type { Meta, StoryObj } from '@storybook/svelte';
import GazeFullscreenCheck from './GazeFullscreenCheck.svelte';

const meta: Meta<GazeFullscreenCheck> = {
	title: 'Components/GazeFullscreenCheck',
	component: GazeFullscreenCheck,
	parameters: {
		layout: 'centered'
	},
	tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default fullscreen check component showing instructions and buttons
 */
export const Default: Story = {
	args: {}
};

/**
 * Story demonstrating the component in a contained layout
 */
export const InContainer: Story = {
	args: {},
	parameters: {
		layout: 'padded'
	}
};
