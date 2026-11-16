type Level = 'info' | 'success' | 'warning' | 'error' | 'debug' | 'muted' | 'trace' | 'warn' | 'fatal';
type Part = {
    text: string;
    color?: string;
    background?: string;
    bold?: boolean;
    dim?: boolean;
    italic?: boolean;
    underline?: boolean;
    tone?: Level;
};
type Line = {
    id: string | number;
    at?: string;
    text: string;
    parts?: Part[];
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
    selected?: string | number | null;
    highlight?: string;
    onfollow?: (v: boolean) => void;
    onreachtop?: () => void;
    onselect?: (line: Line) => void;
};
declare const LogView: import("svelte").Component<Props, {}, "selected" | "follow">;
type LogView = ReturnType<typeof LogView>;
export default LogView;
