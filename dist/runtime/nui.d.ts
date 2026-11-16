declare global {
    interface Window {
        GetParentResourceName?: () => string;
        invokeNative?: unknown;
    }
}
/** true hors de FiveM (vite dev dans un navigateur). */
export declare const isBrowser: () => boolean;
export declare const resourceName: () => string;
/** Appelle un RegisterNUICallback côté Lua. En navigateur, renvoie `mock` s'il est fourni. */
export declare function fetchNui<T = unknown>(event: string, data?: unknown, mock?: T): Promise<T>;
type Handler<T> = (data: T) => void;
/** Écoute un SendNUIMessage({ type, data }). Retourne une fonction de désinscription. */
export declare function onNuiMessage<T = unknown>(type: string, handler: Handler<T>): () => void;
/** Simule un message Lua (développement, tests). */
export declare function debugNui<T>(type: string, data: T, delay?: number): void;
export {};
