type Props = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    label: string;
    format?: (v: number) => string;
    disabled?: boolean;
    minLabel?: string;
    maxLabel?: string;
    centered?: boolean;
    onchange?: (v: number) => void;
};
declare const Slider: import("svelte").Component<Props, {}, "value">;
type Slider = ReturnType<typeof Slider>;
export default Slider;
