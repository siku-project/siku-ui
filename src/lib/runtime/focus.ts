// SIKU — focus : piège pour les modales, navigation en grille pour les emplacements.
const FOCUSABLE = 'button:not([disabled]),[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/** Action Svelte : use:trapFocus — garde le focus dans le nœud, le rend au précédent à la sortie. */
export function trapFocus(node: HTMLElement, options: { initial?: string } = {}) {
  const previous = document.activeElement as HTMLElement | null;
  const items = () => Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
  const first = options.initial ? node.querySelector<HTMLElement>(options.initial) : items()[0];
  queueMicrotask(() => (first ?? node).focus());
  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const list = items(); if (!list.length) return;
    const i = list.indexOf(document.activeElement as HTMLElement);
    const next = e.shiftKey ? (i <= 0 ? list.length - 1 : i - 1) : (i === list.length - 1 ? 0 : i + 1);
    list[next].focus(); e.preventDefault();
  };
  node.addEventListener('keydown', onKey);
  return { destroy() { node.removeEventListener('keydown', onKey); previous?.focus?.(); } };
}

/** Index suivant dans une grille de `cols` colonnes et `count` éléments. */
export function gridMove(index: number, key: string, cols: number, count: number): number {
  switch (key) {
    case 'ArrowRight': return Math.min(count - 1, index + 1);
    case 'ArrowLeft': return Math.max(0, index - 1);
    case 'ArrowDown': return index + cols < count ? index + cols : index;
    case 'ArrowUp': return index - cols >= 0 ? index - cols : index;
    case 'Home': return 0;
    case 'End': return count - 1;
    default: return index;
  }
}
