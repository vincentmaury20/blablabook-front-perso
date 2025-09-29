<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<a href="/mentions">Mentions légales</a>
	<a href="/catalogue">Catalogue</a>
</header>


<footer>
	
</footer>

{@render children?.()}
