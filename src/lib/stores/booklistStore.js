import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Fonction pour charger le cache depuis localStorage
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

// Fonction pour sauvegarder dans localStorage
function saveToStorage(map) {
    if (!browser) return;
    
    try {
        const obj = Object.fromEntries(map);
        localStorage.setItem('booklistStatus', JSON.stringify(obj));
    } catch (error) {
        console.error('Erreur sauvegarde cache:', error);
    }
}

// Variable pour s'assurer qu'on charge qu'une seule fois
let isLoaded = false;

// Store pour les statuts des livres (Map: bookId -> {inBooklist, toRead})
export const booklistStatus = writable(new Map());

// Fonction pour charger le cache de façon lazy
function ensureCacheLoaded() {
    if (!browser || isLoaded) return;
    
    const storedData = loadFromStorage();
    if (storedData.size > 0) {
        booklistStatus.set(storedData);
    }
    isLoaded = true;
}

// Fonction helper pour mettre à jour un livre
export function updateBookStatus(bookId, status) {
    booklistStatus.update(map => {
        map.set(bookId, status);
        
        // Sauvegarder automatiquement dans localStorage
        saveToStorage(map);
        
        return new Map(map);
    });
}

// Fonction helper pour récupérer le statut d'un livre
export function getBookStatus(bookId, currentMap) {
    ensureCacheLoaded(); // S'assurer que le cache est chargé
    return currentMap.get(bookId) || { inBooklist: false, toRead: true };
}

// Fonction pour vider le store (utile pour la déconnexion)
export function clearBooklistStatus() {
    booklistStatus.set(new Map());
    if (browser) {
        localStorage.removeItem('booklistStatus');
    }
}
