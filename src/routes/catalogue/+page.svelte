<h1>Catalogue</h1>

<!-- <script>
  let books = [
    { id: 1, title: "Livre 1", author: "Auteur 1", img: "/images/livre1.jpg" },
    { id: 2, title: "Livre 2", author: "Auteur 2", img: "/images/livre2.jpg" },
  ];
</script>

<section class="catalogue">
  {#each books as book}
    <div class="book-item">
      <img src={book.img} alt={book.title} />
      <div class="text-btn-wrapper">
        <div class="book">
          <p>Titre : {book.title} Auteur : {book.author}</p>
        </div>
        <button class="add-btn">Ajouter à ma booklist</button>
      </div>
    </div>
  {/each}
</section> -->

<section class="catalogue">
	<div class="book-container">
		<img src="/images/livre2.jpg" alt="Livre 2" />
		<div class="book-description">
			<div class="book">
				<p>Titre : lorem ipsum</p>
				<p>Auteur : Jean Scribe</p>
				<p>
					Synopsis : Lorem ipsum dolor sit amet. Et error soluta ab laudantium impedit id tenetur
					corrupti ab nihil nulla.
				</p>
			</div>
			<button class="add-button">Ajouter à ma booklist</button>
		</div>
	</div>

	<div class="book-container">
		<img src="/images/livre3.jpg" alt="Livre 3" />
		<div class="book-description">
			<div class="book">
				<p>Titre : lorem ipsum</p>
				<p>Auteur : Jean Scribe</p>
				<p>
					Synopsis : Lorem ipsum dolor sit amet. Et error soluta ab laudantium impedit id tenetur
					corrupti ab nihil nulla.
				</p>
			</div>
			<button class="add-button">Ajouter à ma booklist</button>
		</div>
	</div>

	<div class="book-container">
		<img src="/images/livre4.jpg" alt="Livre 4" />
		<div class="book-description">
			<div class="book">
				<p>Titre : lorem ipsum</p>
				<p>Auteur : Jean Scribe</p>
				<p>
					Synopsis : Lorem ipsum dolor sit amet. Et error soluta ab laudantium impedit id tenetur
					corrupti ab nihil nulla.
				</p>
			</div>
			<button class="add-button">Ajouter à ma booklist</button>
		</div>
	</div>
</section>

<style>
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
