import type { Snippet } from 'svelte';
type Props = {
    title?: string;
    scrim?: 'light' | 'standard' | 'edges';
    onclose?: () => void;
    header?: Snippet;
    children: Snippet;
};
declare const Screen: import("svelte").Component<Props, {}, "">;
type Screen = ReturnType<typeof Screen>;
export default Screen;
