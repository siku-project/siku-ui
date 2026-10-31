type Props = {
    colors: string[];
    value?: number;
    label?: string;
    size?: 'sm' | 'md';
    disabled?: boolean;
    format?: (index: number) => string;
    onchange?: (index: number) => void;
};
declare const SwatchPicker: import("svelte").Component<Props, {}, "value">;
type SwatchPicker = ReturnType<typeof SwatchPicker>;
export default SwatchPicker;
