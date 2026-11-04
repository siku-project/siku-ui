import type { Snippet } from 'svelte';
type Props = {
    label?: string;
    arrow?: 'up' | 'down' | 'left' | 'right';
    pad?: boolean;
    size?: 'md' | 'lg';
    pressed?: boolean;
    onInverse?: boolean;
    children?: Snippet;
};
declare const Key: import("svelte").Component<Props, {}, "">;
type Key = ReturnType<typeof Key>;
export default Key;
