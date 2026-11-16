type Props = {
    value?: number;
    min?: number;
    max: number;
    step?: number;
    label?: string;
    showMax?: boolean;
    onchange?: (v: number) => void;
};
declare const Stepper: import("svelte").Component<Props, {}, "value">;
type Stepper = ReturnType<typeof Stepper>;
export default Stepper;
