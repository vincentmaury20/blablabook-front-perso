import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// ============================================================
// STORE
// ============================================================
// User store - holds authenticated user data or null if not logged in
export const user = writable(null);

export async function loadUserFromToken() {
	// Only run in browser environment
	if (!browser) return;

	// Get token from localStorage
	const token = localStorage.getItem('token');

	// If no token, user is not logged in
	if (!token) {
		console.log('⚠️ Pas de token, utilisateur non connecté');
		user.set(null);
		return;
	}

	// Validate token by fetching user from API
	try {
		console.log("Chargement de l'utilisateur depuis le token...");

		const res = await fetch(`${API_URL}/auth/me`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		// Token valid - set user in store
		if (res.ok) {
			const userData = await res.json();
			user.set(userData);
			console.log('Utilisateur chargé:', userData);
		}
		// Token invalid - clear user and token
		else {
			console.log('Token invalide, déconnexion');
			user.set(null);
			localStorage.removeItem('token');
		}
	} catch (error) {
		// Network error - clear user and token
		console.error("Erreur lors du chargement de l'utilisateur:", error);
		user.set(null);
		localStorage.removeItem('token');
	}
}

// ============================================================
// AUTHENTICATION - LOGOUT
// ============================================================
/**
 * Clears user data and token, resets all stores
 * Redirects to home page if not already there
 */
export function logout() {
	// Clear user store
	user.set(null);
	// Remove token from storage
	localStorage.removeItem('token');

	// Reset related stores (runs only in browser)
	if (browser) {
		import('./booklistStore.js').then(({ clearBooklistStatus }) => {
			clearBooklistStatus();
		});
	}

	console.log('Déconnexion - Stores réinitialisés');

	// Redirect to home if not already there
	if (browser && window.location.pathname !== '/') {
		window.location.href = '/';
	}
}
