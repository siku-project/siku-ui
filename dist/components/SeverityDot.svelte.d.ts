import { type Severity } from '../types';
type Props = {
    severity: Severity;
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    title?: string;
};
declare const SeverityDot: import("svelte").Component<Props, {}, "">;
type SeverityDot = ReturnType<typeof SeverityDot>;
export default SeverityDot;
