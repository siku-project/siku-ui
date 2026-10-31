import type { SlotItem, MoveEvent } from '../types';
type Props = {
    id: string;
    items: (SlotItem | null)[];
    cols?: number;
    size?: 'sm' | 'md';
    label: string;
    selected?: number;
    hotbar?: number;
    locked?: number[];
    canDrop?: (item: SlotItem, index: number, fromContainer: string) => boolean;
    onmove?: (e: MoveEvent) => void;
    onactivate?: (index: number, item: SlotItem | null) => void;
    oncontext?: (index: number, e: MouseEvent) => void;
};
declare const SlotGrid: import("svelte").Component<Props, {}, "selected">;
type SlotGrid = ReturnType<typeof SlotGrid>;
export default SlotGrid;
