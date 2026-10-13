---
name: siku-ui
description: Construire ou modifier une interface d'une application web SIKU (SvelteKit, Svelte 5) avec le design system officiel @siku/ui. À utiliser pour toute page, tableau de bord, formulaire, liste, navigation ou composant d'interface SIKU.
---

# Interfaces web SIKU avec @siku/ui

1. Lis `node_modules/@siku/ui/ai/SIKU.md` (règles et identité), puis cherche le besoin dans `node_modules/@siku/ui/ai/components.md`. Les tokens sont dans `node_modules/@siku/ui/ai/tokens.md`.
2. Compose avec les composants existants (`import { … } from '@siku/ui'`). Un composant générique ou une variante manque : ajoute-le dans le dépôt `siku-ui` (branche, catalogue, `bun run verify`, PR, release), puis mets à jour la dépendance de l'application. Ne recrée jamais un composant SIKU dans l'application ; seuls les composants métier y vivent.
3. Styles : tokens seulement (`var(--…)`, classes Tailwind du thème SIKU, styles `t-*`). Pas de couleur, police ni taille en dur. Pas de surcharge des classes `sk-*`.
4. Web : `@siku/ui/web.css` et `@siku/ui/tailwind.css`, jamais `initSiku()` ni le pont NUI. Mise en page responsive ; clavier et lecteurs d'écran (focus visible, ARIA, titres).
5. Lance `bun run lint` (inclut `siku check src --web`), `bun run check` et `bun run test` et corrige jusqu'à 0 erreur.
