import { type Readable } from './store';
import type { IconName } from '../icons/icons';
export type ToastTone = 'neutral' | 'success' | 'danger' | 'warning' | 'live';
export type ToastItem = {
    id: number;
    title: string;
    body?: string;
    value?: string;
    time?: string;
    icon?: IconName;
    tone?: ToastTone;
    duration?: number;
    createdAt: number;
};
export declare const toasts: Readable<ToastItem[]>;
export declare const toast: {
    push(t: Omit<ToastItem, "id" | "createdAt">): number;
    dismiss(id: number): void;
    clear(): void;
};
