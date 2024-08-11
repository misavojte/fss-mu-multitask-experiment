import type { Meta, StoryObj } from '@storybook/svelte';
import QuestionTypeInstruction from './QuestionTypeInstruction.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Question/QuestionTypeInstruction',
	component: QuestionTypeInstruction,
	tags: ['autodocs'],
	argTypes: {
		question: {
			control: 'object',
			defaultValue: {
				id: '1',
				required: true,
				headingText: 'Please answer the following questions to the best of your ability.',
				confirmText: 'I confirm that I have read and understood the instructions.',
				paragraphs: [
					'This is a question instruction.',
					'This is a question instruction.',
					'This is a question instruction.'
				]
			}
		},
		value: {
			control: 'text',
			defaultValue: ''
		}
	}
} satisfies Meta<QuestionTypeInstruction>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		question: {
			id: '1',
			headingText: 'Welcome to the eHealth Experiment',
			confirmText: 'I confirm that I have read and understood the instructions.',
			paragraphs: [
				'This is a question instruction.',
				'This is a question instruction.',
				'This is a question instruction.'
			]
		},
		value: ''
	}
};
