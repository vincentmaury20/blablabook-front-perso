<script>
	import { goto } from '$app/navigation';

	let isLogin = $state(true);
	let errorMessage = '';

	async function Login(event) {
		event.preventDefault();
		errorMessage = '';
		const formData = new FormData(event.target);

		const res = await fetch('http://localhost:3000/user/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: formData.get('email'),
				password: formData.get('password')
			})
		});

		const data = await res.json();

		if (res.ok) {
			localStorage.setItem('token', data.token);
  			isLogin = true;
  			goto('/mon_compte');
		} else {
			errorMessage = data.error || 'Erreur lors de la connexion';
		}
	}

	async function Register(event) {
		event.preventDefault();
		errorMessage = '';
		const formData = new FormData(event.target);

		const password = formData.get('password');
		const confirm = formData.get('confirm');

		if (password !== confirm) {
			errorMessage = 'Les mots de passe ne correspondent pas';
			return;
		}

		const res = await fetch('http://localhost:3000/user/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: formData.get('name'),
				firstname: formData.get('firstname'),
				age: formData.get('age'),
				email: formData.get('email'),
				password
			})
		});

		const data = await res.json();

		if (res.ok) {
			localStorage.setItem('token', data.token);
			isLogin = true;
			goto('/connexion');
		} else {
			errorMessage = data.error || 'Erreur lors de la création de compte';
		}
	}
</script>

<div class="auth-container">
	<div class="tabs">
		<div class:active={isLogin} onclick={() => (isLogin = true)}>Connexion</div>
		<div class:active={!isLogin} onclick={() => (isLogin = false)}>Création de compte</div>
	</div>

	{#if isLogin}
		<form onsubmit={Login}>
			<label for="email">Email :</label>
			<input type="email" name="email" id="email" required />

			<label for="password">Mot de passe :</label>
			<input type="password" name="password" id="password" required />

			<button type="submit">Se connecter</button>
		</form>
		
	{:else}
		<form onsubmit={Register}>
			<label for="name">Nom :</label>
			<input type="text" name="name" id="name" required />

			<label for="firstname">Prénom :</label>
			<input type="text" name="firstname" id="firstname" required />

			<label for="age">Âge :</label>
			<input type="number" name="age" id="age" min="0" required />

			<label for="emailSignup">Email :</label>
			<input type="email" name="email" id="emailSignup" required />

			<label for="passwordSignup">Mot de passe :</label>
			<input type="password" name="password" id="passwordSignup" required minlength="6" />

			<label for="confirm">Confirmation du mot de passe :</label>
			<input type="password" name="confirm" id="confirm" required minlength="6" />

			<button type="submit">Créer mon compte</button>
		</form>
	{/if}
</div>

<style>
	.auth-container {
		max-width: 400px;
		margin: 2rem auto;
		padding: 1rem;
		border-radius: 30px;
	}

	.tabs {
		display: flex;
		border-bottom: 2px solid #ccc;
		margin-bottom: 1rem;
	}

	.tabs div {
		flex: 1;
		text-align: center;
		padding: 0.5rem;
		cursor: pointer;
		font-weight: bold;
		color: #666;
	}

	.tabs div.active {
		color: var(--couleur-marron);
		border-bottom: 3px solid var(--couleur-marron);
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	label {
		display: flex;
		flex-direction: column;
		font-size: 0.9rem;
	}

	input {
		padding: 0.5rem;
		border-radius: 5px;
		border: 1px solid #ccc;
	}

	/* .forgot-password {
		color: var(--couleur-bleu-vert);
		text-decoration: none;
	} */

	@media (max-width: 768px) {
		.auth-container {
			padding: 0.5rem;
		}
	}
</style>
