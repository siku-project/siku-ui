// Contrastes des couples texte/fond déclarés, résolus depuis tokens.json.
import { describe, it, expect } from 'vitest';
import tokens from '../tokens/tokens.json';

const colors = Object.fromEntries(tokens.color.tokens.map((t: { name: string; value: string }) => [t.name, t.value]));
const resolve = (n: string): string => { const v = colors[n]; const m = /^\{(.+)\}$/.exec(v); return m ? resolve(m[1]) : v; };
const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a: string, b: string) => { const [x, y] = [lum(resolve(a)), lum(resolve(b))].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };

const SURFACES = ['bg-base', 'bg-raised', 'bg-sunken', 'bg-control', 'bg-control-hover'];
const pairs: [string, string[], number][] = [
  ['fg-primary', [...SURFACES, 'bg-control-active'], 7],
  ['fg-secondary', [...SURFACES, 'bg-control-active'], 4.5],
  ['fg-tertiary', SURFACES, 4.5],
  ['fg-inverse', ['bg-inverse', 'bg-inverse-hover', 'bg-inverse-active'], 7],
  ['accent', SURFACES, 4.5], ['success', SURFACES, 4.5], ['danger', SURFACES, 4.5], ['warning', SURFACES, 4.5],
  ['container-foreign', SURFACES, 4.5], ['status-critical', SURFACES, 4.5],
  ['focus-ring', [...SURFACES, 'bg-control-active'], 3],
];
describe('contrastes', () => {
  for (const [fg, bgs, min] of pairs) for (const bg of bgs) {
    it(`${fg} sur ${bg} ≥ ${min}:1`, () => expect(ratio(fg, bg)).toBeGreaterThanOrEqual(min));
  }
});
describe('architecture', () => {
  it('armure et contenant tiers sont deux tokens', () => {
    expect(colors['status-armor']).toBeDefined();
    expect(colors['container-foreign']).toBeDefined();
    expect(colors['status-armor']).not.toBe('{container-foreign}');
  });
  it('sélection et focus sont deux tokens', () => expect(colors['selection']).toBeDefined());
});

describe('thème Tailwind v4', () => {
  it('expose les tokens sémantiques et les styles de texte', async () => {
    const { readFileSync } = await import('node:fs');
    const theme = readFileSync(new URL('../tailwind/theme.css', import.meta.url), 'utf8');
    expect(theme).toContain('@theme {');
    expect(theme).toContain('--color-bg-base: var(--bg-base);');
    expect(theme).toContain('--text-body: var(--fs-body);');
    expect(theme).not.toContain('--color-n-900');
  });
});
