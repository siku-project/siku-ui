type Option = {
    value: string;
    label: string;
    disabled?: boolean;
};
type Props = {
    value?: string;
    options: Option[];
    name?: string;
    label?: string;
    orientation?: 'horizontal' | 'vertical';
};
declare const RadioGroup: import("svelte").Component<Props, {}, "value">;
type RadioGroup = ReturnType<typeof RadioGroup>;
export default RadioGroup;
