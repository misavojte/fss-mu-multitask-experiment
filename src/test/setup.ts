import { vi } from 'vitest';

// Mock URL methods
Object.defineProperty(globalThis, 'URL', {
	value: {
		createObjectURL: vi.fn(() => 'mock-url'),
		revokeObjectURL: vi.fn()
	}
});

// Mock Blob
(globalThis as any).Blob = vi.fn().mockImplementation((content, options) => ({
	content,
	options,
	type: options?.type || 'text/plain'
})) as any;

// Mock DOM methods
Object.defineProperty(document, 'createElement', {
	value: vi.fn((tag) => {
		const element = {
			tagName: tag.toUpperCase(),
			href: '',
			download: '',
			style: { display: '' },
			click: vi.fn(),
			setAttribute: vi.fn(),
			getAttribute: vi.fn()
		};
		return element;
	})
});

Object.defineProperty(document.body, 'appendChild', {
	value: vi.fn()
});

Object.defineProperty(document.body, 'removeChild', {
	value: vi.fn()
});
