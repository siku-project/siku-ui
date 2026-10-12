// SIKU — clavier et manette.
// Le NUI ne reçoit pas la manette : le client Lua lit les contrôles et envoie
//   SendNUIMessage({ type = 'siku:nav', data = { key = 'up'|'down'|'left'|'right'|'confirm'|'back'|'prev'|'next'|'option' } })
// SIKU traduit ces messages en événements clavier sur l'élément focalisé : les composants
// n'ont qu'une seule logique (clavier), valable pour les deux entrées.
import { onNuiMessage } from './nui';
import { writable, type Readable } from './store';

export type InputMode = 'keyboard' | 'gamepad';
const mode = writable<InputMode>('keyboard');
export const inputMode: Readable<InputMode> = mode;

const KEYMAP: Record<string, { key: string; code: string; shiftKey?: boolean }> = {
  up: { key: 'ArrowUp', code: 'ArrowUp' }, down: { key: 'ArrowDown', code: 'ArrowDown' },
  left: { key: 'ArrowLeft', code: 'ArrowLeft' }, right: { key: 'ArrowRight', code: 'ArrowRight' },
  confirm: { key: 'Enter', code: 'Enter' }, back: { key: 'Escape', code: 'Escape' },
  prev: { key: 'q', code: 'KeyQ' }, next: { key: 'e', code: 'KeyE' }, option: { key: 'ContextMenu', code: 'ContextMenu' },
};

function setMode(m: InputMode) {
  mode.set(m);
  document.documentElement.dataset.input = m;
}

let started = false;
/** Active la traduction manette → clavier et le suivi du mode d'entrée. */
export function initInput(): () => void {
  if (started) return () => {};
  started = true;
  const kb = () => setMode('keyboard');
  window.addEventListener('keydown', kb, true);
  window.addEventListener('pointermove', kb, true);
  const stop = onNuiMessage<{ key: string }>('siku:nav', ({ key }) => {
    const k = KEYMAP[key];
    if (!k) return;
    setMode('gamepad');
    const target = (document.activeElement as HTMLElement | null) ?? document.body;
    const ev = new KeyboardEvent('keydown', { ...k, bubbles: true, cancelable: true });
    Object.defineProperty(ev, 'sikuGamepad', { value: true });
    const notPrevented = target.dispatchEvent(ev);
    if (notPrevented && k.key === 'Enter' && target instanceof HTMLElement) target.click();
    target.dispatchEvent(new KeyboardEvent('keyup', { ...k, bubbles: true }));
  });
  setMode('keyboard');
  return () => { window.removeEventListener('keydown', kb, true); window.removeEventListener('pointermove', kb, true); stop(); started = false; };
}

/** Le dernier événement vient-il de la manette ? */
export const fromGamepad = (e: Event) => Boolean((e as any).sikuGamepad);
