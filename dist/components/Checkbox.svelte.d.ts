import type { Snippet } from 'svelte';
type Props = {
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    label?: string;
    children?: Snippet;
    onchange?: (v: boolean) => void;
};
declare const Checkbox: import("svelte").Component<Props, {}, "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
