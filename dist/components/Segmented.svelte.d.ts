type Option = {
    value: string;
    label: string;
    disabled?: boolean;
};
type Props = {
    value?: string;
    options: Option[];
    label?: string;
    size?: 'sm' | 'md';
    onchange?: (v: string) => void;
};
declare const Segmented: import("svelte").Component<Props, {}, "value">;
type Segmented = ReturnType<typeof Segmented>;
export default Segmented;
