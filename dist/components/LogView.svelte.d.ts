type Level = 'info' | 'warning' | 'error' | 'debug' | 'muted';
type Line = {
    id: string | number;
    at?: string;
    text: string;
    level?: Level;
};
type Props = {
    lines: Line[];
    follow?: boolean;
    height?: number | string;
    wrap?: boolean;
    timestamps?: boolean;
    format?: (at: string) => string;
    empty?: string;
    label?: string;
    onfollow?: (v: boolean) => void;
    onreachtop?: () => void;
};
declare const LogView: import("svelte").Component<Props, {}, "follow">;
type LogView = ReturnType<typeof LogView>;
export default LogView;
