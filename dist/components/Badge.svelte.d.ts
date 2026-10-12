import type { Snippet } from 'svelte';
import type { IconName } from '../icons/icons';
type Props = {
    tone?: 'neutral' | 'live' | 'success' | 'warning' | 'danger' | 'solid';
    icon?: IconName;
    label?: string;
    children?: Snippet;
};
declare const Badge: import("svelte").Component<Props, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
