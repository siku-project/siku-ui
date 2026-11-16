import type { Snippet } from 'svelte';
type Props = {
    open?: boolean;
    src?: string;
    alt?: string;
    title?: string;
    caption?: string;
    children?: Snippet;
    closeLabel?: string;
    onclose?: () => void;
};
declare const Lightbox: import("svelte").Component<Props, {}, "open">;
type Lightbox = ReturnType<typeof Lightbox>;
export default Lightbox;
