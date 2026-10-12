import { describe, it, expect } from 'vitest';
import { computeScale, aspectOf } from '../src/lib/runtime/scale';

describe('échelle', () => {
  it.each([
    [1280, 720, 0.6667, 'compact', '16:9'],
    [1920, 1080, 1, 'regular', '16:9'],
    [2560, 1440, 1.3333, 'regular', '16:9'],
    [3840, 2160, 2, 'regular', '16:9'],
    [1920, 1200, 1, 'regular', '16:10'],
    [1680, 1050, 0.875, 'regular', '16:10'],
    [2560, 1080, 1, 'regular', '21:9'],
    [3440, 1440, 1.3333, 'regular', '21:9'],
    [5120, 1440, 1.3333, 'regular', '32:9'],
    [1366, 768, 0.7111, 'compact', '16:9'],
  ])('%ix%i → %f %s %s', (w, h, s, d, a) => {
    const r = computeScale(w, h);
    expect(r.scale).toBeCloseTo(s, 3);
    expect(r.density).toBe(d);
    expect(r.aspect).toBe(a);
  });
  it('borne la préférence joueur', () => {
    expect(computeScale(3840, 2160, { userScale: 1.25 }).scale).toBe(2);
    expect(computeScale(1280, 720, { userScale: 0.85 }).scale).toBeCloseTo(0.6667, 3);
  });
  it('les planchers de texte gardent 12/13 px en 720p', () => {
    const rem = 16 * computeScale(1280, 720).scale;
    expect(Math.max(12, 0.8125 * rem)).toBe(12); // t-caption
    expect(Math.max(13, 0.9375 * rem)).toBe(13); // t-body
    expect(Math.max(15, 1.1875 * rem)).toBeGreaterThan(Math.max(13, 0.9375 * rem)); // t-heading reste au-dessus de t-body
    expect(aspectOf(1024, 768)).toBe('4:3');
  });
});
