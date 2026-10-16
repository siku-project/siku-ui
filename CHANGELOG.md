# Changelog — @siku/ui

Format : [semver](https://semver.org/lang/fr/). **Majeure** = changement incompatible (prop renommée ou retirée, token supprimé ou renommé, comportement changé). **Mineure** = composant, variante ou token ajouté. **Correctif** = rendu ou bug corrigé sans changer d’API.

## 1.9.0

- `Tree` : arborescence dépliable (fichiers d’une ressource, hiérarchie), sélection et dossiers ouverts bindables, navigation au clavier (flèches, Début, Fin, Entrée), point de ton et compteur par nœud, variante dense.
- Icônes `folder` et `code`.

## 1.8.1

- `Ring` : la valeur du centre ne déborde plus (tailles de police revues pour les trois tailles, pas de retour à la ligne).

## 1.8.0

Lecture des performances.
- `Ring` : anneau de progression (part 0–1, valeur au centre, libellé, légende, tons, tailles sm / md / lg, états de données, centre composable).
- `ShareBar` : répartition en parts (barre empilée horizontale, légende avec part de chaque segment, infobulle native avec `hint`, tons sémantiques ou palette catégorielle).
- `StatTile` : `help` affiche une icône info avec l’explication de la mesure en Tooltip (`helpLabel` pour le nom accessible).

## 1.7.0

Observabilité : graphiques interactifs, tuiles d’indicateurs, disponibilité, période, tableaux de données.
- `TimeChart` : séries en `points` (`{ t, v }`, axe temporel réel, trous avec `v: null`, `from`/`to`), repères de temps calculés (`formatTime`), survol et flèches ← → avec curseur et infobulle de toutes les séries (`onhover` pour synchroniser), légende cliquable qui masque une série, `thresholds` (lignes pointillées) et `bands` (plages ombrées), `state` loading / empty / unavailable avec `message`, `unit`/`format` par série. Les séries en `values` + `labels` restent prises en charge.
- `BarChart` : survol et clavier avec infobulle de l’intervalle (`onselect`), `state` et `message`.
- `Sparkline` : `width="auto"` suit la largeur du conteneur.
- `StatTile` : indicateur en tuile avec valeur et unité, variation signée (`delta`, `good`), tendance en enfant, `href`, états de données.
- `StatusTimeline` : barre de disponibilité par tranche (ok, dégradé, arrêt, inconnu), taux et bornes.
- `PeriodPicker` : préréglages de période, bouton de rafraîchissement, fraîcheur « il y a 12 s » mise à jour seule.
- `DataTable` : colonnes triables (`sort` bindable ou `onsort`), lignes sélectionnables au clavier (`rowKey`, `selected`), `cell`, états, `dense`, en-tête collant avec `maxHeight`.
- `DescriptionList` : paires clé / valeur d’un détail, valeurs monospace, bouton de copie.
- `Drawer` : `size` sm / md / lg (18 / 28 / 40 rem) et `footer`.
- `LogView` : lignes sélectionnables (`onselect`, `selected` bindable) et `highlight` d’un terme recherché.
- `Badge` : ton `info`. `Segmented` : `size="sm"` effectif.
- Tokens : palette catégorielle `chart-1` à `chart-6` et tons `ChartTone` correspondants ; types `ChartPoint`, `ChartThreshold`, `ChartBand`, `DataState`, `TimelineBucket`, `DataColumn`, `SortState`.
- Icônes : `cpu`, `memory`, `chart`, `filter`, `calendar`, `users`, `terminal`, `timer`, `arrow-up`, `arrow-down`, `copy`, `download` (80 icônes).

## 1.6.0

Filtres comptés.
- `Tabs` : le compteur d’un onglet est rendu en pastille (`sk-tab__count`, chiffres tabulaires, « 999+ » au-delà) ; prop `tone` par onglet qui ajoute un point coloré devant le libellé (filtres par niveau).

## 1.5.0

Console lisible.
- `LogView` : `parts` par ligne (segments avec couleur, fond, gras, atténué, italique, souligné, ou `tone` sémantique) pour rendre une sortie ANSI décodée ; niveau `success` ; texte en `fs-body-sm`, interligne 1,6, horodatage à chiffres tabulaires, ligne survolée mise en évidence.

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
