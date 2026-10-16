import type { DataState, TimelineBucket } from '../types';
type Props = {
    buckets: TimelineBucket[];
    uptime?: number | null;
    label?: string;
    start?: string;
    end?: string;
    height?: number;
    state?: DataState;
    message?: string;
    format?: (b: TimelineBucket) => string;
    legend?: boolean;
};
declare const StatusTimeline: import("svelte").Component<Props, {}, "">;
type StatusTimeline = ReturnType<typeof StatusTimeline>;
export default StatusTimeline;
