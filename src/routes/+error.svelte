<script>
	import { page } from '$app/stores';
  // infos venant du fichier layout
	export let error;
	export let status;

	// pour forcer l'envoi du vrai code status
	$: displayStatus = status || $page.status;
</script>

<section class="error-page">
	<h1>{displayStatus}</h1>

	<p>
		{#if error?.message}
			Erreur {displayStatus} — {error.message}
		{:else}
			"Ceux qui errent ne sont pas tous perdus." — J.R.R. Tolkien
		{/if}
	</p>

	<h2>
		{#if displayStatus === 404}
			Cette page est cachée dans les rayons secrets de la bibliothèque. Seuls les archivistes y ont
			accès…
		{:else} <!-- toutes les autres erreurs -->
			Page introuvable 😢
		{/if}
	</h2>

	<a href="/"><button class="button">← Retour à l’accueil</button></a>
</section>

<style>
	.error-page {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		min-height: 80vh;
	}

	h1 {
		font-size: 4rem;
		color: var(--couleur-bleu-vert);
		margin-bottom: 0.5rem;
	}

	h2 {
		font-size: 1rem;
		margin-bottom: 1rem;
	}

	p {
		color: var(--couleur-marron);
		margin-bottom: 2rem;
		font-style: italic;
	}
</style>
