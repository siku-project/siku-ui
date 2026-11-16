import type { TraceSpan } from '../types';
type Props = {
    spans: TraceSpan[];
    totalMs?: number;
    selected?: string | null;
    collapsed?: string[];
    rowHeight?: number;
    maxRows?: number;
    label?: string;
    formatDuration?: (ms: number) => string;
    onselect?: (span: TraceSpan) => void;
};
declare const TraceWaterfall: import("svelte").Component<Props, {}, "selected" | "collapsed">;
type TraceWaterfall = ReturnType<typeof TraceWaterfall>;
export default TraceWaterfall;
