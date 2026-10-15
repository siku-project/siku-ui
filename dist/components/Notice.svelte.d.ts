import type { Snippet } from 'svelte';
import type { IconName } from '../icons/icons';
type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
type Props = {
    tone?: Tone;
    title?: string;
    icon?: IconName;
    children?: Snippet;
    text?: string;
};
declare const Notice: import("svelte").Component<Props, {}, "">;
type Notice = ReturnType<typeof Notice>;
export default Notice;
