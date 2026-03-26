<script>
	const currentYear = new Date().getFullYear();
	const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3000/';
</script>

<footer>
	<div class="footer-content">
		<div class="footer-text">
			<a href="/mentions">
				<p>Mentions légales</p>
				<p>© {currentYear} - Blablabook. Tous droits réservés</p>
			</a>
		</div>

		<a href="/"><img src="/LogoBBB.png" alt="Logo BlaBlaBook" class="logo-icon" /></a>

		<!-- Discrete link to dashboard -->
		<a href="{API_URL}admin/login" class="admin-link">⚙️</a>
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
