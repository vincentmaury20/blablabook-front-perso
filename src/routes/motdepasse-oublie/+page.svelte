<script>
	// import { API_URL } from '$lib/config.js';
	let loginEmail = '';

	function handleReset(event) {
		event.preventDefault();

		if (!loginEmail) {
			alert('Merci de saisir votre e-mail !');
			return;
		}

		localStorage.setItem('reset_email', loginEmail);
		alert(`Un lien de réinitialisation a été envoyé à ${loginEmail}.`);
	}
</script>

<h1>Mot de passe oublié</h1>

<div class="ask-password">
	<form onsubmit={handleReset}>
		<label>
			E-MAIL :
			<input type="email" bind:value={loginEmail} required />
		</label>
		<button type="submit">Réinitialiser mon mot de passe</button>
	</form>
</div>

<style>
	/* Media queries */
	.ask-password {
		max-width: 90%;
		margin: 2rem auto;
		padding: 1rem;
		text-align: center;
		background-color: var(--couleur-beige-clair);
		border-radius: 30px;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	label {
		display: flex;
		flex-direction: column;
		text-align: left;
	}

	input {
		padding: 0.6rem;
		border-radius: 20px;
		border: 1px solid var(--couleur-marron);
	}

	@media (min-width: 768px) and (max-width: 1024px) {
		.ask-password {
			max-width: 600px;
			padding: 2rem;
		}

		form {
			gap: 1rem;
		}

		input {
			padding: 0.75rem;
			font-size: 1rem;
		}
	}

	@media (min-width: 1025px) {
		.ask-password {
			max-width: 700px;
			padding: 2.5rem;
		}

		form {
			gap: 1rem;
		}

		input {
			padding: 0.8rem;
			font-size: 1rem;
		}
	}
</style>
