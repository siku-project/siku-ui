export function writable(initial) {
    let value = initial;
    const subs = new Set();
    return {
        subscribe(run) { subs.add(run); run(value); return () => { subs.delete(run); }; },
        get: () => value,
        set(v) { if (v === value)
            return; value = v; subs.forEach((s) => s(v)); },
    };
}
