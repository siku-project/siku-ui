import type { Snippet } from 'svelte';
type Props = {
    text: string;
    key?: string;
    placement?: 'top' | 'bottom';
    align?: 'center' | 'start' | 'end';
    children: Snippet;
    delay?: number;
};
declare const Tooltip: import("svelte").Component<Props, {}, "">;
type Tooltip = ReturnType<typeof Tooltip>;
export default Tooltip;
