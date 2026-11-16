// SIKU — échelle et densité.
// Mise en page : proportionnelle à min(largeur/1920, hauteur/1080), bornée [0.6667, 2] (720p → 4K).
// Texte : ne descend jamais sous ses planchers (--text-floor-*), géré en CSS par max().
// Densité : "compact" sous 900 px de haut ou 1500 px de large → les écrans changent de disposition.
// Aspect : data-aspect = "16:9" | "16:10" | "21:9" | "32:9" | "4:3" pour les cas particuliers.
import { writable } from './store';
const REF_W = 1920, REF_H = 1080, BASE = 16;
const state = writable({ scale: 1, density: 'regular', aspect: '16:9', width: REF_W, height: REF_H });
export const scaleState = state;
export function aspectOf(w, h) {
    const r = w / h;
    if (r < 1.45)
        return '4:3';
    if (r < 1.7)
        return '16:10';
    if (r < 2.1)
        return '16:9';
    if (r < 2.9)
        return '21:9';
    return '32:9';
}
export function computeScale(w, h, o = {}) {
    const { min = 0.6667, max = 2, userScale = 1, compactBelowHeight = 900, compactBelowWidth = 1500 } = o;
    const raw = Math.min(w / REF_W, h / REF_H) * userScale;
    const scale = Math.min(max, Math.max(min, raw));
    const density = h < compactBelowHeight || w < compactBelowWidth ? 'compact' : 'regular';
    return { scale, density, aspect: aspectOf(w, h), width: w, height: h };
}
let current = {};
let bound = false;
function update() {
    const s = computeScale(window.innerWidth, window.innerHeight, current);
    const root = document.documentElement;
    root.style.fontSize = `${(BASE * s.scale).toFixed(3)}px`;
    root.dataset.density = s.density;
    root.dataset.aspect = s.aspect;
    state.set(s);
}
/** À appeler une fois au démarrage de l'interface. Retourne une fonction de nettoyage. */
export function applyScale(options = {}) {
    current = { ...current, ...options };
    update();
    if (!bound) {
        window.addEventListener('resize', update);
        bound = true;
    }
    return () => { window.removeEventListener('resize', update); bound = false; };
}
/** Préférence joueur (0.85–1.25), par ex. depuis un menu de réglages. */
export function setUserScale(userScale) { applyScale({ userScale: Math.min(1.25, Math.max(0.85, userScale)) }); }
