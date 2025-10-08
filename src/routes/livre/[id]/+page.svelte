<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

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
			const response = await fetch(`http://localhost:3000/user/${decodedToken.id}/book/${data.book.id}/status`, {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});

			if (response.ok) {
				const result = await response.json();
				inBooklist = result.inBooklist;
				// Par défaut : toRead = true (À lire / non lu)
				toRead = result.toRead !== undefined ? result.toRead : true;
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
				const response = await fetch(`http://localhost:3000/user/${decodedToken.id}/book/${data.book.id}`, {
					method: 'DELETE',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					}
				});

				if (response.ok) {
					inBooklist = false;
					toRead = true; // Reset à "À lire" quand retiré de la booklist
					console.log('✅ Livre retiré de la booklist');
				} else {
					console.error('❌ Erreur lors de la suppression');
				}
			} else {
				// Ajouter à la booklist
				const response = await fetch(`http://localhost:3000/user/${decodedToken.id}/book/${data.book.id}`, {
					method: 'POST',
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ toRead: true })
				});

				if (response.ok) {
					inBooklist = true;
					toRead = true; // Par défaut, nouveau livre = "À lire"
					console.log('✅ Livre ajouté à la booklist');
				} else {
					console.error('❌ Erreur lors de l\'ajout');
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
			const response = await fetch(`http://localhost:3000/user/${decodedToken.id}/book/${data.book.id}`, {
				method: 'PUT',
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ toRead: !toRead })
			});

			if (response.ok) {
				toRead = !toRead;
				console.log(`✅ Statut de lecture mis à jour: ${toRead ? 'À lire' : 'Lu'}`);
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
		checkBookStatus();
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
		aria-label={inBooklist ? "Retirer de la Booklist" : "Ajouter à la Booklist"}
	>
		{#if isLoading}
			<div class="loading-spinner"></div>
			Chargement...
		{:else}
			<img src={inBooklist ? '/icons/Remove2.png' : '/icons/Add.png'} alt="" class="icon" />
			{inBooklist ? 'Retirer de ma Booklist' : 'Ajouter à ma Booklist'}
		{/if}
	</button>

	<!-- Bouton "J'ai lu" - seulement si dans la booklist -->
	{#if inBooklist}
		<button 
			class="read" 
			class:is-read={!toRead}
			onclick={toggleRead} 
			disabled={isReadLoading}
			aria-label={toRead ? "Marquer comme lu" : "Marquer comme non lu"}
		>
			{#if isReadLoading}
				<div class="loading-spinner"></div>
				Chargement...
			{:else}
				<img src={!toRead ? '/icons/Remove.png' : '/icons/Add.png'} alt="" class="icon" />
				{toRead ? 'Marquer comme lu' : "Marquer comme non lu"}
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
		min-width: 100px;
		padding: 0.8rem;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
		border-radius: 8px;
		-webkit-box-shadow: -8px -20px 0px -30px #000000;
		box-shadow: -8px -20px 0px -30px #000000;
		color: var(--couleur-marron);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
		font-size: 14px;
		font-weight: 500;
	}

	.add-booklist .icon,
	.read .icon {
		width: 48px;
		height: 48px;
	}

	.add-booklist:focus,
	.read:focus {
		outline: none;
		box-shadow: none;
	}

	.add-booklist,
	.read {
		-webkit-tap-highlight-color: transparent;
	}

	/* Styles pour les boutons actifs */
	.add-booklist.in-booklist {
		background-color: var(--couleur-beige-clair);
		border: 2px solid var(--couleur-marron);
		color: var(--couleur-marron);
		font-weight: 600;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	.read.is-read {
		background-color: var(--couleur-vieux-rose);
		border: 2px solid var(--couleur-vieux-rose);
		color: var(--couleur-beige-clair);
		font-weight: 600;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
	}

	/* Effet hover pour les boutons actifs */
	.add-booklist.in-booklist:hover {
		background-color: var(--couleur-marron);
		color: var(--couleur-beige-clair);
		transform: translateY(-2px);
	}

	.read.is-read:hover {
		background-color: var(--couleur-marron);
		border-color: var(--couleur-marron);
		transform: translateY(-2px);
	}

	/* Style pour les boutons désactivés */
	.add-booklist:disabled,
	.read:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		transform: none;
	}

	.add-booklist:disabled:hover,
	.read:disabled:hover {
		transform: none;
		background: transparent;
		color: var(--couleur-marron);
	}

	/* Spinner de chargement */
	.loading-spinner {
		width: 20px;
		height: 20px;
		border: 2px solid var(--couleur-beige-clair);
		border-top: 2px solid var(--couleur-marron);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
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
