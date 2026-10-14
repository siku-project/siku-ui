# Changelog — @siku/ui

Format : [semver](https://semver.org/lang/fr/). **Majeure** = changement incompatible (prop renommée ou retirée, token supprimé ou renommé, comportement changé). **Mineure** = composant, variante ou token ajouté. **Correctif** = rendu ou bug corrigé sans changer d’API.

## 1.4.0

Supervision d’un serveur (moniteur, console).
- `BarChart` : barres par intervalle, groupées ou empilées (répartition d’un histogramme, volumes par période), mêmes conventions que `TimeChart`.
- `LogView` : journal monospace défilant avec horodatage, niveau par ligne, suivi automatique du bas (`follow` bindable), retour à la ligne, `onreachtop` pour charger l’historique.

## 1.3.0

Briques d’une interface d’administration (barre latérale, tableau de bord, chargement).
- `NavList` : `href` sur une entrée rend un lien `<a>` (navigation entre pages, `aria-current="page"`) ; prop `compact` (icônes seules, libellé en infobulle native) pour une barre latérale repliée.
- `Sparkline` : mini courbe inline (tendance d’un indicateur), tons `neutral`, `live`, `success`, `warning`, `danger`, aire en option.
- `TimeChart` : courbe ou aire temporelle, grille, axe des valeurs, repères de temps, une à trois séries, légende avec la dernière valeur. Types `ChartSeries` et `ChartTone` exportés.
- `Drawer` : panneau latéral posé sur la page (navigation mobile, inspecteur), voile, Échap, focus piégé.
- `Skeleton` : silhouette d’un contenu en cours de chargement, immobile sous `prefers-reduced-motion`.
- Icônes : `menu`, `power`, `refresh` (68 icônes).

## 1.2.0

Premiers besoins d’une application web complète (accueil, accès, tableau de bord).
- Style de texte `t-display` (3,25 rem, plancher `text-floor-4xl` 28 px) : titre d’accueil d’une page web. Réservé au web, jamais dans une interface de jeu.
- `Notice` : message en ligne qui reste dans le flux (erreur de formulaire, retour d’une action, information), tons `neutral`, `info`, `success`, `warning`, `danger`, `role="alert"` pour `danger`.
- Icônes : `discord`, `eye-off`, `logout`, `mail` (65 icônes).

## 1.1.1

- Documentation : avec Bun, la dépendance se déclare en `git+ssh://git@github.com/siku-project/siku-ui.git#vX.Y.Z` (Bun traite `git+https://github.com/…` comme un raccourci GitHub sans authentification) ; en CI, réécriture `ssh://git@github.com/` → HTTPS avec jeton. Gabarit de ressource et workflow `ui.yml` alignés.

## 1.1.0

Le design system devient commun aux interfaces FiveM et aux applications web.
- `@siku/ui/web.css` : même polices, tokens, composants et structure, avec une base web (page qui défile, texte sélectionnable, `bg-base` en fond, `color-scheme: dark`). `styles.css` reste la base NUI.
- `@siku/ui/tailwind.css` : thème Tailwind v4 (`@theme`) généré depuis `tokens.json`, à côté du preset Tailwind v3.
- `Button` : prop `href` qui rend un lien `<a>` avec le même rendu et les mêmes variantes.
- Icônes : `activity`, `database`, `globe`, `layers`, `server` (61 icônes).
- `siku check --web` : désactive les règles Chromium 103, garde les règles de design (couleurs, polices, composants recréés, surcharges `sk-`). `siku ai sync --web` : bloc d’instructions, skill et hook adaptés à une application SvelteKit à la racine.
- `version` exportée générée depuis `package.json` (`src/lib/version.ts`).
- Outils : Bun (`bun.lock`, `bun run verify`, CI et release sur `setup-bun`). Les ressources npm installées depuis un tag ne changent pas. Les projets Bun épinglent un tag : `git+ssh://git@github.com/siku-project/siku-ui.git#v1.1.0`.

## 1.0.0

Première version de référence.
- Tokens v4 en trois niveaux (primitives, sémantique, composants), une intention par token (`container-foreign` ≠ `status-armor`, `selection` ≠ `focus-ring`).
- Échelle proportionnelle bornée (720p → 4K) avec planchers de texte et densité compacte ; zones sûres GTA et mini-carte via `siku:env`.
- 41 composants Svelte 5 (actions, saisie, navigation, retours, données, jeu, structure), runtime NUI, pont manette `siku:nav`.
- Preset Tailwind v3, polices embarquées, CLI `siku` (check, doctor, ai sync/check, init), hook Claude Code, gabarit de ressource.
