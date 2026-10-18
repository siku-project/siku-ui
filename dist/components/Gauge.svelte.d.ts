import type { IconName } from '../icons/icons';
type Kind = 'health' | 'armor' | 'hunger' | 'thirst' | 'stress' | 'stamina' | 'custom';
type Props = {
    kind?: Kind;
    value: number;
    icon?: IconName;
    label?: string;
    critical?: number;
    showValue?: boolean;
};
declare const Gauge: import("svelte").Component<Props, {}, "">;
type Gauge = ReturnType<typeof Gauge>;
export default Gauge;
