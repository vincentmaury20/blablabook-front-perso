<main>
    <section class="my_informations">
        <h1>Mon compte</h1>
        <img class="avatar" src="/images/Avatar_crop.jpg" alt="my avatar">
        <p class="name">Ophélie Passe-miroir</p>
        <p class="age pink">20 ans</p>
    </section>

    <section class="booklist">
        <header class="title">
            <h1>Ma booklist</h1>
            <p class="books_number pink">28 livres</p>
        </header>

        <div class="books">
            <article class="book">
                <img src="/images/Cover_2.jpg" alt="Golden Kamui">
                <div class="caption">
                    <p class="book_title">Golden Kamui Tome 1</p>
                    <p>Satoru Noda</p>
                </div>
            </article>
            <article class="book">
                <img src="/images/Cover_3.jpg" alt="Ernestine">
                <div class="caption">
                    <p class="book_title">Ernestine</p>
                    <p>Salomé Lahoche</p>
                </div>
            </article>
            <article class="book">
                <img src="/images/Cover_5.jpg" alt="Rendez-vous avec le crime">
                <div class="caption">
                    <p class="book_title">Rendez-vous avec le crime</p>
                    <p>Julia Chapman</p>
                </div>
            </article>
                <article class="book">
                <img src="/images/Cover_4.jpg" alt="Rendez-vous avec le crime">
                <div class="caption">
                    <p class="book_title">Paradise Kiss Tome 1</p>
                    <p>Ai Yazawa</p>
                </div>
            </article>
        </div>

        <button class="bouton">Voir plus</button>
</section>
</main>


<style>
    main {
        display: flex;
        background-color: var(--couleur-beige-clair);
        gap: 2rem;
        justify-content: space-between;
    }

    .my_informations {
        background-color: white;
        width: 20%;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        color: var(--couleur-marron);
    }

    .name {
        font-weight: 700;
        font-size: 20px;
    }

    .pink {
        color: var(--couleur-vieux-rose);
        font-weight: 700;
        font-size: 18px;
    }

    .title {
        width: 100%;
        display: block;
        padding: 2rem;
        text-align: center;
    }

    h1 {
        background-color: unset;
        font-size: 28px;
    }

    .avatar {
        height: 12rem;
        width: 12rem;
        margin: 1.5rem;
        border-radius: 15rem;     
        border: 2px solid var(--couleur-marron); 
    }

    .booklist {
        background-color: white;
        /* border: solid red; */
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 80%;
        gap: 0 5rem;
    }

    .books {
        display: flex;
        gap: 3rem;
        padding: 0 5rem;
        margin: 1rem;
        /* border: solid orange; */
    }

    .book {
        width: 15rem;
        height: 20rem;
        /* border: solid purple; */
        overflow: hidden;
    }

    .book img {
        width: 100%;
        height: 80%;
        object-fit: cover;
    }

    .caption {
        background-color: var(--couleur-beige-clair);        
        padding: 0.5rem;
        color: var(--couleur-marron);
    }

    .book_title {
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .bouton {
        align-self: flex-end;
        margin-right: 5rem;
        margin-bottom: 3rem;
    }


    /* Media queries */

    /* Mobile < 768px */
    @media (max-width: 767px) {

    }

    /* Tablette 768px – 1024px */
    @media (min-width: 768px) {

    }

    /* Desktop > 1024px */
    @media (min-width: 1025px) {

    }

</style>