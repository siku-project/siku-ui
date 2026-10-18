type Props = {
    key?: string;
    label: string;
    detail?: string;
    duration?: number;
    disabled?: boolean;
    oncomplete: () => void;
    progress?: number;
};
declare const HoldAction: import("svelte").Component<Props, {}, "progress">;
type HoldAction = ReturnType<typeof HoldAction>;
export default HoldAction;
