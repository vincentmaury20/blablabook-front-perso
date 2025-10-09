import { writable } from 'svelte/store';
import { browser } from '$app/environment';


export const user = writable(null);

/**
 * Charger l'utilisateur depuis le token au démarrage
 */
export async function loadUserFromToken() {
  if (!browser) return;
  
  const token = localStorage.getItem('token');
  
  if (!token) {
    console.log('⚠️ Pas de token, utilisateur non connecté');
    user.set(null);
    return;
  }

  try {
    console.log('🔄 Chargement de l\'utilisateur depuis le token...');
    
    const res = await fetch('http://localhost:3000/auth/me', {
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });

    if (res.ok) {
      const userData = await res.json();
      user.set(userData);
      console.log('✅ Utilisateur chargé:', userData);
    } else {
      console.log('❌ Token invalide, déconnexion');
      user.set(null);
      localStorage.removeItem('token');
    }
  } catch (error) {
    console.error('❌ Erreur lors du chargement de l\'utilisateur:', error);
    user.set(null);
    localStorage.removeItem('token');
  }
}

/**
 * Déconnexion
 */
export function logout() {
  user.set(null);
  localStorage.removeItem('token');
  console.log('✅ Déconnexion - Store réinitialisé');
  
  // ✅ Solution : Utiliser window.location au lieu de goto()
  if (browser && window.location.pathname !== '/') {
    window.location.href = '/';
  }
}