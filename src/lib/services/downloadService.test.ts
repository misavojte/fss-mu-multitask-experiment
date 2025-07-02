import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
	downloadActionLogs,
	downloadGazes,
	deleteSession,
	generateActionLogsFilename,
	generateGazesFilename
} from './downloadService';
import type { ActionLog } from '$lib/database/models/ActionLog.model';
import type { Gaze } from '$lib/database/models/Gaze.model';

// Mock the repository functions
vi.mock('$lib/database/repositories/ActionLog.repository', () => ({
	getActionLogsBySessionId: vi.fn(),
	deleteActionLogsBySessionId: vi.fn()
}));

vi.mock('$lib/database/repositories/Gaze.repository', () => ({
	getGazesBySessionId: vi.fn(),
	deleteGazesBySessionId: vi.fn()
}));

// Mock the CSV utilities
vi.mock('$lib/utils/csvDownload', () => ({
	actionLogsToCSV: vi.fn(),
	gazesToCSV: vi.fn(),
	downloadCSV: vi.fn()
}));

// Mock the database import
vi.mock('$lib/database/database', () => ({
	default: {
		actionLogs: {
			toArray: vi.fn()
		},
		gazes: {
			toArray: vi.fn()
		}
	}
}));

// Import mocked functions for type safety
import {
	getActionLogsBySessionId,
	deleteActionLogsBySessionId
} from '$lib/database/repositories/ActionLog.repository';
import {
	getGazesBySessionId,
	deleteGazesBySessionId
} from '$lib/database/repositories/Gaze.repository';
import { actionLogsToCSV, gazesToCSV, downloadCSV } from '$lib/utils/csvDownload';

describe('downloadService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe('downloadActionLogs', () => {
		const mockActionLogs: ActionLog[] = [
			{
				id: 1,
				timestamp: '2023-01-01T00:00:00Z',
				sessionId: 'session-123',
				type: 'click',
				value: 'button clicked'
			},
			{
				id: 2,
				timestamp: '2023-01-01T00:01:00Z',
				sessionId: 'session-123',
				type: 'view',
				value: 'page viewed'
			}
		];

		it('should download action logs for specific session', async () => {
			const sessionId = 'session-123';
			const filename = 'test-actions.csv';
			const mockCsv = 'header\ndata';

			vi.mocked(getActionLogsBySessionId).mockResolvedValue(mockActionLogs);
			vi.mocked(actionLogsToCSV).mockReturnValue(mockCsv);

			await downloadActionLogs(sessionId, filename);

			expect(getActionLogsBySessionId).toHaveBeenCalledWith(sessionId);
			expect(actionLogsToCSV).toHaveBeenCalledWith(mockActionLogs);
			expect(downloadCSV).toHaveBeenCalledWith(mockCsv, filename);
		});

		it('should download all action logs when sessionId is "all"', async () => {
			const sessionId = 'all';
			const filename = 'all-actions.csv';
			const mockCsv = 'header\ndata';

			// Mock the dynamic import
			const mockDb = {
				actionLogs: {
					toArray: vi.fn().mockResolvedValue(mockActionLogs)
				}
			};

			vi.mocked(actionLogsToCSV).mockReturnValue(mockCsv);

			// Mock dynamic import
			vi.doMock('$lib/database/database', () => ({
				default: mockDb
			}));

			await downloadActionLogs(sessionId, filename);

			expect(actionLogsToCSV).toHaveBeenCalledWith(mockActionLogs);
			expect(downloadCSV).toHaveBeenCalledWith(mockCsv, filename);
		});

		it('should handle empty action logs gracefully', async () => {
			const sessionId = 'session-123';
			const filename = 'test-actions.csv';

			vi.mocked(getActionLogsBySessionId).mockResolvedValue([]);
			vi.mocked(actionLogsToCSV).mockReturnValue('');

			const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

			await downloadActionLogs(sessionId, filename);

			expect(consoleSpy).toHaveBeenCalledWith('No action logs found for download');
			expect(downloadCSV).not.toHaveBeenCalled();

			consoleSpy.mockRestore();
		});

		it('should handle errors properly', async () => {
			const sessionId = 'session-123';
			const filename = 'test-actions.csv';
			const error = new Error('Database error');

			vi.mocked(getActionLogsBySessionId).mockRejectedValue(error);

			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

			await expect(downloadActionLogs(sessionId, filename)).rejects.toThrow(
				'Failed to download action logs'
			);
			expect(consoleSpy).toHaveBeenCalledWith('Failed to download action logs:', error);

			consoleSpy.mockRestore();
		});
	});

	describe('downloadGazes', () => {
		const mockGazes: Gaze[] = [
			{
				id: 1,
				timestamp: '1640995200000',
				ISOtimestamp: '2023-01-01T00:00:00Z',
				intersectTimestamp: '1640995200001',
				deviceTimestamp: '1640995200002',
				deviceId: 'device-123',
				sessionId: 'session-123',
				gazeSessionId: 'gaze-session-456',
				xL: 100.5,
				xLScreenRelative: 0.25,
				xR: 101.5,
				xRScreenRelative: 0.26,
				yL: 200.5,
				yLScreenRelative: 0.35,
				yR: 201.5,
				yRScreenRelative: 0.36,
				validityL: true,
				validityR: false,
				aoi: 'button1'
			}
		];

		it('should download gazes for specific session', async () => {
			const sessionId = 'session-123';
			const filename = 'test-gazes.csv';
			const mockCsv = 'header\ndata';

			vi.mocked(getGazesBySessionId).mockResolvedValue(mockGazes);
			vi.mocked(gazesToCSV).mockReturnValue(mockCsv);

			await downloadGazes(sessionId, filename);

			expect(getGazesBySessionId).toHaveBeenCalledWith(sessionId);
			expect(gazesToCSV).toHaveBeenCalledWith(mockGazes);
			expect(downloadCSV).toHaveBeenCalledWith(mockCsv, filename);
		});

		it('should download all gazes when sessionId is "all"', async () => {
			const sessionId = 'all';
			const filename = 'all-gazes.csv';
			const mockCsv = 'header\ndata';

			// Mock the dynamic import
			const mockDb = {
				gazes: {
					toArray: vi.fn().mockResolvedValue(mockGazes)
				}
			};

			vi.mocked(gazesToCSV).mockReturnValue(mockCsv);

			// Mock dynamic import
			vi.doMock('$lib/database/database', () => ({
				default: mockDb
			}));

			await downloadGazes(sessionId, filename);

			expect(gazesToCSV).toHaveBeenCalledWith(mockGazes);
			expect(downloadCSV).toHaveBeenCalledWith(mockCsv, filename);
		});

		it('should handle empty gazes gracefully', async () => {
			const sessionId = 'session-123';
			const filename = 'test-gazes.csv';

			vi.mocked(getGazesBySessionId).mockResolvedValue([]);
			vi.mocked(gazesToCSV).mockReturnValue('');

			const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

			await downloadGazes(sessionId, filename);

			expect(consoleSpy).toHaveBeenCalledWith('No gaze data found for download');
			expect(downloadCSV).not.toHaveBeenCalled();

			consoleSpy.mockRestore();
		});

		it('should handle errors properly', async () => {
			const sessionId = 'session-123';
			const filename = 'test-gazes.csv';
			const error = new Error('Database error');

			vi.mocked(getGazesBySessionId).mockRejectedValue(error);

			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

			await expect(downloadGazes(sessionId, filename)).rejects.toThrow('Failed to download gazes');
			expect(consoleSpy).toHaveBeenCalledWith('Failed to download gazes:', error);

			consoleSpy.mockRestore();
		});
	});

	describe('deleteSession', () => {
		it('should delete both action logs and gazes for session', async () => {
			const sessionId = 'session-123';

			vi.mocked(deleteActionLogsBySessionId).mockResolvedValue();
			vi.mocked(deleteGazesBySessionId).mockResolvedValue();

			await deleteSession(sessionId);

			expect(deleteActionLogsBySessionId).toHaveBeenCalledWith(sessionId);
			expect(deleteGazesBySessionId).toHaveBeenCalledWith(sessionId);
		});

		it('should handle errors during deletion', async () => {
			const sessionId = 'session-123';
			const error = new Error('Delete error');

			vi.mocked(deleteActionLogsBySessionId).mockRejectedValue(error);

			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

			await expect(deleteSession(sessionId)).rejects.toThrow('Failed to delete session');
			expect(consoleSpy).toHaveBeenCalledWith('Failed to delete session:', error);

			consoleSpy.mockRestore();
		});

		it('should call both delete functions even if one fails', async () => {
			const sessionId = 'session-123';
			const error = new Error('Delete error');

			vi.mocked(deleteActionLogsBySessionId).mockRejectedValue(error);
			vi.mocked(deleteGazesBySessionId).mockResolvedValue();

			const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

			await expect(deleteSession(sessionId)).rejects.toThrow('Failed to delete session');

			// Both functions should still be called due to Promise.all
			expect(deleteActionLogsBySessionId).toHaveBeenCalledWith(sessionId);
			expect(deleteGazesBySessionId).toHaveBeenCalledWith(sessionId);

			consoleSpy.mockRestore();
		});
	});

	describe('generateActionLogsFilename', () => {
		it('should generate filename for all sessions', () => {
			expect(generateActionLogsFilename('all')).toBe('multitask_action_allSessions.csv');
		});

		it('should generate filename for specific session', () => {
			expect(generateActionLogsFilename('session-123')).toBe('multitask_action_session-123.csv');
		});
	});

	describe('generateGazesFilename', () => {
		it('should generate filename for all sessions', () => {
			expect(generateGazesFilename('all')).toBe('multitask_gaze_allSessions.csv');
		});

		it('should generate filename for specific session', () => {
			expect(generateGazesFilename('session-123')).toBe('multitask_gaze_session-123.csv');
		});
	});
});
