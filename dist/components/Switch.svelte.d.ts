type Props = {
    checked?: boolean;
    label: string;
    description?: string;
    disabled?: boolean;
    onchange?: (v: boolean) => void;
};
declare const Switch: import("svelte").Component<Props, {}, "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
