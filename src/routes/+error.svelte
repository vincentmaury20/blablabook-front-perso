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

	<h2>
		{#if displayStatus === 404}
			Cette page est cachée dans les rayons secrets de la bibliothèque. Seuls les archivistes y ont
			accès…
		{:else}
			<!-- toutes les autres erreurs -->
			Oups! Erreur serveur !
		{/if}
	</h2>

	<p>
		{#if error?.message}
			Erreur {displayStatus} — {error.message}
		{:else}
			"Tous ceux qui errent ne sont pas perdus." — J.R.R. Tolkien
		{/if}
	</p>

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
		color: var(--couleur-marron);
		font-size: 2rem;
	}

	p {
		font-size: 1rem;
		font-style: italic;
    margin-top: 1rem;
	}
</style>
