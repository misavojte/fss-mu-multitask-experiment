import type { Meta, StoryObj } from '@storybook/svelte';
import QuestionBattery from './QuestionBattery.svelte';
import { setLocale } from '../../i18n/i18n-svelte';
import { loadLocale } from '../../i18n/i18n-util.sync';

loadLocale('cs');
setLocale('cs');

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
	},
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: 'fullscreen'
	}
} satisfies Meta<QuestionBattery>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		questions: defaultValue
	}
};
