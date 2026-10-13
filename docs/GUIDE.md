# Guide d’intégration — design system SIKU

Ce guide explique où vit le design system, comment l’installer dans une ressource FiveM, comment le garder à jour et comment Claude Code et Codex l’appliquent automatiquement. Organisation GitHub : `siku-project`.

---

## 1. Où vit le design system

**Un dépôt GitHub privé : `siku-project/siku-ui`.** Il contient un seul package, `@siku/ui`, plus sa doc et ses outils.

```
siku-ui/
├─ tokens/tokens.json          ← SOURCE UNIQUE des tokens (couleurs, typo, espacements, rayons, ombres, durées, échelle)
├─ src/lib/
│  ├─ components/*.svelte      ← 41 composants Svelte 5
│  ├─ styles/                  ← siku.css (entrée) = fonts + tokens (généré) + base + components + layout
│  ├─ runtime/                 ← échelle, environnement GTA, NUI, manette, focus, notifications
│  ├─ fonts/                   ← Instrument Sans, Geist Mono (WOFF2, embarquées au build)
│  └─ index.ts                 ← exports publics
├─ tailwind/preset.cjs         ← preset Tailwind v3 (généré depuis les tokens)
├─ catalog/catalog.js          ← description de chaque composant → doc interactive + ai/components.md
├─ ai/                         ← SIKU.md, components.md, tokens.md, skill/ : la référence des assistants (livrée dans le package)
├─ bin/siku.mjs                ← CLI : check, doctor, ai sync/check, init ; siku-hook.mjs (hook Claude Code)
├─ templates/resource/         ← gabarit de ressource (fxmanifest, client Lua, web/ Svelte)
├─ templates/ai/               ← blocs à copier dans ~/.claude/CLAUDE.md et ~/.codex/AGENTS.md
├─ docs/                       ← doc interactive (bun run docs:dev), GUIDE.md
├─ tests/                      ← contrastes, catalogue ↔ composants, échelle, règles du CLI
└─ .github/workflows/          ← ci.yml (verify), release.yml (tags de version)
```

**Pourquoi un package unique dans un dépôt dédié** : tes ressources sont indépendantes (un dépôt ou un dossier chacune). Un monorepo de toutes les ressources imposerait une structure à tout l’écosystème ; un registre npm privé ajouterait un compte et des jetons à gérer. Un dépôt Git versionné par tags est le plus simple qui reste propre : chaque ressource déclare la version qu’elle accepte, et une fois buildée elle n’a plus besoin du package (tout est copié dans `html/`).

**Publication d’une version** : sur GitHub, *Actions → release → Run workflow*, version `1.1.0`. Le workflow vérifie tout (`bun run verify`), crée le tag `v1.1.0` qui contient `dist/` déjà construit et sans script `prepare` : l’installation dans une ressource ou une application ne télécharge aucun outil de build.

**Créer le dépôt** (une fois) :

Le dépôt `siku-project/siku-ui` existe (privé) ; chaque version passe par le workflow release.

## 1 bis. Installer dans une application web (SvelteKit, Bun)

Bun ne comprend pas `#semver:` et traite une URL `git+https://github.com/…` comme un raccourci GitHub (tarball API, sans authentification) : on déclare l'URL `git+ssh://` d'un tag, le lockfile fixe le commit. En local, la clé SSH GitHub suffit.

```bash
bun add "git+ssh://git@github.com/siku-project/siku-ui.git#v1.1.0"
bunx siku ai sync . --web          # CLAUDE.md, AGENTS.md, skill web, hook (mode web)
```

```css
/* src/routes/layout.css */
@import 'tailwindcss';
@import '@siku/ui/web.css';
@import '@siku/ui/tailwind.css';
```

```ts
import { Button, Surface, Table } from '@siku/ui';   // pas d'initSiku() : la page suit le navigateur
```

Scripts : `"lint": "… && siku check src --web"`. En CI et dans Docker (sans clé SSH), le dépôt privé se lit avec un jeton (Contents : lecture) qui réécrit l'URL SSH en HTTPS : `git config --global url."https://x-access-token:$TOKEN@github.com/".insteadOf "ssh://git@github.com/"` avant `bun install` (dans un Dockerfile : `--mount=type=secret` et variables `GIT_CONFIG_*` le temps de la commande), jamais dans l'image ni dans le code. Mise à jour : `bun add git+ssh://git@github.com/siku-project/siku-ui.git#v1.2.0` puis `bunx siku ai sync . --web`.

## 2. Installer dans une ressource existante

Structure attendue (celle de tes ressources FiveM) :

```
siku_inventory/
├─ fxmanifest.lua        ui_page 'html/index.html' ; files { 'html/**' }
├─ client/ server/
├─ html/                 ← sortie du build (servie par FiveM)
└─ web/                  ← sources Svelte
```

```bash
cd siku_inventory/web
bun add "git+ssh://git@github.com/siku-project/siku-ui.git#v1.1.0"
bunx siku doctor .          # liste ce qui manque dans la configuration
bunx siku ai sync ..        # CLAUDE.md, AGENTS.md, skill et hook Claude Code à la racine de la ressource
```

Puis appliquer ce que `doctor` signale :

```ts
// web/vite.config.ts
export default defineConfig({
  plugins: [svelte()],
  base: './',
  build: { outDir: '../html', emptyOutDir: true, target: 'chrome103', cssTarget: 'chrome103', assetsInlineLimit: 0 },
});
```

```ts
// web/src/main.ts
import '@siku/ui/styles.css';
import { mount } from 'svelte';
import { initSiku } from '@siku/ui';
import App from './App.svelte';
initSiku();
mount(App, { target: document.getElementById('app')! });
```

```js
// web/tailwind.config.js
import siku from '@siku/ui/tailwind-preset';
export default { presets: [siku], content: ['./index.html', './src/**/*.{svelte,ts}'], corePlugins: { preflight: false } };
```

```json
// web/package.json — scripts
"check": "svelte-check --tsconfig ./tsconfig.json && siku check src && siku doctor .",
"ai:sync": "siku ai sync .."
```

Côté Lua, copier `templates/resource/client/siku_ui.lua` dans `client/` et l’ajouter à `client_scripts` : il envoie la zone sûre, la position de la mini-carte et l’échelle du joueur (`siku:env`), traduit la manette en touches (`siku:nav`), et fournit `SikuUI.open(data)` / `SikuUI.close()`.

**Migration progressive** : `bunx siku check src` liste tout ce qui n’est pas conforme (couleurs en dur, composants recréés, flous, fonctions CSS absentes de CEF). Remplacer écran par écran ; `--warn-only` évite de bloquer la CI pendant la migration.

**Tailwind déjà configuré avec des couleurs maison** : le preset remplace la palette (`theme.colors`) par les tokens. Les anciennes classes (`bg-zinc-900`) cesseront d’exister : c’est voulu, `siku check` et le build les révèlent.

## 3. Nouvelle ressource, automatiquement

```bash
bunx --package "github:siku-project/siku-ui#semver:^1.0.0" siku init siku_radio --repo=siku-project/siku-ui
cd siku_radio/web && bun install
bunx siku ai sync ..        # CLAUDE.md, AGENTS.md, skill, hook
bun run dev                # navigateur, données simulées
```

La ressource créée contient `fxmanifest.lua` (nom = dossier), `client/siku_ui.lua` (pont jeu ↔ interface), `client/main.lua` (commande d’exemple), `web/` (Vite + Svelte 5 + Tailwind v3 + @siku/ui, déjà configuré) et `.github/workflows/ui.yml`.

Variante : garder le dossier `templates/resource/` du dépôt comme **dépôt modèle GitHub** (*Settings → Template repository*). `gh repo create siku-project/siku_radio --private --template siku-project/siku-resource-template` crée une ressource complète : fxmanifest, client Lua, `web/` configuré, CI, et (après `bun install`) `bunx siku ai sync ..`.

## 4. Importer composants, styles et tokens

| Besoin | Import |
|---|---|
| Composants | `import { Button, SlotGrid, Modal, Gauge } from '@siku/ui'` |
| Types | `import type { SlotItem, MenuItem, MoveEvent } from '@siku/ui'` |
| Styles (une fois) | `import '@siku/ui/styles.css'` |
| Tokens seuls (sans composants) | `import '@siku/ui/tokens.css'` |
| Tokens en CSS | `var(--bg-raised)`, `var(--space-4)`, `var(--radius-md)`, `var(--fs-body)` |
| Tokens en Tailwind | `bg-bg-raised text-fg-secondary border-border-subtle rounded-md p-4 gap-2 text-body shadow-float` |
| Tokens en TypeScript | `import { colorTokens, tokens, cssVar } from '@siku/ui'` |
| Styles de texte | `class="t-heading"`, `t-body`, `t-caption`… |
| Runtime | `initSiku, fetchNui, onNuiMessage, toast, scaleState, inputMode` |
| Valeurs brutes | `@siku/ui/tokens.json` |

Les polices sont référencées par `styles.css` ; Vite les copie dans `html/assets/` au build. Rien n’est chargé depuis Internet en jeu.

## 5. Mettre à jour

| Changement | Dans la ressource |
|---|---|
| Correctif ou mineure (1.0.0 → 1.3.2) | `bun add git+ssh://git@github.com/siku-project/siku-ui.git#vX.Y.Z` puis `bunx siku ai sync ..`, `bun run check`, `bun run build` |
| Majeure (1.x → 2.0) | Lire `node_modules/@siku/ui/CHANGELOG.md` (section Migration), `bun add "git+ssh://git@github.com/siku-project/siku-ui.git#v2.0.0"`, `bunx siku ai sync ..`, `bun run check` |
| Vérifier sa version | `bunx siku --version` |

`#semver:^1.0.0` + `package-lock.json` : chaque ressource reste sur la version verrouillée jusqu’à ce que tu fasses `npm update`. Une évolution du design system ne casse jamais une ressource existante sans action de ta part. La CI de la ressource exécute `bunx siku ai check ..` : elle échoue si les instructions des assistants ne correspondent plus à la version installée (rappel de lancer `ai sync`).

## 6. Claude Code : appliquer les règles à chaque session

Trois niveaux, tous préparés :

**a. Dans chaque ressource (automatique via `bunx siku ai sync ..`)**
- `CLAUDE.md` : un bloc entre `<!-- siku:begin -->` et `<!-- siku:end -->` avec les règles et la ligne `@web/node_modules/@siku/ui/ai/SIKU.md`. La syntaxe `@chemin` importe le fichier dans la mémoire du projet : Claude Code charge les règles exactes de la version installée à chaque session, sans copier-coller.
- `.claude/skills/siku-ui/SKILL.md` : un skill de projet que Claude Code utilise dès qu’il travaille sur une interface (étapes : lire SIKU.md, chercher dans components.md, composer, vérifier).
- `.claude/settings.json` : un hook `PostToolUse` sur `Edit|MultiEdit|Write` qui lance `siku-hook.mjs` sur chaque fichier modifié. En cas de violation (couleur en dur, flou, composant recréé, CSS incompatible CEF), il sort avec le code 2 : Claude reçoit le message et corrige immédiatement.

Committer ces fichiers dans le dépôt de la ressource : ils voyagent avec le code.

**b. Pour toutes tes sessions (une fois)**
Ajouter le contenu de `templates/ai/user-CLAUDE.md` dans `~/.claude/CLAUDE.md`. Claude Code saura dans n’importe quel dossier que les interfaces SIKU passent par @siku/ui, et comment l’installer s’il manque (nouveau dépôt vide compris).

**c. Dans le dépôt siku-ui lui-même**
`CLAUDE.md` à la racine décrit comment faire évoluer le système (tokens générés, catalogue, `bun run verify`).

## 7. Codex : le même fonctionnement

- `AGENTS.md` à la racine de chaque ressource (créé par `bunx siku ai sync ..`) avec le même bloc de règles. Codex lit les `AGENTS.md` du dépôt (racine puis dossiers jusqu’au répertoire de travail). Il ne suit pas d’import `@chemin` comme Claude Code : le bloc lui demande donc explicitement de lire `web/node_modules/@siku/ui/ai/SIKU.md`, `components.md` et `tokens.md`, et de terminer par `bun run check`.
- Global : copier `templates/ai/codex-AGENTS.md` dans `~/.codex/AGENTS.md`.
- Taille : le bloc reste court (Codex limite la taille totale des instructions de projet) ; la référence complète reste dans les fichiers du package, lus à la demande.
- Codex n’a pas l’équivalent du hook : la garantie vient de `bun run check` (dans les instructions) et de la CI de la ressource.

## 8. Fichiers d’instructions à placer

| Fichier | Où | Créé par | Contenu |
|---|---|---|---|
| `CLAUDE.md` | racine de la ressource | `siku ai sync` | bloc SIKU + import `@web/node_modules/@siku/ui/ai/SIKU.md` ; le reste du fichier t’appartient |
| `AGENTS.md` | racine de la ressource | `siku ai sync` | même bloc, avec les chemins à lire |
| `.claude/skills/siku-ui/SKILL.md` | ressource | `siku ai sync` | procédure de construction d’interface |
| `.claude/settings.json` | ressource | `siku ai sync` (fusion) | hook PostToolUse → `siku-hook.mjs` |
| `.github/workflows/ui.yml` | ressource | gabarit | check + ai check + build |
| `~/.claude/CLAUDE.md` | ta machine | toi, depuis `templates/ai/user-CLAUDE.md` | règle globale SIKU |
| `~/.codex/AGENTS.md` | ta machine | toi, depuis `templates/ai/codex-AGENTS.md` | règle globale SIKU |
| `node_modules/@siku/ui/ai/*` | installé | package | SIKU.md, components.md, tokens.md, llms.txt — toujours à la version installée |

Le bloc entre marqueurs est réécrit à chaque `ai sync` ; écrire ses propres consignes de projet en dehors des marqueurs.

## 9. Faire réutiliser les composants plutôt que les recréer

Cinq garde-fous, du plus doux au plus strict :

1. **Instructions** (CLAUDE.md, AGENTS.md, skill) : « réutiliser avant de créer », avec le catalogue `components.md` (rôle, props, exemple de chaque composant).
2. **Catalogue lisible** : `components.md` est généré depuis le même catalogue que la doc ; il ne peut pas être en retard sur le code (test `catalog.test.ts`).
3. **`siku check`** : erreur `no-duplicate-component` si un fichier de la ressource porte le nom d’un composant SIKU ; erreurs sur couleurs, polices et tailles en dur ; avertissement `no-sk-override` si une classe `sk-` est redéfinie localement.
4. **Hook Claude Code** : la vérification tourne à chaque écriture de fichier ; Claude corrige avant de continuer.
5. **CI de la ressource** : `bun run check` + `siku ai check` bloquent la fusion.

Une exception reste possible, mais visible : `/* siku-allow : <raison, lien d’issue> */` sur la ligne concernée. `git grep siku-allow` donne la liste des écarts à résorber.

## 10. Faire évoluer sans perdre la cohérence

- Un besoin nouveau devient une **proposition** dans `siku-ui` (issue), pas une copie dans la ressource. Le détail est dans `CONTRIBUTING.md` : quand c’est un correctif, une mineure, une majeure, comment ajouter un composant (code + export + catalogue + démo + vérification), comment faire évoluer un token (une intention par token, alias pendant une mineure avant suppression).
- `bun run verify` dans siku-ui contrôle : types, règles de compatibilité, contrastes de tous les couples texte/fond, cohérence catalogue ↔ composants, échelle, CLI, build du package, build de la doc, et une ressource complète générée depuis le gabarit et buildée pour Chromium 103 (audit du JS et du CSS produits).
- Le versionnage sémantique protège les ressources : elles avancent quand tu décides.
- La doc interactive (`bun run docs:dev`, et l’artifact « SIKU ») est construite avec les vrais composants : ce qu’on y voit est ce que les ressources reçoivent.

---

## Limites de l’automatisation (et comment vérifier)

- **Les assistants peuvent ignorer une instruction.** Les fichiers d’instructions augmentent fortement la probabilité de conformité, ils ne la garantissent pas. Les garanties réelles sont mécaniques : hook (Claude Code), `bun run check`, CI.
- **`siku check` lit le code, pas le rendu.** Il attrape les couleurs en dur, les flous, les fonctions CSS hors CEF, les composants recréés ; il ne juge pas une composition. Pour l’aspect : `bun run dev` à 1920×1080 et 1280×720, et revue humaine des captures dans la PR.
- **CEF réel** : les règles ciblent Chromium 103 (version du CEF FiveM au moment de la rédaction). Si FiveM met à jour son CEF, ajuster `target` et les règles dans `bin/siku.mjs` ; tester une fois en jeu après chaque majeure.
- **Lisibilité du HUD** : vérifiée sur des décors simulés (doc, page « Lisibilité en jeu ») ; la validation finale se fait en jeu (neige de jour, néons, couchant).
- **Dépôt privé** : chaque machine/CI qui installe @siku/ui doit pouvoir lire `siku-project/siku-ui` (clé SSH ou jeton). En CI, secret `SIKU_UI_TOKEN` (lecture seule) déjà prévu dans `ui.yml`.
- **Comportement des outils** : la syntaxe d’import de CLAUDE.md, les hooks et les skills de Claude Code, et la lecture d’AGENTS.md par Codex correspondent à leur documentation au moment de la rédaction ; en cas de doute, consulter la doc officielle de chaque outil.
