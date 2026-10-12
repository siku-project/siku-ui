#!/usr/bin/env node
// Génère ai/components.md et ai/llms.txt depuis catalog/catalog.js (source unique, aussi utilisée par la doc).
import { writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { components, groups } from '../catalog/catalog.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
let md = `# Composants @siku/ui ${pkg.version}\n\n> Généré depuis catalog/catalog.js. Import : \`import { Nom } from '@siku/ui'\`. Styles : \`import '@siku/ui/styles.css'\` une fois dans main.ts.\n\n`;
md += `| Composant | Groupe | Rôle |\n|---|---|---|\n` + components.map((c) => `| [\`${c.name}\`](#${c.name.toLowerCase()}) | ${groups.find((g) => g.id === c.group).label} | ${c.summary} |`).join('\n') + '\n';
for (const g of groups) {
  md += `\n## ${g.label}\n`;
  for (const c of components.filter((x) => x.group === g.id)) {
    md += `\n### ${c.name}\n\n${c.summary}\n\n`;
    if (c.use?.length) md += `**Utiliser** : ${c.use.join(' ')}\n\n`;
    if (c.avoid?.length) md += `**Éviter** : ${c.avoid.join(' ')}\n\n`;
    md += `| Prop | Type | Défaut | Description |\n|---|---|---|---|\n` + c.props.map((p) => `| \`${p.name}\` | \`${p.type.replace(/\|/g, '\\|')}\` | ${p.default} | ${p.desc} |`).join('\n') + '\n\n';
    md += '```svelte\n' + c.example + '\n```\n';
  }
}
md += `\n## Runtime\n\n| Export | Rôle |\n|---|---|\n| \`initSiku()\` | Échelle, densité, aspect, environnement GTA (\`siku:env\`), pont manette (\`siku:nav\`). Une fois dans main.ts. |\n| \`fetchNui(event, data, mock?)\` | POST vers \`RegisterNUICallback\` ; \`mock\` utilisé hors FiveM. |\n| \`onNuiMessage(type, handler)\` | Écoute \`SendNUIMessage({ type, data })\`. Retourne la désinscription. |\n| \`debugNui(type, data)\` | Simule un message Lua en développement. |\n| \`toast.push({...})\` / \`toast.dismiss(id)\` | File de notifications (afficher \`<Toaster />\`). |\n| \`scaleState\`, \`inputMode\` | Stores : \`{ scale, density, aspect }\`, \`'keyboard' \\| 'gamepad'\`. |\n| \`trapFocus\` (action), \`gridMove\` | Focus des modales, navigation en grille. |\n| \`icons\`, \`IconName\` | Jeu d’icônes. |\n| \`colorTokens\`, \`tokens\`, \`cssVar()\` | Tokens typés pour le code. |\n`;
writeFileSync(resolve(root, 'ai/components.md'), md);
writeFileSync(resolve(root, 'ai/llms.txt'), `# @siku/ui ${pkg.version}\n\n> Design system SIKU pour les interfaces FiveM (Svelte 5, Tailwind v3, CEF Chromium 103).\n\n- [Règles et architecture](SIKU.md)\n- [Composants](components.md)\n- [Tokens](tokens.md)\n`);
console.log(`ai: ${components.length} composants documentés`);
