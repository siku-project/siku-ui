# Composants @siku/ui 1.3.0

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
| [`TimeChart`](#timechart) | Données | Courbe ou aire temporelle : grille, axe des valeurs, repères de temps, plusieurs séries. |
| [`BarChart`](#barchart) | Données | Barres par intervalle, groupées ou empilées : répartition d’un histogramme, volumes par période. |
| [`LogView`](#logview) | Données | Journal monospace défilant : horodatage, niveau par ligne, suivi automatique du bas, retour à ligne. |
| [`Slot`](#slot) | Jeu | Emplacement d’inventaire : touche ↖, quantité ↗, nom en bas, usure sur le bord. |
| [`SlotGrid`](#slotgrid) | Jeu | Grille d’emplacements : flèches/manette, sélection, glisser-déposer entre grilles. |
| [`Gauge`](#gauge) | Jeu | Statut du HUD ; critique sous le seuil (icône, jauge, valeur). |
| [`Prompt`](#prompt) | Jeu | Invite d’interaction ancrée à un objet du monde. |
| [`HoldAction`](#holdaction) | Jeu | Action à maintenir : se remplit tant que la touche est tenue, se vide au relâchement. |
| [`HudAnchor`](#hudanchor) | Jeu | Place un groupe du HUD dans un coin, à l’intérieur de la zone sûre GTA. |
| [`Screen`](#screen) | Structure | Famille « écran plein » : voile, cadre 16:9 centré, Échap pour fermer. |
| [`Surface`](#surface) | Structure | Un niveau de surface pour composer fenêtres, panneaux et colonnes. |
| [`Divider`](#divider) | Structure | Filet de structure, horizontal, vertical ou titré. |
| [`Drawer`](#drawer) | Structure | Panneau latéral posé sur la page : navigation mobile, filtres, inspecteur. |
| [`Icon`](#icon) | Structure | Pictogramme au trait (68 icônes), couleur héritée. |

## Actions

### Button

Déclenche une action ; le libellé dit exactement ce qui se passe.

**Utiliser** : primary pour l’action qui fait avancer la tâche en cours — en général une par zone de décision. Plusieurs actions de même importance : secondary ou ghost côte à côte, pas plusieurs primary collés. key affiche la touche ; danger pour détruire ; quiet pour Annuler.

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
| `disabled` | `boolean` | false |  |

```svelte
<Slider label="Volume radio" bind:value={volume} format={(v) => `${v} %`} />
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

## Navigation

### Tabs

Onglets soulignés (sections) ou pastilles (filtres d’écran), Q/E en option.

**Utiliser** : Compteur quand il aide (« Armes 2 »). shortcuts active Q/E (LB/RB via le pont manette).

**Éviter** : Plus de sept onglets.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `value` | `string` | '' | bind:value |
| `tabs` | `{ value, label, count?, disabled? }[]` | — |  |
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
| `tone` | `'neutral' \| 'live' \| 'success' \| 'warning' \| 'danger' \| 'solid'` | 'neutral' |  |
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
| `width` | `number` | 96 | px |
| `height` | `number` | 24 | px |
| `area` | `boolean` | false | Aire sous la courbe. |
| `min` | `number` | — | Borne basse (sinon le minimum des valeurs). |
| `max` | `number` | — | Borne haute. |
| `label` | `string` | — | Nom accessible ; sans label, décoratif. |

```svelte
<Sparkline values={[12, 14, 11, 18, 22, 21, 27]} tone="live" area label="Joueurs connectés, 24 h" />
```

### TimeChart

Courbe ou aire temporelle : grille, axe des valeurs, repères de temps, plusieurs séries.

**Utiliser** : Une à trois séries ; la première en glacier, les suivantes en neutre. format pour l’unité et la précision ; min/max pour fixer l’échelle (0–100 pour un pourcentage). labels pour les repères de temps (début, milieu, fin).

**Éviter** : Plus de trois séries ou des échelles différentes sur un même graphique.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `series` | `{ id, label, values: number[], tone? }[]` | — |  |
| `labels` | `string[]` | [] | Repères de temps répartis sur la largeur. |
| `min` | `number` | — |  |
| `max` | `number` | — |  |
| `unit` | `string` | '' | Suffixe des valeurs (%, ms). |
| `format` | `(v: number) => string` | arrondi |  |
| `height` | `number` | 160 | px |
| `area` | `boolean` | true |  |
| `rows` | `number` | 4 | Lignes de grille. |
| `legend` | `boolean` | true | Légende avec la dernière valeur. |
| `label` | `string` | — | Nom accessible. |

```svelte
<TimeChart label="CPU, 6 heures" unit="%" min={0} max={100} labels={['-6 h', '-3 h', 'now']}
  series={[{ id: 'cpu', label: 'CPU', values: cpu }, { id: 'ram', label: 'RAM', values: ram }]} />
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

```svelte
<BarChart label="Ticks lents par minute" stacked labels={['-5', '-4', '-3', '-2', '-1']}
  series={[{ id: 'ok', label: '< 50 ms', values: ok, tone: 'success' }, { id: 'slow', label: '> 50 ms', values: slow, tone: 'warning' }]} />
```

### LogView

Journal monospace défilant : horodatage, niveau par ligne, suivi automatique du bas, retour à ligne.

**Utiliser** : Console d’un serveur, sortie d’un processus, journal d’événements bruts. follow (bindable) suit les nouvelles lignes ; remonter dans le journal le coupe, onfollow le signale. level par ligne (info, success, warning, error, debug, muted) ; parts pour colorer des segments (couleur ANSI ou tone sémantique) ; onreachtop pour charger l’historique.

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
| `onfollow` | `(v: boolean) => void` | — |  |
| `onreachtop` | `() => void` | — |  |

```svelte
<LogView label="Console FXServer" height={320} empty="Aucune ligne reçue."
  lines={[{ id: 1, at: '12:00:01', text: 'Started resource siku_core' }, { id: 2, at: '12:00:04', text: 'hitch warning: frame time of 212 milliseconds', level: 'warning' }]} />
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

**Utiliser** : Échap, voile et croix ferment ; le focus est piégé puis rendu. side="right" pour un inspecteur.

**Éviter** : Une confirmation : Modal. Sur desktop quand la place existe : une colonne.

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `open` | `boolean` | false | bind:open |
| `title` | `string` | — |  |
| `side` | `'left' \| 'right'` | 'left' |  |
| `children` | `Snippet` | — |  |
| `onclose` | `() => void` | — |  |
| `closeLabel` | `string` | 'Fermer' | Nom accessible de la croix. |

```svelte
<Drawer bind:open={menu} title="Navigation">
  <NavList value={page} items={items} onchange={() => (menu = false)} />
</Drawer>
```

### Icon

Pictogramme au trait (68 icônes), couleur héritée.

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
