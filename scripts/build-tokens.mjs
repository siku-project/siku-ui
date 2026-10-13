#!/usr/bin/env node
// SIKU — compile tokens/tokens.json (source unique) vers :
//   src/lib/styles/tokens.css   variables CSS + classes de texte .t-*
//   src/lib/tokens.ts           noms et valeurs typés
//   tailwind/preset.cjs         preset Tailwind v3
//   tailwind/theme.css          thème Tailwind v4 (@theme)
//   src/lib/version.ts          version du package
//   ai/tokens.md                référence pour les assistants
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = JSON.parse(readFileSync(resolve(root, 'tokens/tokens.json'), 'utf8'));
const out = (p, s) => { mkdirSync(dirname(resolve(root, p)), { recursive: true }); writeFileSync(resolve(root, p), s); };

const NAME = /^[A-Za-z0-9][A-Za-z0-9_.-]{0,63}$/;
const colors = src.color.tokens;
const colorNames = new Set(colors.map((t) => t.name));
const families = Object.entries(src).filter(([k, v]) => !['name', 'version', 'meta', 'color', 'type'].includes(k) && v?.tokens);
const seen = new Set();
const errors = [];
for (const t of [...colors, ...families.flatMap(([, f]) => f.tokens)]) {
  if (!NAME.test(t.name)) errors.push(`nom invalide : ${t.name}`);
  if (seen.has(t.name)) errors.push(`nom en double : ${t.name}`);
  seen.add(t.name);
  if (!t.usage) errors.push(`usage manquant : ${t.name}`);
}
const alias = (v) => { const m = /^\{(.+)\}$/.exec(v); return m ? m[1] : null; };
for (const t of colors) {
  const a = alias(t.value);
  if (a && !colorNames.has(a)) errors.push(`alias inconnu : ${t.name} → ${a}`);
}
// Tier rule: semantic/component tokens must alias, primitives must not.
for (const t of colors) {
  const tier = t.usage.split('.')[0];
  if (tier === 'Primitive' && alias(t.value)) errors.push(`une primitive ne doit pas être un alias : ${t.name}`);
  if (tier === 'Composant' && !alias(t.value)) errors.push(`un token de composant doit pointer vers un token : ${t.name}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }

const cssVal = (v) => (alias(v) ? `var(--${alias(v)})` : v);
const floors = src.meta?.floors ?? {};
let css = `/* SIKU — generated from tokens.json (v${src.version}). Ne pas modifier : éditer tokens/tokens.json puis npm run tokens. */\n`;
css += `:root, [data-theme="dark"] {\n${colors.map((t) => `  --${t.name}: ${cssVal(t.value)};`).join('\n')}\n}\n`;
css += `:root {\n${families.map(([, f]) => f.tokens.map((t) => `  --${t.name}: ${t.value};`).join('\n')).join('\n')}\n`;
css += Object.entries(src.type.families).map(([k, v]) => `  --font-${k}: ${v};`).join('\n') + '\n}\n';
const styles = [];
for (const g of src.type.groups) for (const s of g.styles) {
  const fam = s.family ?? g.family;
  const size = floors[s.name] ? `max(var(--${floors[s.name]}), ${s.fontSize})` : s.fontSize;
  const lh = floors[s.name] ? `max(calc(var(--${floors[s.name]}) * 1.4), ${s.lineHeight})` : s.lineHeight;
  css += `.${s.name}{font-family:var(--font-${fam});font-size:${size};line-height:${lh};font-weight:${s.fontWeight};${s.letterSpacing ? `letter-spacing:${s.letterSpacing};` : ''}}\n`;
  styles.push({ ...s, family: fam, group: g.name, floor: floors[s.name] ?? null });
}
css += `:root {\n${styles.map((s) => {
  const f = s.floor; const k = s.name.slice(2);
  return `  --fs-${k}: ${f ? `max(var(--${f}), ${s.fontSize})` : s.fontSize};\n  --lh-${k}: ${f ? `max(calc(var(--${f}) * 1.4), ${s.lineHeight})` : s.lineHeight};`;
}).join('\n')}\n}\n`;
out('src/lib/styles/tokens.css', css);

const byFamily = Object.fromEntries(families.map(([k, f]) => [k, Object.fromEntries(f.tokens.map((t) => [t.name, t.value]))]));
const ts = `// SIKU — generated from tokens.json (v${src.version}). Ne pas modifier.
export const colorTokens = ${JSON.stringify(Object.fromEntries(colors.map((t) => [t.name, t.value])), null, 2)} as const;
export type ColorToken = keyof typeof colorTokens;
export const tokens = ${JSON.stringify(byFamily, null, 2)} as const;
export const textStyles = ${JSON.stringify(styles.map((s) => s.name))} as const;
export type TextStyle = (typeof textStyles)[number];
/** Référence CSS d'un token : cssVar('bg-base') → 'var(--bg-base)' */
export const cssVar = (name: ColorToken | string) => \`var(--\${name})\`;
`;
out('src/lib/tokens.ts', ts);

// Tailwind v3 preset (CommonJS for tailwind.config.cjs / .js / .ts)
const sem = colors.filter((t) => !t.usage.startsWith('Primitive')).map((t) => t.name);
const pick = (fam, prefix) => Object.fromEntries((byFamily[fam] ? Object.keys(byFamily[fam]) : []).filter((n) => n.startsWith(prefix)).map((n) => [n.slice(prefix.length), `var(--${n})`]));
const preset = {
  theme: {
    colors: { transparent: 'transparent', current: 'currentColor', inherit: 'inherit', ...Object.fromEntries(sem.map((n) => [n, `var(--${n})`])) },
    spacing: { 0: '0', px: '1px', ...Object.fromEntries(Object.keys(byFamily.spacing).map((n) => [n.slice(6).replace('-', '.'), `var(--${n})`])) },
    borderRadius: { none: '0', ...pick('radius', 'radius-') },
    fontFamily: Object.fromEntries(Object.keys(src.type.families).map((k) => [k, `var(--font-${k})`])),
    boxShadow: { none: 'none', ...pick('shadow', 'shadow-') },
    transitionDuration: pick('duration', 'duration-'),
    transitionTimingFunction: pick('easing', 'ease-'),
    zIndex: { 0: '0', ...pick('zIndex', 'z-') },
    extend: {
      height: Object.fromEntries(['control-sm', 'control-md', 'control-lg', 'control-touch', 'slot-sm', 'slot-md'].map((n) => [n, `var(--${n})`])),
      width: Object.fromEntries(['slot-sm', 'slot-md'].map((n) => [n, `var(--${n})`])),
      opacity: pick('opacity', 'opacity-'),
      fontSize: {},
    },
  },
};
out('tailwind/preset.cjs', `// SIKU — preset Tailwind v3, generated from tokens.json (v${src.version}). Ne pas modifier.
/** @type {import('tailwindcss').Config} */
module.exports = ${JSON.stringify(preset, null, 2)};
module.exports.theme.extend.fontSize = ${JSON.stringify(Object.fromEntries(styles.map((s) => [s.name.slice(2), [floors[s.name] ? `max(var(--${floors[s.name]}), ${s.fontSize})` : s.fontSize, { lineHeight: s.lineHeight, fontWeight: String(s.fontWeight), ...(s.letterSpacing ? { letterSpacing: s.letterSpacing } : {}) }]])), null, 2)};
`);

// Tailwind v4 theme (CSS-first) : @import '@siku/ui/tailwind.css' après @import 'tailwindcss'
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
let theme = `/* SIKU — thème Tailwind v4, generated from tokens.json (v${src.version}). Ne pas modifier.\n   Usage : @import "tailwindcss"; @import "@siku/ui/tailwind.css"; (après @import "@siku/ui/web.css") */\n@theme {\n`;
theme += `  --color-*: initial;\n`;
theme += sem.map((n) => `  --color-${n}: var(--${n});`).join('\n') + '\n';
theme += `  --font-sans: var(--font-sans);\n  --font-mono: var(--font-mono);\n`;
theme += Object.keys(byFamily.spacing).map((n) => `  --spacing-${n.slice(6)}: var(--${n});`).join('\n') + '\n';
theme += Object.keys(byFamily.radius).map((n) => `  --radius-${n.slice(7)}: var(--${n});`).join('\n') + '\n';
theme += Object.keys(byFamily.shadow).map((n) => `  --shadow-${n.slice(7)}: var(--${n});`).join('\n') + '\n';
theme += Object.keys(byFamily.duration).map((n) => `  --duration-${n.slice(9)}: var(--${n});`).join('\n') + '\n';
theme += Object.keys(byFamily.easing).map((n) => `  --ease-${n.slice(5)}: var(--${n});`).join('\n') + '\n';
theme += Object.keys(byFamily.zIndex).map((n) => `  --z-index-${n.slice(2)}: var(--${n});`).join('\n') + '\n';
theme += styles.map((s) => `  --text-${s.name.slice(2)}: var(--fs-${s.name.slice(2)});\n  --text-${s.name.slice(2)}--line-height: var(--lh-${s.name.slice(2)});`).join('\n') + '\n';
theme += Object.keys(byFamily.breakpoint).map((n) => `  --breakpoint-${n.slice(7)}: var(--${n});`).join('\n') + '\n';
theme += '}\n';
out('tailwind/theme.css', theme);
out('src/lib/version.ts', `// SIKU — generated from package.json. Ne pas modifier.\nexport const version = '${pkg.version}';\n`);

// AI reference
let md = `# Tokens SIKU (v${src.version})\n\n> Généré depuis tokens/tokens.json. ${src.meta.note}\n\n`;
md += `Utiliser en CSS : \`var(--nom)\`. En Tailwind : \`bg-bg-base\`, \`text-fg-secondary\`, \`border-border-subtle\`, \`rounded-md\`, \`p-4\`, \`text-body\`.\n\n## Couleurs\n\n| Token | Valeur | Usage |\n|---|---|---|\n`;
md += colors.map((t) => `| \`${t.name}\` | \`${t.value}\` | ${t.usage.replace(/\|/g, '\\|')} |`).join('\n');
md += `\n\n## Typographie\n\nClasses \`.t-*\` (ou \`text-*\` en Tailwind). Familles : ${Object.entries(src.type.families).map(([k, v]) => `\`${k}\` = ${v}`).join(' ; ')}.\n\n| Style | Taille | Interligne | Graisse | Plancher | Usage |\n|---|---|---|---|---|---|\n`;
md += styles.map((s) => `| \`${s.name}\` | ${s.fontSize} | ${s.lineHeight} | ${s.fontWeight} | ${s.floor ? `\`${s.floor}\`` : '—'} | ${s.usage} |`).join('\n');
for (const [k, f] of families) {
  md += `\n\n## ${k}\n\n| Token | Valeur | Usage |\n|---|---|---|\n` + f.tokens.map((t) => `| \`${t.name}\` | \`${t.value}\` | ${t.usage} |`).join('\n');
}
out('ai/tokens.md', md + '\n');
console.log(`tokens v${src.version}: ${colors.length} couleurs, ${styles.length} styles, ${families.length} familles`);
