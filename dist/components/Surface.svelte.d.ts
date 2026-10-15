import type { Snippet } from 'svelte';
type Props = {
    level?: 'base' | 'raised' | 'sunken';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    radius?: 'none' | 'lg' | 'xl';
    elevated?: boolean;
    bordered?: boolean;
    as?: string;
    children: Snippet;
    class?: string;
};
declare const Surface: import("svelte").Component<Props, {}, "">;
type Surface = ReturnType<typeof Surface>;
export default Surface;
