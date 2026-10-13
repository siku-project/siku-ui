#!/usr/bin/env node
// Vérification de bout en bout : le package tel qu'il sera installé dans une ressource FiveM.
// 1. bun pm pack  2. ressource créée depuis templates/resource  3. installation du tarball
// 4. siku ai sync + check + doctor  5. build Vite (chrome103)  6. audit du build pour CEF
import { execSync } from 'node:child_process';
import { cpSync, mkdtempSync, readFileSync, writeFileSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const root = resolve(import.meta.dirname, '..');
const run = (cmd, cwd) => { console.log(`\n$ ${cmd}  (${cwd})`); execSync(cmd, { cwd, stdio: 'inherit' }); };
const out = process.env.SIKU_FIXTURE ?? mkdtempSync(join(tmpdir(), 'siku-fixture-'));
rmSync(out, { recursive: true, force: true });

const tgz = execSync('bun pm pack --quiet', { cwd: root }).toString().trim().split('\n').pop();
cpSync(join(root, 'templates', 'resource'), out, { recursive: true });
const web = join(out, 'web');
const pkgPath = join(web, 'package.json');
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
pkg.dependencies['@siku/ui'] = `file:${join(root, tgz)}`;
writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

run('bun install', web);
run('bunx siku ai sync ..', web);
run('bunx siku ai check ..', web);
run('bun run check', web);
run('bun run build', web);

const html = join(out, 'html');
const files = readdirSync(join(html, 'assets'));
const problems = [];
if (!files.some((f) => f.endsWith('.woff2'))) problems.push('polices absentes du build');
const js = files.filter((f) => f.endsWith('.js')).map((f) => readFileSync(join(html, 'assets', f), 'utf8')).join('\n');
const css = files.filter((f) => f.endsWith('.css')).map((f) => readFileSync(join(html, 'assets', f), 'utf8')).join('\n');
for (const [re, label] of [[/\.toSorted\(|\.toReversed\(|\.toSpliced\(/, 'Array change-by-copy (Chrome 110)'], [/Object\.groupBy|Map\.groupBy/, 'groupBy (Chrome 117)'], [/Promise\.withResolvers/, 'Promise.withResolvers (Chrome 119)'], [/static\s*\{/, 'bloc static de classe (Chrome 94, ok) — info']]) {
  if (re.test(js) && !label.includes('info')) problems.push(`JS : ${label}`);
}
for (const [re, label] of [[/:has\(/, ':has()'], [/@container/, '@container'], [/color-mix\(/, 'color-mix()'], [/backdrop-filter/, 'backdrop-filter'], [/\b\d+dvh\b/, 'dvh'], [/&\s*[.:]/, 'nesting CSS']]) {
  if (re.test(css)) problems.push(`CSS : ${label}`);
}
const index = readFileSync(join(html, 'index.html'), 'utf8');
if (/(src|href)="\//.test(index)) problems.push('chemins absolus dans index.html (base doit être ./)');
console.log(`\nBuild : ${files.length} fichiers dans html/assets — ${(js.length / 1024).toFixed(0)} Ko JS, ${(css.length / 1024).toFixed(0)} Ko CSS`);
if (problems.length) { console.error('✗ ' + problems.join('\n✗ ')); process.exit(1); }
console.log(`✓ ressource conforme et autonome (${out})`);
rmSync(join(root, tgz));
