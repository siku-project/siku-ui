# Changelog — @siku/ui

Format : [semver](https://semver.org/lang/fr/). **Majeure** = changement incompatible (prop renommée ou retirée, token supprimé ou renommé, comportement changé). **Mineure** = composant, variante ou token ajouté. **Correctif** = rendu ou bug corrigé sans changer d’API.

## 1.12.0

- `Tooltip` : la bulle reste dans la fenêtre quel que soit le déclencheur : décalée latéralement quand elle déborde à gauche ou à droite (flèche recalée), retournée vers le bas quand elle dépasse en haut (et inversement).
- `FacetList` : une valeur `unavailable` est réellement désactivée (`disabled`, curseur et survol neutres) sauf quand elle est `active`, pour qu'un filtre posé puisse toujours être retiré.
- `Combobox` : le résumé du déclencheur est tronqué avec des points de suspension (et porté en `title`) au lieu de passer à la ligne.

## 1.11.0

Explorateur : facettes et inspecteur superposé.
- `FacetList` : valeurs d’une dimension avec leur compte (`items` : `{ value, label?, count?, active?, unavailable?, title? }`), valeur active marquée d’une coche, valeur indisponible grisée mais toujours cliquable, `mono` pour des noms techniques, `dense`, `format` du compte, `empty`, `more` + `onmore`, flèches ↑ ↓, Début et Fin entre les valeurs, `aria-pressed`. Type `FacetItem` exporté.
- `Tooltip` : `align` (`center`, `start`, `end`) pour qu’une infobulle d’un bouton collé au bord ne déborde pas de la fenêtre.
- `JsonTree` : `expandLabel` et `collapseLabel` pour traduire la barre « Tout déplier / Tout replier ».
- `Drawer` : le panneau posé sur la page glisse à l’ouverture et à la fermeture (transitions Svelte, plus d’animation CSS à sens unique), le voile apparaît et disparaît en fondu, la page derrière ne défile plus tant qu’il est ouvert, `width` borné à 94 vw ; taille `xl` (52 rem) pour un inspecteur de détail ; la croix porte une infobulle « Fermer · Échap ».

## 1.10.0

Explorateur : filtres, histogramme, structure, traces.
- `Popover` : panneau flottant ancré à son déclencheur (`trigger` snippet avec `{ toggle, open }`), placements `bottom-start` / `bottom-end` / `top-start` / `top-end` avec retournement s’il déborde du bas, `width` en px ou `'trigger'`, `matchWidth`, `block`, fermeture au clic extérieur et à Échap avec retour du focus, `autofocus` dans le panneau.
- `Combobox` : liste de choix avec recherche, simple ou `multiple` (cases à cocher, compte en mono à droite), `inline` pour un panneau de facettes, `onsearch` + `loading` pour un chargement asynchrone, `max` avec note « +n », clavier complet (flèches, Entrée, Début/Fin, Échap).
- `FilterChip` : jeton de filtre « clé = valeur », `exclude` (ton danger, « ≠ »), `ontoggle` pour basculer inclure / exclure, retirable (`onremove`, Retour arrière / Suppr), `icon`, `title`.
- `Disclosure` : section repliable (`open` bindable, `count`, `dense`, snippet `actions`, `ontoggle`), chevron tourné par transform, `aria-expanded`.
- `TimeHistogram` : barres empilées sur un axe temporel réel (`step` en ms), sélection de plage au pointeur (`brush` bindable, `onbrush`) dessinée en bande, clic sur un intervalle (`onpick`), Maj + flèches pour étendre la sélection au clavier, Échap pour l’effacer, infobulle avec chaque série et le total, légende cliquable, repères de temps et marges alignés sur `TimeChart`, états de données.
- `JsonTree` : valeur structurée dépliable (`depth` ouvert au départ, `expanded` bindable en chemins `a.b[0]`), rendu typé (chaînes, nombres, booléens, null), clés en mono, longueur des tableaux, chaînes longues tronquées dépliables, barre « Tout déplier / Tout replier » (`toolbar`), `oncopy` et `onfilter` par nœud (boutons et touches C / F), navigation clavier `role="tree"`.
- `TraceWaterfall` : cascade des spans d’une trace construite depuis `parentId` (parents absents = racines), noms indentés avec service et durée, barres placées par décalage / durée, couleur par service (`chart-1` à `chart-6` par ordre d’apparition), erreurs en ton danger avec marqueur, infobulle (nom, service, durée, part), repères de temps, `selected` et `collapsed` bindables, `rowHeight`, `maxRows` avec note, `formatDuration`, clavier (flèches, ← → replient / déplient, Entrée sélectionne).
- `CodeBlock` : bloc monospace multi-lignes, `wrap` (sinon défilement horizontal), `lineNumbers`, `maxHeight`, bouton `copy` (presse-papiers + `oncopy`), `label`.
- `SeverityDot` et vocabulaire de sévérité partagé : type `Severity` (`trace` → `fatal`), `severityTone()` (neutral / info / warning / danger) et `severityLabel()` exportés ; `fatal` en emphase.
- `LogView` : niveaux `trace`, `warn` et `fatal` acceptés en plus des existants (`warn` → avertissement, `fatal` → erreur en gras, `trace` → atténué).
- `Drawer` : `docked` rend le panneau dans le flux (colonne d’une grille) sans voile, sans piège de focus ni `aria-modal` ; Échap ferme seulement quand le focus est dedans ; `width` en px.
- `DataTable` : `virtual` avec `maxHeight` ne rend que la fenêtre visible plus 10 lignes de marge (`rowHeight`, 44 px ou 34 px en dense), tri, sélection et en-tête collant conservés, ligne sélectionnée ramenée dans la fenêtre ; flèches ↑ ↓, Début et Fin entre les lignes sélectionnables.
- Types : `ComboOption`, `HistogramSeries`, `TimeRange`, `TraceSpan`, `SeverityTone`.
- Icônes : `play`, `pause`, `star`, `more`, `link`, `columns`, `expand`, `collapse` (90 icônes).

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
