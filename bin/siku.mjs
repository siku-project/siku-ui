#!/usr/bin/env node
// SIKU CLI — vérifications et intégration.
//   siku check [chemins…]        règles du design system + compatibilité CEF (Chromium 103)
//   siku doctor [dossier-web]    configuration Vite/Tailwind/entrée d'une ressource
//   siku ai sync [dossier]       installe/actualise CLAUDE.md, AGENTS.md, skill et hook Claude Code
//   siku ai check [dossier]      échoue si les instructions IA ne correspondent pas à la version installée
//   siku init <dossier> [--repo=siku-project/siku-ui]  crée une ressource complète depuis le gabarit
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync, cpSync, realpathSync } from 'node:fs';
import { join, resolve, relative, dirname, extname, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const PKG_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const PKG = JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf8'));
const [, , cmd, ...rest] = process.argv;
const flags = new Set(rest.filter((a) => a.startsWith('--')));
const args = rest.filter((a) => !a.startsWith('--'));
const C = { red: (s) => `\x1b[31m${s}\x1b[0m`, yellow: (s) => `\x1b[33m${s}\x1b[0m`, green: (s) => `\x1b[32m${s}\x1b[0m`, dim: (s) => `\x1b[2m${s}\x1b[0m` };

const LIB_COMPONENTS = ['Button', 'ButtonGroup', 'Key', 'Hint', 'TextField', 'Checkbox', 'RadioGroup', 'Switch', 'Select', 'Stepper', 'Slider', 'Segmented', 'Tabs', 'NavList', 'Menu', 'Modal', 'Tooltip', 'Toast', 'Toaster', 'Meter', 'Segments', 'Spinner', 'Skeleton', 'HoldAction', 'DataRow', 'Table', 'Badge', 'Plate', 'Code', 'Count', 'Avatar', 'EmptyState', 'Stat', 'Sparkline', 'TimeChart', 'Slot', 'SlotGrid', 'Gauge', 'Prompt', 'HudAnchor', 'Screen', 'Surface', 'Divider', 'Drawer', 'Icon'];

// ───────────────────────── règles
// level: error = bloque la CI ; warn = à justifier. self: s'applique aussi au dépôt du design system.
const RULES = [
  { id: 'no-backdrop-blur', level: 'error', self: true, cef: true, re: /backdrop-filter|filter\s*:\s*blur|\bbackdrop-blur\b|\bblur-(sm|md|lg|xl|2xl|3xl|none)\b/, msg: 'Aucun flou en jeu (backdrop-filter / blur) : utiliser un voile bg-void + opacity-scrim-*.' },
  { id: 'cef-has', level: 'error', self: true, cef: true, re: /:has\(/, msg: ':has() n’existe pas dans Chromium 103 (CEF FiveM).' },
  { id: 'cef-container', level: 'error', self: true, cef: true, re: /@container|container-type\s*:/, msg: 'Container queries absentes de Chromium 103.' },
  { id: 'cef-color-mix', level: 'error', self: true, cef: true, re: /color-mix\(/, msg: 'color-mix() absent de Chromium 103 : utiliser un token *-subtle.' },
  { id: 'cef-viewport-units', level: 'error', self: true, cef: true, re: /\b\d+(\.\d+)?(dvh|svh|lvh|dvw|svw|lvw)\b/, msg: 'Unités dvh/svh/lvh absentes de Chromium 103 : utiliser vh/vw.' },
  { id: 'cef-text-wrap', level: 'error', self: true, cef: true, re: /text-wrap\s*:\s*(balance|pretty)/, msg: 'text-wrap: balance/pretty absent de Chromium 103.' },
  { id: 'cef-css-nesting', level: 'error', self: true, cef: true, ext: ['.css'], re: /^\s*&[\s.:[>]/m, msg: 'Nesting CSS natif absent de Chromium 103 (passer par PostCSS ou aplatir).' },
  { id: 'cef-js-api', level: 'error', self: true, cef: true, ext: ['.ts', '.js', '.svelte'], re: /\.(toSorted|toReversed|toSpliced)\(|Object\.groupBy|Map\.groupBy|Promise\.withResolvers|\.isWellFormed\(|Array\.fromAsync/, msg: 'API JavaScript postérieure à Chromium 103.' },
  { id: 'cef-popover', level: 'error', self: true, cef: true, re: /\bpopover=|showPopover\(/, msg: 'API popover absente de Chromium 103 : utiliser Menu / Tooltip.' },
  { id: 'no-literal-color', level: 'error', self: false, ext: ['.css', '.svelte'], re: /#[0-9a-fA-F]{3,8}\b(?![\w-])|\brgba?\(\s*\d|\bhsla?\(\s*\d/, msg: 'Couleur codée en dur : utiliser un token (var(--bg-base), var(--fg-secondary)…).' },
  { id: 'no-arbitrary-tw-color', level: 'error', self: false, re: /\b(bg|text|border|ring|fill|stroke|from|to|via|shadow)-\[(#|rgb|hsl)/, msg: 'Couleur Tailwind arbitraire : utiliser une classe du preset SIKU (bg-bg-raised, text-fg-secondary…).' },
  { id: 'no-font-family', level: 'error', self: false, ext: ['.css', '.svelte'], re: /font-family\s*:\s*(?!var\(--font-|inherit)/, msg: 'Police hors système : var(--font-sans) ou var(--font-mono).' },
  { id: 'min-font-size', level: 'error', self: false, ext: ['.css', '.svelte'], re: /font-size\s*:\s*([0-9]|1[01])(\.\d+)?px/, msg: 'Texte sous 12 px : utiliser un style t-* (planchers garantis).' },
  { id: 'no-sk-override', level: 'warn', self: false, ext: ['.css', '.svelte'], re: /^\s*\.sk-[\w-]+[^{]*\{/m, msg: 'Redéfinition d’une classe sk- : proposer une variante dans @siku/ui plutôt que surcharger localement.' },
  { id: 'heavy-shadow', level: 'warn', self: false, re: /box-shadow\s*:[^;}]*\d{3,}px/, msg: 'Ombre très large : utiliser shadow-float ou shadow-overlay.' },
  { id: 'animated-layout', level: 'warn', self: true, ext: ['.css', '.svelte'], re: /transition\s*:[^;}]*\b(width|height|top|left|margin|padding)\b/, msg: 'Animer width/height/top/left coûte une mise en page : préférer transform/opacity.' },
];
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.svelte-kit', 'build', 'html']);
const EXTS = new Set(['.svelte', '.css', '.ts', '.js']);

function walk(p, out = []) {
  if (!existsSync(p)) return out;
  const st = statSync(p);
  if (st.isFile()) { if (EXTS.has(extname(p))) out.push(p); return out; }
  for (const e of readdirSync(p)) { if (SKIP_DIRS.has(e) || e.startsWith('.')) continue; walk(join(p, e), out); }
  return out;
}

export function checkFiles(files, { self = false, web = false } = {}) {
  const findings = [];
  for (const f of files) {
    const name = basename(f);
    if (/tokens\.css$|tokens\.ts$|preset\.cjs$/.test(name)) continue;
    const raw = readFileSync(f, 'utf8');
    const lines = raw.split('\n');
    // Les commentaires ne comptent pas (remplacés par des espaces, numéros de ligne conservés).
    const blank = (m) => m.replace(/[^\n]/g, ' ');
    const src = raw.replace(/\/\*[\s\S]*?\*\//g, blank).replace(/<!--[\s\S]*?-->/g, blank).replace(/(^|[^:'"`])\/\/[^\n]*/g, (m, p1) => p1 + blank(m.slice(p1.length)));
    const allowLine = (i) => /siku-allow\b/.test(lines[i] ?? '') || /siku-allow-next-line/.test(lines[i - 1] ?? '');
    for (const r of RULES) {
      if (web && r.cef) continue;
      if (self && !r.self) continue;
      if (r.ext && !r.ext.includes(extname(f))) continue;
      const re = new RegExp(r.re.source, r.re.flags.includes('m') ? 'gm' : 'g');
      let m;
      while ((m = re.exec(src))) {
        const line = src.slice(0, m.index).split('\n').length;
        if (allowLine(line - 1)) continue;
        const l = lines[line - 1];
        findings.push({ file: f, line, rule: r.id, level: r.level, msg: r.msg, text: l.trim().slice(0, 120) });
        if (re.lastIndex === m.index) re.lastIndex++;
      }
    }
    if (!self && extname(f) === '.svelte' && LIB_COMPONENTS.includes(name.replace('.svelte', ''))) {
      findings.push({ file: f, line: 1, rule: 'no-duplicate-component', level: 'error', msg: `« ${name} » existe déjà dans @siku/ui : l’importer (import { ${name.replace('.svelte', '')} } from '@siku/ui').`, text: '' });
    }
  }
  return findings;
}

function cmdCheck() {
  const self = flags.has('--self');
  const web = flags.has('--web');
  const targets = args.length ? args : ['src'];
  const files = targets.flatMap((t) => walk(resolve(t)));
  const findings = checkFiles(files, { self, web });
  if (flags.has('--json')) { console.log(JSON.stringify(findings, null, 2)); }
  else {
    for (const f of findings) console.log(`${f.level === 'error' ? C.red('error') : C.yellow('warn ')} ${relative(process.cwd(), f.file)}:${f.line}  ${f.msg}  ${C.dim(`[${f.rule}]`)}\n        ${C.dim(f.text)}`);
    const e = findings.filter((f) => f.level === 'error').length, w = findings.length - e;
    console.log(`${files.length} fichiers · ${e ? C.red(`${e} erreur(s)`) : C.green('0 erreur')} · ${w} avertissement(s)${e ? '' : ' — conforme SIKU'}`);
    console.log(C.dim('Exception justifiée : ajouter « siku-allow » sur la ligne (ou « siku-allow-next-line » au-dessus) avec la raison.'));
  }
  process.exit(findings.some((f) => f.level === 'error') && !flags.has('--warn-only') ? 1 : 0);
}

// ───────────────────────── doctor
function cmdDoctor() {
  const dir = resolve(args[0] ?? '.');
  const read = (p) => (existsSync(join(dir, p)) ? readFileSync(join(dir, p), 'utf8') : null);
  const results = [];
  const ok = (cond, label, fix) => results.push({ ok: !!cond, label, fix });
  const pkg = JSON.parse(read('package.json') ?? '{}');
  const dep = pkg.dependencies?.['@siku/ui'] ?? pkg.devDependencies?.['@siku/ui'];
  ok(dep, `@siku/ui déclaré (${dep ?? 'absent'})`, 'bun add "git+https://github.com/siku-project/siku-ui.git#vX.Y.Z"');
  ok(!dep || !/#(main|master|HEAD)$/.test(dep), 'version figée (tag ou semver), pas une branche', 'Utiliser #semver:^1.0.0');
  const vite = read('vite.config.ts') ?? read('vite.config.js') ?? '';
  ok(/base\s*:\s*['"]\.\/['"]/.test(vite), "vite : base './' (chemins relatifs pour nui://)", "base: './'");
  ok(/chrome10[0-3]|['"]chrome103['"]|sikuVite|target\s*:\s*\[?\s*['"]chrome/.test(vite), 'vite : build.target chrome103 (CEF)', "build: { target: 'chrome103' }");
  ok(/outDir/.test(vite), 'vite : outDir vers le dossier servi par fxmanifest', "build: { outDir: '../html' }");
  const tw = read('tailwind.config.js') ?? read('tailwind.config.cjs') ?? read('tailwind.config.ts');
  ok(!tw || /@siku\/ui\/tailwind-preset/.test(tw), 'tailwind : preset SIKU', "presets: [require('@siku/ui/tailwind-preset')]");
  const main = read('src/main.ts') ?? read('src/main.js') ?? '';
  ok(/@siku\/ui\/styles\.css/.test(main), "entrée : import '@siku/ui/styles.css'", 'Ajouter l’import dans src/main.ts');
  ok(/initSiku\(/.test(main), 'entrée : initSiku() (échelle, zone sûre, manette)', 'Appeler initSiku() avant mount()');
  ok(existsSync(join(dir, '..', 'fxmanifest.lua')) ? /ui_page/.test(readFileSync(join(dir, '..', 'fxmanifest.lua'), 'utf8')) : true, 'fxmanifest : ui_page et fichiers html/**', "ui_page 'html/index.html' + files { 'html/**' }");
  for (const r of results) console.log(`${r.ok ? C.green('✓') : C.red('✗')} ${r.label}${r.ok ? '' : C.dim(`  → ${r.fix}`)}`);
  process.exit(results.every((r) => r.ok) ? 0 : 1);
}

// ───────────────────────── ai sync / check
const BEGIN = '<!-- siku:begin -->', END = '<!-- siku:end -->';
function block(kind, web = false) {
  const v = PKG.version;
  const common = web ? `## Design system SIKU (@siku/ui ${v}) — obligatoire pour toute interface

Cette application web utilise le design system officiel SIKU, commun aux interfaces FiveM et aux applications web. Avant de créer ou modifier une interface :

1. Lire \`node_modules/@siku/ui/ai/SIKU.md\` (règles, identité, interdits), puis \`ai/components.md\` (composants, props, exemples) et \`ai/tokens.md\` (tokens).
2. **Réutiliser** les composants de \`@siku/ui\` (\`import { Button, Surface, Table } from '@siku/ui'\`). Ne jamais recréer un composant générique qui existe (Button, Badge, Surface, TextField…). Composant générique manquant ou variante manquante : l’ajouter dans le dépôt \`siku-ui\` (branche, PR, release), puis mettre à jour la dépendance. Seuls les composants métier propres à l’application restent dans le projet.
3. Styles : uniquement des tokens (\`var(--bg-base)\`, classes Tailwind du thème SIKU \`bg-bg-raised text-fg-secondary\`, styles \`t-*\`). Aucune couleur, police ou taille de texte codée en dur. Ne pas surcharger les classes \`sk-*\`.
4. Contexte web : \`@siku/ui/web.css\` (pas \`styles.css\`), ne jamais appeler \`initSiku()\` ni les fonctions NUI (\`fetchNui\`, \`onNuiMessage\`). Les règles Chromium 103 ne s’appliquent pas ; la mise en page est responsive (desktop, tablette, mobile).
5. Après chaque modification d’interface : \`bun run lint\` (inclut \`siku check src --web\`) et \`bun run check\` doivent passer.
` : `## Design system SIKU (@siku/ui ${v}) — obligatoire pour toute interface

Cette ressource utilise le design system officiel SIKU. Avant de créer ou modifier une interface (dossier \`web/\`) :

1. Lire \`node_modules/@siku/ui/ai/SIKU.md\` (règles, architecture, interdits), puis \`ai/components.md\` (composants, props, exemples) et \`ai/tokens.md\` (tokens).
2. **Réutiliser** les composants de \`@siku/ui\` (\`import { Button, SlotGrid } from '@siku/ui'\`). Ne jamais recréer un composant qui existe ; si une variante manque, la proposer (voir « Faire évoluer » dans SIKU.md) au lieu de la coder localement.
3. Styles : uniquement des tokens (\`var(--bg-base)\`, classes Tailwind du preset SIKU, styles \`t-*\`). Aucune couleur, police ou taille de texte codée en dur.
4. Cible : CEF FiveM (Chromium 103). Aucun \`backdrop-filter\`/flou, pas de \`:has()\`, \`@container\`, \`color-mix()\`, \`dvh\`.
5. Après chaque modification d’interface : \`bun run check\` dans \`web/\` (lance \`siku check\` + \`siku doctor\`) doit passer.
`;
  const claude = `${common}
@node_modules/@siku/ui/ai/SIKU.md
`;
  return `${BEGIN}\n<!-- Généré par « bunx siku ai sync » (@siku/ui ${v}). Ne pas modifier entre les marqueurs. -->\n${kind === 'claude' ? claude : common}${END}`;
}
function upsert(file, content, header) {
  const cur = existsSync(file) ? readFileSync(file, 'utf8') : `${header}\n\n`;
  const next = cur.includes(BEGIN) ? cur.replace(new RegExp(`${BEGIN}[\\s\\S]*?${END}`), content) : `${cur.trimEnd()}\n\n${content}\n`;
  writeFileSync(file, next);
}
function cmdAi(sub) {
  const dir = resolve(args[1] ?? '.');
  const web = flags.has('--web');
  const webDir = existsSync(join(dir, 'web', 'package.json')) ? 'web/' : '';
  const fixPaths = (s) => (webDir ? s.replaceAll('node_modules/@siku/ui', `${webDir}node_modules/@siku/ui`).replaceAll('dans `web/`', 'dans `web/`') : s);
  const files = { claude: join(dir, 'CLAUDE.md'), agents: join(dir, 'AGENTS.md') };
  if (sub === 'check') {
    const bad = Object.entries(files).filter(([, f]) => !existsSync(f) || !readFileSync(f, 'utf8').includes(`@siku/ui ${PKG.version})`));
    for (const [k, f] of bad) console.log(C.red(`✗ ${relative(process.cwd(), f)} absent ou pas à jour (attendu @siku/ui ${PKG.version}) — lancer « bunx siku ai sync »`));
    if (!bad.length) console.log(C.green(`✓ instructions IA à jour (@siku/ui ${PKG.version})`));
    process.exit(bad.length ? 1 : 0);
  }
  upsert(files.claude, fixPaths(block('claude', web)), '# CLAUDE.md');
  upsert(files.agents, fixPaths(block('agents', web)), '# AGENTS.md');
  const skillDir = join(dir, '.claude', 'skills', 'siku-ui');
  mkdirSync(skillDir, { recursive: true });
  writeFileSync(join(skillDir, 'SKILL.md'), fixPaths(readFileSync(join(PKG_ROOT, 'ai', 'skill', web ? 'SKILL-web.md' : 'SKILL.md'), 'utf8')));
  const settingsPath = join(dir, '.claude', 'settings.json');
  const settings = existsSync(settingsPath) ? JSON.parse(readFileSync(settingsPath, 'utf8')) : {};
  settings.hooks ??= {};
  settings.hooks.PostToolUse ??= [];
  const hookCmd = `node "$CLAUDE_PROJECT_DIR/${webDir}node_modules/@siku/ui/bin/siku-hook.mjs"${web ? ' --web' : ''}`;
  if (!JSON.stringify(settings.hooks.PostToolUse).includes('siku-hook')) {
    settings.hooks.PostToolUse.push({ matcher: 'Edit|MultiEdit|Write', hooks: [{ type: 'command', command: hookCmd }] });
  }
  writeFileSync(settingsPath, JSON.stringify(settings, null, 2) + '\n');
  console.log(C.green(`✓ CLAUDE.md, AGENTS.md, .claude/skills/siku-ui/SKILL.md et hook .claude/settings.json à jour (@siku/ui ${PKG.version})`));
}

// ───────────────────────── init
function cmdInit() {
  const target = resolve(args[0] ?? '.');
  const name = basename(target);
  if (existsSync(join(target, 'web', 'package.json')) && !flags.has('--force')) { console.log(C.red(`${target}/web existe déjà (--force pour écraser)`)); process.exit(1); }
  cpSync(join(PKG_ROOT, 'templates', 'resource'), target, { recursive: true });
  const fx = join(target, 'fxmanifest.lua');
  writeFileSync(fx, readFileSync(fx, 'utf8').replace("name 'siku_example'", `name '${name}'`));
  const repoFlag = rest.find((a) => a.startsWith('--repo='))?.slice(7) ?? process.env.SIKU_UI_REPO ?? 'siku-project/siku-ui';
  const webPkg = join(target, 'web', 'package.json');
  const wp = JSON.parse(readFileSync(webPkg, 'utf8'));
  wp.name = `${name}-web`;
  if (repoFlag) wp.dependencies['@siku/ui'] = `github:${repoFlag}#semver:^${PKG.version.split('.')[0]}.0.0`;
  writeFileSync(webPkg, JSON.stringify(wp, null, 2) + '\n');
  console.log(C.green(`✓ ressource « ${name} » créée (fxmanifest, client Lua, web/, CI)`));
  console.log(`  Ensuite : cd ${relative(process.cwd(), target) || '.'}/web && bun install && bunx siku ai sync .. && bun run dev`);
}

const isMain = !!process.argv[1] && import.meta.url === pathToFileURL(realpathSync(resolve(process.argv[1]))).href;
if (isMain) switch (cmd) {
  case 'check': cmdCheck(); break;
  case 'doctor': cmdDoctor(); break;
  case 'ai': cmdAi(args[0]); break;
  case 'init': cmdInit(); break;
  case '--version': case '-v': console.log(PKG.version); break;
  default:
    console.log(`siku ${PKG.version}\n  siku check [chemins…] [--json] [--warn-only] [--web]\n  siku doctor [dossier-web]\n  siku ai sync [dossier] [--web] | siku ai check [dossier]\n  siku init <dossier-ressource> [--repo=siku-project/siku-ui]`);
}
