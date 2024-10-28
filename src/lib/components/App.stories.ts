import type { Meta, StoryObj } from '@storybook/svelte';
import App from './App.svelte';
import { setLocale } from '../../i18n/i18n-svelte';
import { loadLocale } from '../../i18n/i18n-util.sync';
import { TimestampQuestionServiceMock } from '$lib/services/TimestampQuestionServiceMock';
import { TaskPatternMatchingHandlerMock } from '$lib/services/TaskPatternMatchingHandlerMock';
import { GazeSaverMock } from '$lib/services/GazeSaverMock';
import { ConnectLoggerMock } from '$lib/services/ConnectLoggerMock';

loadLocale('cs');
setLocale('cs');

const questionsService = new TimestampQuestionServiceMock();
const taskHandler = new TaskPatternMatchingHandlerMock('prioritize');
const gazeSaver = new GazeSaverMock();
const connectLogger = new ConnectLoggerMock();

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'App/App',
	component: App,
	tags: ['autodocs'],
	argTypes: {}
} satisfies Meta<App>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		questionsService,
		taskHandler,
		gazeSaver,
		connectLogger
	}
};
