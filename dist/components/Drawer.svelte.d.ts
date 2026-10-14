import type { Snippet } from 'svelte';
type Props = {
    open?: boolean;
    title?: string;
    side?: 'left' | 'right';
    children: Snippet;
    onclose?: () => void;
    closeLabel?: string;
};
declare const Drawer: import("svelte").Component<Props, {}, "open">;
type Drawer = ReturnType<typeof Drawer>;
export default Drawer;
