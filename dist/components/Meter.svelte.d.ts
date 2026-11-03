type Props = {
    value: number;
    max?: number;
    tone?: 'neutral' | 'foreign' | 'live' | 'warning' | 'danger';
    size?: 'sm' | 'lg';
    label?: string;
    valueLabel?: string;
    unit?: string;
    warnAt?: number;
    ariaLabel?: string;
};
declare const Meter: import("svelte").Component<Props, {}, "">;
type Meter = ReturnType<typeof Meter>;
export default Meter;
