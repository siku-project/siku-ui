# Changelog — @siku/ui

Format : [semver](https://semver.org/lang/fr/). **Majeure** = changement incompatible (prop renommée ou retirée, token supprimé ou renommé, comportement changé). **Mineure** = composant, variante ou token ajouté. **Correctif** = rendu ou bug corrigé sans changer d’API.

## 1.0.0

Première version de référence.
- Tokens v4 en trois niveaux (primitives, sémantique, composants), une intention par token (`container-foreign` ≠ `status-armor`, `selection` ≠ `focus-ring`).
- Échelle proportionnelle bornée (720p → 4K) avec planchers de texte et densité compacte ; zones sûres GTA et mini-carte via `siku:env`.
- 41 composants Svelte 5 (actions, saisie, navigation, retours, données, jeu, structure), runtime NUI, pont manette `siku:nav`.
- Preset Tailwind v3, polices embarquées, CLI `siku` (check, doctor, ai sync/check, init), hook Claude Code, gabarit de ressource.
