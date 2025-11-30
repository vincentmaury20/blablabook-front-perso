<footer>
	<div class="footer-content">
		<div class="footer-text">
			<a href="/mentions">
				<p>Mentions légales</p>
				<p>© 2025 - Blablabook. Tous droits réservés</p>
			</a>
		</div>

		<a href="/"><img src="/LogoBBB.png" alt="Logo BlaBlaBook" class="logo-icon" /></a>

		<!-- Lien discret vers l'admin -->
		<a href="http://localhost:3000/admin/login" class="admin-link">⚙️</a>
	</div>
</footer>

<style>
	footer {
		background-color: var(--couleur-beige-rose);
		color: var(--couleur-marron);
		font-family: var(--font-global);
		padding: 0.5rem;
	}

	.footer-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.logo-icon {
		height: 80px;
		width: auto;
	}

	/* Style discret pour le lien admin */
	.admin-link {
		position: absolute;
		bottom: 5px;
		right: 10px;
		font-size: 14px;
		color: #ccc;
		opacity: 0.2;
		text-decoration: none;
		transition:
			opacity 0.3s,
			color 0.3s;
	}

	.admin-link:hover {
		opacity: 0.75;
		color: #000;
	}
</style>
