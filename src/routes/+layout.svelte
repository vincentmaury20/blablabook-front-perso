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

    <main class="main-content">
        {@render children?.()}
    </main>

    <Footer></Footer>
</div>

<style>
    html,
    body {
        height: 100%;
        margin: 0;
    }

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