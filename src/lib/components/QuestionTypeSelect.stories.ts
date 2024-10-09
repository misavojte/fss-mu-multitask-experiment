import type { Meta, StoryObj } from '@storybook/svelte';
import QuestionTypeSelect from './QuestionTypeSelect.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Question/QuestionTypeSelect',
	component: QuestionTypeSelect,
	tags: ['autodocs'],
	argTypes: {
		question: {
			control: 'object',
			defaultValue: {
				id: '1',
				required: true,
				headingText: 'How are you feeling today?',
				type: 'select',
				options: ['Good', 'Okay', 'Bad']
			}
		},
		value: {
			control: 'text',
			defaultValue: ''
		}
	}
} satisfies Meta<QuestionTypeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		question: {
			id: '1',
			headingText: 'How are you feeling today?',
			options: ['Good', 'Okay', 'Bad'],
			type: 'select',
			required: true
		},
		value: ''
	}
};
