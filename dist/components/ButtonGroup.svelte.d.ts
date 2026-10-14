import type { Snippet } from 'svelte';
type Props = {
    align?: 'start' | 'end' | 'between' | 'stretch';
    children: Snippet;
    label?: string;
};
declare const ButtonGroup: import("svelte").Component<Props, {}, "">;
type ButtonGroup = ReturnType<typeof ButtonGroup>;
export default ButtonGroup;
