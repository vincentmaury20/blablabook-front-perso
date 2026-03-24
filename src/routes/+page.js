import { API_URL } from '$lib/config.js';

export async function load() {
	const res = await fetch(`${API_URL}`);
	const book = await res.json();

	return { book };
}
