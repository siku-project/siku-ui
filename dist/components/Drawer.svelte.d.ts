import type { Snippet } from 'svelte';
type Props = {
    open?: boolean;
    title?: string;
    side?: 'left' | 'right';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    docked?: boolean;
    width?: number;
    children: Snippet;
    footer?: Snippet;
    onclose?: () => void;
    closeLabel?: string;
};
declare const Drawer: import("svelte").Component<Props, {}, "open">;
type Drawer = ReturnType<typeof Drawer>;
export default Drawer;
