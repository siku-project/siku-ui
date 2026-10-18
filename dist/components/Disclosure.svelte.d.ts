import type { Snippet } from 'svelte';
type Props = {
    title: string;
    open?: boolean;
    count?: number;
    dense?: boolean;
    children: Snippet;
    actions?: Snippet;
    ontoggle?: (open: boolean) => void;
};
declare const Disclosure: import("svelte").Component<Props, {}, "open">;
type Disclosure = ReturnType<typeof Disclosure>;
export default Disclosure;
