import { API_URL } from '$lib/config.js';

export const getSearchSuggestions = async (q, type, signal) => {
	// Validate input: return empty list if query is empty
	if (!q) return [];

	// Build the API URL with query parameters
	const url = new URL('/search', API_URL);
	url.searchParams.set('q', q);
	if (type) url.searchParams.set('type', type);

	// Perform the API request
	const res = await fetch(url, { signal });

	// Throw an error if the request failed
	if (!res.ok) throw new Error('Search failed');

	// Parse and return the JSON response
	const data = await res.json();
	console.log('Results received:', data);

	return data;
};
