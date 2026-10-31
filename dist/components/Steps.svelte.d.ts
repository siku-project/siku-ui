import type { StepItem } from '../types';
type Props = {
    steps: StepItem[];
    current?: string;
    reached?: string;
    orientation?: 'vertical' | 'horizontal';
    compact?: boolean;
    label?: string;
    onselect?: (id: string) => void;
};
declare const Steps: import("svelte").Component<Props, {}, "current">;
type Steps = ReturnType<typeof Steps>;
export default Steps;
