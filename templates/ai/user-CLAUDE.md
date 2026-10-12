<!-- À ajouter dans ~/.claude/CLAUDE.md (mémoire utilisateur, toutes les sessions Claude Code) -->
## Écosystème SIKU (FiveM)

- Toute interface d’une ressource SIKU utilise le design system officiel **@siku/ui** (dépôt `siku-project/siku-ui`). Ne jamais créer d’interface SIKU sans lui.
- Dans une ressource : lire `web/node_modules/@siku/ui/ai/SIKU.md` avant toute modification d’interface. S’il n’est pas installé : `cd web && npm i "github:siku-project/siku-ui#semver:^1.0.0"` puis `npx siku ai sync ..`.
- Nouvelle ressource : `npx --yes --package "github:siku-project/siku-ui#semver:^1.0.0" siku init web`, puis `cd web && npm install && npx siku ai sync ..`.
- Une interface est terminée quand `npm run check` passe dans `web/`.
