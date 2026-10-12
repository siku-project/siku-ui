// SIKU — file de notifications. toast.push({...}) depuis n'importe où ; <Toaster /> les affiche.
import { writable, type Readable } from './store';
import type { IconName } from '../icons/icons';

export type ToastTone = 'neutral' | 'success' | 'danger' | 'warning' | 'live';
export type ToastItem = { id: number; title: string; body?: string; value?: string; time?: string; icon?: IconName; tone?: ToastTone; duration?: number; createdAt: number };

const list = writable<ToastItem[]>([]);
export const toasts: Readable<ToastItem[]> = list;
let seq = 0;
const timers = new Map<number, ReturnType<typeof setTimeout>>();

export const toast = {
  push(t: Omit<ToastItem, 'id' | 'createdAt'>): number {
    const id = ++seq;
    const item: ToastItem = { duration: 5000, tone: 'neutral', ...t, id, createdAt: Date.now() };
    list.set([item, ...list.get()].slice(0, 6));
    if (item.duration && item.duration > 0) timers.set(id, setTimeout(() => toast.dismiss(id), item.duration));
    return id;
  },
  dismiss(id: number) { clearTimeout(timers.get(id)); timers.delete(id); list.set(list.get().filter((t) => t.id !== id)); },
  clear() { timers.forEach(clearTimeout); timers.clear(); list.set([]); },
};
