import type { Snippet } from 'svelte';
import type { IconName } from '../icons/icons';
type Props = {
    label?: string;
    icon?: IconName;
    selected?: boolean;
    disabled?: boolean;
    count?: number;
    size?: 'sm' | 'md';
    children?: Snippet;
    onclick?: (e: MouseEvent) => void;
};
declare const Chip: import("svelte").Component<Props, {}, "">;
type Chip = ReturnType<typeof Chip>;
export default Chip;
