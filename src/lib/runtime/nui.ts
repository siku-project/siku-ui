// SIKU — pont NUI (FiveM). Fonctionne aussi dans un navigateur classique pour le développement.
declare global { interface Window { GetParentResourceName?: () => string; invokeNative?: unknown } }

/** true hors de FiveM (vite dev dans un navigateur). */
export const isBrowser = (): boolean => typeof window !== 'undefined' && !window.invokeNative;
export const resourceName = (): string => (window.GetParentResourceName ? window.GetParentResourceName() : 'siku-dev');

/** Appelle un RegisterNUICallback côté Lua. En navigateur, renvoie `mock` s'il est fourni. */
export async function fetchNui<T = unknown>(event: string, data: unknown = {}, mock?: T): Promise<T> {
  if (isBrowser()) {
    if (mock !== undefined) return mock;
    throw new Error(`fetchNui("${event}") hors de FiveM sans mock`);
  }
  const res = await fetch(`https://${resourceName()}/${event}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json; charset=UTF-8' }, body: JSON.stringify(data),
  });
  return res.json() as Promise<T>;
}

type Handler<T> = (data: T) => void;
const handlers = new Map<string, Set<Handler<any>>>();
let listening = false;
function listen() {
  if (listening) return; listening = true;
  window.addEventListener('message', (e: MessageEvent) => {
    const msg = e.data;
    if (!msg || typeof msg.type !== 'string') return;
    handlers.get(msg.type)?.forEach((h) => h(msg.data ?? msg));
  });
}

/** Écoute un SendNUIMessage({ type, data }). Retourne une fonction de désinscription. */
export function onNuiMessage<T = unknown>(type: string, handler: Handler<T>): () => void {
  listen();
  if (!handlers.has(type)) handlers.set(type, new Set());
  handlers.get(type)!.add(handler);
  return () => { handlers.get(type)?.delete(handler); };
}

/** Simule un message Lua (développement, tests). */
export function debugNui<T>(type: string, data: T, delay = 0) {
  setTimeout(() => window.dispatchEvent(new MessageEvent('message', { data: { type, data } })), delay);
}
