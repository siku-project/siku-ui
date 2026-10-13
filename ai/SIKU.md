# SIKU — référence pour les assistants de développement

Tu travailles sur une interface de l’écosystème SIKU : une ressource FiveM (Svelte 5 + TypeScript + Vite + Tailwind v3, rendue par le CEF de FiveM) ou une application web (SvelteKit, navigateurs modernes). Dans les deux cas, elle **doit** être construite avec le design system officiel `@siku/ui`. Ce fichier est livré avec le package installé : il correspond exactement à la version que la ressource utilise.

Fichiers associés (même dossier) :
- `components.md` — chaque composant : rôle, props typées, règles, exemple.
- `tokens.md` — chaque token : valeur, intention, où l’utiliser.
- Doc visuelle interactive : dépôt `siku-ui`, `npm run docs:dev` (ou l’artifact « SIKU » partagé par Prime).

## 1. Règles non négociables

1. **Réutiliser avant de créer.** Cherche d’abord dans `components.md`. Si un composant couvre le besoin (même avec une variante), importe-le : `import { Button, SlotGrid, Modal } from '@siku/ui'`. Ne recrée jamais `Button.svelte`, `Modal.svelte`, etc. dans la ressource (`siku check` le bloque).
2. **Tokens uniquement.** Couleurs, rayons, espacements, ombres, durées, typographie : `var(--token)` en CSS, classes du preset en Tailwind (`bg-bg-raised`, `text-fg-secondary`, `border-border-subtle`, `rounded-md`, `p-4`, `text-body`), ou styles `t-*`. Jamais de `#hex`, `rgb()`, `font-family` ou `font-size` en px dans la ressource.
3. **CEF = Chromium 103.** Interdits : `backdrop-filter` et tout flou, `:has()`, `@container`, `color-mix()`, unités `dvh/svh/lvh`, `text-wrap: balance`, nesting CSS natif, `popover`, `Array.prototype.toSorted/toReversed`, `Object.groupBy`, `Promise.withResolvers`. Build Vite : `target: 'chrome103'`.
4. **Clavier et manette.** Toute action a sa touche visible (`Key`, `Hint`, prop `key` des boutons). Tout ce qui est interactif est focusable et montre l’anneau `.is-focus`/`:focus-visible`. Rien d’indispensable au seul survol.
5. **Vérifier.** Après chaque modification : `bun run check` dans le dossier `web/` (`siku check` + `siku doctor`). Corriger toutes les erreurs avant de rendre la main.

## 1 bis. Application web (SvelteKit)

Mêmes règles 1, 2 et 4 ; la règle 3 (Chromium 103) ne s’applique pas, la règle 5 devient `bun run lint` (qui lance `siku check src --web`).
- Styles : `import '@siku/ui/web.css'` (jamais `styles.css`) dans le layout racine ; Tailwind v4 : `@import "tailwindcss"; @import "@siku/ui/tailwind.css";`.
- Ne jamais appeler `initSiku()`, `applyScale()`, `fetchNui()`, `onNuiMessage()` : la page suit le navigateur (1 rem = 16 px, responsive, zoom natif). `Screen`, `HudAnchor`, `Prompt`, `HoldAction`, `Key`, `Hint`, `Slot*`, `Gauge` sont des composants de jeu ; les autres sont génériques.
- Identité : sombre (`bg-base`), blanc glace pour le texte et l’action principale, glacier rare. Une application web n’a pas de thème clair.
- Composant générique manquant : l’ajouter dans `siku-ui` (branche, catalogue, `bun run verify`, PR, release), puis mettre à jour la dépendance. Seuls les composants métier de l’application vivent dans l’application.

## 2. Mettre en place une interface

```ts
// web/src/main.ts
import '@siku/ui/styles.css';          // polices, tokens, composants (embarqués au build)
import { mount } from 'svelte';
import { initSiku } from '@siku/ui';
import App from './App.svelte';
initSiku();                             // échelle, densité, zone sûre GTA, pont manette
mount(App, { target: document.getElementById('app')! });
```

```ts
// web/vite.config.ts
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
export default defineConfig({
  plugins: [svelte()],
  base: './',                                            // nui://ressource/html/…
  build: { outDir: '../html', emptyOutDir: true, target: 'chrome103', assetsInlineLimit: 0 },
});
```

```js
// web/tailwind.config.js (Tailwind v3)
module.exports = { presets: [require('@siku/ui/tailwind-preset')], content: ['./index.html', './src/**/*.{svelte,ts}'] };
```

Communication Lua : `fetchNui(event, data, mock)` (callbacks `RegisterNUICallback`) et `onNuiMessage(type, handler)` (`SendNUIMessage`). Le client Lua du gabarit (`client/siku_ui.lua`) envoie l’environnement (`siku:env` : zone sûre, mini-carte, échelle joueur) et traduit la manette (`siku:nav`).

## 3. Choisir la famille d’interface

| Besoin | Famille | Briques |
|---|---|---|
| On ouvre, agit vite, ferme (inventaire, coffre, magasin) | Écran plein | `Screen` + `Surface` en colonnes séparées par `Divider`, `SlotGrid`, inspecteur en `Surface level="raised"` |
| On reste et on remplit (banque, métier, admin) | Fenêtre | `Surface` + `NavList` + contenu + panneau `raised`, `Stat`, `DataRow`, `TextField` |
| L’information arrive seule | Flottant | `toast.push()` + `Toaster`, `Prompt`, `Menu`, `Modal`, `Tooltip` |
| Visible en jouant (vitaux, véhicule) | HUD sans plaque | `HudAnchor` (zone sûre, voile local), `Gauge`, `Stat hud`, `Segments` |
| Objet tenu en main (téléphone, radio) | Appareil | Codes de l’objet réel + mêmes tokens ; cibles `control-touch` |

## 4. Identité visuelle (à respecter, pas à réinventer)

- Neutres graphite froids (`bg-*`), **blanc glace** comme lumière : texte `fg-primary`, action principale (`Button variant="primary"`), sélection (`selection`), focus (`focus-ring`).
- **Glacier** (`accent`) rare : seulement ce qui est vivant ou en cours (voix, itinéraire, maintien, glisser-déposer). Jamais une surface.
- `container-foreign` : ce qui n’appartient pas au joueur (coffre, véhicule). `status-*` : jauges du HUD. Ne pas réutiliser un token pour une autre intention parce que la couleur est la même.
- Profondeur par niveaux de surface (`bg-sunken` → `bg-base` → `bg-raised` → `bg-control`), filets `border-subtle`, une seule ombre (`shadow-float`) pour une surface posée sur le jeu. Pas de cartes dans des cartes.
- Typographie : Instrument Sans, styles `t-*` ; Geist Mono uniquement pour les identifiants (`Code`, `Plate`). Casse normale, chiffres tabulaires, rien sous les planchers (12 px métadonnées, 13 px texte).
- Hiérarchie : une action principale par zone de décision en règle générale. Plusieurs actions de même importance : `secondary`/`ghost` côte à côte, ou deux zones distinctes. La règle sert la clarté ; si un écran a vraiment deux décisions principales, il a deux zones.
- Texte : tutoiement, verbes d’action, le bouton dit ce qui se passe (« Jeter au sol », « Envoyer 1 250,00 $ »), les erreurs disent comment débloquer.

## 5. Échelle et résolutions

- La mise en page suit `min(largeur/1920, hauteur/1080)` (bornée 0,667–2) : 1 rem = 16 px à 1080p. Concevoir en rem à 1080p.
- Le texte ne descend jamais sous ses planchers (`--fs-*` = `max(plancher, rem)`).
- `html[data-density="compact"]` sous 900 px de haut ou 1500 px de large : **changer la disposition** (masquer une colonne, inspecteur en tiroir, grille plus étroite) plutôt que rétrécir.
- `html[data-aspect]` = `4:3 | 16:10 | 16:9 | 21:9 | 32:9`. Les écrans pleins restent dans un cadre 16:9 centré (`Screen`) ; le HUD s’ancre aux bords réels via `HudAnchor` et les variables `--safe-x/--safe-y` (zone sûre GTA) et `--minimap-*`.

## 6. Faire évoluer le système (ne pas contourner)

- **Variante manquante** : ne pas surcharger `.sk-*` dans la ressource. Écrire dans la PR/la réponse : « Proposition @siku/ui : <composant> — variante <nom> — besoin — capture ». En attendant, une exception locale est permise avec un commentaire `siku-allow : <raison, lien issue>`.
- **Nouveau composant** : seulement s’il sert au moins deux ressources ; sinon, composer dans la ressource à partir des composants et tokens existants (fichier dans `src/lib/`, nom qui ne duplique pas un composant SIKU).
- **Token** : ne jamais en créer dans une ressource. Une valeur récurrente manquante = proposition au dépôt `siku-ui`.
- Mise à jour : npm `npm update @siku/ui` (même majeure), Bun `bun add git+ssh://git@github.com/siku-project/siku-ui.git#vX.Y.Z` ; changement de majeure = lire `CHANGELOG.md` du package, puis `bunx siku ai sync ..` (ou `-- --web` pour une application) pour actualiser les instructions.
