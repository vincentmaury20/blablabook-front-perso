<script>
	let { data } = $props();

	import { goto } from '$app/navigation';
</script>

<h1>Catalogue</h1>

<section class="catalogue">
	{#each data.books as book}
		<div class="book-container">
			<a href="/livre/{book.id}">
				<img src={book.cover} alt={book.title} />
			</a>
			<div class="book-description">
				<div class="book">
					<p class="book-title"><a href="/livre/{book.id}">{book.title}</a></p>
					{#if book.authors?.length}
						{#each book.authors as author}
							<p class="book-author">{author.firstname} {author.name}</p>
						{/each}
					{/if}
					<p>
						{book.synopsis}
					</p>
				</div>
				<button class="add-button">Ajouter à ma booklist</button>
			</div>
		</div>
	{/each}
</section>

<div class="pagination">
	{#if data.page > 1}
		<button onclick={() => goto(`?page=${data.page - 1}`)}>Précédente</button>
	{/if}
	<span>Page {data.page} / {data.totalPages}</span>
	{#if data.page < data.totalPages}
		<button onclick={() => goto(`?page=${data.page + 1}`)}>Suivante</button>
	{/if}
</div>

<style>
	.book-container a {
		display: block;
		width: 35%;
		min-width: 120px;
	}

	.book-container a img {
		display: block;
		width: 100%;
		height: auto;
		object-fit: cover;
		border-radius: 10px;
		margin: 0.25rem;
	}

	h1 {
		text-align: center;
		font-family: var(--font-global);
		margin: 2rem 0 1rem 0;
	}

	.catalogue {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1rem;
		gap: 1rem;
	}

	.book-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: flex-start;
		width: 100%;
		max-width: 900px;
		gap: 1rem;
		margin-bottom: 0.5rem;
		padding: 0.5rem;
		border-radius: 10px;
	}

	.book-container img {
		width: 35%;
		min-width: 120px;
		height: auto;
		object-fit: cover;
		border-radius: 10px;
		margin: 0.25rem;
	}

	.book-title {
		font-weight: 700;
	}

	.book-author {
		font-style: italic;
	}

	/* Alternance des couleurs */
	.book-container:nth-child(odd) {
		background-color: var(--couleur-beige-rose);
	}

	.book-container:nth-child(even) {
		background-color: var(--couleur-beige-clair);
	}

	.book-container:nth-child(odd) .book {
		background-color: var(--couleur-beige-clair);
	}

	.book-container:nth-child(even) .book {
		background-color: var(--couleur-beige-rose);
	}

	.book-description {
		display: flex;
		flex-direction: column;
		flex: 1;
		gap: 0.5rem;
	}

	.book {
		padding: 1rem;
		font-family: var(--font-global);
		line-height: 1.6;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		border-radius: 20px;
	}

	.add-button {
		padding: 0.5rem 1rem;
		border-radius: 25px;
		border: none;
		background-color: var(--couleur-vieux-rose);
		color: var(--couleur-beige-clair);
		font-weight: bold;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		font-size: 0.9rem;
		width: auto;
	}

	.add-button:hover {
		transform: scale(1.05);
		box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
	}

	.pagination {
		text-align: center;
	}

	.pagination button {
		margin: 1rem 1rem 2.8rem 1rem;
	}

	/* Media Queries */

	@media (min-width: 768px) {
		.book-container img {
			width: 30%;
		}
		.book {
			padding: 1.5rem;
		}
		.add-button {
			font-size: 1rem;
			padding: 0.5rem 1.2rem;
		}
	}

	@media (min-width: 1024px) {
		.catalogue {
			gap: 2rem;
		}

		.book-container {
			gap: 2rem;
			align-items: center;
		}

		.book-container img {
			width: 25%;
		}

		.book {
			padding: 2rem;
		}

		.add-button {
			align-self: flex-end;
		}
	}
</style>
