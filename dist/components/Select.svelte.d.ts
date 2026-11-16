type Option = {
    value: string;
    label: string;
    detail?: string;
    disabled?: boolean;
    meta?: string;
};
type Props = {
    value?: string;
    options: Option[];
    label?: string;
    placeholder?: string;
    group?: string;
    disabled?: boolean;
    onchange?: (v: string) => void;
};
declare const Select: import("svelte").Component<Props, {}, "value">;
type Select = ReturnType<typeof Select>;
export default Select;
