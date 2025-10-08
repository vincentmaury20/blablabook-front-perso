export const getSearchSuggestions = async (q) => {
	if (!q) return [];

	const res = await fetch(`http://localhost:3000/search?q=${encodeURIComponent(q)}`);
	if (!res.ok) throw new Error('Recherche échouée');

	const data = await res.json();
    console.log("Résultats reçus:", data);
	return data; // renvoie directement la liste de livres
};