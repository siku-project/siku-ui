type Props = {
    value: unknown;
    depth?: number;
    dense?: boolean;
    label?: string;
    toolbar?: boolean;
    expanded?: string[];
    maxString?: number;
    oncopy?: (path: string, value: unknown) => void;
    onfilter?: (path: string, value: unknown) => void;
};
declare const JsonTree: import("svelte").Component<Props, {}, "expanded">;
type JsonTree = ReturnType<typeof JsonTree>;
export default JsonTree;
