<script>
	import { onMount } from 'svelte';
	import { loadUserFromToken } from '$lib/stores/auth.js';
	import { page } from '$app/stores';
	import favicon from '$lib/assets/favicon.png';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '../reset.css';
	import '../app.css';

	let { children } = $props();

	// Charger l'utilisateur au démarrage si un token existe
	onMount(() => {
		loadUserFromToken();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="layout">
	<Header />
	<main class="main-content">
		{#if $page.status && $page.status >= 400}
			{@render children?.('error')}
		{:else}
			{@render children?.()}
		{/if}
	</main>
	<Footer />
</div>

<style>
	.layout {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.main-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
