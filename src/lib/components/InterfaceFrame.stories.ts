import type { Meta, StoryObj } from '@storybook/svelte';
import InterfaceFrame from './InterfaceFrame.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Interface/InterfaceFrame',
	component: InterfaceFrame,
	tags: ['autodocs']
} satisfies Meta<InterfaceFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {}
};
