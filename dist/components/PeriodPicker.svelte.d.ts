type Option = {
    value: string;
    label: string;
    disabled?: boolean;
};
type Props = {
    value?: string;
    options?: Option[];
    updatedAt?: number | string | Date | null;
    refreshing?: boolean;
    label?: string;
    refreshLabel?: string;
    size?: 'sm' | 'md';
    ago?: (seconds: number) => string;
    onchange?: (v: string) => void;
    onrefresh?: () => void;
};
declare const PeriodPicker: import("svelte").Component<Props, {}, "value">;
type PeriodPicker = ReturnType<typeof PeriodPicker>;
export default PeriodPicker;
