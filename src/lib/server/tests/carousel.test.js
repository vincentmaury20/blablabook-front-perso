import { describe, it, expect, vi, beforeEach } from 'vitest';
import { load } from '../../../routes/+page';

describe('load function page d’accueil', () => {
	const fakeBooks = [{ title: 'Livre 1' }, { title: 'Livre 2' }];

	// ============================================================
	// SETUP
	// ============================================================
	// Reset mocks between each test (mock = mock replacement/duplicate)
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	// ============================================================
	// TESTS
	// ============================================================
	it('récupère les livres depuis la BDD', async () => {
		// ARRANGE: Mock fetch function (vi.fn = mocked function, equivalent to jest.fn)
		// Returns a promise like real fetch
		global.fetch = vi.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(fakeBooks)
			})
		);

		// ACT: Call the load() function
		const result = await load();

		// ASSERT: Verify fetch was called with expected URL
		expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000');

		// ASSERT: Verify result contains fake books
		expect(result).toEqual({ book: fakeBooks });
	});
});
