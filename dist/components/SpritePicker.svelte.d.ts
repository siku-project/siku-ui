type Props = {
    image: string;
    count: number;
    columns: number;
    value?: number;
    label?: string;
    size?: number;
    shape?: 'round' | 'square';
    disabled?: boolean;
    format?: (index: number) => string;
    onchange?: (index: number) => void;
};
declare const SpritePicker: import("svelte").Component<Props, {}, "value">;
type SpritePicker = ReturnType<typeof SpritePicker>;
export default SpritePicker;
