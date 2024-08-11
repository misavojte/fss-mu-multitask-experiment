import type { Meta, StoryObj } from '@storybook/svelte';
import QuestionTypeText from './QuestionTypeText.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Question/QuestionTypeText',
	component: QuestionTypeText,
	tags: ['autodocs'],
	argTypes: {
		question: {
			control: 'object',
			defaultValue: {
				id: '1',
				required: true,
				headingText: 'How are you feeling today?',
				confirmText: 'Confirm',
				type: 'text'
			}
		},
		value: {
			control: 'text',
			defaultValue: ''
		}
	}
} satisfies Meta<QuestionTypeText>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		question: {
			id: '1',
			headingText: 'How are you feeling today?',
			confirmText: 'Confirm',
			type: 'text',
			required: true
		},
		value: ''
	}
};
