import type { Meta, StoryObj } from '@storybook/svelte';
import AppQuestionsPostPractice from './AppQuestionsPostTrial.svelte';
import { TaskHandlerIntelligenceMock } from '$lib/services/TaskHandlerMock';
import { setLocale } from '../../i18n/i18n-svelte';
import { loadLocale } from '../../i18n/i18n-util.sync';
import StoriesWrapper from './StoriesWrapper.svelte';

loadLocale('cs');
setLocale('cs');

const taskHandler = new TaskHandlerIntelligenceMock();
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'App/AppQuestionsPostTrial',
	component: AppQuestionsPostPractice,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<AppQuestionsPostPractice>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		taskHandler
	},
	decorators: [
		(Story) => ({
			Component: StoriesWrapper,
			props: {},
			$$slots: {
				default: Story // Passes the story into the slot of Wrapper
			}
		})
	]
};
