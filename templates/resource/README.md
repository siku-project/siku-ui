# Ressource SIKU

Interface dans `web/` (Svelte 5 + @siku/ui), buildée dans `html/` (servie par `fxmanifest.lua`).

```bash
cd web
bun install
bun run dev      # navigateur, données simulées
bun run check    # règles SIKU + configuration
bun run build    # → ../html, à commiter ou à builder en CI
```

Les règles de design et l’usage des composants sont dans `web/node_modules/@siku/ui/ai/SIKU.md` (lu automatiquement par Claude Code via CLAUDE.md, et par Codex via AGENTS.md).
