import { describe, it, expect, vi } from 'vitest';
import { load } from '../../../routes/catalogue/+page.js';

describe('load books page', () => {
	it('charge les livres depuis l’API', async () => {
		const fakeResponse = {
			books: [{ id: 1, title: 'Test' }],
			page: '1',
			limit: '10'
		};

		const mockFetch = vi.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve(fakeResponse)
			})
		);

		const mockUrl = {
			searchParams: new URLSearchParams({ page: '1' })
		};

		const result = await load({
			fetch: mockFetch,
			url: mockUrl
		});

		expect(mockFetch).toHaveBeenCalledOnce();
		expect(result).toEqual({
			...fakeResponse,
			search: ''
		});
		console.log('Résultat du load catalogue :', result);
	});
});
