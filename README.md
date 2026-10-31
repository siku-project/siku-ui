# @siku/ui — design system SIKU

Fondations, tokens, composants Svelte 5 et outils pour toutes les interfaces de l’écosystème SIKU : ressources FiveM (NUI) et applications web (SvelteKit).

- **Identité** : neutres graphite froids, blanc glace comme lumière (texte, action, sélection, focus), glacier rare pour ce qui est en cours. Instrument Sans + Geist Mono.
- **71 composants** typés et accessibles (clavier, manette, ARIA) : actions, saisie, navigation, retours, données, jeu (emplacements, grilles, jauges, invites, actions maintenues, HUD), structure.
- **Runtime FiveM** : échelle 720p → 4K avec planchers de texte et densité compacte, zone sûre GTA et mini-carte, pont NUI, manette → clavier, notifications.
- **CEF** : tout cible Chromium 103 ; aucun flou d’arrière-plan.
- **Outils** : `siku check` (règles + compatibilité), `siku doctor`, `siku ai sync` (Claude Code / Codex), `siku init`.

```bash
bun add "git+ssh://git@github.com/siku-project/siku-ui.git#v1.7.0"     # Bun (tag épinglé, le lockfile fixe le commit)
npm i "github:siku-project/siku-ui#semver:^1.0.0"                     # npm (plage semver)
```

```ts
// Ressource FiveM
import '@siku/ui/styles.css';
import { initSiku, Button } from '@siku/ui';

// Application web (SvelteKit) : pas d'initSiku, base responsive, thème Tailwind v4
import '@siku/ui/web.css';
import { Button, Surface } from '@siku/ui';
```

- [Guide d’intégration](docs/GUIDE.md) — installation, mise à jour, assistants IA, limites.
- [Faire évoluer](CONTRIBUTING.md) — composants, variantes, tokens, versions.
- Doc interactive : `npm run docs:dev`.
- Référence des assistants : [`ai/SIKU.md`](ai/SIKU.md), [`ai/components.md`](ai/components.md), [`ai/tokens.md`](ai/tokens.md).

## Développer

```bash
bun install
bun run docs:dev     # doc interactive
bun run verify       # types, règles, tests, build, ressource de test Chromium 103
```
