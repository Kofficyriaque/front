# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # PrediSalaire — Frontend

    ## Présentation du projet

    PrediSalaire est une application web qui estime les salaires IT en se basant sur l'analyse de grandes quantités d'offres d'emploi et de techniques NLP/ML. Elle fournit des rapports aux candidats et des outils de benchmarking pour les recruteurs.

    ## Architecture du projet

    - Frontend: React + TypeScript, bundlé avec Vite.
    - Routage: React Router.
    - Styles: Tailwind CSS.
    - Traductions: i18next / react-i18next (FR / EN).
    - Persistances légères: localStorage pour token/utilisateur et préférences.

    Structure principale (dossier `src`):

    - `pages/` : vues (Home, CareerAnalysis, Candidat, Recruteur, About, Profile, History, Login, Signup...)
    - `components/` : éléments réutilisables (Navbar, Footer, FAQItem, FeatureVisual...)
    - `services/` : client API centralisé
    - `utils/` et `types/` : helpers et définitions TypeScript

    ## Technologies utilisées

    - React 18+ / TypeScript
    - Vite (dev server, build)
    - Tailwind CSS
    - i18next / react-i18next
    - Framer Motion (animations)
    - Lucide Icons


## Technologies utilisées

- React (v18+) + TypeScript
- Vite
- Tailwind CSS
- i18next / react-i18next
- Framer Motion
- Lucide Icons

## Scripts utiles (dans `package.json`)

- `npm run dev` — lancement en développement (Vite)
- `npm run build` — build de production
- `npm run preview` — prévisualiser le build
- `npm run lint` — vérification ESLint

## Installation et lancement

Prérequis: Node.js (>=16) et npm/yarn

1. Installer les dépendances

```bash
npm install

```

2. Lancer le serveur de développement

```bash
npm run dev

```

3. Construire pour la production

```bash
npm run build
npm run preview
```

## Pages / Routes disponibles

- `/` — Home
- `/about` — About
- `/login` — Login
- `/forgot-password` — ForgotPassword
- `/signup` — Signup
- `/profile` — Profile
- `/history` — History
- `/careerAnalysis` — CareerAnalysis (onboarding candidat)
- `/candidat` — Candidat
- `/recruteur` — Recruteur
- `/privacy` — PrivacyPolicy
- `/terms` — TermsOfUse

## Composants principaux

- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/ScrollTop.tsx`
- `src/components/FAQItem.tsx`
- `src/components/FeatureVisual.tsx`

## Fonctionnalités principales

- Estimation salariale par profil (poste, compétences, région, expérience)
- Onboarding candidat en 5 étapes (profil, expertise, stack, description, analyse)
- Historique des analyses
- Outils recruteur pour benchmarking et audit d'annonces
- Interface bilingue (FR/EN)



## Résultats attendus

- Fourchette salariale prédite (salaire brut annuel)
- Score de confiance et métriques d'échantillon
- Recommandations sur compétences et attractivité d'une annonce



