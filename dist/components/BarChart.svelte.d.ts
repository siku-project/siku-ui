import type { ChartSeries } from '../types';
type Props = {
    series: ChartSeries[];
    labels?: string[];
    stacked?: boolean;
    max?: number;
    unit?: string;
    format?: (v: number) => string;
    height?: number;
    rows?: number;
    legend?: boolean;
    label?: string;
};
declare const BarChart: import("svelte").Component<Props, {}, "">;
type BarChart = ReturnType<typeof BarChart>;
export default BarChart;
