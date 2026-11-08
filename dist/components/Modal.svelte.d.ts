import type { Snippet } from 'svelte';
type Props = {
    open?: boolean;
    title: string;
    children?: Snippet;
    actions?: Snippet;
    dismissible?: boolean;
    onclose?: () => void;
    scrim?: boolean;
};
declare const Modal: import("svelte").Component<Props, {}, "open">;
type Modal = ReturnType<typeof Modal>;
export default Modal;
