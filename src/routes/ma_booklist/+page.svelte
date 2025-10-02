<script>
    let isActive = false;

    function toggle() {
        isActive = !isActive;
    };

    let books = [
        { id: 1, title: "Le Journal de Mr Darcy", author: "Amanda Grange", cover: "/images/Cover_1.png" },
        { id: 2, title: "Golden Kamui Tome 1", author: "Satoru Noda", cover: "/images/Cover_2.jpg" },
        { id: 3, title: "Ernestine", author: "Salomé Lahoche", cover: "/images/Cover_3.jpg" },  
        { id: 4, title: "Paradise Kiss Tome 1", author: "Ai Yazawa", cover: "/images/Cover_4.jpg" },
        { id: 5, title: "Rendez-vous avec le crime", author: "Julia Chapman", cover: "/images/Cover_5.jpg" }                  
    ];
</script>

<section class="booklist">
    <header class="page_title">
        <h1>Ma booklist</h1>
        <p>Retour</p>
    </header>

    {#each books as book}
    <article class="book">
        <div class="book_data">
            <img src={book.cover} alt={book.title}>
            <div class="book_info">
                <p>{book.title}</p>
                <p>{book.author}</p>
            </div>
        </div>
        <div class="buttons">
            <button class="to-read" class:active={isActive} onclick={toggle} aria-label={isActive ? "A lire" : "Lu"}>
                {#if isActive}
                    <span class="icon-wrapper">
                        <span class="material-symbols--bookmark-added-grey"></span>
                    </span>
                {:else} 
                    <span class="icon-wrapper">
                        <span class="material-symbols--bookmark-added-blue"></span>
                    </span>
                {/if}     
            </button>
            <button class="delete-booklist" aria-label="Supprimer de ma booklist">
                <span class="icon-wrapper">
                    <span class="material-symbols--delete-rounded"></span>
                </span>
            </button>
        </div>
    </article>
    {/each}

</section>

<style>
    .booklist {
        display: flex;
        flex-direction: column;
    }

    .page_title {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 0.8rem;
    }
    
    .book {
        display: flex;
        /* height: 10rem; */
        align-items: center;
        /* border: solid salmon; */
        justify-content: space-between;
    }

    .book_data {
        display: flex;
        height: 10rem;
        align-items: center;
        padding: 0 0.8rem;  
        /* border: solid darkblue; */
        width: 80%;  
    }

    .book img {
        height: 85%;
        aspect-ratio: 2/3;
        object-fit: cover;
    }

    .book_info {
        margin-left: 0.8rem;
    }

    .buttons {
        display: flex;
        flex-wrap: nowrap;
        /* border: solid green; */
    }

    .to-read {
        display: flex;
        justify-content: center;
        align-items: center;        
        background-color: transparent;
        box-shadow: none;
        width: 4rem;
        height: 4rem;
        margin: 0;
    }

    .delete-booklist {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        box-shadow: none;
        width: 4rem;
        height: 4rem;
        margin: 0;
    }

    .icon-wrapper {
        display: flex;
    }

    .material-symbols--bookmark-added-grey {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23848484' d='M17.825 9L15 6.175l1.4-1.425l1.425 1.425l3.525-3.55l1.425 1.425zM5 21V5q0-.825.588-1.412T7 3h7q-.5.75-.75 1.438T13 6q0 1.8 1.138 3.175T17 10.9q.575.075 1 .075t1-.075V21l-7-3z'/%3E%3C/svg%3E");
    }

    .material-symbols--bookmark-added-blue {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2363A6A6' d='M17.825 9L15 6.175l1.4-1.425l1.425 1.425l3.525-3.55l1.425 1.425zM5 21V5q0-.825.588-1.412T7 3h7q-.5.75-.75 1.438T13 6q0 1.8 1.138 3.175T17 10.9q.575.075 1 .075t1-.075V21l-7-3z'/%3E%3C/svg%3E");
    }

    .material-symbols--delete-rounded {
        display: inline-block;
        width: 2rem;
        height: 2rem;        
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23626262' d='M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17'/%3E%3C/svg%3E");
    }

    article:nth-child(even) {
        background-color: var(--couleur-beige-clair);
    } 

</style>