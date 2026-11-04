// SIKU — file de notifications. toast.push({...}) depuis n'importe où ; <Toaster /> les affiche.
import { writable } from './store';
const list = writable([]);
export const toasts = list;
let seq = 0;
const timers = new Map();
export const toast = {
    push(t) {
        const id = ++seq;
        const item = { duration: 5000, tone: 'neutral', ...t, id, createdAt: Date.now() };
        list.set([item, ...list.get()].slice(0, 6));
        if (item.duration && item.duration > 0)
            timers.set(id, setTimeout(() => toast.dismiss(id), item.duration));
        return id;
    },
    dismiss(id) { clearTimeout(timers.get(id)); timers.delete(id); list.set(list.get().filter((t) => t.id !== id)); },
    clear() { timers.forEach(clearTimeout); timers.clear(); list.set([]); },
};
