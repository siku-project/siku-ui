import type { Snippet } from 'svelte';
import type { ChartTone, DataState } from '../types';
type Segment = {
    id: string;
    label: string;
    value: number;
    tone?: ChartTone;
    hint?: string;
};
type Props = {
    segments: Segment[];
    label: string;
    size?: number;
    thickness?: number;
    legend?: boolean;
    valueLabel?: string;
    caption?: string;
    format?: (value: number, share: number) => string;
    state?: DataState;
    message?: string;
    onselect?: (id: string | null) => void;
    children?: Snippet;
};
declare const DonutChart: import("svelte").Component<Props, {}, "">;
type DonutChart = ReturnType<typeof DonutChart>;
export default DonutChart;
