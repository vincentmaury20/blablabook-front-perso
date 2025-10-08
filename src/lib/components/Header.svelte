<script>
	import { debounce } from '$lib/utils/debounce.js';
	import { getSearchSuggestions } from '$lib/remoteFunction.js';
	import { goto } from '$app/navigation';

	let query = $state('');
	let suggestions = $state([]);
	let loading = $state(false);
	let error = $state('');
	let showSuggestions = $state(false);

	let searchType = $state(''); // "", "title", "author", "genre"

	let abortController = null;
	let currentSearchQuery = '';

	async function performSearch(searchQuery) {
		if (abortController) abortController.abort();

		if (!searchQuery || searchQuery.length < 2) {
			suggestions = [];
			loading = false;
			showSuggestions = false;
			currentSearchQuery = '';
			return;
		}

		currentSearchQuery = searchQuery;
		abortController = new AbortController();
		loading = true;
		error = '';

		try {
			const result = await getSearchSuggestions(searchQuery, searchType, abortController.signal);

			if (searchQuery === currentSearchQuery && searchQuery === query) {
				suggestions = result;
				showSuggestions = true;
			}
		} catch (err) {
			if (err.name === 'AbortError') return;
			console.error('❌ Erreur recherche:', err);
			if (searchQuery === currentSearchQuery) {
				error = 'Erreur de recherche';
				suggestions = [];
			}
		} finally {
			if (searchQuery === currentSearchQuery) loading = false;
		}
	}

	const debouncedSearch = debounce(performSearch, 300);

	function onInput(e) {
		query = e.target.value;
		debouncedSearch(query);
	}

	function openBook(id) {
		goto(`/livre/${id}`);
		query = '';
		suggestions = [];
		showSuggestions = false;
		currentSearchQuery = '';
		if (abortController) abortController.abort();
	}

	function handleFocus() {
		if (query.length >= 2 && suggestions.length > 0) {
			showSuggestions = true;
		}
	}

	function handleBlur() {
		setTimeout(() => {
			showSuggestions = false;
		}, 200);
	}
</script>

<header class="header">
	<div class="header-top">
		<div class="logo-title">
			<a href="/"><img src="/LogoBBB.png" alt="Logo BlaBlaBook" class="logo-icon" /></a>
			<p class="title"><a href="/">BlaBlaBook</a></p>
		</div>
		<button class="connection-btn"><a href="/connexion">Connexion</a></button>
	</div>

	<div class="search-container">
		<div class="search-controls">
			<input
				type="search"
				placeholder="Rechercher..."
				class="search-input"
				bind:value={query}
				oninput={onInput}
				onfocus={handleFocus}
				onblur={handleBlur}
			/>

			<select bind:value={searchType} class="filter-select">
				<option value="">Tout</option>
				<option value="title">Titre</option>
				<option value="author">Auteur</option>
				<option value="genre">Genre</option>
			</select>
		</div>

		{#if showSuggestions}
			<div class="suggestions-dropdown">
				{#if loading}
					<p class="loading-text">Recherche en cours...</p>
				{:else if error}
					<p class="error-text">{error}</p>
				{:else if suggestions.length > 0}
					<ul class="suggestions">
						{#each suggestions as book}
							<li>
								<a href={`/livre/${book.id}`} class="suggestion-item">
									{#if book.cover}
										<img src={book.cover} alt={book.title} class="book-thumb" />
									{/if}

									<div class="book-info">
										<strong>{book.title}</strong>

										{#if book.authors?.length}
											<span class="author-name">
												{book.authors.map((a) => `${a.firstname} ${a.name}`).join(', ')}
											</span>
										{/if}

										{#if book.genres?.length}
											<span class="genre-name">
												{book.genres.map((g) => g.name).join(', ')}
											</span>
										{/if}
									</div>
								</a>
							</li>
						{/each}
					</ul>
				{:else if query.length >= 2}
					<p class="no-results">Aucun résultat pour "{query}"</p>
				{/if}
			</div>
		{/if}
	</div>
</header>

<style>
	header {
		background-color: var(--couleur-beige-rose);
		padding: 0.5rem;
	}

	.header-top {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.logo-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
	}

	.logo-icon {
		height: 80px;
		width: auto;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
	}

	.title {
		font-family: var(--font-bbb);
		color: var(--couleur-marron);
		font-size: 2rem;
		margin: 0;
		text-align: center;
	}

	.connection-btn {
		font-family: var(--font-global);
		padding: 0.5rem 1rem;
		background-color: var(--couleur-bleu-vert);
		border: solid 2px var(--couleur-beige-clair);
		border-radius: 30px;
		color: var(--couleur-beige-clair);
		font-weight: bold;
		cursor: pointer;
	}

	.search-container {
		position: relative;
		width: 100%;
		margin-top: 1rem;
	}

	.search-input {
		width: 100%;
		padding: 0.5rem 1rem;
		border-radius: 25px;
		border: 1px solid #ccc;
		font-size: 1rem;
		transition: box-shadow 0.2s ease;
		box-shadow: 1px 3px 10px 1px rgba(80, 79, 79, 0.5);
	}

	.search-input:focus {
		outline: none;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
	}

	/* Styles pour les suggestions */
	.suggestions-dropdown {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		right: 0;
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		max-height: 400px;
		overflow-y: auto;
		z-index: 1000;
	}

	.suggestions {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.suggestion-item {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1rem;
		cursor: pointer;
		transition: background 0.2s;
		border-bottom: 1px solid #f0f0f0;
	}

	.suggestion-item:hover {
		background: #f5f5f5;
	}

	.suggestion-item:last-child {
		border-bottom: none;
	}

	.book-thumb {
		width: 40px;
		height: 55px;
		object-fit: cover;
		border-radius: 4px;
		flex-shrink: 0;
	}

	.book-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.author-name {
		font-size: 0.85rem;
		color: #666;
	}

	.loading-text,
	.error-text,
	.no-results {
		padding: 1rem;
		text-align: center;
		color: #999;
	}

	.error-text {
		color: #ff6b6b;
	}

	@media (min-width: 768px) {
		.header-top {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			position: relative;
		}

		.logo-title {
			flex-direction: row;
			align-items: center;
			gap: 1rem;
		}

		.logo-icon {
			height: 100px;
		}

		.title {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			text-align: center;
		}
	}

	@media (min-width: 1025px) {
		header {
			padding: 1rem 2rem;
		}

		.logo-icon {
			height: 120px;
		}

		.title {
			font-size: 4rem;
		}

		.search-input {
			font-size: 1.1rem;
			padding: 0.6rem 1.2rem;
		}

		.genre-name {
			font-size: 0.75rem;
			color: #999;
			margin-top: 0.25rem;
		}

		.loading-text {
			padding: 1rem;
			text-align: center;
			color: #999;
			font-style: italic;
		}

		.no-results {
			padding: 1.5rem 1rem;
			text-align: center;
			color: #999;
		}

		.search-controls {
			display: flex;
			gap: 0.5rem;
			align-items: center;
		}

		.filter-select {
			padding: 0.4rem 0.6rem;
			border-radius: 20px;
			border: 1px solid #ccc;
			background: #fff;
			font-size: 0.9rem;
			cursor: pointer;
		}
	}
</style>
