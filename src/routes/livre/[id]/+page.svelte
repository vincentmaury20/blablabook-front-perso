<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { booklistStatus, updateBookStatus, getBookStatus } from '$lib/stores/booklistStore.js';

	let inBooklist = $state(false);
	let toRead = $state(true); // true = À lire, false = Lu (cohérent avec l'API)
	let isLoading = $state(false);
	let isReadLoading = $state(false);
	let { data } = $props();

	// Fonction utilitaire pour décoder le JWT
	function decodeJWT(token) {
		try {
			const payload = token.split('.')[1];
			const decoded = JSON.parse(atob(payload));
			return decoded;
		} catch (error) {
			console.error('❌ Erreur décodage JWT:', error);
			return null;
		}
	}

	// Vérifier si le livre est dans la booklist au chargement
	async function checkBookStatus() {
		const token = localStorage.getItem('token');
		if (!token) return;

		const decodedToken = decodeJWT(token);
		if (!decodedToken) return;

		try {
			const response = await fetch(
				`http://localhost:3000/user/${decodedToken.id}/book/${data.book.id}/status`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				}
			);

			if (response.ok) {
				const result = await response.json();
				inBooklist = result.inBooklist;
				// Par défaut : toRead = true (À lire / non lu)
				toRead = result.toRead !== undefined ? result.toRead : true;
				// Mettre à jour le store
				updateBookStatus(data.book.id, { inBooklist: inBooklist, toRead: toRead });
				console.log(`📖 Statut récupéré: ${inBooklist ? 'Dans booklist' : 'Pas dans booklist'}, ${toRead ? 'À lire' : 'Lu'}`);
			}
		} catch (error) {
			console.error('Erreur lors de la vérification du statut:', error);
		}
	}

	async function toggleBooklist() {
		const token = localStorage.getItem('token');
		if (!token) {
			goto('/authentification/connexion');
			return;
		}

		const decodedToken = decodeJWT(token);
		if (!decodedToken) {
			goto('/authentification/connexion');
			return;
		}

		isLoading = true;
		try {
			if (inBooklist) {
				// Supprimer de la booklist
				const response = await fetch(
					`http://localhost:3000/user/${decodedToken.id}/book/${data.book.id}`,
					{
						method: 'DELETE',
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json'
						}
					}
				);

				if (response.ok) {
					inBooklist = false;
					toRead = true;
					// Mettre à jour le store
					updateBookStatus(String(data.book.id), { inBooklist: false, toRead: true });
				} else {
					console.error('❌ Erreur lors de la suppression');
				}
			} else {
				// Ajouter à la booklist
				const response = await fetch(
					`http://localhost:3000/user/${decodedToken.id}/book/${data.book.id}`,
					{
						method: 'POST',
						headers: {
							Authorization: `Bearer ${token}`,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({ toRead: true })
					}
				);

				if (response.ok) {
					inBooklist = true;
					toRead = true;
					// Mettre à jour le store
					updateBookStatus(String(data.book.id), { inBooklist: true, toRead: true });
				} else {
					console.error("❌ Erreur lors de l'ajout");
				}
			}
		} catch (error) {
			console.error('Erreur:', error);
		} finally {
			isLoading = false;
		}
	}

	async function toggleRead() {
		const token = localStorage.getItem('token');
		if (!token) {
			goto('/authentification/connexion');
			return;
		}

		// Vérifier que le livre est dans la booklist avant de modifier le statut de lecture
		if (!inBooklist) {
			console.warn('⚠️ Le livre doit être dans la booklist pour modifier le statut de lecture');
			return;
		}

		const decodedToken = decodeJWT(token);
		if (!decodedToken) {
			goto('/authentification/connexion');
			return;
		}

		isReadLoading = true;
		try {
			const response = await fetch(
				`http://localhost:3000/user/${decodedToken.id}/book/${data.book.id}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ toRead: !toRead })
				}
			);

			if (response.ok) {
				toRead = !toRead;
				// Mettre à jour le store
				updateBookStatus(String(data.book.id), { inBooklist: inBooklist, toRead: toRead });
			} else {
				console.error('❌ Erreur lors de la mise à jour du statut de lecture');
			}
		} catch (error) {
			console.error('Erreur lors de la mise à jour du statut:', error);
		} finally {
			isReadLoading = false;
		}
	}

	onMount(() => {
		// S'assurer que le cache est chargé
		getBookStatus('dummy', new Map());
		
		// Vérifier d'abord si le statut existe dans le store (normaliser ID en string)
		const unsubscribe = booklistStatus.subscribe(map => {
			const bookIdStr = String(data.book.id);
			const status = getBookStatus(bookIdStr, map);
			if (map.has(bookIdStr)) {
				// Le statut existe dans le store, l'utiliser
				inBooklist = status.inBooklist;
				toRead = status.toRead;
				console.log(`📖 Statut chargé depuis le store: ${inBooklist ? 'Dans booklist' : 'Pas dans booklist'}, ${toRead ? 'À lire' : 'Lu'}`);
			} else {
				// Le statut n'existe pas, le récupérer du serveur
				checkBookStatus();
			}
		});
		unsubscribe();
	});
</script>

<h1 class="book-title">{data.book.title}</h1>

<div class="genre-container">
	<div class="genre">
		{#if data.book.genres?.length}
			{#each data.book.genres as genre}
				<p>{genre.name}</p>
			{/each}
		{/if}
	</div>
</div>

<div class="book-details">
	<div class="author-container">
		<div class="author">
			{#if data.book.authors?.length}
				{#each data.book.authors as author}
					<h3>
						{author.firstname}
						{author.name}
					</h3>
					<p>{author.bio}</p>
				{/each}
			{/if}
		</div>
	</div>

	<div class="container">
		<img src={data.book.cover} alt={`Couverture ${data.book.title}`} class="cover" />
	</div>
</div>

<div class="synopsis-container">
	<p class="synopsis">
		Synopsis :
		<br />{data.book.synopsis}
	</p>
</div>

<div class="buttons-container">
	<!-- Bouton ajouter/retirer de la booklist -->
	<button
		class="add-booklist"
		class:in-booklist={inBooklist}
		onclick={toggleBooklist}
		disabled={isLoading}
		aria-label={inBooklist ? 'Retirer de la Booklist' : 'Ajouter à la Booklist'}
	>
		{#if isLoading}
			<div class="loading-spinner"></div>
			Chargement...
		{:else}
			<img src={inBooklist ? '/icons/Remove2.png' : '/icons/Add.png'} alt="" class="icon" />
			<span class="button-text">{inBooklist ? 'Retirer' : 'Ajouter'}</span>
		{/if}
	</button>

	<!-- Bouton "J'ai lu" - seulement si dans la booklist -->
	{#if inBooklist}
		<button
			class="read"
			class:is-read={!toRead}
			onclick={toggleRead}
			disabled={isReadLoading}
			aria-label={toRead ? 'Marquer comme lu' : 'Marquer comme non lu'}
		>
			{#if isReadLoading}
				<div class="loading-spinner"></div>
				Chargement...
			{:else}
				{#if toRead}
					<span class="material-symbols--bookmark-added-grey"></span>
				{:else}
					<span class="material-symbols--bookmark-added-blue"></span>
				{/if}
				<span class="button-text">{toRead ? 'À lire' : 'Lu'}</span>
			{/if}
		</button>
	{/if}
</div>

<div class="exit-container">
	<a href="/catalogue"><button class="exit">Retour catalogue</button></a>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.author {
		display: none;
		margin: 0 1rem 1rem 1rem;
		font-size: 16px;
		text-align: justify;
	}

	.genre-container {
		display: block;
		border: var(--couleur-marron);
		margin-left: auto;
		border: var(--couleur-marron);
		background-color: var(--couleur-beige-clair);
		border-radius: 10px;
		border: solid 2px var(--couleur-marron);
	}

	.genre {
		margin: 0.6rem;
	}

	.cover {
		border-radius: 0px 20px 0px 20px;
		width: 150px;
		padding: 0.3rem;
		padding-bottom: 1rem;
	}

	.synopsis-container {
		background-color: var(--couleur-beige-clair);
		border-radius: 20px;
		margin: 1rem;
	}

	.synopsis {
		margin: 1rem;
	}

	.buttons-container {
		width: 100%;
		display: flex;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.add-booklist,
	.read {
		min-width: 140px;
		width: 140px;
		height: 100px;
		padding: 1rem;
		background: transparent;
		border: none;
		cursor: pointer;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		text-align: center;
	}

	/* Suppression des effets de survol pour les boutons ajouter */

	.add-booklist:focus,
	.read:focus {
		outline: none;
		box-shadow: none;
	}

	.add-booklist,
	.read {
		-webkit-tap-highlight-color: transparent;
	}

	/* Styles pour les boutons actifs - identiques à la booklist */
	.add-booklist.in-booklist {
		background-color: transparent;
		font-weight: 600;
	}

	.read.is-read {
		background-color: transparent;
		font-weight: 600;
	}

	/* Suppression des effets hover */

	/* Style pour les boutons désactivés - identiques à la booklist */
	.add-booklist:disabled,
	.read:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}

	.add-booklist:disabled:hover,
	.read:disabled:hover {
		transform: none;
		background-color: transparent;
	}

	/* Style du texte des boutons principaux */
	.button-text {
		font-size: 0.8rem;
		font-weight: 600;
		text-align: center;
		line-height: 1.2;
		color: var(--couleur-marron);
	}

	/* Icônes de bookmark - identiques à celles de la booklist */
	.material-symbols--bookmark-added-grey {
		display: inline-block;
		width: 2rem;
		height: 2rem;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23848484' d='M17.825 9L15 6.175l1.4-1.425l1.425 1.425l3.525-3.55l1.425 1.425zM5 21V5q0-.825.588-1.412T7 3h7q-.5.75-.75 1.438T13 6q0 1.8 1.138 3.175T17 10.9q.575.075 1 .075t1-.075V21l-7-3z'/%3E%3C/svg%3E");
	}

	.material-symbols--bookmark-added-blue {
		display: inline-block;
		width: 2rem;
		height: 2rem;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2363A6A6' d='M17.825 9L15 6.175l1.4-1.425l1.425 1.425l3.525-3.55l1.425 1.425zM5 21V5q0-.825.588-1.412T7 3h7q-.5.75-.75 1.438T13 6q0 1.8 1.138 3.175T17 10.9q.575.075 1 .075t1-.075V21l-7-3z'/%3E%3C/svg%3E");
	}

	/* Icônes PNG - même taille que les bookmarks */
	.icon {
		width: 2rem;
		height: 2rem;
		object-fit: contain;
	}

	.exit-container {
		display: flex;
		justify-content: center;
		padding-bottom: 1rem;
		margin-bottom: 1rem;
	}

	.exit {
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.1s ease;
	}

	.exit:active {
		transform: scale(0.9);
	}

	.exit:focus {
		outline: none;
		box-shadow: none;
	}

	.exit {
		-webkit-tap-highlight-color: transparent;
	}

	.add-booklist,
	.read,
	.exit {
		box-shadow: none;
	}

	@media (min-width: 768px) {
		.cover {
			width: 250px;
		}
	}

	.genre {
		font-size: 15px;
	}

	@media (min-width: 1025px) {
		.author-container {
			display: flex;
			flex-direction: column;
			border: var(--couleur-marron);
			margin-left: 1rem;
			margin-top: 1rem;
			margin-right: auto;
			border: var(--couleur-marron);
			background-color: var(--couleur-beige-clair);
			border-radius: 10px;
		}

		.author {
			display: flex;
			flex-direction: column;
			margin: 1rem;
			font-size: 16px;
		}

		.book-details {
			display: grid;
			grid-template-columns: 1fr auto 1fr;
			align-items: center;
			margin: 0 1rem;
			gap: 1rem;
			padding-bottom: 1rem;
		}

		.cover {
			width: 250px;
		}

		.genre {
			font-size: 15px;
		}

		.genre-container {
			position: relative;
			bottom: 40px;
		}

		.synopsis {
			margin: 2rem;
			font-size: 18px;
		}
	}
</style>
