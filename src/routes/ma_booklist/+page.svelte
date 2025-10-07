<script>
	function toggle() {
		// isRead = !isRead;
	}

	let { data } = $props();

	import { goto } from '$app/navigation';
</script>

<section class="booklist">
	<header class="page_title">
		<h1>Ma booklist</h1>
		<p>{data.totalBooks} Livres</p>
		<p>Retour</p>
	</header>
	{#each data.userbooks as userbook}
		<article class="book">
			<div class="book_data">
				<img src={userbook.book.cover} alt={userbook.book.title} />
				<div class="book_info">
					<p class="book_title"><a href="/livre/{userbook.book.id}">{userbook.book.title}</a></p>
					<p class="book_author">{userbook.book.author}</p>
				</div>
			</div>
			<div class="buttons">
				<button
					class="to-read"
					class:active={userbook.toRead}
					onclick={toggle}
					aria-label={userbook.toRead ? 'A lire' : 'Lu'}
				>
					{#if userbook.toRead}
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

	<div class="pagination">
		{#if data.page > 1}
			<button onclick={() => goto(`?page=${data.page - 1}`)}>Précédente</button>
		{/if}
		<span>Page {data.page} / {data.totalPages}</span>
		{#if data.page < data.totalPages}
			<button onclick={() => goto(`?page=${data.page + 1}`)}>Suivante</button>
		{/if}
	</div>
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
		padding: 1.8rem;
	}

	.page_title h1 {
		font-size: 28px;
	}

	.page_title p {
		text-shadow: 0 4px 4px rgba(122, 122, 122, 0.5);
	}

	.book {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.book_data {
		display: flex;
		height: 10rem;
		align-items: center;
		padding: 0 0.8rem;
		width: 80%;
	}

	.book img {
		height: 85%;
		aspect-ratio: 2/3;
		object-fit: cover;
	}

	.book_info {
		margin-left: 0.8rem;
		min-width: 0;
	}

	.book_title {
		display: -webkit-box;
		line-clamp: 2;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.book_title {
		font-weight: 700;
	}

	.book_author {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.buttons {
		display: flex;
		flex-wrap: nowrap;
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
		padding: 0.8rem;
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
		padding: 0.8rem;
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

	/* Media queries */

	@media (min-width: 1025px) {
		.delete-booklist {
			margin-right: 1rem;
		}
	}
</style>
