<header class="header">
	<div class="header-top">
		<div class="logo-title">
			<img src="/LogoBBB.png" alt="Logo BlaBlaBook" class="logo-icon" />
			<p class="title">BlaBlaBook</p>
		</div>

		<button class="connection-btn">Connexion</button>
	</div>

	<div class="search-container">
		<input type="search" placeholder="Recherche..." class="search-input" />
	</div>
</header>

<style>
	header {
		background-color: var(--couleur-beige-rose);
		padding: 1rem 2rem;
	}

	.header-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.logo-title {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.logo-icon {
		height: 100px;
		width: auto;
		filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
	}

	.title {
		font-family: var(--font-bbb);
		color: var(--couleur-marron);
		font-size: 64px;
		margin: 0;

		position: absolute;
		left: 50%;
		transform: translateX(-50%);
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
		box-shadow: 0 0 10px;
	}

	.search-input:focus {
		outline: none;
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
	}
</style>
