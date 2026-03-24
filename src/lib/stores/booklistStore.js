import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// ============================================================
// STORAGE UTILITIES
// ============================================================
/**
 * Load booklist cache from localStorage
 */
function loadFromStorage() {
	if (!browser) return new Map();

	try {
		const stored = localStorage.getItem('booklistStatus');
		if (stored) {
			const parsed = JSON.parse(stored);
			return new Map(Object.entries(parsed));
		}
	} catch (error) {
		console.error('Cache load error:', error);
	}
	return new Map();
}

/**
 * Save booklist cache to localStorage
 */
function saveToStorage(map) {
	if (!browser) return;

	try {
		const obj = Object.fromEntries(map);
		localStorage.setItem('booklistStatus', JSON.stringify(obj));
	} catch (error) {
		console.error('Cache save error:', error);
	}
}

// ============================================================
// STORE INITIALIZATION
// ============================================================
// Prevent multiple cache loads
let isLoaded = false;

// Store for book statuses (Map: bookId -> {inBooklist, toRead})
export const booklistStatus = writable(new Map());

/**
 * Lazy-load cache from storage on first use
 */
function ensureCacheLoaded() {
	if (!browser || isLoaded) return;

	const storedData = loadFromStorage();
	if (storedData.size > 0) {
		booklistStatus.set(storedData);
	}
	isLoaded = true;
}

// ============================================================
// STORE ACTIONS
// ============================================================
/**
 * Update book status and save to localStorage
 */
export function updateBookStatus(bookId, status) {
	booklistStatus.update((map) => {
		map.set(bookId, status);
		// Auto-save to storage
		saveToStorage(map);
		return new Map(map);
	});
}

/**
 * Get book status from store with defaults
 */
export function getBookStatus(bookId, currentMap) {
	ensureCacheLoaded();
	return currentMap.get(bookId) || { inBooklist: false, toRead: true };
}

/**
 * Clear all booklist data (used on logout)
 */
export function clearBooklistStatus() {
	booklistStatus.set(new Map());
	if (browser) {
		localStorage.removeItem('booklistStatus');
	}
}
