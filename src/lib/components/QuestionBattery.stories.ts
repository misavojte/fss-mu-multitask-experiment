import type { Meta, StoryObj } from '@storybook/svelte';
import QuestionBattery from './QuestionBattery.svelte';

const defaultValue = [
	{
		id: '1',
		type: 'instruction',
		headingText: 'Welcome to the eHealth Experiment',
		confirmText: 'I confirm that I have read and understood the instructions.',
		paragraphs: [
			'This is a question instruction.',
			'This is a question instruction.',
			'This is a question instruction.'
		],
		required: true
	},
	{
		id: '2',
		headingText: 'How are you feeling today?',
		confirmText: 'Confirm',
		type: 'text',
		required: true
	},
	{
		id: '3',
		headingText: 'How are you feeling tomorrow?',
		confirmText: 'Confirm',
		type: 'text',
		required: true
	}
] as const;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Question/QuestionBattery',
	component: QuestionBattery,
	tags: ['autodocs'],
	argTypes: {
		questions: {
			control: 'object',
			defaultValue
		}
	}
} satisfies Meta<QuestionBattery>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		questions: defaultValue,
		locale: {
			back: 'Back',
			next: 'Next'
		}
	}
};
