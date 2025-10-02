<script>
	let email = 'test@exemple.com';

	async function resendEmail() {
		alert(`Un email de confirmation sera renvoyé à ${email}.`);
	}
</script>

<h1>Compte créé</h1>

<div class="optin">
	<div class="confirmation">
		<p>Vérifiez votre messagerie pour confirmer la création d’un nouveau compte BlaBlaBook.</p>
		<p>Cliquez sur “Renvoyer le courriel” si vous ne recevez rien dans les 10 minutes.</p>
	</div>

	<button class="checkmail" onclick={resendEmail}>Renvoyer le courriel</button>
</div>

<style>
	/*  Mobile (< 768px)*/
	.optin {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 0.5rem;
		padding: 0 1rem;
		text-align: center;
	}

	h1 {
		text-align: center;
		margin-bottom: 1rem;
	}

	.confirmation {
		background-color: var(--couleur-beige-clair);
		border-radius: 30px;
		padding: 1.5rem;
		width: 100%;
		max-width: 900px;
		text-align: center;
		font-family: var(--font-global);
		line-height: 1.6;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	}

	.checkmail {
		padding: 0.8rem 1.6rem;
		border-radius: 30px;
		border: none;
		font-size: 1rem;
		cursor: pointer;
	}

	/* TABLETTE (768px – 1024px)*/
	@media (min-width: 768px) and (max-width: 1024px) {
		.optin {
			display: grid;
			grid-template-columns: repeat(6, 1fr);
			gap: 1.5rem;
			margin: 2rem auto;
			max-width: 90%;
			text-align: left;
		}

		.confirmation {
			grid-column: 1 / 7;
			padding: 2rem;
			text-align: center;
		}

		.checkmail {
			grid-column: 3 / 5;
			justify-self: center;
			width: 100%;
			max-width: 250px;
		}
	}

	/* DESKTOP (> 1024px) */
	@media (min-width: 1025px) {
		.optin {
			display: grid;
			grid-template-columns: repeat(12, 1fr);
			gap: 2rem;
			margin: 3rem auto;
			max-width: 1200px;
			text-align: left;
		}

		.confirmation {
			grid-column: 3 / 11;
			padding: 2.5rem;
			text-align: center;
		}

		.checkmail {
			grid-column: 6 / 8;
			justify-self: center;
			width: 100%;
			max-width: 250px;
		}
	}
</style>
