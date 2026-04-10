import { env } from '$env/dynamic/public';

export const getSearchSuggestions = async (q, type, signal) => {
	if (!q) return [];

	const PUBLIC_API_URL = env.PUBLIC_API_URL;

	const url = new URL(`${PUBLIC_API_URL}/search`);
	url.searchParams.set('q', q);
	if (type) url.searchParams.set('type', type);

	const res = await fetch(url, { signal });

	if (!res.ok) throw new Error('Recherche échouée');

	const data = await res.json();
	console.log('Résultats reçus:', data);
	return data;
};
