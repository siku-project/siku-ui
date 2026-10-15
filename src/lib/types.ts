import type { IconName } from './icons/icons';
/** Un objet dans un emplacement d'inventaire. */
export type SlotItem = { id?: string | number; name: string; icon: IconName; count?: number; label?: string; durability?: number };
/** Une entrée de Menu. */
export type MenuItem = { id: string; label: string; icon?: IconName; key?: string; meta?: string; disabled?: boolean; danger?: boolean; separatorBefore?: boolean; group?: string };
/** Événement de déplacement entre grilles d'emplacements. */
export type MoveEvent = { from: { container: string; index: number }; to: { container: string; index: number }; item: SlotItem };
export type ChartTone = 'neutral' | 'live' | 'success' | 'warning' | 'danger' | 'chart-1' | 'chart-2' | 'chart-3' | 'chart-4' | 'chart-5' | 'chart-6';
/** Un point daté : t en millisecondes epoch, v null pour un trou. */
export type ChartPoint = { t: number; v: number | null };
/** Une série : values (index régulier) ou points (axe temporel réel). */
export type ChartSeries = { id: string; label: string; values?: number[]; points?: ChartPoint[]; tone?: ChartTone; unit?: string; format?: (v: number) => string };
export type ChartThreshold = { value: number; label?: string; tone?: ChartTone };
export type ChartBand = { from: number; to: number; tone?: ChartTone; label?: string };
export type DataState = 'ready' | 'loading' | 'empty' | 'unavailable';
export type TimelineState = 'up' | 'down' | 'degraded' | 'unknown';
export type TimelineBucket = { t: number | string; state: TimelineState; ratio?: number; label?: string };
export type DataColumn = { key: string; label: string; align?: 'left' | 'right'; width?: string; sortable?: boolean; mono?: boolean; format?: (value: unknown, row: Record<string, unknown>) => string };
export type SortState = { key: string; dir: 'asc' | 'desc' };
