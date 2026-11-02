type Props = {
    code: string;
    wrap?: boolean;
    lineNumbers?: boolean;
    maxHeight?: number | string;
    copy?: boolean;
    label?: string;
    copyLabel?: string;
    copiedLabel?: string;
    oncopy?: (code: string) => void;
};
declare const CodeBlock: import("svelte").Component<Props, {}, "">;
type CodeBlock = ReturnType<typeof CodeBlock>;
export default CodeBlock;
