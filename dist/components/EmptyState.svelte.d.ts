import type { Snippet } from 'svelte';
type Props = {
    title: string;
    children?: Snippet;
    action?: Snippet;
};
declare const EmptyState: import("svelte").Component<Props, {}, "">;
type EmptyState = ReturnType<typeof EmptyState>;
export default EmptyState;
