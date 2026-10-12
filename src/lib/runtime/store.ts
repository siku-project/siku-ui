// Store minimal compatible avec le contrat Svelte ($store) sans dépendance.
export type Readable<T> = { subscribe(run: (v: T) => void): () => void; get(): T };
export function writable<T>(initial: T) {
  let value = initial;
  const subs = new Set<(v: T) => void>();
  return {
    subscribe(run: (v: T) => void) { subs.add(run); run(value); return () => { subs.delete(run); }; },
    get: () => value,
    set(v: T) { if (v === value) return; value = v; subs.forEach((s) => s(v)); },
  };
}
