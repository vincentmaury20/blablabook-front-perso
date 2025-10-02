<script>
	// Permet de naviguer sans recharger le site //
	import { goto } from '$app/navigation';
	//module de Sveltekit pour charger les variables d'environnement au démarrage
	import api from '$lib/api.js';
	// Onglet actif : true = connexion, false = création de compte
	let isLogin = true;

	// Connexion
	let loginEmail = '';
	let loginPassword = '';

	// Création de compte
	let signupFirstName = '';
	let signupLastName = '';
	let signupAge = '';
	let signupEmail = '';
	let signupPassword = '';
	let signupConfirmPassword = '';

	// Test connexion
	let message = '';
	let isLoading = false;
	// URL du backend (.env) //
	const API_URL = 'http://localhost:3000/api';
	// Connexion -> vérifier URL de redirection
	async function handleLogin(event) {
		console.log(event);
		event.preventDefault();
		isLoading = true;
		message = '';
		try {
			const response = await fetch(`${API_URL}/api/auth/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: loginEmail,
					password: loginPassword
				})
			});
			const data = await response.json();
			if (!response.ok) {
				message = data.message || 'Erreur de connexion.';
				return;
			}
			localStorage.setItem('token', data.token);
			message = 'Connexion réussie ✅';
			goto('/account/dashboard');
		} catch (error) {
			message = 'Erreur serveur. Vérifier la connexion au backend.';
			console.error(error);
		}
	}

	// Test création de compte
	function handleSignup(event) {
		event.preventDefault();
		if (signupPassword !== signupConfirmPassword) {
			alert('Les mots de passe ne correspondent pas !');
			return;
		}
		const user = {
			firstName: signupFirstName,
			lastName: signupLastName,
			age: signupAge,
			email: signupEmail
		};
		localStorage.setItem('signup_user', JSON.stringify(user));
		alert('Compte créé ! (simulation frontend)');
		window.location.href = '/account/created-account';
	}
</script>

<div class="auth-container">
	<!-- Onglets -->
	<div class="tabs">
		<div class:active={isLogin} onclick={() => (isLogin = true)}>Connexion</div>
		<div class:active={!isLogin} onclick={() => (isLogin = false)}>Création de compte</div>
	</div>

	<!-- Connexion -->
	{#if isLogin}
		<form onsubmit={handleLogin}>
			<label
				>Email
				<input type="email" bind:value={loginEmail} required />
			</label>
			<label
				>Mot de passe
				<input type="password" bind:value={loginPassword} required />
			</label>
			<a href="/authentification/forgot-password" class="forgot-password">Mot de passe oublié ?</a>
			<button type="submit">Se connecter</button>
		</form>
	{:else}
		<!-- Création de compte -->
		<form onsubmit={handleSignup}>
			<label
				>Nom
				<input type="text" bind:value={signupLastName} required />
			</label>
			<label
				>Prénom
				<input type="text" bind:value={signupFirstName} required />
			</label>
			<label
				>Âge
				<input type="number" bind:value={signupAge} min="0" required />
			</label>
			<label
				>Email
				<input type="email" bind:value={signupEmail} required />
			</label>
			<label
				>Mot de passe
				<input type="password" bind:value={signupPassword} required minlength="6" />
			</label>
			<label
				>Confirmation du mot de passe
				<input type="password" bind:value={signupConfirmPassword} required minlength="6" />
			</label>
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

	.forgot-password {
		color: var(--couleur-bleu-vert);
		text-decoration: none;
	}

	@media (max-width: 768px) {
		.auth-container {
			padding: 0.5rem;
		}
	}
</style>
