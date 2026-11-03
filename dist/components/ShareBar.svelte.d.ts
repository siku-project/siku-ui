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
    label?: string;
    legend?: boolean;
    height?: number;
    format?: (value: number, share: number) => string;
    state?: DataState;
    message?: string;
};
declare const ShareBar: import("svelte").Component<Props, {}, "">;
type ShareBar = ReturnType<typeof ShareBar>;
export default ShareBar;
