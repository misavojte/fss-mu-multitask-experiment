import type { Meta, StoryObj } from '@storybook/svelte';
import InterfaceFooter from './InterfaceFooter.svelte';
import { initI18n } from '../../locale';

initI18n();

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Interface/InterfaceFooter',
	component: InterfaceFooter,
	tags: ['autodocs']
} satisfies Meta<InterfaceFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {}
};
