export type GtaEnv = {
    safeZone?: number;
    minimap?: {
        x: number;
        y: number;
        w: number;
        h: number;
    };
    uiScale?: number;
};
export declare function applyEnv(env: GtaEnv): void;
/** Démarre l'échelle, l'environnement GTA (zone sûre, mini-carte) et le pont manette. À appeler une fois dans main.ts. */
export declare function initSiku(): () => void;
