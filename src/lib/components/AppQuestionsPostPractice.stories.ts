import type { Meta, StoryObj } from '@storybook/svelte';
import AppQuestionsPostPractice from './AppQuestionsPostPractice.svelte';
import { TimestampQuestionServiceMock } from '$lib/services/TimestampQuestionServiceMock';

const questionsService = new TimestampQuestionServiceMock();
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'App/AppQuestionsPostPractice',
	component: AppQuestionsPostPractice,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<AppQuestionsPostPractice>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		questionsService
	}
};
