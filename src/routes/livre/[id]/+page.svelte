<script>
	import { onMount } from 'svelte';

	let inBooklist = $state(false);
	let isRead = $state(false);

	function toggleBooklist() {
		inBooklist = !inBooklist;
	}

	function toggleRead() {
		isRead = !isRead;
	}

	let { data } = $props();
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
	<!-- Bouton ajouter à la booklist -->
	<button class="add-booklist" onclick={toggleBooklist} aria-label="Ajouter à la Booklist">
		<img src={inBooklist ? '/icons/Remove2.png' : '/icons/Add.png'} alt="" class="icon" />
		{inBooklist ? 'Retirer de ma Booklist' : 'Ajouter à ma Booklist'}
	</button>

	<!-- Bouton "J'ai lu" -->
	<button class="read" onclick={toggleRead} aria-label="J'ai lu">
		<img src={isRead ? '/icons/Remove.png' : '/icons/Add.png'} alt="" class="icon" />
		{isRead ? 'Déjà lu' : "J'ai lu"}
	</button>
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
