import type { ChartSeries } from '../types';
type Props = {
    series: ChartSeries[];
    labels?: string[];
    min?: number;
    max?: number;
    unit?: string;
    format?: (v: number) => string;
    height?: number;
    area?: boolean;
    rows?: number;
    legend?: boolean;
    label?: string;
};
declare const TimeChart: import("svelte").Component<Props, {}, "">;
type TimeChart = ReturnType<typeof TimeChart>;
export default TimeChart;
