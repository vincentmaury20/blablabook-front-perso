<script>
	// états réactifs
	let inBooklist = $state(false);
	let isRead = $state(false);

	function toggleBooklist() {
		inBooklist = !inBooklist;
	}

	function toggleRead() {
		isRead = !isRead;
	}
</script>

<h1 class="book-title">Nana</h1>

<div class="genre-container">
	<p class="genre">Shoujo</p>
</div>

<div class="book-details">
	<div class="author-container">
		<p class="author">
			Ai Yazawa est une mangaka japonaise née le 7 mars 1967 à Osaka. Elle est principalement connue
			pour ses œuvres "Nana" et "Paradise Kiss", qui ont été adaptées en séries animées et en films
			live-action. Son style distinctif et ses récits captivants lui ont valu une grande popularité
			au Japon et à l'international.
		</p>
	</div>

	<div class="container">
		<img src="/images/livre3.jpg" alt="Couverture Nana" class="cover" />
	</div>
</div>


<div class="synopsis-container">
	<p class="synopsis">
		Quand l'une rêve de triomphe pour son groupe de rock les BlackStones, l'autre ne recherche qu'un
		mari parfait pour fonder un foyer. Au gré des aventures de ces deux filles, l'une orpheline
		versée dans le gothique et l'autre fashion victime incapable de travailler, se tisse une amitié
		et une success story passionnante.
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
	<button class="exit">Retour catalogue</button>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
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
		min-width: 150px;
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

	.genre{
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

		.genre{
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
