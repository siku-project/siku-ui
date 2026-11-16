import type { DataState, FlowColumn, FlowLink, FlowNode } from '../types';
type Props = {
    nodes: FlowNode[];
    links: FlowLink[];
    columns?: FlowColumn[];
    label: string;
    height?: number;
    nodeWidth?: number;
    gap?: number;
    format?: (value: number) => string;
    state?: DataState;
    message?: string;
    onselect?: (id: string | null) => void;
    onpick?: (id: string) => void;
};
declare const FlowChart: import("svelte").Component<Props, {}, "">;
type FlowChart = ReturnType<typeof FlowChart>;
export default FlowChart;
