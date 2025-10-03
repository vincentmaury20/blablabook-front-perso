<script>
	let { data } = $props();
</script>

<div class="home-content">
	<h1>Notre sélection</h1>
	<div class="carousel">
		{#each data.book as book}
			<div class="img-container"><img src={book.cover} alt={book.title} /></div>
		{/each}
	</div>

	<button class="catalog">Voir le catalogue</button>

	<div class="about">
		<p>
			BlaBlaBook est une plateforme pensée pour tous les passionnés de lecture qui souhaitent
			organiser, partager et redécouvrir leurs bibliothèques personnelles. Née de l’envie d’un
			groupe de lecteurs de mieux gérer leurs collections, BlaBlaBook permet de suivre ses livres,
			éviter les doublons, retrouver ses lectures passées et même échanger des romans entre amis.
		</p>
	</div>
</div>

<style>


	.home-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
 }

	.carousel {
		width: 100%;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 48%;
		gap: 1rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
    	width: 100vw;
		padding: 1rem 0;
		background-color: var(--couleur-bleu-vert);
    	justify-content: center; /
    	align-items: center; 
	}

	.carousel img {
    flex: 0 0 48%;
		object-fit: cover;
    flex-shrink: 0;
		scroll-snap-align: start;
    transition: transform 0.3s ease;
    border: solid 3px black;
	}

	.carousel img:hover {
		transform: scale(1.05);
	}

 .img-container {
  max-width: 300px;
	max-height: 300px;
      border: solid 3px red;

 }

	.catalog {
		background-color: var(--couleur-vieux-rose);
		border-radius: 30px;
		color: var(--couleur-beige-clair);
		font-weight: bold;
		border: none;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
		padding: 0.75rem 2rem;
		cursor: pointer;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		margin: 0.5rem 0;
	}

	.catalog:hover {
		transform: scale(1.05);
		box-shadow: 0 0 25px rgba(0, 0, 0, 0.25);
	}

	.about {
		background-color: var(--couleur-beige-clair);
		border-radius: 30px;
		padding: 1.5rem;
		width: 90%;
		max-width: 900px;
		text-align: justify;
		font-family: var(--font-global);
		line-height: 1.6;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
		margin-bottom: 3rem;
	}

	/* Media queries */
	@media (min-width: 768px) {
		.carousel {
			grid-auto-columns: 200px;
			gap: 1.5rem;
		}

		.carousel img {
			height: 320px;
		}
	}

	@media (min-width: 1024px) {
		.carousel {
			grid-auto-columns: 220px;
			gap: 1.5rem;
		}

		.carousel img {
			height: 350px;
		}

		.home-content {
			padding: 2rem;
		}
	}
</style>
