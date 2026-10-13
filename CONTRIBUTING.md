# Faire évoluer @siku/ui

Le design system est la source de vérité de toutes les interfaces SIKU. Il évolue par propositions, jamais par copies locales.

## Où va un besoin ?

| Besoin | Où | Version |
|---|---|---|
| Corriger un rendu, un bug, un contraste | ici | correctif (1.0.x) |
| Ajouter une variante ou une prop optionnelle | ici | mineure (1.x.0) |
| Ajouter un token | ici, dans `tokens/tokens.json` | mineure |
| Ajouter un composant | ici, s’il sert au moins deux ressources | mineure |
| Composant propre à une seule ressource | dans la ressource (`web/src/lib/`), composé de composants et tokens SIKU, sans dupliquer un nom SIKU | — |
| Renommer/retirer une prop ou un token, changer un comportement | ici, avec migration | majeure (x.0.0) |
| Exception visuelle ponctuelle | dans la ressource, ligne marquée `siku-allow : <raison, lien d’issue>` | — |

## Ajouter un composant ou une variante

1. Ouvrir une issue « Proposition » : besoin, ressources concernées, capture ou maquette.
2. Écrire le composant dans `src/lib/components/<Nom>.svelte` : props typées, états (`is-hover`, `is-focus`, `is-disabled`…), clavier, ARIA, styles uniquement en `var(--token)` dans `src/lib/styles/`.
3. L’exporter dans `src/lib/index.ts` et l’ajouter dans la liste `LIB_COMPONENTS` de `bin/siku.mjs`.
4. Le documenter dans `catalog/catalog.js` (rôle, utiliser/éviter, props, contrôles, exemple) et ajouter sa démo dans `docs/src/Demos.svelte`. Le test `catalog.test.ts` échoue tant que le catalogue et le composant ne correspondent pas.
5. `bun run verify` (types, règles, tests, build, ressource de test en Chromium 103).
6. Entrée dans `CHANGELOG.md`, PR, revue, fusion, puis workflow **release**.

## Faire évoluer un token

- Une intention par token. Si deux usages partagent une couleur par hasard, ce sont deux tokens (exemple : `container-foreign` et `status-armor`).
- Les primitives ne sont jamais utilisées directement par une interface ; un token de composant pointe toujours vers un token (vérifié par `bun run tokens`).
- Renommer un token = majeure : garder l’ancien nom en alias pendant une version mineure, l’annoncer dans le CHANGELOG, puis le retirer à la majeure suivante.

## Changement incompatible

1. Section « Migration » dans le CHANGELOG (avant/après, commandes).
2. Majeure : les ressources sur `#semver:^1` ne la reçoivent pas automatiquement ; chacune migre quand elle est prête (`#semver:^2`).
3. `bunx siku ai sync ..` dans chaque ressource migrée pour mettre à jour les instructions des assistants.

## Documentation

Elle est générée depuis le code : `ai/components.md` et la doc interactive viennent de `catalog/catalog.js`, `ai/tokens.md` et le preset Tailwind de `tokens/tokens.json`. Mettre à jour le catalogue suffit ; la CI vérifie la cohérence.
