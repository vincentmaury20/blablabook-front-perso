import { describe, it, expect, vi, beforeEach } from 'vitest';
import { load } from '../../../routes/+page';

describe('load function page d’accueil', () => {
	const fakeBooks = [{ title: 'Livre 1' }, { title: 'Livre 2' }];
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it('récupère les livres depuis la BDD', async () => {
		global.fetch = vi.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(fakeBooks)
			})
		);

		const result = await load();

		expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000');
		expect(result).toEqual({ book: fakeBooks });
	});
});
