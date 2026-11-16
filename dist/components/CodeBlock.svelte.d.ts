import { type Language } from '../runtime/highlight';
type Props = {
    code: string;
    language?: Language;
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
