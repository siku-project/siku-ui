type Option = {
    id: string;
    key: string;
    label: string;
    detail?: string;
    disabled?: boolean;
};
type Props = {
    options: Option[];
    selected?: number;
    anchor?: boolean;
    label?: string;
};
declare const Prompt: import("svelte").Component<Props, {}, "selected">;
type Prompt = ReturnType<typeof Prompt>;
export default Prompt;
