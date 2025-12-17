import { API_URL } from '$lib/config.js';

export async function load({ fetch, url }) {
  const page = url.searchParams.get('page') || '1';
  const limit = '10';
  const search = url.searchParams.get('search') || '';

  const apiUrl = new URL('/catalog', API_URL);
  apiUrl.searchParams.set('page', page);
  apiUrl.searchParams.set('limit', limit);
  if (search) apiUrl.searchParams.set('search', search);

  const res = await fetch(apiUrl.toString());
  const data = await res.json();

  return { ...data, search };
}