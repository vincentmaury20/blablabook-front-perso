# BlaBlaBook - Frontend

BlaBlaBook est une plateforme innovante dédiée aux passionnés de lecture. Elle permet de gérer, organiser et partager ses bibliothèques personnelles de manière simple et conviviale.

## À propos du projet

BlaBlaBook est une application web moderne construite avec **SvelteKit** pour offrir une expérience utilisateur fluide et réactive. Elle permet aux lecteurs de :

- Gérer leur bibliothèque personnelle
- Rechercher et découvrir des livres
- Éviter les doublons dans leurs acquisitions
- Suivre leurs lectures passées
- Échanger des conseils littéraires

## Stack technologique

- **Framework** : [SvelteKit](https://kit.svelte.dev/) v2.22.0
- **Runtime** : Node.js
- **Build** : Vite v7.0.4
- **Testing** : Vitest
- **Linting** : ESLint + Prettier
- **Markdown** : mdsvex
- **Language** : JavaScript

### Dépendances clés

- `svelte` : Framework reactif v5.0.0
- `@sveltejs/adapter-node` : Adapter pour déployer sur Node.js
- `@sveltejs/kit` : Framework SvelteKit
- `vitest` : Framework de test unitaire
- `prettier` : Formateur de code
- `eslint` : Linter JavaScript

## Structure du projet

```
projet-blablabook-front/
├── src/
│   ├── routes/                 # Pages et layouts SvelteKit
│   │   ├── +layout.svelte      # Layout principal
│   │   ├── +page.svelte        # Page d'accueil
│   │   ├── +page.js            # Chargement de données
│   │   ├── connexion/          # Page de connexion
│   │   ├── compte-cree/        # Page de confirmation de compte
│   │   ├── mon-compte/         # Profil utilisateur
│   │   ├── ma-booklist/        # Bibliothèque personnelle
│   │   ├── catalogue/          # Catalogue de livres
│   │   ├── livre/[id]/         # Détail d'un livre
│   │   ├── mentions/           # Mentions légales
│   │   └── +error.svelte       # Page d'erreur
│   ├── lib/
│   │   ├── config.js           # Configuration globale (API_URL)
│   │   ├── remoteFunction.js   # Fonctions d'API (recherche, etc.)
│   │   ├── assets/             # Images et ressources
│   │   ├── components/         # Composants réutilisables
│   │   │   ├── Header.svelte
│   │   │   └── Footer.svelte
│   │   ├── stores/             # Stores Svelte (état global)
│   │   │   ├── auth.js         # Gestion de l'authentification
│   │   │   └── booklistStore.js # Gestion de la bibliothèque
│   │   ├── server/             # Code côté serveur
│   │   │   └── tests/
│   │   │       ├── booksLoad.test.js
│   │   │       └── carousel.test.js
│   │   └── utils/              # Utilitaires
│   │       └── debounce.js
│   ├── app.html                # HTML racine
│   ├── app.css                 # Styles globaux
│   └── reset.css               # Reset CSS
├── static/                     # Fichiers statiques
│   ├── robots.txt
│   ├── icons/
│   └── images/
├── Dockerfile                  # Configuration Docker
├── package.json               # Dépendances et scripts
├── vite.config.js             # Configuration de build
├── svelte.config.js           # Configuration de SvelteKit
├── jsconfig.json              # Configuration JavaScript/TypeScript
├── eslint.config.js           # Configuration ESLint
└── README.md                  # Ce fichier
```

## Démarrage rapide

### Prérequis

- Node.js v18 ou supérieur
- npm

### Installation

```bash
# Cloner le repository
git clone <url-du-repo>
cd projet-blablabook-front

# Installer les dépendances
npm install
```

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

- `PUBLIC_API_URL` : URL du backend BlaBlaBook (par défaut: `http://localhost:3000`)

### Développement

```bash
# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible à `http://localhost:5173` (ou le port indiqué dans la console).

### Build pour la production

```bash
# Build l'application
npm run build

# Prévier le build
npm run preview
```

## Scripts disponibles

| Script                | Description                               |
| --------------------- | ----------------------------------------- |
| `npm run dev`         | Démarrer le serveur de développement      |
| `npm run build`       | Compiler l'application pour la production |
| `npm run test:unit`   | Lancer les tests unitaires                |
| `npm run test:server` | Lancer les tests serveur                  |

## Tests

### Tests unitaires

```bash
npm run test:unit
```

Les tests sont situés dans `src/lib/server/tests/` et utilisent Vitest.

Tests actuels :

- `booksLoad.test.js` : Tests du chargement des livres
- `carousel.test.js` : Tests du carousel

## Architecture

### Authentification

L'authentification est gérée via un **JWT token** stocké dans le localStorage. Le store `auth.js` charge automatiquement l'utilisateur au démarrage :

```javascript
-loadUserFromToken() - // Charge l'utilisateur depuis le token
	logout(); // Déconnecte l'utilisateur
```

### Communication avec l'API

Toutes les requêtes vers le backend passent par les fonctions dans `lib/remoteFunction.js` :

- `getSearchSuggestions(q, type, signal)` : Recherche de livres

### État global

Les stores Svelte gèrent l'état global :

- `auth.js` : État utilisateur et authentification
- `booklistStore.js` : État de la bibliothèque utilisateur

## Déploiement avec Docker

```bash
# Construire l'image
docker build -t blablabook-front .

# Lancer le conteneur
docker run -p 3000:3000 -e PUBLIC_API_URL=http://api-server:3000 blablabook-front
```

## 📄 Pages principales

| Route          | Description                                  |
| -------------- | -------------------------------------------- |
| `/`            | Page d'accueil avec carousel et présentation |
| `/connexion`   | Page de connexion/inscription                |
| `/mon-compte`  | Profil utilisateur connecté                  |
| `/ma-booklist` | Bibliothèque personnelle                     |
| `/catalogue`   | Catalogue de tous les livres                 |
| `/livre/[id]`  | Détail d'un livre spécifique                 |
| `/mentions`    | Mentions légales                             |

## Lien utile

Voici le lien vers les repo [backend](https://github.com/vincentmaury20/blablabook-back-perso)
