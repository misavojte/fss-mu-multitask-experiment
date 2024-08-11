import type { Meta, StoryObj } from '@storybook/svelte';
import InterfaceProgress from './InterfaceProgress.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Interface/InterfaceProgress',
	component: InterfaceProgress,
	tags: ['autodocs'],
	argTypes: {
		currentValue: {
			control: 'number',
			defaultValue: 0
		},
		maxValue: {
			control: 'number',
			defaultValue: 100
		}
	}
} satisfies Meta<InterfaceProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		currentValue: 0,
		maxValue: 100
	}
};
