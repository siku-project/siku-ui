import { type Readable } from './store';
export type InputMode = 'keyboard' | 'gamepad';
export declare const inputMode: Readable<InputMode>;
/** Active la traduction manette → clavier et le suivi du mode d'entrée. */
export declare function initInput(): () => void;
/** Le dernier événement vient-il de la manette ? */
export declare const fromGamepad: (e: Event) => boolean;
