# Tokens SIKU (v4)

> Généré depuis tokens/tokens.json. Source de vérité unique de SIKU. Trois niveaux : primitives (n-*, glacier-*, couleurs d’état), sémantique (bg-, fg-, border-, focus-ring, selection, accent, success…, container-foreign, status-*), composants (button-, slot-, gauge-, hold-, plate-). Les interfaces consomment la sémantique et les composants. Longueurs en rem (1rem = 16px à 1080p).

Utiliser en CSS : `var(--nom)`. En Tailwind : `bg-bg-base`, `text-fg-secondary`, `border-border-subtle`, `rounded-md`, `p-4`, `text-body`.

## Couleurs

| Token | Valeur | Usage |
|---|---|---|
| `n-0` | `#ffffff` | Primitive. Blanc pur : réservé aux reflets d’icône et aux tests ; l’interface utilise `n-25`. |
| `n-25` | `#f5f8fb` | Primitive. Blanc glace, la couleur de marque : texte principal, aplat d’action, anneau de sélection. |
| `n-50` | `#e9eef3` | Primitive. Blanc d’état : survol d’un aplat blanc. |
| `n-100` | `#d3dae2` | Primitive. Blanc enfoncé : pression d’un aplat blanc. |
| `n-200` | `#b4bdc8` | Primitive. Gris clair : texte secondaire. |
| `n-300` | `#939daa` | Primitive. Gris moyen clair : icônes au repos. |
| `n-400` | `#8a94a1` | Primitive. Gris moyen : texte tertiaire. |
| `n-500` | `#5c6672` | Primitive. Gris éteint : désactivé, bordures fortes. |
| `n-600` | `#424a55` | Primitive. Graphite clair : bordure de contrôle au survol. |
| `n-700` | `#2e353e` | Primitive. Graphite : contrôle pressé. |
| `n-750` | `#252b33` | Primitive. Graphite : contrôle survolé. |
| `n-800` | `#1d2229` | Primitive. Graphite profond : contrôle au repos, emplacement occupé. |
| `n-850` | `#171b21` | Primitive. Surface surélevée. |
| `n-900` | `#12151a` | Primitive. Surface de base. |
| `n-925` | `#0f1216` | Primitive. Creux : champs, emplacements vides. |
| `n-950` | `#0c0e12` | Primitive. Encre : texte sur blanc. |
| `n-1000` | `#07080a` | Primitive. Nuit : base des voiles posés sur le jeu. |
| `glacier-100` | `#ddf1ff` | Primitive. Glacier très pâle. |
| `glacier-300` | `#8cccf5` | Primitive. Glacier : la seule teinte de marque, rare. |
| `glacier-500` | `#3592d6` | Primitive. Glacier profond : remplissage de données sur fond clair. |
| `glacier-900` | `#0e2638` | Primitive. Glacier nuit : fond de pastille glacier. |
| `green-300` | `#6fcf97` | Primitive. Vert : succès, entrées d’argent. |
| `red-300` | `#f2726a` | Primitive. Rouge : danger, critique. |
| `amber-300` | `#f2b75b` | Primitive. Ambre : avertissement. |
| `bg-void` | `{n-1000}` | Sémantique. Base des voiles (scrim) entre le jeu et une interface, toujours en transparence (`opacity-scrim-*`). |
| `bg-base` | `{n-900}` | Sémantique. Surface principale d’une interface (panneau, fenêtre, feuille). |
| `bg-raised` | `{n-850}` | Sémantique. Zone de focus dans une surface (inspecteur, formulaire), menus, toasts, modales. |
| `bg-sunken` | `{n-925}` | Sémantique. Creux : champs de saisie, emplacements vides, pistes. |
| `bg-control` | `{n-800}` | Sémantique. Contrôle ou élément au repos (bouton secondaire, emplacement occupé, ligne active). |
| `bg-control-hover` | `{n-750}` | Sémantique. Survol d’un contrôle. Texte posé dessus : `fg-primary` ou `fg-secondary`. |
| `bg-control-active` | `{n-700}` | Sémantique. Pression d’un contrôle. Texte posé dessus : `fg-primary` ou `fg-secondary`. |
| `bg-inverse` | `{n-25}` | Sémantique. Aplat blanc : action principale, élément sélectionné d’un segment, pastille active. |
| `bg-inverse-hover` | `{n-50}` | Sémantique. Survol d’un aplat blanc. |
| `bg-inverse-active` | `{n-100}` | Sémantique. Pression d’un aplat blanc. |
| `fg-primary` | `{n-25}` | Sémantique. Texte principal et valeurs, sur toutes les surfaces sombres (≥ 11,6:1). |
| `fg-secondary` | `{n-200}` | Sémantique. Texte secondaire, libellés, sur toutes les surfaces sombres (≥ 6,5:1). |
| `fg-tertiary` | `{n-400}` | Sémantique. Métadonnées et indications, sur `bg-base`, `bg-raised`, `bg-sunken`, `bg-control`, `bg-control-hover` (≥ 4,6:1). Jamais sur `bg-control-active`. |
| `fg-disabled` | `{n-500}` | Sémantique. Texte et icônes désactivés (exempt du seuil de contraste, toujours accompagné d’un état visible). |
| `fg-inverse` | `{n-950}` | Sémantique. Texte et icônes sur `bg-inverse` (18:1). |
| `border-subtle` | `rgba(233,238,243,0.07)` | Sémantique. Filet de structure : séparation de colonnes, de lignes. |
| `border-default` | `rgba(233,238,243,0.13)` | Sémantique. Contour des contrôles secondaires et des champs au repos. |
| `border-strong` | `rgba(233,238,243,0.24)` | Sémantique. Contour au survol, pistes de jauge visibles. |
| `track` | `rgba(233,238,243,0.14)` | Sémantique. Piste non remplie d’une jauge, d’un curseur, d’une barre d’usure. |
| `focus-ring` | `{n-25}` | Sémantique. Anneau de focus clavier/manette : 2 px blanc, séparé de l’élément par 2 px de `bg-base` (≥ 3:1 partout). |
| `selection` | `{n-25}` | Sémantique. Ce qui est choisi (anneau d’emplacement, case cochée, segment actif). Distinct du focus : un élément peut être sélectionné sans avoir le focus. |
| `accent` | `{glacier-300}` | Sémantique. Glacier : ce qui est vivant ou en cours — voix active, itinéraire, point « maintenant », lien, action maintenue, glisser-déposer. Jamais une surface. |
| `accent-subtle` | `rgba(140,204,245,0.12)` | Sémantique. Fond d’une pastille ou d’une zone glacier. |
| `success` | `{green-300}` | Sémantique. Succès, entrée d’argent, toujours avec un signe ou un mot (≥ 6,5:1). |
| `success-subtle` | `rgba(111,207,151,0.12)` | Sémantique. Fond d’un badge de succès. |
| `danger` | `{red-300}` | Sémantique. Destructif, critique, erreur, toujours avec un mot ou une valeur (≥ 5:1 hors `bg-control-active`). |
| `danger-subtle` | `rgba(242,114,106,0.12)` | Sémantique. Fond d’un badge ou d’un champ en erreur. |
| `warning` | `{amber-300}` | Sémantique. Avertissement non bloquant, avec une icône (≥ 6,9:1). |
| `warning-subtle` | `rgba(242,183,91,0.12)` | Sémantique. Fond d’un badge d’avertissement. |
| `container-foreign` | `{glacier-300}` | Sémantique. Ce qui n’appartient pas au joueur : coffre, véhicule, autre joueur, magasin. Plaque, jauge de charge, en-tête de contenant. |
| `container-foreign-border` | `rgba(140,204,245,0.4)` | Sémantique. Contour discret d’un élément de contenant tiers (plaque, en-tête). |
| `status-health` | `{n-25}` | Sémantique. Jauge de santé. |
| `status-armor` | `{glacier-300}` | Sémantique. Jauge d’armure. Indépendant de `container-foreign` : peut changer sans l’affecter. |
| `status-need` | `{n-200}` | Sémantique. Besoins (faim, soif, stress) au-dessus du seuil critique. |
| `status-critical` | `{red-300}` | Sémantique. Tout statut sous son seuil critique (jauge, icône, valeur). |
| `scrim` | `rgba(7,8,10,0.62)` | Sémantique. Voile standard derrière une fenêtre ou une modale. |
| `button-primary-bg` | `{bg-inverse}` | Composant. Bouton principal : l’action qui fait avancer la tâche en cours. Un par zone de décision en règle générale (voir README). |
| `button-primary-fg` | `{fg-inverse}` | Composant. Texte du bouton principal. |
| `button-secondary-bg` | `{bg-control}` | Composant. Bouton secondaire. |
| `slot-bg` | `{bg-control}` | Composant. Emplacement d’inventaire occupé. |
| `slot-bg-empty` | `{bg-sunken}` | Composant. Emplacement vide. |
| `slot-ring-selected` | `{selection}` | Composant. Anneau 1,5 px de l’emplacement sélectionné. |
| `gauge-fill` | `{n-25}` | Composant. Remplissage des jauges neutres (charge sur soi, état, progression). |
| `gauge-track` | `{track}` | Composant. Piste des jauges. |
| `hold-progress` | `{accent}` | Composant. Progression d’une action maintenue. |
| `slot-drop` | `{accent}` | Composant. Contour d’un emplacement cible pendant un glisser-déposer. |
| `plate-fg` | `{container-foreign}` | Composant. Texte et contour d’une plaque d’immatriculation. |
| `plate-border` | `{container-foreign-border}` | Composant. Contour d’une plaque d’immatriculation. |

## Typographie

Classes `.t-*` (ou `text-*` en Tailwind). Familles : `sans` = "Instrument Sans", system-ui, sans-serif ; `mono` = "Geist Mono", ui-monospace, monospace.

| Style | Taille | Interligne | Graisse | Plancher | Usage |
|---|---|---|---|---|---|
| `t-figure-xl` | 5rem | 4rem | 500 | — | Une seule grande valeur vivante sur un écran de jeu (vitesse). |
| `t-figure` | 3.5rem | 3.5rem | 600 | — | Valeur clé d’un écran applicatif (solde, total). |
| `t-figure-sm` | 1.75rem | 2rem | 600 | `text-floor-3xl` | Chiffre de statistique ou de carte. |
| `t-title-lg` | 1.75rem | 2.25rem | 600 | `text-floor-3xl` | Titre d’écran plein (rare). |
| `t-title` | 1.5rem | 1.875rem | 600 | `text-floor-2xl` | Titre de l’élément en focus (objet, fenêtre). |
| `t-heading` | 1.1875rem | 1.5rem | 600 | `text-floor-xl` | En-tête de colonne, de section, de modale. |
| `t-subheading` | 1rem | 1.375rem | 600 | `text-floor-lg` | Sous-section, titre de toast, ligne forte. |
| `t-body` | 0.9375rem | 1.375rem | 400 | `text-floor-md` | Texte courant, boutons, lignes de liste. La taille de référence. |
| `t-body-sm` | 0.875rem | 1.25rem | 400 | `text-floor-md` | Descriptions, sous-titres. |
| `t-caption` | 0.8125rem | 1.125rem | 500 | `text-floor-sm` | Métadonnées, libellés de groupe, noms dans les emplacements. Taille minimale du texte lu. |
| `t-key` | 0.6875rem | 0.875rem | 600 | `text-floor-xs` | Uniquement le texte des touches. |
| `t-code` | 0.8125rem | 1.125rem | 500 | `text-floor-sm` | Identifiants à recopier : plaques, numéros de série, IBAN, fréquences. |

## spacing

| Token | Valeur | Usage |
|---|---|---|
| `space-0-5` | `0.125rem` | Écart minimal (entre segments d’une jauge). |
| `space-1` | `0.25rem` | Écart icône–texte serré, padding de badge. |
| `space-2` | `0.5rem` | Écart entre emplacements, entre boutons groupés. |
| `space-3` | `0.75rem` | Padding horizontal d’un contrôle compact, écart icône–texte. |
| `space-4` | `1rem` | Padding de contrôle, écart entre champs liés. |
| `space-5` | `1.25rem` | Padding de menu, de toast. |
| `space-6` | `1.5rem` | Écart entre blocs d’une colonne, padding de modale. |
| `space-8` | `2rem` | Padding d’une surface principale. |
| `space-10` | `2.5rem` | Écart entre sections. |
| `space-12` | `3rem` | Marge d’écran du HUD. |
| `space-16` | `4rem` | Grandes respirations, marges d’écran plein compact. |
| `space-24` | `6rem` | Marge latérale d’écran plein à 1080p. |

## radius

| Token | Valeur | Usage |
|---|---|---|
| `radius-xs` | `0.25rem` | Touches, plaques, badges. |
| `radius-sm` | `0.375rem` | Emplacements, segments, puces. |
| `radius-md` | `0.5rem` | Boutons, champs, menus contextuels, lignes interactives. |
| `radius-lg` | `0.75rem` | Toasts, menus, tooltips riches, éléments flottants du HUD. |
| `radius-xl` | `1rem` | Surfaces principales : panneaux, fenêtres, modales. |
| `radius-full` | `999px` | Interrupteurs, pastilles rondes, avatars. |

## shadow

| Token | Valeur | Usage |
|---|---|---|
| `shadow-float` | `0 24px 64px -24px rgba(0,0,0,0.7)` | Surface principale posée sur le jeu (panneau, fenêtre). |
| `shadow-overlay` | `0 32px 80px -16px rgba(0,0,0,0.75)` | Modale, menu contextuel, toast : ce qui passe au-dessus d’une autre surface. |
| `shadow-text` | `0 1px 2px rgba(0,0,0,0.6)` | Ombre de texte du HUD sans plaque (utiliser en `text-shadow`). |

## size

| Token | Valeur | Usage |
|---|---|---|
| `control-sm` | `2rem` | Hauteur de contrôle compact (filtres, segments, boutons de barre). |
| `control-md` | `2.5rem` | Hauteur de contrôle standard. |
| `control-lg` | `3rem` | Hauteur de contrôle principal ou tactile (téléphone). |
| `slot-sm` | `4rem` | Emplacement compact (barre d’accès rapide du HUD, conteneur secondaire dense). |
| `slot-md` | `6rem` | Emplacement d’inventaire standard. |
| `icon-sm` | `1rem` | Icône dans un texte ou une touche. |
| `icon-md` | `1.25rem` | Icône de contrôle. |
| `icon-lg` | `2rem` | Icône d’objet dans un emplacement. |
| `border-hairline` | `1px` | Filets et contours. |
| `border-focus` | `2px` | Anneau de focus. |
| `ring-selected` | `1.5px` | Anneau de sélection d’un emplacement. |
| `text-floor-xs` | `10px` | Plancher absolu du texte des touches, quelle que soit la résolution. |
| `text-floor-sm` | `12px` | Plancher des métadonnées (t-caption) : jamais plus petit, même en 720p. |
| `text-floor-md` | `13px` | Plancher du texte courant (t-body, t-body-sm). |
| `text-floor-lg` | `14px` | Plancher des sous-titres (t-subheading) : reste au-dessus du texte courant. |
| `text-floor-xl` | `15px` | Plancher des en-têtes (t-heading). |
| `text-floor-2xl` | `17px` | Plancher des titres (t-title). |
| `text-floor-3xl` | `19px` | Plancher des grands titres et petits chiffres (t-title-lg, t-figure-sm). |
| `control-touch` | `3rem` | Cible tactile d’un appareil (téléphone, tablette). |

## duration

| Token | Valeur | Usage |
|---|---|---|
| `duration-instant` | `80ms` | Retour de pression (bouton, touche). |
| `duration-fast` | `140ms` | Survol, sélection, apparition d’un tooltip. |
| `duration-base` | `200ms` | Ouverture d’un menu, entrée d’un toast. |
| `duration-slow` | `320ms` | Ouverture d’un écran plein, d’une modale. |
| `duration-hold` | `1200ms` | Action à maintenir par défaut (crochetage rapide, fouille). |

## easing

| Token | Valeur | Usage |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.2,0,0,1)` | Entrées et changements d’état. |
| `ease-exit` | `cubic-bezier(0.4,0,1,1)` | Sorties (fermeture, disparition). |
| `ease-linear` | `linear` | Progression d’une action maintenue, minuteur de toast. |

## opacity

| Token | Valeur | Usage |
|---|---|---|
| `opacity-scrim-light` | `0.45` | Voile léger : fenêtre qui laisse le jeu présent (banque, téléphone). |
| `opacity-scrim` | `0.62` | Voile standard. |
| `opacity-scrim-heavy` | `0.85` | Voile dense : bords d’un écran plein (inventaire). |
| `opacity-disabled` | `0.42` | Contrôle désactivé. |

## zIndex

| Token | Valeur | Usage |
|---|---|---|
| `z-hud` | `10` | Éléments du HUD. |
| `z-panel` | `20` | Écrans et fenêtres. |
| `z-overlay` | `30` | Modales et menus. |
| `z-toast` | `40` | Notifications. |
| `z-tooltip` | `50` | Tooltips et indications de touche flottantes. |

## breakpoint

| Token | Valeur | Usage |
|---|---|---|
| `screen-720` | `1280px` | 720p : densité compacte, marges `space-12`. |
| `screen-1080` | `1920px` | Référence de conception. |
| `screen-1440` | `2560px` | 1440p : même composition, échelle 1,333. |
| `screen-ultrawide` | `3440px` | 21:9 : la composition reste centrée sur 16:9, le HUD s’ancre aux bords réels. |

## scale

| Token | Valeur | Usage |
|---|---|---|
| `ui-scale-min` | `0.6667` | Échelle minimale (720p). |
| `ui-scale-max` | `2` | Échelle maximale (4K). |
| `density-compact-below` | `900px` | Hauteur d’écran sous laquelle data-density=compact. |
| `frame-aspect` | `1.7778` | Rapport du cadre des écrans pleins (16:9), centré sur les écrans plus larges. |
