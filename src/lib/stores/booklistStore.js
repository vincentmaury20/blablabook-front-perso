import { writable } from 'svelte/store';
import { browser } from '$app/environment';

function loadFromStorage() {
	if (!browser) return new Map();

	try {
		const stored = localStorage.getItem('booklistStatus');
		if (stored) {
			const parsed = JSON.parse(stored);
			return new Map(Object.entries(parsed));
		}
	} catch (error) {
		console.error('Erreur chargement cache:', error);
	}
	return new Map();
}

function saveToStorage(map) {
	if (!browser) return;

	try {
		const obj = Object.fromEntries(map);
		localStorage.setItem('booklistStatus', JSON.stringify(obj));
	} catch (error) {
		console.error('Erreur sauvegarde cache:', error);
	}
}

let isLoaded = false;

export const booklistStatus = writable(new Map());

function ensureCacheLoaded() {
	if (!browser || isLoaded) return;

	const storedData = loadFromStorage();
	if (storedData.size > 0) {
		booklistStatus.set(storedData);
	}
	isLoaded = true;
}

export function updateBookStatus(bookId, status) {
	booklistStatus.update((map) => {
		map.set(bookId, status);

		saveToStorage(map);

		return new Map(map);
	});
}

export function getBookStatus(bookId, currentMap) {
	ensureCacheLoaded();
	return currentMap.get(bookId) || { inBooklist: false, toRead: true };
}

export function clearBooklistStatus() {
	booklistStatus.set(new Map());
	if (browser) {
		localStorage.removeItem('booklistStatus');
	}
}
