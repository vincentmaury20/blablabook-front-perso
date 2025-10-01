<main>
    <section class="my_informations">
        <h1>Mon compte</h1>
        <div class="info">
            <img class="avatar" src="/images/Avatar_crop.jpg" alt="my avatar">
            <div>
                <p class="name">Ophélie Passe-miroir</p>
                <p class="age pink">20 ans</p>
            </div>
        </div>
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
        flex-direction: column;
        background-color: var(--couleur-beige-clair);
        gap: 2rem;
        justify-content: space-between;
    }

    .my_informations {
        background-color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
        color: var(--couleur-marron);
        padding: 1.5rem 0;
    }

    .info {
        display: flex;
        align-items: center;
        width: 85%;
        gap: 1.2rem;
    }

    .name {
        font-weight: 700;
        font-size: 1rem;
    }

    .pink {
        color: var(--couleur-vieux-rose);
        font-weight: 700;
        font-size: 0.8rem;
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
        width: 35%;
        aspect-ratio: 1;
        /* margin: 1.5rem; */
        border-radius: 15rem;     
        border: 2px solid var(--couleur-marron); 
    }

    .booklist {
        background-color: white;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 0 5rem;
    }

    .books {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        align-items: center;
        justify-items: center;
        width: 85%;
        padding: 0.7rem;
        aspect-ratio: 1;
        background-color: var(--couleur-beige-clair);
    }

    .book {
        overflow: hidden;
        width: 85%;
        aspect-ratio: 1;
    }

    .book img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .caption {
        display: none;
    }

    .bouton {
        align-self: flex-end;
        margin: 2rem auto;
    }


    /* Media queries */
    /* Tablette 768px – 1024px */
    @media (min-width: 768px) {
        main {
            flex-direction: row;
        }

        .my_informations {
            width: 20%;
            padding: 2rem;
            align-items: center;
        }

        .avatar {
            height: 12rem;
            width: 12rem;
        }

        .name {
            font-size: 20px;
        }

        .pink {
            font-size: 18px;
        }

        .booklist {
            width: 80%;        
        }

        .books {
            display: flex;
            width: 100%;     
            gap: 3rem;
            padding: 0 5rem;   
            margin: 1rem;                      
        }

        .book {
            width: 15rem;
            height: 20rem;
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
            margin-right: 5rem;
            margin-bottom: 3rem;
        }
    }

    /* Desktop > 1024px */
    @media (min-width: 1025px) {

    }

</style>