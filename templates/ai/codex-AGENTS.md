<!-- À placer dans ~/.codex/AGENTS.md (instructions globales Codex) -->
## Écosystème SIKU (FiveM)

- Toute interface d’une ressource SIKU utilise le design system officiel **@siku/ui** (dépôt `OWNER/siku-ui`).
- Avant de modifier une interface, lis `web/node_modules/@siku/ui/ai/SIKU.md`, puis `ai/components.md` et `ai/tokens.md` dans le même dossier. Réutilise les composants ; ne recrée aucun composant SIKU ; tokens uniquement ; cible Chromium 103.
- Si le package manque : `cd web && npm i "github:OWNER/siku-ui#semver:^1.0.0"` puis `npx siku ai sync ..`.
- Termine toujours par `npm run check` dans `web/` et corrige jusqu’à 0 erreur.
