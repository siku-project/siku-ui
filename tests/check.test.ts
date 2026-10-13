import { describe, it, expect } from 'vitest';
import { writeFileSync, mkdtempSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { checkFiles } from '../bin/siku.mjs';

const dir = mkdtempSync(join(tmpdir(), 'siku-'));
const file = (name: string, src: string) => { const p = join(dir, name); writeFileSync(p, src); return p; };
const rules = (p: string) => checkFiles([p]).map((f: { rule: string }) => f.rule);

describe('siku check', () => {
  it('bloque le flou et les fonctionnalités hors Chromium 103', () => {
    const r = rules(file('a.css', '.x{backdrop-filter:blur(8px)}\n.y:has(.z){color:var(--fg-primary)}\n.w{height:100dvh}\n@container (min-width: 1px){}'));
    expect(r).toEqual(expect.arrayContaining(['no-backdrop-blur', 'cef-has', 'cef-viewport-units', 'cef-container']));
  });
  it('bloque les couleurs et polices codées en dur', () => {
    const r = rules(file('b.svelte', '<div class="bg-[#ff0000]"></div>\n<style>.a{color:#12151a;font-family:Arial;font-size:10px}</style>'));
    expect(r).toEqual(expect.arrayContaining(['no-arbitrary-tw-color', 'no-literal-color', 'no-font-family', 'min-font-size']));
  });
  it('bloque un composant recréé', () => expect(rules(file('Button.svelte', '<button>x</button>'))).toContain('no-duplicate-component'));
  it('respecte siku-allow et ignore les commentaires', () => {
    expect(rules(file('c.css', '/* backdrop-filter interdit */\n.a{color:#fff} /* siku-allow : logo partenaire */'))).toEqual([]);
  });
  it('désactive les règles CEF en mode web et garde les règles de design', () => {
    const web = (p: string) => checkFiles([p], { web: true }).map((f: { rule: string }) => f.rule);
    expect(web(file('w.svelte', '<script lang="ts">const a = [3, 1].toSorted();</script>\n<div style="height:100dvh;color:#fff"></div>'))).toEqual(['no-literal-color']);
    expect(web(file('Badge.svelte', '<span>x</span>'))).toContain('no-duplicate-component');
  });
  it('accepte une interface conforme', () => {
    expect(rules(file('d.svelte', '<script lang="ts">import { Button } from "@siku/ui";</script>\n<Button variant="primary">Ok</Button>\n<style>.a{color:var(--fg-primary);padding:var(--space-4)}</style>'))).toEqual([]);
  });
});
