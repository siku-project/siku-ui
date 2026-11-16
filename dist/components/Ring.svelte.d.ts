import type { Snippet } from 'svelte';
import type { ChartTone, DataState } from '../types';
type Props = {
    value: number | null;
    label: string;
    valueLabel?: string;
    caption?: string;
    tone?: ChartTone;
    size?: 'sm' | 'md' | 'lg';
    thickness?: number;
    state?: DataState;
    message?: string;
    children?: Snippet;
};
declare const Ring: import("svelte").Component<Props, {}, "">;
type Ring = ReturnType<typeof Ring>;
export default Ring;
