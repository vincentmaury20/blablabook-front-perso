<script>
	import favicon from '$lib/assets/favicon.png';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
    import '../reset.css';
	import '../app.css';


	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="layout">
	<Header></Header>
	
	{@render children?.()}
	
	<Footer></Footer>
</div>
