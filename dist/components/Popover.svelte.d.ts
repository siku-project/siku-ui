import type { Snippet } from 'svelte';
type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
type Props = {
    open?: boolean;
    placement?: Placement;
    trigger: Snippet<[{
        toggle: () => void;
        open: boolean;
    }]>;
    children: Snippet;
    onclose?: () => void;
    width?: number | 'trigger';
    matchWidth?: boolean;
    block?: boolean;
    label?: string;
    autofocus?: boolean;
};
declare const Popover: import("svelte").Component<Props, {}, "open">;
type Popover = ReturnType<typeof Popover>;
export default Popover;
