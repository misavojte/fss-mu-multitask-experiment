import { describe, it, expect } from 'vitest';
import { extractIds, toIdArrayJson } from './taskLogging';
import type {
	ISocialMediaStimulus,
	ISocialMediaButton,
	ITaskPatternMatchingObject
} from '$lib/interfaces/ITaskHandler';

describe('taskLogging utilities', () => {
	describe('extractIds', () => {
		it('should extract IDs from social media stimuli array', () => {
			const stimuli: ISocialMediaStimulus[] = [
				{ id: 'stimulus-1', src: '/path/to/image1.jpg' },
				{ id: 'stimulus-2', src: '/path/to/image2.jpg' },
				{ id: 'stimulus-3', src: '/path/to/image3.jpg' }
			];

			const result = extractIds(stimuli);

			expect(result).toEqual(['stimulus-1', 'stimulus-2', 'stimulus-3']);
		});

		it('should extract IDs from social media buttons array', () => {
			const buttons: ISocialMediaButton[] = [
				{
					id: 'like',
					text: 'Like',
					color: '#3b5998',
					textColor: '#fff'
				},
				{
					id: 'dislike',
					text: 'Dislike',
					color: '#dd4b39',
					textColor: '#fff'
				},
				{
					id: 'share',
					text: 'Share',
					color: '#25d366',
					textColor: '#fff',
					html: '<svg>...</svg>'
				}
			];

			const result = extractIds(buttons);

			expect(result).toEqual(['like', 'dislike', 'share']);
		});

		it('should extract IDs from pattern matching objects (image type)', () => {
			const objects: ITaskPatternMatchingObject[] = [
				{
					type: 'image',
					id: 'pattern-1',
					matrixSrc: '/path/to/matrix1.jpg',
					responses: [
						{ id: 'T1', src: '/path/to/response1.jpg' },
						{ id: 'T2', src: '/path/to/response2.jpg' }
					]
				},
				{
					type: 'image',
					id: 'pattern-2',
					matrixSrc: '/path/to/matrix2.jpg',
					responses: [
						{ id: 'T1', src: '/path/to/response3.jpg' },
						{ id: 'T2', src: '/path/to/response4.jpg' }
					]
				}
			];

			const result = extractIds(objects);

			expect(result).toEqual(['pattern-1', 'pattern-2']);
		});

		it('should extract IDs from pattern matching objects (text type)', () => {
			const objects: ITaskPatternMatchingObject[] = [
				{
					type: 'text',
					id: 'text-pattern-1',
					matrixContent: 'Matrix content 1',
					responses: [
						{ id: '1', content: 'Response 1' },
						{ id: '2', content: 'Response 2' }
					]
				}
			];

			const result = extractIds(objects);

			expect(result).toEqual(['text-pattern-1']);
		});

		it('should extract IDs from mixed pattern matching objects', () => {
			const objects: ITaskPatternMatchingObject[] = [
				{
					type: 'image',
					id: 'image-pattern-1',
					matrixSrc: '/path/to/matrix1.jpg',
					responses: [{ id: 'T1', src: '/path/to/response1.jpg' }]
				},
				{
					type: 'text',
					id: 'text-pattern-1',
					matrixContent: 'Matrix content',
					responses: [{ id: '1', content: 'Response 1' }]
				}
			];

			const result = extractIds(objects);

			expect(result).toEqual(['image-pattern-1', 'text-pattern-1']);
		});

		it('should return empty array for empty input', () => {
			const result = extractIds([]);
			expect(result).toEqual([]);
		});

		it('should work with any object type that has an id field', () => {
			const genericObjects = [
				{ id: 'test-1', someField: 'value1' },
				{ id: 'test-2', someField: 'value2', anotherField: 123 }
			];

			const result = extractIds(genericObjects);

			expect(result).toEqual(['test-1', 'test-2']);
		});
	});

	describe('toIdArrayJson', () => {
		it('should convert social media stimuli to JSON array of IDs', () => {
			const stimuli: ISocialMediaStimulus[] = [
				{ id: 'stimulus-1', src: '/path/to/image1.jpg' },
				{ id: 'stimulus-2', src: '/path/to/image2.jpg' }
			];

			const result = toIdArrayJson(stimuli);

			expect(result).toBe('["stimulus-1","stimulus-2"]');
		});

		it('should convert social media buttons to JSON array of IDs', () => {
			const buttons: ISocialMediaButton[] = [
				{
					id: 'like',
					text: 'Like',
					color: '#3b5998',
					textColor: '#fff'
				},
				{
					id: 'dislike',
					text: 'Dislike',
					color: '#dd4b39',
					textColor: '#fff'
				}
			];

			const result = toIdArrayJson(buttons);

			expect(result).toBe('["like","dislike"]');
		});

		it('should convert pattern matching objects to JSON array of IDs', () => {
			const objects: ITaskPatternMatchingObject[] = [
				{
					type: 'image',
					id: 'pattern-1',
					matrixSrc: '/path/to/matrix1.jpg',
					responses: [{ id: 'T1', src: '/path/to/response1.jpg' }]
				},
				{
					type: 'text',
					id: 'pattern-2',
					matrixContent: 'Matrix content',
					responses: [{ id: '1', content: 'Response 1' }]
				}
			];

			const result = toIdArrayJson(objects);

			expect(result).toBe('["pattern-1","pattern-2"]');
		});

		it('should handle empty array', () => {
			const result = toIdArrayJson([]);
			expect(result).toBe('[]');
		});

		it('should handle single object', () => {
			const singleItem = [{ id: 'single-id', src: 'test.jpg' }];
			const result = toIdArrayJson(singleItem);
			expect(result).toBe('["single-id"]');
		});

		it('should work with generic objects that have id field', () => {
			const genericObjects = [
				{ id: 'test-1', someField: 'value1' },
				{ id: 'test-2', someField: 'value2', anotherField: 123 }
			];

			const result = toIdArrayJson(genericObjects);

			expect(result).toBe('["test-1","test-2"]');
		});

		it('should properly escape special characters in JSON', () => {
			const itemsWithSpecialChars = [
				{ id: 'id with spaces' },
				{ id: 'id"with"quotes' },
				{ id: 'id\\with\\backslash' }
			];

			const result = toIdArrayJson(itemsWithSpecialChars);
			const parsed = JSON.parse(result);

			expect(parsed).toEqual(['id with spaces', 'id"with"quotes', 'id\\with\\backslash']);
		});

		it('should handle IDs with unicode characters', () => {
			const itemsWithUnicode = [{ id: 'café' }, { id: '测试' }, { id: '🚀' }];

			const result = toIdArrayJson(itemsWithUnicode);
			const parsed = JSON.parse(result);

			expect(parsed).toEqual(['café', '测试', '🚀']);
		});
	});
});
