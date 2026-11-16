import { type Readable } from './store';
export type Density = 'compact' | 'regular';
export type Aspect = '4:3' | '16:10' | '16:9' | '21:9' | '32:9';
export type ScaleState = {
    scale: number;
    density: Density;
    aspect: Aspect;
    width: number;
    height: number;
};
export type ScaleOptions = {
    min?: number;
    max?: number;
    userScale?: number;
    compactBelowHeight?: number;
    compactBelowWidth?: number;
};
export declare const scaleState: Readable<ScaleState>;
export declare function aspectOf(w: number, h: number): Aspect;
export declare function computeScale(w: number, h: number, o?: ScaleOptions): ScaleState;
/** À appeler une fois au démarrage de l'interface. Retourne une fonction de nettoyage. */
export declare function applyScale(options?: ScaleOptions): () => void;
/** Préférence joueur (0.85–1.25), par ex. depuis un menu de réglages. */
export declare function setUserScale(userScale: number): void;
