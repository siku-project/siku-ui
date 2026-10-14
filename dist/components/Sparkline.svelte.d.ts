import type { ChartTone } from '../types';
type Props = {
    values: number[];
    tone?: ChartTone;
    width?: number;
    height?: number;
    area?: boolean;
    min?: number;
    max?: number;
    label?: string;
};
declare const Sparkline: import("svelte").Component<Props, {}, "">;
type Sparkline = ReturnType<typeof Sparkline>;
export default Sparkline;
