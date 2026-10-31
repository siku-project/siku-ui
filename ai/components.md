# Composants @siku/ui 1.12.0

> Généré depuis catalog/catalog.js. Import : `import { Nom } from '@siku/ui'`. Styles : `import '@siku/ui/styles.css'` une fois dans main.ts.

| Composant | Groupe | Rôle |
|---|---|---|
| [`Button`](#button) | Actions | Déclenche une action ; le libellé dit exactement ce qui se passe. |
| [`ButtonGroup`](#buttongroup) | Actions | Aligne des actions liées avec l’écart standard. |
| [`Key`](#key) | Actions | Une touche clavier ou un bouton de manette. |
| [`Hint`](#hint) | Actions | Touche(s) + libellé ; bascule automatiquement sur les glyphes manette. |
| [`TextField`](#textfield) | Saisie | Champ de saisie avec libellé, aide et erreur. |
| [`Checkbox`](#checkbox) | Saisie | Choix multiple ou acceptation. |
| [`RadioGroup`](#radiogroup) | Saisie | Un choix parmi peu, tous visibles. |
| [`Switch`](#switch) | Saisie | Réglage à effet immédiat, sans validation. |
| [`Select`](#select) | Saisie | Liste déroulante : valeur + détail, clavier complet. |
| [`Stepper`](#stepper) | Saisie | Quantité entière : diviser une pile, acheter, transférer. |
| [`Slider`](#slider) | Saisie | Valeur continue (volume, fréquence). |
| [`Segmented`](#segmented) | Saisie | Une valeur parmi deux à quatre, visible d’un coup d’œil. |
| [`Tabs`](#tabs) | Navigation | Onglets soulignés (sections) ou pastilles (filtres d’écran), Q/E en option. |
| [`NavList`](#navlist) | Navigation | Navigation latérale d’une fenêtre (comptes, catégories). |
| [`Menu`](#menu) | Navigation | Menu contextuel ou liste d’actions : flèches, Entrée, Échap, raccourcis. |
| [`Modal`](#modal) | Retours | Confirmation d’une action irréversible ou coûteuse. |
| [`Tooltip`](#tooltip) | Retours | Aide d’une phrase, blanche, au survol ou au focus. |
| [`Notice`](#notice) | Retours | Message en ligne qui reste dans le flux : erreur de formulaire, retour d’une action, information. |
| [`Toast`](#toast) | Retours | Une notification (présentation). Pour la file : toast.push() + <Toaster />. |
| [`Toaster`](#toaster) | Retours | Pile de notifications en haut à droite, dans la zone sûre GTA. |
| [`Meter`](#meter) | Retours | Jauge continue : charge, progression. Avertissement automatique au seuil. |
| [`Segments`](#segments) | Retours | Valeur discrète (état, régime) ; zone critique en option. |
| [`Spinner`](#spinner) | Retours | Attente indéterminée. |
| [`Skeleton`](#skeleton) | Retours | Silhouette d’un contenu en cours de chargement. |
| [`DataRow`](#datarow) | Données | Ligne de liste : opérations, journaux, contacts. |
| [`Table`](#table) | Données | Tableau dense : effectifs, classements, journaux. |
| [`Badge`](#badge) | Données | Un mot d’état ; la couleur suit le sens. |
| [`Plate`](#plate) | Données | Plaque d’immatriculation, couleur « contenant tiers ». |
| [`Code`](#code) | Données | Identifiant à recopier, en Geist Mono. |
| [`Count`](#count) | Données | Compteur blanc (non lus, en attente). Masqué à 0. |
| [`Avatar`](#avatar) | Données | Initiales d’une personne ou d’une entreprise. |
| [`EmptyState`](#emptystate) | Données | Un état vide propose l’action suivante. |
| [`Stat`](#stat) | Données | La valeur clé d’un écran avec sa partie secondaire en retrait. |
| [`Sparkline`](#sparkline) | Données | Mini courbe inline : la tendance d’un indicateur, sans axes. |
| [`TimeChart`](#timechart) | Données | Courbe ou aire dans le temps : axe temporel réel, survol avec valeurs, seuils, bandes, états de données, séries masquables. |
| [`BarChart`](#barchart) | Données | Barres par intervalle, groupées ou empilées : répartition d’un histogramme, volumes par période. |
| [`LogView`](#logview) | Données | Journal monospace défilant : horodatage, niveau par ligne, suivi automatique du bas, retour à ligne. |
| [`Slot`](#slot) | Jeu | Emplacement d’inventaire : touche ↖, quantité ↗, nom en bas, usure sur le bord. |
| [`SlotGrid`](#slotgrid) | Jeu | Grille d’emplacements : flèches/manette, sélection, glisser-déposer entre grilles. |
| [`Gauge`](#gauge) | Jeu | Statut du HUD ; critique sous le seuil (icône, jauge, valeur). |
| [`Prompt`](#prompt) | Jeu | Invite d’interaction ancrée à un objet du monde. |
| [`HoldAction`](#holdaction) | Jeu | Action à maintenir : se remplit tant que la touche est tenue, se vide au relâchement. |
| [`HudAnchor`](#hudanchor) | Jeu | Place un groupe du HUD dans un coin, à l’intérieur de la zone sûre GTA. |
| [`Screen`](#screen) | Structure | Famille « écran plein » : voile, cadre 16:9 centré, Échap pour fermer. |
| [`Veil`](#veil) | Structure | Voile dégradé depuis un bord de l’écran, à courbe douce : asseoir une colonne ou un pied d’écran posés sur le jeu sans cadre. |
| [`Surface`](#surface) | Structure | Un niveau de surface pour composer fenêtres, panneaux et colonnes. |
| [`Divider`](#divider) | Structure | Filet de structure, horizontal, vertical ou titré. |
| [`Drawer`](#drawer) | Structure | Panneau latéral posé sur la page : navigation mobile, filtres, inspecteur. |
| [`StatTile`](#stattile) | Données | Indicateur clé en tuile : valeur et unité, variation signée, tendance, état de données. |
| [`StatusTimeline`](#statustimeline) | Données | Disponibilité dans le temps : une barre de tranches ok, dégradé, arrêt, inconnu, avec le taux de disponibilité. |
| [`Ring`](#ring) | Données | Anneau de progression : une part (0–1) avec sa valeur au centre, un libellé et un état de données. |
| [`Tree`](#tree) | Données | Arborescence dépliable : fichiers d’une ressource, hiérarchie d’objets, avec sélection au clavier. |
| [`ShareBar`](#sharebar) | Données | Répartition en parts : une barre empilée horizontale avec la part de chaque segment et sa légende. |
| [`PeriodPicker`](#periodpicker) | Saisie | Période d’analyse d’un graphique, bouton de rafraîchissement et fraîcheur des données. |
| [`DataTable`](#datatable) | Données | Tableau de données triable : colonnes sortable, lignes sélectionnables au clavier, états de chargement et d’absence, en-tête collant. |
| [`DescriptionList`](#descriptionlist) | Données | Paires clé / valeur d’un détail : attributs d’un événement, propriétés d’un objet, identifiants à copier. |
| [`Popover`](#popover) | Structure | Panneau flottant ancré à son déclencheur : filtres, options d’une colonne, formulaire court. Clic extérieur et Échap ferment, le focus revient au déclencheur. |
| [`Combobox`](#combobox) | Saisie | Liste de choix avec recherche, simple ou multiple, comptes par option : facettes d’un explorateur, sélection d’un service. |
| [`FilterChip`](#filterchip) | Saisie | Jeton de filtre « clé : valeur », retirable, inclusif ou exclusif, dans une barre de requête. |
| [`FacetList`](#facetlist) | Saisie | Valeurs d’une dimension avec leur compte : cliquer ajoute ou retire le filtre, une valeur indisponible reste visible. |
| [`Disclosure`](#disclosure) | Structure | Section repliable avec titre, compteur et actions : groupe de facettes, détail d’un événement. |
| [`TimeHistogram`](#timehistogram) | Données | Barres empilées sur un axe temporel réel avec sélection de plage : volume de logs par sévérité, événements par minute. |
| [`JsonTree`](#jsontree) | Données | Valeur structurée dépliable : attributs d’un événement, corps d’une requête, avec copie et filtre par feuille. |
| [`TraceWaterfall`](#tracewaterfall) | Données | Cascade des spans d’une trace : noms indentés, barres placées dans le temps, couleur par service, erreurs marquées. |
| [`CodeBlock`](#codeblock) | Données | Bloc monospace multi-lignes : message brut, pile d’appels, requête, avec numéros de ligne et copie. |
| [`SeverityDot`](#severitydot) | Données | Point de sévérité (trace, debug, info, warn, error, fatal) avec libellé optionnel ; vocabulaire partagé severityTone / severityLabel. |
| [`Chip`](#chip) | Saisie | Jeton de choix : catégorie d’un éditeur, filtre d’une liste, option à activer. |
| [`SwatchPicker`](#swatchpicker) | Saisie | Une couleur parmi une palette : cheveux, maquillage, peinture. Flèches entre les pastilles. |
| [`SpritePicker`](#spritepicker) | Saisie | Une case parmi une planche d’images : couleurs d’yeux, motifs, emblèmes. Flèches entre les cases. |
| [`Steps`](#steps) | Navigation | Parcours en étapes : rail vertical ou barre horizontale ; étapes faites, courante, atteignables, verrouillées. |
| [`PickList`](#picklist) | Saisie | Une entrée parmi quelques-unes, posée sur le jeu : personnages, sauvegardes, véhicules d’un garage, serveurs. |
| [`Calendar`](#calendar) | Saisie | Grille d’un mois : choisir une date, naviguer par mois et par année, clavier complet. |
| [`DateField`](#datefield) | Saisie | Date saisie au clavier (chiffres seuls, séparateurs posés automatiquement) ou choisie dans un calendrier ancré au champ. |
| [`Icon`](#icon) | Structure | Pictogramme au trait (128 icônes), couleur héritée. |

## Actions

### Button

Déclenche une action ; le libellé dit exactement ce qui se passe.

**Utiliser** : primary pour l’action qui fait avancer la tâche en cours — en général une par zone de décision. Plusieurs actions de même importance : secondary ou ghost côte à côte, pas plusieurs primary collés. key affiche la touche ; danger pour détruire ; quiet pour Annuler. round avec iconOnly pour un bouton flottant ou un bouton de barre.

**Éviter** : « OK » ou « Valider » quand l’action a un nom. Un bouton désactivé sans dire pourquoi (ajouter un texte d’aide à côté).

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'quiet' \| 'danger'` | 'secondary' | Emphase. |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' | 32 / 40 / 48. |
| `href` | `string` | — | Rend un lien <a> (navigation) avec le même rendu. |
| `key` | `string` | — | Touche affichée. |
| `icon` | `IconName` | — | Icône à gauche. |
| `iconOnly` | `boolean` | false | Bouton carré ; label devient le nom accessible. |
| `label` | `string` | — | Texte si pas d’enfants. |
| `loading` | `boolean` | false | Garde la taille, masque le texte, bloque le clic. |
| `block` | `boolean` | false | Pleine largeur (touche alignée à droite). |
| `round` | `boolean` | false | Bouton rond (avec iconOnly). |
| `disabled` | `boolean` | false |  |
| `onclick` | `(e) => void` | — |  |

```svelte
<Button variant="primary" key="E" onclick={equip}>Équiper</Button>
<Button variant="ghost" icon="transfer">Vers le coffre</Button>
<Button variant="danger" icon="trash" onclick={() => (confirmDrop = true)}>Jeter</Button>
```

### ButtonGroup

Aligne des actions liées avec l’écart standard.

**Utiliser** : Pied de modale, de formulaire, de panneau.

**Éviter** : Plus de trois actions : passer par un Menu.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `align` | `'start' \| 'end' \| 'between' \| 'stretch'` | 'end' |  |
| `label` | `string` | — | Nom accessible du groupe. |

```svelte
<ButtonGroup>
  <Button variant="quiet">Annuler</Button>
  <Button variant="primary">Envoyer 1 250,00 $</Button>
</ButtonGroup>
```

### Key

Une touche clavier ou un bouton de manette.

**Utiliser** : À côté d’un libellé d’action, dans les menus, les invites.

**Éviter** : Une touche sans action associée.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `label` | `string` | — | Texte de la touche. |
| `arrow` | `'up' \| 'down' \| 'left' \| 'right'` | — | Flèche dessinée. |
| `pad` | `boolean` | false | Bouton de manette (rond). |
| `size` | `'md' \| 'lg'` | 'md' | lg pour les invites du monde. |
| `pressed` | `boolean` | false |  |
| `onInverse` | `boolean` | false | Sur un aplat blanc. |

```svelte
<Key label="E" /> <Key arrow="up" /> <Key label="A" pad />
```

### Hint

Touche(s) + libellé ; bascule automatiquement sur les glyphes manette.

**Utiliser** : Pieds d’écran, barres de raccourcis.

**Éviter** : Afficher clavier et manette en même temps.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `keys` | `string[]` | — | Touches clavier (↑ ↓ ← → dessinées). |
| `gamepad` | `string[]` | — | Équivalents manette. |
| `label` | `string` | — |  |

```svelte
<Hint keys={['Q', 'D']} gamepad={['LB', 'RB']} label="Changer de côté" />
```

## Saisie

### TextField

Champ de saisie avec libellé, aide et erreur.

**Utiliser** : L’erreur dit comment corriger (« Solde insuffisant : 18 920,40 $ disponibles »). variant="amount" pour le montant principal d’un écran.

**Éviter** : Placeholder à la place du libellé.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `label` | `string` | — |  |
| `value` | `string \| number` | '' | bind:value |
| `help` | `string` | — |  |
| `error` | `string` | — | Active l’état erreur. |
| `aside` | `string` | — | Indication à droite du libellé. |
| `icon` | `IconName` | — |  |
| `suffix` | `string` | — | Unité. |
| `end` | `Snippet` | — | Contenu de fin (touche…). |
| `size` | `'md' \| 'sm'` | 'md' |  |
| `variant` | `'default' \| 'amount'` | 'default' |  |
| `disabled` | `boolean` | false |  |
| `placeholder` | `string` | — |  |

```svelte
<TextField label="Montant" variant="amount" suffix="$" bind:value={amount}
  help="Solde après virement : 17 670,40 $" error={amount > balance ? 'Solde insuffisant' : undefined} />
```

### Checkbox

Choix multiple ou acceptation.

**Utiliser** : Libellé toujours cliquable ; indeterminate pour un groupe partiel.

**Éviter** : Pour un réglage à effet immédiat : Switch.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `checked` | `boolean` | false | bind:checked |
| `indeterminate` | `boolean` | false |  |
| `disabled` | `boolean` | false |  |
| `label` | `string` | — |  |
| `onchange` | `(v: boolean) => void` | — |  |

```svelte
<Checkbox bind:checked={share} label="Partager ma position" />
```

### RadioGroup

Un choix parmi peu, tous visibles.

**Utiliser** : Deux à cinq options ; au-delà, Select.

**Éviter** : Une seule option.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '' | bind:value |
| `options` | `{ value, label, disabled? }[]` | — |  |
| `name` | `string` | auto |  |
| `label` | `string` | — |  |
| `orientation` | `'horizontal' \| 'vertical'` | 'horizontal' |  |

```svelte
<RadioGroup bind:value={pay} label="Paiement" options={[{ value: 'card', label: 'Carte' }, { value: 'cash', label: 'Espèces' }]} />
```

### Switch

Réglage à effet immédiat, sans validation.

**Utiliser** : Libellé + description optionnelle.

**Éviter** : Dans un formulaire qui se valide avec un bouton : Checkbox.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `checked` | `boolean` | false | bind:checked |
| `label` | `string` | — |  |
| `description` | `string` | — |  |
| `disabled` | `boolean` | false |  |
| `onchange` | `(v: boolean) => void` | — |  |

```svelte
<Switch bind:checked={dnd} label="Ne pas déranger" description="Coupe les notifications du téléphone" />
```

### Select

Liste déroulante : valeur + détail, clavier complet.

**Utiliser** : Plus de cinq options, ou options avec détail (solde, numéro).

**Éviter** : Deux options : Segmented.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '' | bind:value |
| `options` | `{ value, label, detail?, meta?, disabled? }[]` | — |  |
| `label` | `string` | — |  |
| `placeholder` | `string` | 'Choisir…' |  |
| `group` | `string` | — | Titre de groupe dans la liste. |
| `disabled` | `boolean` | false |  |
| `onchange` | `(v: string) => void` | — |  |

```svelte
<Select label="Depuis" bind:value={from} options={accounts.map((a) => ({ value: a.id, label: a.name, detail: a.balanceLabel }))} />
```

### Stepper

Quantité entière : diviser une pile, acheter, transférer.

**Utiliser** : Toujours afficher le maximum. Flèches gauche/droite (clavier et manette), Début/Fin pour les bornes.

**Éviter** : Valeurs continues : Slider.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `number` | 1 | bind:value |
| `min` | `number` | 1 |  |
| `max` | `number` | — |  |
| `step` | `number` | 1 |  |
| `label` | `string` | 'Quantité' |  |
| `showMax` | `boolean` | true |  |
| `onchange` | `(v: number) => void` | — |  |

```svelte
<Stepper bind:value={qty} max={stack.count} label="Quantité à diviser" />
```

### Slider

Valeur continue (volume, fréquence).

**Utiliser** : La valeur s’affiche au-dessus.

**Éviter** : Valeurs précises à saisir : TextField.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `number` | 50 | bind:value |
| `min` | `number` | 0 |  |
| `max` | `number` | 100 |  |
| `step` | `number` | 1 |  |
| `label` | `string` | — |  |
| `format` | `(v) => string` | — |  |
| `minLabel` | `string` | — | Pôle gauche (« Étroit »). |
| `maxLabel` | `string` | — | Pôle droit (« Large ») ; le pôle du côté de la valeur s’allume quand centered. |
| `centered` | `boolean` | false | Remplissage depuis le milieu : traits d’un visage de -1 à 1, mélange entre deux parents. |
| `disabled` | `boolean` | false |  |
| `onchange` | `(v: number) => void` | — |  |

```svelte
<Slider label="Volume radio" bind:value={volume} format={(v) => `${v} %`} />
<Slider label="Largeur du nez" bind:value={nose} min={-1} max={1} step={0.05} centered minLabel="Étroit" maxLabel="Large" />
```

### Segmented

Une valeur parmi deux à quatre, visible d’un coup d’œil.

**Utiliser** : Période d’un graphique, mode d’affichage.

**Éviter** : Naviguer entre sections : Tabs.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '' | bind:value |
| `options` | `{ value, label, disabled? }[]` | — |  |
| `label` | `string` | — |  |
| `size` | `'sm' \| 'md'` | 'md' |  |
| `onchange` | `(v: string) => void` | — |  |

```svelte
<Segmented bind:value={period} options={[{ value: '7', label: '7 jours' }, { value: '30', label: '30 jours' }, { value: 'y', label: 'Année' }]} />
```

### PeriodPicker

Période d’analyse d’un graphique, bouton de rafraîchissement et fraîcheur des données.

**Utiliser** : Préréglages 15 min à 7 jours par défaut ; options pour une autre liste. updatedAt affiche « il y a 12 s » et se met à jour seul ; onrefresh ajoute le bouton.

**Éviter** : Des dates absolues saisies à la main : une autre saisie.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '1h' | bind:value |
| `options` | `{ value, label, disabled? }[]` | 15m, 1h, 6h, 24h, 7d |  |
| `updatedAt` | `number \| string \| Date \| null` | null | Dernière mise à jour. |
| `refreshing` | `boolean` | false | Bouton en chargement. |
| `label` | `string` | 'Période' |  |
| `refreshLabel` | `string` | 'Rafraîchir' |  |
| `size` | `'sm' \| 'md'` | 'sm' |  |
| `ago` | `(seconds: number) => string` | français | Texte de fraîcheur. |
| `onchange` | `(v: string) => void` | — |  |
| `onrefresh` | `() => void` | — |  |

```svelte
<PeriodPicker bind:value={period} updatedAt={updatedAt} onrefresh={reload} />
```

### Combobox

Liste de choix avec recherche, simple ou multiple, comptes par option : facettes d’un explorateur, sélection d’un service.

**Utiliser** : multiple montre des cases à cocher et garde la liste ouverte ; count aligne un nombre en mono à droite. inline rend seulement la recherche et la liste, pour un panneau de facettes. onsearch pour charger les options côté serveur (le filtrage local est alors désactivé) avec loading. Flèches, Entrée, Début/Fin dans le champ de recherche ; Échap ferme.

**Éviter** : Moins de six options sans compte : Select. Une recherche libre sans options : TextField.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `options` | `{ value, label, detail?, count?, disabled? }[]` | — |  |
| `value` | `string \| string[]` | — | bind:value ; tableau en multiple. |
| `multiple` | `boolean` | false |  |
| `search` | `string` | '' | bind:search |
| `onsearch` | `(q: string) => void` | — | Chargement asynchrone des options. |
| `loading` | `boolean` | false |  |
| `placeholder` | `string` | 'Choisir…' |  |
| `label` | `string` | — |  |
| `empty` | `string` | 'Aucun résultat' |  |
| `inline` | `boolean` | false | Sans déclencheur. |
| `max` | `number` | 200 | Options rendues au maximum, « +n » au-delà. |
| `disabled` | `boolean` | false |  |
| `searchLabel` | `string` | 'Rechercher' |  |
| `onchange` | `(value) => void` | — |  |

```svelte
<Combobox label="Services" multiple bind:value={services} options={facets.map((f) => ({ value: f.name, label: f.name, count: f.count }))} />
```

### FilterChip

Jeton de filtre « clé : valeur », retirable, inclusif ou exclusif, dans une barre de requête.

**Utiliser** : exclude pour un filtre « différent de » (ton danger). ontoggle rend le jeton cliquable pour basculer inclure / exclure. Retour arrière ou Suppr sur le jeton le retire.

**Éviter** : Un filtre non retirable sans ontoggle : un Badge suffit.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `label` | `string` | — | Clé. |
| `value` | `string` | — |  |
| `exclude` | `boolean` | false |  |
| `icon` | `IconName` | — |  |
| `removable` | `boolean` | true |  |
| `title` | `string` | — | Infobulle native. |
| `removeLabel` | `string` | 'Retirer' |  |
| `onremove` | `() => void` | — |  |
| `ontoggle` | `(exclude: boolean) => void` | — | Bascule inclure / exclure. |

```svelte
{#each filters as f (f.key + f.value)}<FilterChip label={f.key} value={f.value} exclude={f.exclude} onremove={() => remove(f)} ontoggle={(ex) => (f.exclude = ex)} />{/each}
```

### FacetList

Valeurs d’une dimension avec leur compte : cliquer ajoute ou retire le filtre, une valeur indisponible reste visible.

**Utiliser** : Une liste par dimension (niveau, catégorie, ressource…) dans une Disclosure ; active marque les valeurs filtrées, unavailable désactive celles qui ne donneraient rien avec les autres filtres sans les cacher ; une valeur active reste toujours cliquable pour être retirée. count affiché en mono à droite ; mono pour des noms techniques (événements, ressources). Flèches ↑ ↓, Début et Fin entre les valeurs ; more + onmore pour charger le reste.

**Éviter** : Choisir une valeur dans une liste longue avec recherche : Combobox. Afficher un filtre actif dans la barre de requête : FilterChip.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `items` | `FacetItem[]` | — | { value, label?, count?, active?, unavailable?, title? } |
| `label` | `string` | — | Nom accessible. |
| `dense` | `boolean` | false |  |
| `mono` | `boolean` | false | Libellés en mono. |
| `format` | `(count: number) => string` | String | Format du compte. |
| `empty` | `string` | 'Aucune valeur' |  |
| `more` | `string` | — | Libellé du bouton « voir plus ». |
| `onpick` | `(item) => void` | — |  |
| `onmore` | `() => void` | — |  |

```svelte
<Disclosure title="Ressource" count={3} open>
  <FacetList mono items={resources.map((r) => ({ value: r.name, count: r.count, active: filters.includes(r.name), unavailable: r.count === 0 }))} onpick={(item) => toggle('resource', item.value)} />
</Disclosure>
```

### Chip

Jeton de choix : catégorie d’un éditeur, filtre d’une liste, option à activer.

**Utiliser** : Une rangée de catégories (cheveux, yeux, nez…) ou de filtres ; selected est piloté par l’appelant (aria-pressed). icon à gauche, count en mono à droite ; size="sm" dans une barre dense.

**Éviter** : Un filtre retirable de barre de requête : FilterChip. Deux à quatre valeurs exclusives : Segmented.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `label` | `string` | — |  |
| `icon` | `IconName` | — |  |
| `selected` | `boolean` | false |  |
| `disabled` | `boolean` | false |  |
| `count` | `number` | — |  |
| `size` | `'sm' \| 'md'` | 'md' |  |
| `children` | `Snippet` | — | Contenu à la place de label. |
| `onclick` | `(e) => void` | — |  |

```svelte
{#each categories as c (c.id)}<Chip label={c.label} icon={c.icon} selected={c.id === active} onclick={() => (active = c.id)} />{/each}
```

### SwatchPicker

Une couleur parmi une palette : cheveux, maquillage, peinture. Flèches entre les pastilles.

**Utiliser** : colors en valeurs CSS (données du jeu, pas des tokens) ; value est l’index choisi. format pour le compteur à droite du libellé (« 12 / 64 » par défaut).

**Éviter** : Choisir une couleur libre : ce n’est pas un sélecteur de couleur.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `colors` | `string[]` | — |  |
| `value` | `number` | 0 | bind:value (index). |
| `label` | `string` | — |  |
| `size` | `'sm' \| 'md'` | 'md' | 22 / 28 px |
| `disabled` | `boolean` | false |  |
| `format` | `(index) => string` | « n / total » | Compteur et nom accessible de chaque pastille. |
| `onchange` | `(index: number) => void` | — |  |

```svelte
<SwatchPicker label="Couleur des cheveux" colors={HAIR_COLORS} bind:value={hairColor} />
```

### SpritePicker

Une case parmi une planche d’images : couleurs d’yeux, motifs, emblèmes. Flèches entre les cases.

**Utiliser** : image est une planche de count cases rangées sur columns colonnes ; chaque case est découpée par position. size en px à 1080p (suit l’échelle) ; shape="square" pour des motifs.

**Éviter** : Des images séparées : composer une grille de Chip ou de boutons.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `image` | `string` | — | URL de la planche. |
| `count` | `number` | — |  |
| `columns` | `number` | — |  |
| `value` | `number` | 0 | bind:value (index). |
| `label` | `string` | — |  |
| `size` | `number` | 44 | px |
| `shape` | `'round' \| 'square'` | 'round' |  |
| `disabled` | `boolean` | false |  |
| `format` | `(index) => string` | « n / total » |  |
| `onchange` | `(index: number) => void` | — |  |

```svelte
<SpritePicker label="Couleur des yeux" image={eyeSheet} count={32} columns={8} bind:value={eyeColor} />
```

### PickList

Une entrée parmi quelques-unes, posée sur le jeu : personnages, sauvegardes, véhicules d’un garage, serveurs.

**Utiliser** : Chaque entrée est une plaque opaque (bg-base) lisible sur un voile ; l’entrée choisie passe en bg-control avec l’anneau de sélection et un repère blanc à gauche. empty pour un emplacement libre (creux, pastille cerclée) ; meta en mono à droite (numéro, date) ; detail sur la deuxième ligne. Flèches ↑ ↓, Début et Fin déplacent la sélection ; Entrée ou double clic déclenche onactivate.

**Éviter** : Naviguer entre des sections d’une fenêtre : NavList. Une liste longue d’opérations : DataRow ou DataTable. Un choix de 2 à 4 valeurs : Segmented.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `items` | `PickItem[]` | — | { value, label, detail?, icon?, meta?, empty?, disabled? } |
| `value` | `string` | '' | bind:value |
| `label` | `string` | 'Choix' | Nom accessible. |
| `onchange` | `(value: string) => void` | — |  |
| `onactivate` | `(value: string) => void` | — | Entrée ou double clic sur l’entrée choisie. |

```svelte
<PickList bind:value={slot} label="Personnages" onactivate={play} items={slots.map((s) => s.character ? { value: String(s.slot), label: s.character.name, detail: s.character.job, icon: 'user', meta: s.slot.toString().padStart(2, '0') } : { value: String(s.slot), label: 'Emplacement libre', detail: 'Créer un personnage', icon: 'plus', empty: true, meta: s.slot.toString().padStart(2, '0') })} />
```

### Calendar

Grille d’un mois : choisir une date, naviguer par mois et par année, clavier complet.

**Utiliser** : value en ISO (AAAA-MM-JJ) ; minYear et maxYear bornent la navigation (date de naissance : âge minimal et maximal). locale pour les noms de mois et de jours ; weekStart 1 (lundi) ou 0 (dimanche). Flèches entre les jours, Page haut/bas entre les mois, Début/Fin dans la semaine, Entrée choisit.

**Éviter** : Saisir une date au clavier : DateField embarque ce calendrier.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '' | bind:value (ISO). |
| `minYear` | `number` | 1900 |  |
| `maxYear` | `number` | année courante |  |
| `locale` | `string` | 'fr' |  |
| `weekStart` | `0 \| 1` | 1 |  |
| `label` | `string` | 'Calendrier' | Nom accessible. |
| `labels` | `{ prevYear?, prevMonth?, nextMonth?, nextYear? }` | français | Noms accessibles des boutons. |
| `onpick` | `(value: string) => void` | — |  |

```svelte
<Calendar bind:value={birth} minYear={1916} maxYear={2008} locale="fr" />
```

### DateField

Date saisie au clavier (chiffres seuls, séparateurs posés automatiquement) ou choisie dans un calendrier ancré au champ.

**Utiliser** : value en ISO (AAAA-MM-JJ), vide tant que la date tapée n’est pas complète et valide ; l’appelant ajoute ses règles (âge) via error. order suit la langue (jour-mois-année en français) ; placeholder par défaut « JJ/MM/AAAA ». Le bouton calendrier ouvre un Popover avec Calendar ; Échap et clic extérieur ferment.

**Éviter** : Une date sans contrainte de saisie : TextField suffit rarement, préférer ce champ.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `label` | `string` | — |  |
| `value` | `string` | '' | bind:value (ISO). |
| `order` | `'dmy' \| 'mdy' \| 'ymd'` | 'dmy' |  |
| `placeholder` | `string` | selon order |  |
| `help` | `string` | — |  |
| `error` | `string` | — | Active l’état erreur. |
| `aside` | `string` | — | Indication à droite du libellé. |
| `minYear` | `number` | 1900 |  |
| `maxYear` | `number` | année courante |  |
| `locale` | `string` | 'fr' |  |
| `disabled` | `boolean` | false |  |
| `calendarLabel` | `string` | 'Ouvrir le calendrier' |  |
| `onchange` | `(value: string) => void` | — |  |

```svelte
<DateField label="Date de naissance" bind:value={birth} minYear={1916} maxYear={2008} error={age !== null && age < 18 ? '18 ans minimum' : undefined} />
```

## Navigation

### Tabs

Onglets soulignés (sections) ou pastilles (filtres d’écran), Q/E en option.

**Utiliser** : Compteur quand il aide (« Armes 2 ») : rendu en pastille. tone sur un onglet ajoute un point coloré (filtres par niveau : succès, avertissement, danger). shortcuts active Q/E (LB/RB via le pont manette).

**Éviter** : Plus de sept onglets.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '' | bind:value |
| `tabs` | `{ value, label, count?, tone?, disabled? }[]` | — | tone : neutral | live | success | warning | danger. |
| `variant` | `'underline' \| 'pill'` | 'underline' |  |
| `label` | `string` | — |  |
| `shortcuts` | `boolean` | false | Q/E pour changer d’onglet. |
| `onchange` | `(v: string) => void` | — |  |

```svelte
<Tabs variant="pill" shortcuts bind:value={filter} tabs={[{ value: 'all', label: 'Tout', count: 13 }, { value: 'weapons', label: 'Armes', count: 2 }]} />
```

### NavList

Navigation latérale d’une fenêtre (comptes, catégories).

**Utiliser** : Deuxième ligne pour la valeur utile (solde). group pour titrer des sections. href pour une navigation entre pages (SvelteKit) ; value reste la page courante.

**Éviter** : Plus de deux niveaux.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '' | bind:value |
| `items` | `{ value, label, detail?, icon?, count?, group?, disabled?, href? }[]` | — | href rend un lien <a> (navigation entre pages) ; sinon un bouton. |
| `label` | `string` | 'Navigation' |  |
| `compact` | `boolean` | false | Icônes seules, libellé en infobulle native : barre latérale repliée. |
| `onchange` | `(v: string) => void` | — |  |

```svelte
<NavList bind:value={account} items={[{ value: 'main', label: 'Compte courant', detail: '18 920,40 $', icon: 'card', group: 'Comptes' }]} />
<NavList value={page} compact={collapsed} items={[{ value: 'overview', label: 'Overview', icon: 'home', href: '/dashboard' }]} />
```

### Menu

Menu contextuel ou liste d’actions : flèches, Entrée, Échap, raccourcis.

**Utiliser** : Action destructive en dernier, séparée, danger. Élément indisponible : meta dit pourquoi.

**Éviter** : Menus imbriqués.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `items` | `MenuItem[]` | — | { id, label, icon?, key?, meta?, disabled?, danger?, separatorBefore?, group? } |
| `label` | `string` | — |  |
| `onselect` | `(id: string) => void` | — |  |
| `onclose` | `() => void` | — |  |
| `autofocus` | `boolean` | true |  |
| `x` | `number` | — | Position absolue (menu contextuel). |
| `y` | `number` | — |  |

```svelte
<Menu label="Actions" onselect={run} onclose={() => (menu = null)} items={[
  { id: 'use', label: 'Utiliser', icon: 'hand', key: 'E' },
  { id: 'drop', label: 'Jeter', icon: 'trash', key: 'X', danger: true, separatorBefore: true },
]} />
```

### Steps

Parcours en étapes : rail vertical ou barre horizontale ; étapes faites, courante, atteignables, verrouillées.

**Utiliser** : current est l’étape affichée ; reached la plus avancée déjà atteinte : les suivantes restent verrouillées jusqu’à ce que l’appelant avance. compact pour un rail d’icônes (libellé en infobulle native, point glacier sous les étapes faites). Flèches entre les étapes atteignables, Début et Fin.

**Éviter** : Naviguer librement entre sections : Tabs ou NavList.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `steps` | `StepItem[]` | — | { id, label, icon?, disabled? } |
| `current` | `string` | '' | bind:current |
| `reached` | `string` | current | Étape la plus avancée atteinte. |
| `orientation` | `'vertical' \| 'horizontal'` | 'vertical' |  |
| `compact` | `boolean` | false | Icônes seules. |
| `label` | `string` | 'Étapes' | Nom accessible. |
| `onselect` | `(id: string) => void` | — |  |

```svelte
<Steps bind:current={step} reached={furthest} compact steps={[{ id: 'model', label: 'Modèle', icon: 'user' }, { id: 'heritage', label: 'Héritage', icon: 'dna' }, { id: 'face', label: 'Visage', icon: 'face' }]} />
```

## Retours

### Modal

Confirmation d’une action irréversible ou coûteuse.

**Utiliser** : Titre en question, conséquence en une phrase, action principale nommée. data-autofocus sur l’action la moins destructrice.

**Éviter** : Afficher une simple information : Toast.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `open` | `boolean` | false | bind:open |
| `title` | `string` | — |  |
| `children` | `Snippet` | — | Corps. |
| `actions` | `Snippet` | — | Pied. |
| `dismissible` | `boolean` | true | Échap et croix. |
| `onclose` | `() => void` | — |  |
| `scrim` | `boolean` | true |  |

```svelte
<Modal bind:open={confirmDrop} title="Jeter le pistolet de combat ?">
  L’objet sera posé au sol. N’importe qui pourra le ramasser pendant 10 minutes.
  {#snippet actions()}
    <Button variant="quiet" data-autofocus onclick={() => (confirmDrop = false)}>Annuler</Button>
    <Button variant="primary" onclick={drop}>Jeter au sol</Button>
  {/snippet}
</Modal>
```

### Tooltip

Aide d’une phrase, blanche, au survol ou au focus.

**Utiliser** : Préciser une icône ou un raccourci.

**Éviter** : Information indispensable (la manette n’a pas de survol).

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `text` | `string` | — |  |
| `key` | `string` | — |  |
| `placement` | `'top' \| 'bottom'` | 'top' |  |
| `align` | `'center' \| 'start' \| 'end'` | 'center' | Alignement horizontal sur le déclencheur. Dans tous les cas la bulle reste dans la fenêtre : décalée latéralement, retournée en bas si elle dépasse en haut. |
| `delay` | `number` | 300 | ms |
| `children` | `Snippet` | — | Déclencheur. |

```svelte
<Tooltip text="Diviser la pile" key="⇧"><Button iconOnly icon="split" label="Diviser" /></Tooltip>
```

### Notice

Message en ligne qui reste dans le flux : erreur de formulaire, retour d’une action, information.

**Utiliser** : Au-dessus du formulaire ou sous le champ concerné ; le texte dit comment débloquer. danger annonce (role=alert) ; les autres tons sont des status.

**Éviter** : Une information passagère : Toast. Une confirmation bloquante : Modal.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `tone` | `'neutral' \| 'info' \| 'success' \| 'warning' \| 'danger'` | 'neutral' |  |
| `title` | `string` | — |  |
| `icon` | `IconName` | selon le ton |  |
| `text` | `string` | — | Texte si pas d’enfants. |
| `children` | `Snippet` | — |  |

```svelte
<Notice tone="danger" title="Connexion refusée">Email ou mot de passe incorrect. Vérifie les deux, puis réessaie.</Notice>
```

### Toast

Une notification (présentation). Pour la file : toast.push() + <Toaster />.

**Utiliser** : Une phrase ; valeur à droite ; tone selon le sens.

**Éviter** : Plus de trois visibles ; une erreur bloquante (Modal).

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `title` | `string` | — |  |
| `body` | `string` | — |  |
| `value` | `string` | — |  |
| `time` | `string` | — |  |
| `icon` | `IconName` | 'info' |  |
| `tone` | `'neutral' \| 'success' \| 'danger' \| 'warning' \| 'live'` | 'neutral' |  |
| `compact` | `boolean` | false |  |
| `progress` | `number` | — | 0–1, minuteur |
| `dim` | `boolean` | false |  |

```svelte
toast.push({ title: 'Maze Bank', body: 'Virement reçu de Lina Moreau', value: '+1 250 $', icon: 'bank', tone: 'success' });
```

### Toaster

Pile de notifications en haut à droite, dans la zone sûre GTA.

**Utiliser** : Un seul Toaster par interface (HUD ou ressource dédiée aux notifications).

**Éviter** : Plusieurs Toaster qui se chevauchent.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `max` | `number` | 3 | Nombre visible. |

```svelte
<Toaster />
```

### Meter

Jauge continue : charge, progression. Avertissement automatique au seuil.

**Utiliser** : tone="foreign" pour un contenant tiers ; warnAt={0.85} pour la charge.

**Éviter** : Valeur sans libellé ni nom accessible.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `number` | — |  |
| `max` | `number` | 100 |  |
| `tone` | `'neutral' \| 'foreign' \| 'live' \| 'warning' \| 'danger'` | 'neutral' |  |
| `size` | `'sm' \| 'lg'` | 'sm' | 3 / 6 px |
| `label` | `string` | — |  |
| `valueLabel` | `string` | — |  |
| `unit` | `string` | — |  |
| `warnAt` | `number` | — | 0–1 |
| `ariaLabel` | `string` | — |  |

```svelte
<Meter label="Sur soi" value={7.4} max={30} valueLabel="7,4" unit="kg" warnAt={0.85} />
```

### Segments

Valeur discrète (état, régime) ; zone critique en option.

**Utiliser** : État d’un objet, compte-tours.

**Éviter** : Valeurs précises : afficher aussi le chiffre.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `number` | — | 0–1 |
| `count` | `number` | 20 |  |
| `hotFrom` | `number` | — | Index de début de zone critique. |
| `label` | `string` | — |  |

```svelte
<Segments value={0.86} label="État" />
```

### Spinner

Attente indéterminée.

**Utiliser** : Chargement de plus de 300 ms.

**Éviter** : Dans un bouton : utiliser loading.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `label` | `string` | 'Chargement' |  |

```svelte
<Spinner />
```

### Skeleton

Silhouette d’un contenu en cours de chargement.

**Utiliser** : Même taille que le contenu attendu, pour éviter le saut de mise en page. lines pour un paragraphe ; radius="full" pour un avatar.

**Éviter** : Plus d’une seconde sans message : passer par un texte d’attente ou Spinner.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `width` | `string` | '100%' |  |
| `height` | `string` | '1rem' |  |
| `radius` | `'sm' \| 'md' \| 'full'` | 'sm' |  |
| `lines` | `number` | 1 | Lignes empilées, la dernière plus courte. |
| `label` | `string` | 'Chargement' | Nom accessible. |

```svelte
<Skeleton lines={3} />
<Skeleton width="2.25rem" height="2.25rem" radius="full" />
```

## Données

### DataRow

Ligne de liste : opérations, journaux, contacts.

**Utiliser** : Entrées en succès avec leur signe ; sorties neutres.

**Éviter** : Sorties d’argent en rouge (ce n’est pas une erreur).

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `title` | `string` | — |  |
| `detail` | `string` | — |  |
| `icon` | `IconName` | — |  |
| `value` | `string` | — |  |
| `tone` | `'in' \| 'neutral'` | 'neutral' |  |
| `meta` | `string` | — |  |
| `selected` | `boolean` | false |  |
| `onclick` | `() => void` | — | Rend la ligne interactive. |

```svelte
<DataRow icon="transfer" title="Lina Moreau" detail="Virement reçu, 21:42" value="+1 250,00 $" tone="in" meta="18 920,40 $" />
```

### Table

Tableau dense : effectifs, classements, journaux.

**Utiliser** : Chiffres alignés à droite (align: right). Snippet cell pour un rendu personnalisé (badge…).

**Éviter** : Plus de six colonnes en jeu.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `columns` | `{ key, label, align?, width? }[]` | — |  |
| `rows` | `Row[]` | — |  |
| `selected` | `number` | -1 | bind:selected |
| `caption` | `string` | — |  |
| `cell` | `Snippet<[Row, Column]>` | — |  |
| `onselect` | `(i) => void` | — |  |

```svelte
<Table columns={[{ key: 'name', label: 'Employé' }, { key: 'hours', label: 'Heures', align: 'right' }]} rows={staff} />
```

### Badge

Un mot d’état ; la couleur suit le sens.

**Utiliser** : live (glacier) pour ce qui est en cours.

**Éviter** : Phrases entières.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `tone` | `'neutral' \| 'live' \| 'info' \| 'success' \| 'warning' \| 'danger' \| 'solid'` | 'neutral' | info pour une sévérité informative. |
| `icon` | `IconName` | — |  |
| `label` | `string` | — |  |

```svelte
<Badge tone="live" icon="signal" label="En service" />
```

### Plate

Plaque d’immatriculation, couleur « contenant tiers ».

**Utiliser** : En-tête d’un coffre, d’un véhicule.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `text` | `string` | — |  |

```svelte
<Plate text="82KJL217" />
```

### Code

Identifiant à recopier, en Geist Mono.

**Utiliser** : Numéro de série, IBAN, fréquence.

**Éviter** : Texte courant.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `text` | `string` | — |  |

```svelte
<Code text="SK-7741-0093" />
```

### Count

Compteur blanc (non lus, en attente). Masqué à 0.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `number` | — |  |
| `max` | `number` | 99 |  |
| `label` | `string` | — |  |

```svelte
<Count value={2} label="2 factures" />
```

### Avatar

Initiales d’une personne ou d’une entreprise.

**Utiliser** : tone="foreign" pour un tiers.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `name` | `string` | — |  |
| `size` | `'sm' \| 'md'` | 'md' |  |
| `tone` | `'neutral' \| 'foreign'` | 'neutral' |  |

```svelte
<Avatar name="Lina Moreau" />
```

### EmptyState

Un état vide propose l’action suivante.

**Éviter** : « Aucune donnée » sans suite.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `title` | `string` | — |  |
| `children` | `Snippet` | — |  |
| `action` | `Snippet` | — |  |

```svelte
<EmptyState title="Le coffre est vide">Glisse un objet ici, ou appuie sur Espace sur un objet de ton inventaire.</EmptyState>
```

### Stat

La valeur clé d’un écran avec sa partie secondaire en retrait.

**Utiliser** : xl : la vitesse ; lg : un solde ; md : une statistique.

**Éviter** : Plusieurs xl sur un écran.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | — |  |
| `minor` | `string` | — | Décimales, unité. |
| `label` | `string` | — |  |
| `size` | `'xl' \| 'lg' \| 'md'` | 'lg' |  |
| `hud` | `boolean` | false | Ombre de texte pour le HUD. |

```svelte
<Stat value="18 920" minor=",40 $" label="Compte courant" />
```

### Sparkline

Mini courbe inline : la tendance d’un indicateur, sans axes.

**Utiliser** : À côté d’un Stat ou dans une cellule de Table. tone selon le sens : live pour ce qui est en cours, danger pour une dégradation.

**Éviter** : Lire une valeur précise dessus : afficher aussi le chiffre.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `values` | `number[]` | — |  |
| `tone` | `'neutral' \| 'live' \| 'success' \| 'warning' \| 'danger'` | 'neutral' |  |
| `width` | `number \| 'auto'` | 96 | px, ou auto pour suivre la largeur du conteneur. |
| `height` | `number` | 24 | px |
| `area` | `boolean` | false | Aire sous la courbe. |
| `min` | `number` | — | Borne basse (sinon le minimum des valeurs). |
| `max` | `number` | — | Borne haute. |
| `label` | `string` | — | Nom accessible ; sans label, décoratif. |

```svelte
<Sparkline values={[12, 14, 11, 18, 22, 21, 27]} tone="live" area label="Joueurs connectés, 24 h" />
```

### TimeChart

Courbe ou aire dans le temps : axe temporel réel, survol avec valeurs, seuils, bandes, états de données, séries masquables.

**Utiliser** : points ({ t: ms, v }) pour un vrai axe temporel avec trous (v: null) ; values pour une suite régulière avec labels. Survol ou flèches ← → : curseur et infobulle avec toutes les séries ; cliquer une entrée de légende masque la série. thresholds pour une limite (seuil d’alerte), bands pour une plage (interruption) ; state loading / empty / unavailable avec message. format et unit pour la précision ; min/max pour fixer l’échelle (0–100 pour un pourcentage).

**Éviter** : Plus de six séries ou des échelles différentes sur un même graphique. Un ton sémantique (success, danger) pour distinguer des séries sans signification : utiliser la palette chart-1 à chart-6.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `series` | `{ id, label, values?: number[], points?: { t, v }[], tone?, unit?, format? }[]` | — | points en millisecondes epoch ; v null pour un trou. |
| `labels` | `string[]` | [] | Repères quand les séries sont en values. |
| `from` | `number` | min des points | Début de l’axe (ms). |
| `to` | `number` | max des points | Fin de l’axe (ms). |
| `min` | `number` | — |  |
| `max` | `number` | — |  |
| `unit` | `string` | '' | Suffixe des valeurs (%, ms). |
| `format` | `(v: number) => string` | arrondi |  |
| `formatTime` | `(t: number) => string` | HH:MM ou JJ/MM HH:MM | Repères et infobulle. |
| `height` | `number` | 160 | px |
| `area` | `boolean` | true |  |
| `rows` | `number` | 4 | Lignes de grille. |
| `legend` | `boolean` | true | Légende cliquable avec la dernière valeur. |
| `label` | `string` | — | Nom accessible. |
| `thresholds` | `{ value, label?, tone? }[]` | [] | Lignes horizontales pointillées. |
| `bands` | `{ from, to, tone?, label? }[]` | [] | Plages de temps ombrées. |
| `state` | `'ready' \| 'loading' \| 'empty' \| 'unavailable'` | 'ready' |  |
| `message` | `string` | '' | Texte des états empty et unavailable. |
| `interactive` | `boolean` | true | Survol et clavier. |
| `onhover` | `(t: number \| null) => void` | — | Instant survolé, pour synchroniser d’autres graphiques. |

```svelte
<TimeChart label="CPU du processus, 1 h" unit="%" min={0} max={100} thresholds={[{ value: 80, label: 'Seuil', tone: 'danger' }]}
  series={[{ id: 'cpu', label: 'CPU', points: cpu }, { id: 'host', label: 'Hôte', points: host, tone: 'chart-2' }]} />
```

### BarChart

Barres par intervalle, groupées ou empilées : répartition d’un histogramme, volumes par période.

**Utiliser** : Distribution par tranche (temps de tick par seuil, événements par heure). stacked pour empiler les séries d’un même total ; sinon les barres sont groupées. labels sous chaque intervalle ; max pour fixer l’échelle.

**Éviter** : Une évolution continue : préférer TimeChart. Plus de cinq séries.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `series` | `{ id, label, values: number[], tone? }[]` | — |  |
| `labels` | `string[]` | [] | Un libellé par intervalle. |
| `stacked` | `boolean` | false |  |
| `max` | `number` | — |  |
| `unit` | `string` | '' |  |
| `format` | `(v: number) => string` | arrondi |  |
| `height` | `number` | 160 | px |
| `rows` | `number` | 4 | Lignes de grille. |
| `legend` | `boolean` | true |  |
| `label` | `string` | — | Nom accessible du graphique. |
| `state` | `'ready' \| 'loading' \| 'empty' \| 'unavailable'` | 'ready' |  |
| `message` | `string` | '' |  |
| `interactive` | `boolean` | true | Survol et clavier : infobulle de l’intervalle. |
| `onselect` | `(index: number \| null) => void` | — | Intervalle survolé. |

```svelte
<BarChart label="Ticks lents par minute" stacked labels={['-5', '-4', '-3', '-2', '-1']}
  series={[{ id: 'ok', label: '< 50 ms', values: ok, tone: 'success' }, { id: 'slow', label: '> 50 ms', values: slow, tone: 'warning' }]} />
```

### LogView

Journal monospace défilant : horodatage, niveau par ligne, suivi automatique du bas, retour à ligne.

**Utiliser** : Console d’un serveur, sortie d’un processus, journal d’événements bruts. follow (bindable) suit les nouvelles lignes ; remonter dans le journal le coupe, onfollow le signale. level par ligne (info, success, warning, error, debug, muted, et trace, warn, fatal du vocabulaire Severity) ; parts pour colorer des segments (couleur ANSI ou tone sémantique) ; onreachtop pour charger l’historique.

**Éviter** : Un tableau de données structurées : préférer Table. Plus de quelques milliers de lignes à la fois : paginer.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `lines` | `{ id, at?, text, parts?, level? }[]` | — | parts : segments { text, color?, background?, bold?, dim?, italic?, underline?, tone? } pour une ligne colorée (sortie ANSI décodée par l’appelant). |
| `follow` | `boolean` | true | Bindable. |
| `height` | `number \| string` | 420 | px ou valeur CSS. |
| `wrap` | `boolean` | true | Retour à la ligne. |
| `timestamps` | `boolean` | true |  |
| `format` | `(at: string) => string` | identité | Affichage de l’horodatage. |
| `empty` | `string` | '' | Texte quand le journal est vide. |
| `label` | `string` | — | Nom accessible. |
| `selected` | `string \| number \| null` | null | bind:selected, id de la ligne sélectionnée. |
| `highlight` | `string` | '' | Terme surligné dans les lignes sans parts. |
| `onfollow` | `(v: boolean) => void` | — |  |
| `onreachtop` | `() => void` | — |  |
| `onselect` | `(line) => void` | — | Rend les lignes sélectionnables (clic, Entrée). |

```svelte
<LogView label="Console FXServer" height={320} empty="Aucune ligne reçue."
  lines={[{ id: 1, at: '12:00:01', text: 'Started resource siku_core' }, { id: 2, at: '12:00:04', text: 'hitch warning: frame time of 212 milliseconds', level: 'warning' }]} />
```

### StatTile

Indicateur clé en tuile : valeur et unité, variation signée, tendance, état de données.

**Utiliser** : Repères d’un tableau de bord (CPU moyen, pic de joueurs, erreurs sur une heure). delta en pourcentage avec good pour dire si une hausse est bonne (joueurs) ou mauvaise (erreurs). children pour une Sparkline ; state loading / empty / unavailable avec message plutôt qu’une valeur inventée.

**Éviter** : Plus d’une valeur par tuile : deux tuiles. Une tuile sans libellé.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `label` | `string` | — |  |
| `value` | `string` | '' | Valeur formatée. |
| `unit` | `string` | '' |  |
| `delta` | `number` | — | Variation en % (signée). |
| `deltaLabel` | `string` | — | Légende sous la valeur (vs 24 h). |
| `good` | `'up' \| 'down' \| 'none'` | 'none' | Sens favorable de la variation. |
| `tone` | `ChartTone` | 'neutral' |  |
| `state` | `'ready' \| 'loading' \| 'empty' \| 'unavailable'` | 'ready' |  |
| `message` | `string` | '' |  |
| `icon` | `IconName` | — |  |
| `href` | `string` | — | Rend la tuile cliquable. |
| `size` | `'md' \| 'lg'` | 'md' |  |
| `help` | `string` | — | Explication courte de la mesure : icône info avec Tooltip. |
| `helpLabel` | `string` | 'Explication' | Nom accessible du bouton d’aide. |
| `children` | `Snippet` | — | Tendance (Sparkline). |

```svelte
<StatTile label="Joueurs (pic)" value="42" unit="/ 64" delta={12} good="up" deltaLabel="vs 24 h précédentes" icon="users">
  <Sparkline values={players} tone="live" width="auto" />
</StatTile>
```

### StatusTimeline

Disponibilité dans le temps : une barre de tranches ok, dégradé, arrêt, inconnu, avec le taux de disponibilité.

**Utiliser** : Une tranche par pas de temps (5 min sur 24 h, 1 h sur 7 j) ; title de chaque tranche via format. uptime (0–1) affiché en pourcentage ; start et end pour borner la période.

**Éviter** : Inventer un état : unknown quand rien n’a été mesuré.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `buckets` | `{ t, state: up\|down\|degraded\|unknown, ratio?, label? }[]` | — |  |
| `uptime` | `number \| null` | null | 0–1. |
| `label` | `string` | — | Nom accessible. |
| `start` | `string` | — | Libellé gauche. |
| `end` | `string` | — | Libellé droit. |
| `height` | `number` | 24 | px |
| `state` | `'ready' \| 'loading' \| 'empty' \| 'unavailable'` | 'ready' |  |
| `message` | `string` | '' |  |
| `format` | `(bucket) => string` | libellé · état | Infobulle native de chaque tranche. |
| `legend` | `boolean` | true |  |

```svelte
<StatusTimeline label="Disponibilité, 24 h" uptime={0.983} start="-24 h" end="now"
  buckets={buckets.map((b) => ({ t: b.t, state: b.state, ratio: b.up_ratio }))} />
```

### Ring

Anneau de progression : une part (0–1) avec sa valeur au centre, un libellé et un état de données.

**Utiliser** : Une proportion à lire d’un coup d’œil : ticks dans le budget, mémoire utilisée, disponibilité. tone pour le sens (success, warning, danger) ; valueLabel pour afficher autre chose que le pourcentage ; children pour composer le centre. state loading / empty / unavailable avec message plutôt qu’un anneau vide.

**Éviter** : Plus de deux anneaux côte à côte pour une même mesure. Un anneau pour une valeur qui n’est pas une part d’un tout : StatTile.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `number \| null` | — | 0–1 ; null quand la part est inconnue. |
| `label` | `string` | — |  |
| `valueLabel` | `string` | — | Texte du centre (par défaut le pourcentage). |
| `caption` | `string` | — | Sous le libellé. |
| `tone` | `ChartTone` | 'neutral' |  |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' | 64 / 96 / 128 px |
| `thickness` | `number` | 6 / 8 / 10 | Épaisseur du trait en px. |
| `state` | `'ready' \| 'loading' \| 'empty' \| 'unavailable'` | 'ready' |  |
| `message` | `string` | '' |  |
| `children` | `Snippet` | — | Contenu du centre. |

```svelte
<Ring label="Ticks dans le budget" caption="svMain, 1 h" value={0.994} tone="success" />
```

### Tree

Arborescence dépliable : fichiers d’une ressource, hiérarchie d’objets, avec sélection au clavier.

**Utiliser** : Un nœud par fichier ou dossier ; icon pour le type, meta pour la taille ou le rôle, count pour un nombre de diagnostics. tone sur un nœud ajoute un point coloré (warning, danger) sans changer sa couleur. expanded bindable pour piloter les dossiers ouverts ; onselect quand un nœud est choisi.

**Éviter** : Plus de six niveaux. Une liste plate : NavList ou DataTable.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `nodes` | `TreeNode[]` | — | { id, label, icon?, meta?, count?, tone?, disabled?, children? } |
| `selected` | `string \| null` | null | bind:selected (id du nœud). |
| `expanded` | `string[]` | [] | bind:expanded (ids des nœuds ouverts). |
| `label` | `string` | 'Arborescence' | Nom accessible. |
| `dense` | `boolean` | false |  |
| `onselect` | `(node: TreeNode) => void` | — |  |
| `ontoggle` | `(id: string, open: boolean) => void` | — |  |

```svelte
<Tree bind:selected={file} bind:expanded={open} onselect={show}
  nodes={[{ id: 'server', label: 'server', icon: 'folder', children: [{ id: 'server/main.lua', label: 'main.lua', icon: 'doc', meta: '4,2 Ko', count: 2, tone: 'warning' }] }]} />
```

### ShareBar

Répartition en parts : une barre empilée horizontale avec la part de chaque segment et sa légende.

**Utiliser** : Répartition d’un total en classes : ticks rapides / en retard / hitchs, mémoire par usage, joueurs par état. tone par segment quand les classes ont un sens (success, warning, danger) ; sinon la palette chart-1 à chart-6. hint par segment pour expliquer le seuil dans l’infobulle native.

**Éviter** : Plus de six segments. Une évolution dans le temps : BarChart empilé.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `segments` | `{ id, label, value, tone?, hint? }[]` | — | Valeurs absolues ; les parts sont calculées. |
| `label` | `string` | — | Nom accessible. |
| `legend` | `boolean` | true |  |
| `height` | `number` | 10 | px |
| `format` | `(value, share) => string` | pourcentage arrondi | Texte de chaque part. |
| `state` | `'ready' \| 'loading' \| 'empty' \| 'unavailable'` | 'ready' |  |
| `message` | `string` | '' |  |

```svelte
<ShareBar label="Ticks par classe" segments={[{ id: 'ok', label: 'Dans le budget', value: 59_120, tone: 'success' }, { id: 'late', label: 'En retard', value: 420, tone: 'warning' }, { id: 'hitch', label: 'Hitchs', value: 3, tone: 'danger' }]} />
```

### DataTable

Tableau de données triable : colonnes sortable, lignes sélectionnables au clavier, états de chargement et d’absence, en-tête collant.

**Utiliser** : Listes d’événements, de ressources, de joueurs : sort bindable, onsort pour trier côté serveur. rowKey stable pour la sélection ; cell pour un rendu riche (Badge, Code). state loading / empty / unavailable avec message. virtual avec maxHeight ne rend que les lignes visibles (rowHeight fixe) : des milliers de lignes sans paginer ; flèches ↑ ↓ entre les lignes.

**Éviter** : Un journal brut : LogView. Un tableau de trois lignes : Table.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `columns` | `{ key, label, align?, width?, sortable?, mono?, format? }[]` | — |  |
| `rows` | `Row[]` | — |  |
| `sort` | `{ key, dir } \| null` | null | bind:sort ; tri local sans onsort. |
| `rowKey` | `(row, index) => string \| number` | index |  |
| `selected` | `string \| number \| null` | null | bind:selected (clé de ligne). |
| `caption` | `string` | — |  |
| `empty` | `string` | 'Aucune ligne' |  |
| `state` | `'ready' \| 'loading' \| 'empty' \| 'unavailable'` | 'ready' |  |
| `message` | `string` | '' |  |
| `dense` | `boolean` | false |  |
| `sticky` | `boolean` | false | En-tête collant (avec maxHeight). |
| `maxHeight` | `string` | — | Hauteur maximale défilante. |
| `virtual` | `boolean` | false | Fenêtre virtuelle (avec maxHeight). |
| `rowHeight` | `number` | 44 (34 dense) | Hauteur fixe des lignes en virtuel. |
| `cell` | `Snippet<[row, column]>` | — |  |
| `onselect` | `(row, index) => void` | — | Rend les lignes sélectionnables. |
| `onsort` | `(sort) => void` | — | Tri délégué. |

```svelte
<DataTable bind:sort rowKey={(r) => r.id} onselect={open}
  columns={[{ key: 'at', label: 'Heure', sortable: true }, { key: 'severity', label: 'Niveau' }, { key: 'message', label: 'Message' }]} rows={events} />
```

### DescriptionList

Paires clé / valeur d’un détail : attributs d’un événement, propriétés d’un objet, identifiants à copier.

**Utiliser** : Inspecteur d’un événement ou d’une trace ; mono pour les identifiants, copy pour un bouton de copie. columns 2 ou 3 sur un panneau large.

**Éviter** : Des valeurs longues en trois colonnes.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `items` | `{ label, value, mono?, href?, copy? }[]` | — |  |
| `columns` | `1 \| 2 \| 3` | 1 |  |
| `label` | `string` | — | Nom accessible. |
| `copyLabel` | `string` | 'Copier' |  |
| `oncopy` | `(item) => void` | — |  |

```svelte
<DescriptionList columns={2} items={[{ label: 'Service', value: 'fxserver.main' }, { label: 'Trace', value: '0af3…', mono: true, copy: true }]} />
```

### TimeHistogram

Barres empilées sur un axe temporel réel avec sélection de plage : volume de logs par sévérité, événements par minute.

**Utiliser** : Une série par classe (sévérité) empilée dans l’ordre ; step est la largeur d’un intervalle en ms. Glisser sélectionne une plage (brush bindable, onbrush) ; cliquer un intervalle appelle onpick ; Maj + flèches étendent la sélection, Échap l’efface. Légende cliquable pour masquer une série ; infobulle avec le total.

**Éviter** : Une évolution continue : TimeChart. Des intervalles irréguliers.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `series` | `{ label, tone?, points: { t, v }[] }[]` | — | Empilées dans l’ordre. |
| `from` | `number` | premier point | Début de l’axe (ms). |
| `to` | `number` | dernier point + step |  |
| `step` | `number` | — | Largeur d’un intervalle en ms. |
| `height` | `number` | 140 | px |
| `format` | `(v: number) => string` | arrondi |  |
| `formatTime` | `(t: number) => string` | HH:MM ou JJ/MM HH:MM |  |
| `unit` | `string` | '' |  |
| `label` | `string` | — | Nom accessible. |
| `state` | `'ready' \| 'loading' \| 'empty' \| 'unavailable'` | 'ready' |  |
| `message` | `string` | '' |  |
| `legend` | `boolean` | true |  |
| `brush` | `{ from, to } \| null` | null | bind:brush |
| `onpick` | `(t: number) => void` | — | Clic sur un intervalle. |
| `onbrush` | `(range \| null) => void` | — |  |

```svelte
<TimeHistogram label="Logs par minute" step={60_000} bind:brush onbrush={zoom}
  series={[{ label: 'Info', tone: 'neutral', points: info }, { label: 'Warn', tone: 'warning', points: warn }, { label: 'Error', tone: 'danger', points: error }]} />
```

### JsonTree

Valeur structurée dépliable : attributs d’un événement, corps d’une requête, avec copie et filtre par feuille.

**Utiliser** : depth fixe la profondeur ouverte au départ ; la barre « Tout déplier / Tout replier » est intégrée (toolbar). oncopy ajoute un bouton de copie par nœud, onfilter un bouton de filtre par feuille (touches C et F sur la ligne). Les chaînes longues sont tronquées ; cliquer les déplie.

**Éviter** : Un objet plat à lire : DescriptionList. Du code source : CodeBlock.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `unknown` | — |  |
| `depth` | `number` | 2 | Profondeur ouverte au départ. |
| `dense` | `boolean` | false |  |
| `label` | `string` | 'Structure' | Nom accessible. |
| `toolbar` | `boolean` | true | Boutons tout déplier / replier. |
| `expandLabel` | `string` | 'Tout déplier' |  |
| `collapseLabel` | `string` | 'Tout replier' |  |
| `expanded` | `string[]` | selon depth | bind:expanded (chemins ouverts : a.b[0]). |
| `maxString` | `number` | 80 | Longueur avant troncature. |
| `oncopy` | `(path, value) => void` | — |  |
| `onfilter` | `(path, value) => void` | — |  |

```svelte
<JsonTree value={event.attributes} depth={2} oncopy={(path, v) => navigator.clipboard.writeText(String(v))} onfilter={(path, v) => addFilter(path, v)} />
```

### TraceWaterfall

Cascade des spans d’une trace : noms indentés, barres placées dans le temps, couleur par service, erreurs marquées.

**Utiliser** : spans avec parentId ; les parents absents deviennent des racines. totalMs fixe l’axe (sinon la fin du dernier span). Flèches pour parcourir, ← → replient / déplient, Entrée sélectionne (selected bindable, onselect). maxRows borne le rendu avec une note.

**Éviter** : Plus de six services : la palette se répète.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `spans` | `TraceSpan[]` | — | { id, parentId, name, service?, startMs, durationMs, status, attributes? } |
| `totalMs` | `number` | fin du dernier span |  |
| `selected` | `string \| null` | null | bind:selected |
| `collapsed` | `string[]` | [] | bind:collapsed (ids repliés). |
| `rowHeight` | `number` | 28 | px |
| `maxRows` | `number` | 500 |  |
| `label` | `string` | 'Trace' | Nom accessible. |
| `formatDuration` | `(ms: number) => string` | ms / s |  |
| `onselect` | `(span) => void` | — |  |

```svelte
<TraceWaterfall spans={trace.spans} totalMs={trace.durationMs} bind:selected={spanId} onselect={(s) => (detail = s)} />
```

### CodeBlock

Bloc monospace multi-lignes : message brut, pile d’appels, requête, avec numéros de ligne et copie.

**Utiliser** : wrap pour une ligne longue ; sinon défilement horizontal. copy ajoute le bouton de copie (presse-papiers + oncopy) ; maxHeight borne la hauteur.

**Éviter** : Un identifiant court : Code. Un journal vivant : LogView.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `code` | `string` | — |  |
| `wrap` | `boolean` | false |  |
| `lineNumbers` | `boolean` | false |  |
| `maxHeight` | `number \| string` | — | px ou valeur CSS. |
| `copy` | `boolean` | false | Bouton de copie. |
| `label` | `string` | — | Titre du bloc. |
| `copyLabel` | `string` | 'Copier' |  |
| `copiedLabel` | `string` | 'Copié' |  |
| `oncopy` | `(code: string) => void` | — |  |

```svelte
<CodeBlock label="Pile d’appels" code={error.stack} lineNumbers copy maxHeight={240} />
```

### SeverityDot

Point de sévérité (trace, debug, info, warn, error, fatal) avec libellé optionnel ; vocabulaire partagé severityTone / severityLabel.

**Utiliser** : Dans une ligne de tableau ou de liste, à gauche du message. severityTone(s) pour un Badge ou un Tabs cohérent ; severityLabel(s) pour le texte.

**Éviter** : Un ton inventé par écran : le vocabulaire est commun.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `severity` | `'trace' \| 'debug' \| 'info' \| 'warn' \| 'error' \| 'fatal'` | — |  |
| `label` | `string` | — | Texte à côté du point ; sans label, le point porte le nom accessible. |
| `size` | `'sm' \| 'md' \| 'lg'` | 'md' | 6 / 8 / 10 px |
| `title` | `string` | — |  |

```svelte
<SeverityDot severity={row.severity} label={severityLabel(row.severity)} />
```

## Jeu

### Slot

Emplacement d’inventaire : touche ↖, quantité ↗, nom en bas, usure sur le bord.

**Utiliser** : Utiliser SlotGrid pour une grille complète (navigation, glisser-déposer).

**Éviter** : Plus de quatre informations dans l’emplacement : le reste va dans l’inspecteur.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `item` | `SlotItem \| null` | null | { name, icon, count?, label?, durability? } |
| `hotkey` | `number` | — | 1–5 |
| `size` | `'sm' \| 'md'` | 'md' | 64 / 96 |
| `selected` | `boolean` | false |  |
| `focused` | `boolean` | false | Forcer l’anneau de focus (démo). |
| `locked` | `boolean` | false |  |
| `dropState` | `'none' \| 'valid' \| 'invalid'` | 'none' |  |
| `dragging` | `boolean` | false |  |
| `tabindex` | `number` | 0 |  |
| `onselect` | `() => void` | — |  |
| `oncontext` | `(e) => void` | — | Clic droit. |
| `ondragstart` | `DragEvent handler` | — |  |
| `ondragend` | `DragEvent handler` | — |  |
| `ondragover` | `DragEvent handler` | — |  |
| `ondragleave` | `DragEvent handler` | — |  |
| `ondrop` | `DragEvent handler` | — |  |

```svelte
<Slot item={{ name: 'Pistolet', icon: 'pistol', durability: 0.86 }} hotkey={1} selected />
```

### SlotGrid

Grille d’emplacements : flèches/manette, sélection, glisser-déposer entre grilles.

**Utiliser** : id unique par contenant ; onmove reçoit { from, to, item } pour appeler le serveur. hotbar={5} numérote la première rangée. canDrop pour refuser (poids, type).

**Éviter** : Recalculer l’inventaire côté UI : le serveur reste maître.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `id` | `string` | — | Identifiant du contenant. |
| `items` | `(SlotItem \| null)[]` | — | Longueur = capacité. |
| `cols` | `number` | 5 |  |
| `size` | `'sm' \| 'md'` | 'md' |  |
| `label` | `string` | — |  |
| `selected` | `number` | -1 | bind:selected |
| `hotbar` | `number` | 0 |  |
| `locked` | `number[]` | [] |  |
| `canDrop` | `(item, index, from) => boolean` | — |  |
| `onmove` | `(e: MoveEvent) => void` | — |  |
| `onactivate` | `(index, item) => void` | — |  |
| `oncontext` | `(index, e) => void` | — |  |

```svelte
<SlotGrid id="player" label="Sur soi" items={pockets} hotbar={5} bind:selected
  canDrop={(item) => weight + item.weight <= 30}
  onmove={(e) => fetchNui('inventory:move', e)} />
```

### Gauge

Statut du HUD ; critique sous le seuil (icône, jauge, valeur).

**Utiliser** : kind fixe l’icône et le libellé ; armor a son propre token.

**Éviter** : Animer en continu.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `kind` | `'health' \| 'armor' \| 'hunger' \| 'thirst' \| 'stress' \| 'stamina' \| 'custom'` | 'custom' |  |
| `value` | `number` | — | 0–100 |
| `icon` | `IconName` | — |  |
| `label` | `string` | — |  |
| `critical` | `number` | 25 |  |
| `showValue` | `boolean` | true |  |

```svelte
<Gauge kind="health" value={health} />
<Gauge kind="thirst" value={18} />
```

### Prompt

Invite d’interaction ancrée à un objet du monde.

**Utiliser** : L’option ciblée passe en blanc ; une option indisponible dit pourquoi.

**Éviter** : Plus de quatre options : ouvrir un Menu.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `options` | `{ id, key, label, detail?, disabled? }[]` | — |  |
| `selected` | `number` | 0 | bind:selected |
| `anchor` | `boolean` | true | Point d’ancrage. |
| `label` | `string` | 'Interactions' |  |

```svelte
<Prompt options={[{ id: 'open', key: 'E', label: 'Ouvrir le coffre', detail: 'Sultan RS' }, { id: 'lock', key: 'G', label: 'Verrouiller' }]} />
```

### HoldAction

Action à maintenir : se remplit tant que la touche est tenue, se vide au relâchement.

**Utiliser** : Actions à risque ou longues (crochetage, fouille).

**Éviter** : Une action simple : Button + touche.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `key` | `string` | 'E' |  |
| `label` | `string` | — |  |
| `detail` | `string` | — |  |
| `duration` | `number` | 1200 | ms |
| `disabled` | `boolean` | false |  |
| `oncomplete` | `() => void` | — |  |
| `progress` | `number` | 0 | bind:progress (0–1) |

```svelte
<HoldAction key="E" label="Crochetage" duration={2500} oncomplete={() => fetchNui('lockpick:done')} />
```

### HudAnchor

Place un groupe du HUD dans un coin, à l’intérieur de la zone sûre GTA.

**Utiliser** : besideMinimap aligne à droite de la mini-carte native (env Lua). Voile local actif par défaut : indispensable sur les décors clairs.

**Éviter** : Positions en px codées en dur.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `corner` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right' \| 'top' \| 'bottom'` | — |  |
| `scrim` | `boolean` | true | Voile local. Ne le désactiver que si le groupe repose déjà sur une surface. |
| `besideMinimap` | `boolean` | false |  |
| `children` | `Snippet` | — |  |

```svelte
<HudAnchor corner="bottom-right" scrim>
  <Stat size="xl" value="84" minor=" km/h" hud />
</HudAnchor>
```

## Structure

### Screen

Famille « écran plein » : voile, cadre 16:9 centré, Échap pour fermer.

**Utiliser** : Inventaire, coffres, magasins.

**Éviter** : HUD et notifications.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `title` | `string` | — |  |
| `scrim` | `'light' \| 'standard' \| 'edges'` | 'edges' |  |
| `onclose` | `() => void` | — |  |
| `header` | `Snippet` | — |  |
| `children` | `Snippet` | — |  |

```svelte
<Screen title="Inventaire" onclose={() => fetchNui('close')}>
  <Surface padding="none" elevated>…</Surface>
</Screen>
```

### Veil

Voile dégradé depuis un bord de l’écran, à courbe douce : asseoir une colonne ou un pied d’écran posés sur le jeu sans cadre.

**Utiliser** : Dans un conteneur positionné (fixed inset-0) : side choisit le bord, size l’étendue (% ou rem), hold la part tenue à pleine densité avant le fondu. Deux voiles qui se croisent (gauche + bas) ne laissent aucune cassure : le fondu commence et finit à pente nulle. strength suit les tokens opacity-scrim-* : heavy pour une colonne de texte et de boutons, light pour garder le jeu présent.

**Éviter** : Un voile uniforme derrière une fenêtre : Screen ou Modal. Le voile local d’un groupe HUD : HudAnchor.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `side` | `'left' \| 'right' \| 'top' \| 'bottom'` | 'left' |  |
| `size` | `string` | '50%' | Largeur (gauche / droite) ou hauteur (haut / bas). |
| `hold` | `string` | '30%' | Part du voile tenue à pleine densité. |
| `strength` | `'light' \| 'standard' \| 'heavy'` | 'standard' |  |

```svelte
<div class="pointer-events-none fixed inset-0">
  <Veil side="left" size="52%" strength="heavy" />
  <Veil side="bottom" size="40%" strength="heavy" />
</div>
```

### Surface

Un niveau de surface pour composer fenêtres, panneaux et colonnes.

**Utiliser** : raised pour la zone de focus ; elevated pour la surface posée sur le jeu.

**Éviter** : Surfaces imbriquées de même niveau (cartes dans des cartes).

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `level` | `'base' \| 'raised' \| 'sunken'` | 'base' |  |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | 'md' |  |
| `radius` | `'none' \| 'lg' \| 'xl'` | 'xl' |  |
| `elevated` | `boolean` | false |  |
| `bordered` | `boolean` | true |  |
| `as` | `string` | 'div' |  |
| `children` | `Snippet` | — |  |
| `class` | `string` | '' |  |

```svelte
<Surface level="raised" padding="lg">…</Surface>
```

### Divider

Filet de structure, horizontal, vertical ou titré.

**Éviter** : Encadrer ce qu’un filet suffit à séparer.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `vertical` | `boolean` | false |  |
| `strong` | `boolean` | false |  |
| `label` | `string` | — | Titre de groupe. |

```svelte
<Divider label="Accès rapide" />
```

### Drawer

Panneau latéral posé sur la page : navigation mobile, filtres, inspecteur.

**Utiliser** : Échap, voile et croix ferment ; le focus est piégé puis rendu ; le panneau glisse à l’ouverture et à la fermeture, la page derrière ne défile plus. side="right" avec size lg ou xl pour un inspecteur de détail posé sur la page sans la compresser. docked : panneau dans le flux (colonne d’une grille), sans voile ni piège de focus ; Échap ferme quand le focus est dedans.

**Éviter** : Une confirmation : Modal. Un flou derrière le panneau : le voile suffit.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `open` | `boolean` | false | bind:open |
| `title` | `string` | — |  |
| `side` | `'left' \| 'right'` | 'left' |  |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | 'sm' | 18 / 28 / 40 / 52 rem : lg ou xl pour un inspecteur de détail. |
| `docked` | `boolean` | false | Dans le flux, sans voile ni aria-modal. |
| `width` | `number` | — | Largeur en px (prime sur size). |
| `children` | `Snippet` | — |  |
| `footer` | `Snippet` | — | Actions en pied de panneau. |
| `onclose` | `() => void` | — |  |
| `closeLabel` | `string` | 'Fermer' | Nom accessible de la croix. |

```svelte
<Drawer bind:open={menu} title="Navigation">
  <NavList value={page} items={items} onchange={() => (menu = false)} />
</Drawer>
```

### Popover

Panneau flottant ancré à son déclencheur : filtres, options d’une colonne, formulaire court. Clic extérieur et Échap ferment, le focus revient au déclencheur.

**Utiliser** : trigger reçoit { toggle, open } : y placer un Button (aria-expanded suit open). matchWidth ou width="trigger" pour un panneau aussi large que le déclencheur ; width en px sinon. Le panneau se retourne vers le haut s’il déborde du bas de la fenêtre.

**Éviter** : Une liste d’actions : Menu. Une confirmation : Modal. Une aide d’une phrase : Tooltip.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `open` | `boolean` | false | bind:open |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end'` | 'bottom-start' |  |
| `trigger` | `Snippet<[{ toggle, open }]>` | — | Déclencheur. |
| `children` | `Snippet` | — | Contenu du panneau. |
| `width` | `number \| 'trigger'` | — | Largeur en px, ou celle du déclencheur. |
| `matchWidth` | `boolean` | false | Même largeur que le déclencheur. |
| `block` | `boolean` | false | Déclencheur pleine largeur. |
| `label` | `string` | — | Nom accessible du panneau. |
| `autofocus` | `boolean` | true | Focus sur le premier élément du panneau (ou data-autofocus). |
| `onclose` | `() => void` | — |  |

```svelte
<Popover bind:open={columns} label="Colonnes" width={240}>
  {#snippet trigger({ toggle, open })}<Button variant="ghost" icon="columns" aria-expanded={open} onclick={toggle}>Colonnes</Button>{/snippet}
  <Checkbox label="Service" bind:checked={show.service} />
</Popover>
```

### Disclosure

Section repliable avec titre, compteur et actions : groupe de facettes, détail d’un événement.

**Utiliser** : open bindable ; count pour le nombre d’éléments ; actions pour un bouton à droite du titre. dense dans une colonne de filtres.

**Éviter** : Naviguer entre sections : Tabs. Une arborescence : Tree.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `title` | `string` | — |  |
| `open` | `boolean` | false | bind:open |
| `count` | `number` | — |  |
| `dense` | `boolean` | false |  |
| `children` | `Snippet` | — |  |
| `actions` | `Snippet` | — |  |
| `ontoggle` | `(open: boolean) => void` | — |  |

```svelte
<Disclosure title="Service" count={4} bind:open={facets.service}>
  <Combobox inline multiple bind:value={services} options={serviceOptions} />
</Disclosure>
```

### Icon

Pictogramme au trait (128 icônes), couleur héritée.

**Utiliser** : label s’il porte un sens.

**Éviter** : Icônes pleines, emoji.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `name` | `IconName` | — |  |
| `size` | `'sm' \| 'md' \| 'lg' \| number` | 'md' | 16 / 20 / 32 ou px |
| `label` | `string` | — |  |
| `class` | `string` | '' |  |

```svelte
<Icon name="medkit" size="lg" />
```

## Runtime

| Export | Rôle |
|---|---|
| `initSiku()` | Échelle, densité, aspect, environnement GTA (`siku:env`), pont manette (`siku:nav`). Une fois dans main.ts. |
| `fetchNui(event, data, mock?)` | POST vers `RegisterNUICallback` ; `mock` utilisé hors FiveM. |
| `onNuiMessage(type, handler)` | Écoute `SendNUIMessage({ type, data })`. Retourne la désinscription. |
| `debugNui(type, data)` | Simule un message Lua en développement. |
| `toast.push({...})` / `toast.dismiss(id)` | File de notifications (afficher `<Toaster />`). |
| `scaleState`, `inputMode` | Stores : `{ scale, density, aspect }`, `'keyboard' \| 'gamepad'`. |
| `trapFocus` (action), `gridMove` | Focus des modales, navigation en grille. |
| `icons`, `IconName` | Jeu d’icônes. |
| `colorTokens`, `tokens`, `cssVar()` | Tokens typés pour le code. |
