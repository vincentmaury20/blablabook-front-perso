import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';

export const user = writable(null);

export async function loadUserFromToken() {
	if (!browser) return;

	const PUBLIC_API_URL = env.PUBLIC_API_URL;

	const token = localStorage.getItem('token');

	if (!token) {
		user.set(null);
		return;
	}

	try {
		const res = await fetch(`${PUBLIC_API_URL}/auth/me`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		});

		if (res.ok) {
			const userData = await res.json();
			user.set(userData);
		} else {
			user.set(null);
			localStorage.removeItem('token');
		}
	} catch (error) {
		console.error("Erreur lors du chargement de l'utilisateur:", error);
		user.set(null);
		localStorage.removeItem('token');
	}
}

export function logout() {
	user.set(null);
	localStorage.removeItem('token');

	if (browser) {
		import('./booklistStore.js').then(({ clearBooklistStatus }) => {
			clearBooklistStatus();
		});
	}

	if (browser && window.location.pathname !== '/') {
		window.location.href = '/';
	}
}
