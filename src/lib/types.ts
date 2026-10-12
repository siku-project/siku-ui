import type { IconName } from './icons/icons';
/** Un objet dans un emplacement d'inventaire. */
export type SlotItem = { id?: string | number; name: string; icon: IconName; count?: number; label?: string; durability?: number };
/** Une entrée de Menu. */
export type MenuItem = { id: string; label: string; icon?: IconName; key?: string; meta?: string; disabled?: boolean; danger?: boolean; separatorBefore?: boolean; group?: string };
/** Événement de déplacement entre grilles d'emplacements. */
export type MoveEvent = { from: { container: string; index: number }; to: { container: string; index: number }; item: SlotItem };
