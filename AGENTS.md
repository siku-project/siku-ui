# AGENTS.md — siku-ui (design system SIKU)

Ce dépôt EST la source de vérité. Toute modification suit `CONTRIBUTING.md`.

- Source des tokens : `tokens/tokens.json` → `npm run tokens` génère `src/lib/styles/tokens.css`, `src/lib/tokens.ts`, `tailwind/preset.cjs`, `ai/tokens.md`. Ne jamais éditer ces fichiers générés.
- Composants : `src/lib/components/*.svelte` (Svelte 5, runes, props typées), styles dans `src/lib/styles/` (uniquement `var(--token)`).
- Catalogue : `catalog/catalog.js` alimente la doc interactive (`docs/`) et `ai/components.md`. Tout composant ajouté ou modifié doit y être reflété (test `catalog.test.ts`).
- Compatibilité : CEF FiveM = Chromium 103 (règles dans `bin/siku.mjs`). Pas de `backdrop-filter`, `:has()`, `@container`, `color-mix()`, `dvh`.
- Avant de rendre la main : `npm run verify` doit passer.
- Règles de design pour les assistants : `ai/SIKU.md` (livré dans le package, lu par les ressources).
