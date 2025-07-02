import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
	escapeCsvValue,
	actionLogsToCSV,
	gazesToCSV,
	downloadCSV,
	parseSessionIdToDate
} from './csvDownload';
import type { ActionLog } from '$lib/database/models/ActionLog.model';
import type { Gaze } from '$lib/database/models/Gaze.model';

describe('csvDownload utilities', () => {
	describe('escapeCsvValue', () => {
		it('should return empty string for null or undefined', () => {
			expect(escapeCsvValue(null)).toBe('');
			expect(escapeCsvValue(undefined)).toBe('');
		});

		it('should return string value as-is if no special characters', () => {
			expect(escapeCsvValue('simple')).toBe('simple');
			expect(escapeCsvValue(123)).toBe('123');
			expect(escapeCsvValue(true)).toBe('true');
		});

		it('should wrap in quotes and escape internal quotes for values with commas', () => {
			expect(escapeCsvValue('hello,world')).toBe('"hello,world"');
		});

		it('should wrap in quotes and escape internal quotes for values with quotes', () => {
			expect(escapeCsvValue('hello"world')).toBe('"hello""world"');
		});

		it('should wrap in quotes for values with newlines', () => {
			expect(escapeCsvValue('hello\nworld')).toBe('"hello\nworld"');
			expect(escapeCsvValue('hello\rworld')).toBe('"hello\rworld"');
		});

		it('should handle complex cases with mixed special characters', () => {
			expect(escapeCsvValue('hello,"world"\ntest')).toBe('"hello,""world""\ntest"');
		});
	});

	describe('actionLogsToCSV', () => {
		it('should return empty string for empty array', () => {
			expect(actionLogsToCSV([])).toBe('');
		});

		it('should generate correct CSV for single action log', () => {
			const logs: ActionLog[] = [
				{
					id: 1,
					timestamp: '2023-01-01T00:00:00Z',
					sessionId: 'session-123',
					type: 'click',
					value: 'button clicked'
				}
			];

			const result = actionLogsToCSV(logs);
			const lines = result.split('\n');

			expect(lines).toHaveLength(2);
			expect(lines[0]).toBe('id,timestamp,sessionId,type,value');
			expect(lines[1]).toBe('1,2023-01-01T00:00:00Z,session-123,click,button clicked');
		});

		it('should handle multiple action logs', () => {
			const logs: ActionLog[] = [
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

			const result = actionLogsToCSV(logs);
			const lines = result.split('\n');

			expect(lines).toHaveLength(3);
			expect(lines[0]).toBe('id,timestamp,sessionId,type,value');
			expect(lines[1]).toBe('1,2023-01-01T00:00:00Z,session-123,click,button clicked');
			expect(lines[2]).toBe('2,2023-01-01T00:01:00Z,session-123,view,page viewed');
		});

		it('should properly escape values with commas and quotes', () => {
			const logs: ActionLog[] = [
				{
					id: 1,
					timestamp: '2023-01-01T00:00:00Z',
					sessionId: 'session-123',
					type: 'input',
					value: 'user said "hello, world"'
				}
			];

			const result = actionLogsToCSV(logs);
			const lines = result.split('\n');

			expect(lines[1]).toBe(
				'1,2023-01-01T00:00:00Z,session-123,input,"user said ""hello, world"""'
			);
		});
	});

	describe('gazesToCSV', () => {
		it('should return empty string for empty array', () => {
			expect(gazesToCSV([])).toBe('');
		});

		it('should generate correct CSV for single gaze entry', () => {
			const logs: Gaze[] = [
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
					aoi: 'button1;button2'
				}
			];

			const result = gazesToCSV(logs);
			const lines = result.split('\n');

			expect(lines).toHaveLength(2);
			expect(lines[0]).toBe(
				'id,timestamp,ISOtimestamp,intersectTimestamp,deviceTimestamp,deviceId,sessionId,gazeSessionId,xL,xLScreenRelative,xR,xRScreenRelative,yL,yLScreenRelative,yR,yRScreenRelative,validityL,validityR,aoi'
			);
			expect(lines[1]).toBe(
				'1,1640995200000,2023-01-01T00:00:00Z,1640995200001,1640995200002,device-123,session-123,gaze-session-456,100.5,0.25,101.5,0.26,200.5,0.35,201.5,0.36,true,false,button1;button2'
			);
		});

		it('should handle missing optional fields', () => {
			const logs: Gaze[] = [
				{
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
					aoi: ''
				}
			];

			const result = gazesToCSV(logs);
			const lines = result.split('\n');

			expect(lines).toHaveLength(2);
			expect(lines[1]).toBe(
				',1640995200000,2023-01-01T00:00:00Z,1640995200001,1640995200002,device-123,session-123,gaze-session-456,100.5,0.25,101.5,0.26,200.5,0.35,201.5,0.36,true,false,'
			);
		});
	});

	describe('downloadCSV', () => {
		beforeEach(() => {
			vi.clearAllMocks();
		});

		it('should create blob and download link correctly', () => {
			const csvContent = 'header1,header2\nvalue1,value2';
			const filename = 'test.csv';

			downloadCSV(csvContent, filename);

			// Check that Blob was created with correct parameters
			expect(globalThis.Blob).toHaveBeenCalledWith([csvContent], {
				type: 'text/csv;charset=utf-8;'
			});

			// Check that URL.createObjectURL was called
			expect(URL.createObjectURL).toHaveBeenCalled();

			// Check that createElement was called to create an 'a' element
			expect(document.createElement).toHaveBeenCalledWith('a');

			// Check that URL.revokeObjectURL was called
			expect(URL.revokeObjectURL).toHaveBeenCalledWith('mock-url');
		});

		it('should set correct attributes on download link', () => {
			const csvContent = 'test,data';
			const filename = 'test-file.csv';

			const mockElement = {
				href: '',
				download: '',
				style: { display: '' },
				click: vi.fn()
			};

			vi.mocked(document.createElement).mockReturnValue(mockElement as any);

			downloadCSV(csvContent, filename);

			expect(mockElement.href).toBe('mock-url');
			expect(mockElement.download).toBe(filename);
			expect(mockElement.style.display).toBe('none');
			expect(mockElement.click).toHaveBeenCalled();
		});
	});

	describe('parseSessionIdToDate', () => {
		it('should parse valid session ID with timestamp', () => {
			const sessionId = '1640995200000-abc-123';
			const result = parseSessionIdToDate(sessionId);

			// The result should be a valid date string (format may vary by locale)
			expect(result).not.toBe('Invalid date');
			expect(typeof result).toBe('string');
		});

		it('should return "Invalid date" for invalid timestamp', () => {
			expect(parseSessionIdToDate('invalid-session-id')).toBe('Invalid date');
			expect(parseSessionIdToDate('abc-def-ghi')).toBe('Invalid date');
		});

		it('should return "Invalid date" for malformed session ID', () => {
			expect(parseSessionIdToDate('')).toBe('Invalid date');
			expect(parseSessionIdToDate('no-dashes')).toBe('Invalid date');
		});

		it('should handle session ID with valid timestamp format', () => {
			const timestamp = Date.now();
			const sessionId = `${timestamp}-session-123`;
			const result = parseSessionIdToDate(sessionId);

			expect(result).not.toBe('Invalid date');
			expect(result).toContain(new Date(timestamp).getFullYear().toString());
		});
	});
});
