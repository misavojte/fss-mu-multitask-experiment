import type { Meta, StoryObj } from '@storybook/svelte';
import Question from './Question.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Question/Question',
	component: Question,
	tags: ['autodocs'],
	argTypes: {
		questionText: {
			control: 'text',
			defaultValue: 'What is your name?'
		}
	}
} satisfies Meta<Question>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		questionText: 'What is your name?'
	}
};
