<header class="header">

    <div class="header-container">

        <img src="/LogoBBB.png" alt="Logo BlaBlaBook" class ="logo-icon" />
        <h1 class="title">Blabla</h1>
        <button class="connection-btn">Connexion</button>

    </div>

    <div class="search-container">
        <input
        type="search"
        placeholder="Recherche..."
        class="search-input"
        />
    </div>

</header>

<style>

header{
    background-color: var(--couleur-beige-rose);
}

.header-container{
    display: flex;
    justify-content: space-between;
}

.logo-icon{
    height: 150px;
    width: auto;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
}

.title{
    font-family: var(--font-bbb);
    font-size: 48px;
    width: auto;
}

.connection-btn{
    font-family: var(--font-global);
}

.search-container{
    width: 100%;
    border: none;
    border-radius: 25px;
    transition: box-shadow 0.2s ease;
}

</style>