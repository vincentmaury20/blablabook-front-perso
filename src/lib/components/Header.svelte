<header class="header">
	<div class="header-top">
		<div class="logo-title">
			<a href="/"><img src="/LogoBBB.png" alt="Logo BlaBlaBook" class="logo-icon" /></a>
			<p class="title"><a href="/">BlaBlaBook</a></p>
		</div>
		<button class="connection-btn"><a href="/connexion">Connexion</a></button>
	</div>
	<div class="search-container">
		<input type="search" placeholder="Recherche..." class="search-input" />
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
		width: 100%;
		/* margin-top: 1rem; */
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

	/* Media queries */

	@media (min-width: 768px) {
		.header-top {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
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
			font-size: 3rem;
			text-align: left;
		}
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
		box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
	}

	.search-input:focus {
		outline: none;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
	}

	/* Media queries */
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
	}
</style>
