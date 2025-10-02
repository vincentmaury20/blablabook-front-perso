<script>
	// Images temporaires en dur
	const images = [
		'/images/livre2.jpg',
		'/images/livre3.jpg',
		'/images/livre4.jpg',
		'/images/livre5.jpg',
		'/images/livre6.jpg'
	];
</script>

<div class="home-content">
	<h1>Notre sélection</h1>
	<div class="carousel">
		<img src="/images/livre2.jpg" alt="Livre 2" />
		<img src="/images/livre3.jpg" alt="Livre 3" />
		<img src="/images/livre4.jpg" alt="Livre 4" />
		<img src="/images/livre5.jpg" alt="Livre 5" />
		<img src="/images/livre6.jpg" alt="Livre 6" />
		<!-- {#each images as img}
			<img src={img} alt="Livre" />
		{/each} -->
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
/* 		padding: 1rem;
 */	}

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
		width: 100%;
		height: 250px;
		object-fit: contain;
/* 		border-radius: 15px;
 */		flex-shrink: 0;
		scroll-snap-align: start;
/* 		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
 */		transition: transform 0.3s ease;
	}

	.carousel img:hover {
		transform: scale(1.05);
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
