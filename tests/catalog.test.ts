// Le catalogue (doc + IA) doit refléter exactement la bibliothèque.
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { components } from '../catalog/catalog.js';

const index = readFileSync('src/lib/index.ts', 'utf8');
const exported = [...index.matchAll(/export \{ default as (\w+) \}/g)].map((m) => m[1]);
const propsOf = (name: string) => {
  const src = readFileSync(`src/lib/components/${name}.svelte`, 'utf8');
  const body = /type Props = ([\s\S]*?);\n\s*let \{/.exec(src)?.[1] ?? '';
  const clean = body.replace(/\/\*[\s\S]*?\*\//g, '');
  const names = new Set([...clean.matchAll(/(?:^|[;{,]\s*)(\w+)\??:/gm)].map((m) => m[1]));
  if (/HTMLButtonAttributes|HTMLInputAttributes/.test(clean)) ['disabled', 'onclick', 'type', 'placeholder', 'class', 'id'].forEach((n) => names.add(n));
  return names;
};

describe('catalogue', () => {
  it('documente chaque composant exporté, et rien d’autre', () => {
    expect(components.map((c) => c.name).sort()).toEqual([...exported].sort());
  });
  it('chaque composant a un fichier', () => {
    const files = readdirSync('src/lib/components').map((f) => f.replace('.svelte', ''));
    for (const n of exported) expect(files).toContain(n);
  });
  for (const c of components) {
    it(`${c.name} : les props documentées existent`, () => {
      const real = propsOf(c.name);
      for (const p of c.props) expect(real, `${c.name}.${p.name}`).toContain(p.name);
    });
    it(`${c.name} : résumé, exemple et usage`, () => {
      expect(c.summary.length).toBeGreaterThan(10);
      expect(c.example).toContain(c.name === 'Toast' ? 'toast.push' : `<${c.name}`);
    });
  }
});
