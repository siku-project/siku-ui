/** true hors de FiveM (vite dev dans un navigateur). */
export const isBrowser = () => typeof window !== 'undefined' && !window.invokeNative;
export const resourceName = () => (window.GetParentResourceName ? window.GetParentResourceName() : 'siku-dev');
/** Appelle un RegisterNUICallback côté Lua. En navigateur, renvoie `mock` s'il est fourni. */
export async function fetchNui(event, data = {}, mock) {
    if (isBrowser()) {
        if (mock !== undefined)
            return mock;
        throw new Error(`fetchNui("${event}") hors de FiveM sans mock`);
    }
    const res = await fetch(`https://${resourceName()}/${event}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json; charset=UTF-8' }, body: JSON.stringify(data),
    });
    return res.json();
}
const handlers = new Map();
let listening = false;
function listen() {
    if (listening)
        return;
    listening = true;
    window.addEventListener('message', (e) => {
        const msg = e.data;
        if (!msg || typeof msg.type !== 'string')
            return;
        handlers.get(msg.type)?.forEach((h) => h(msg.data ?? msg));
    });
}
/** Écoute un SendNUIMessage({ type, data }). Retourne une fonction de désinscription. */
export function onNuiMessage(type, handler) {
    listen();
    if (!handlers.has(type))
        handlers.set(type, new Set());
    handlers.get(type).add(handler);
    return () => { handlers.get(type)?.delete(handler); };
}
/** Simule un message Lua (développement, tests). */
export function debugNui(type, data, delay = 0) {
    setTimeout(() => window.dispatchEvent(new MessageEvent('message', { data: { type, data } })), delay);
}
