<script>
    let isActive = $state(false)

    function toggle() {
        isActive = !isActive;
    }

    const images = '/images/livre3.jpg'


</script>

<h1 class="book-title">
    Nana
</h1>

<div class="genre-container">

    <p class="genre">Shoujo</p>

</div>

<div class="container">
    
    <img src="/images/livre3.jpg" alt="Couverture Nana" class="cover">
    
    <div class="synopsis-container">
        <p class="synopsis">
            Quand l'une rêve de triomphe pour son groupe de rock les BlackStones, l'autre ne recherche qu'un mari parfait pour fonder un foyer. Au gré des aventures de ces deux filles, l'une orpheline versée dans le gothique et l'autre fashion victime incapable de travailler, se tisse une amitié et une success story passionnante.
        </p>

    </div>

</div>

<button class="add-booklist" class:active={isActive} onclick={toggle} aria-label="Ajouter à la booklist"> <img src="/Icone/Add.png" alt="" class="icon" /> Ajouter à la Booklist </button>
<button class="to-read" class:active={isActive} onclick={toggle} aria-label="Ajouter à la booklist"> <img src="/Icone/Add.png" alt="" class="icon" >A lire</button>
<button class="read" class:active={isActive} onclick={toggle} aria-label="Ajouter à la booklist"> <img src="/Icone/Add.png" alt="" class="icon" >J'ai lu</button>

<button class="button">retour catalogue</button>

<style>

.container{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    
}

.genre-container{
    
    display: block;
    width: fit-content;
    border: var(--couleur-marron);
    margin-left: auto;
    border: solid 2px var(--couleur-marron);
    background-color: var(--couleur-beige-clair);
    border-radius: 10px;
}

.genre{
    margin:0.3rem;
    font-size: 16px;
}

.cover{
    border-radius: 0px 20px 0px 20px;
    width: 150px;
    padding: 0.3rem;
    padding-bottom: 1rem;
    

}

.synopsis-container{
    background-color: var(--couleur-beige-clair);
    border-radius: 20px;
    margin: 1rem;
    
}

.synopsis{
    margin: 2rem;
}

.add-booklist{
    background-color: white;
    -webkit-box-shadow: -15px -18px 0px -30px #000000; 
box-shadow: -15px -18px 0px -30px #000000;
    color: var(--couleur-marron);
}

</style>