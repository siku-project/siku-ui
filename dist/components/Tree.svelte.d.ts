import type { IconName } from '../icons/icons';
type Tone = 'neutral' | 'live' | 'success' | 'warning' | 'danger';
export type TreeNode = {
    id: string;
    label: string;
    icon?: IconName;
    meta?: string;
    count?: number;
    tone?: Tone;
    disabled?: boolean;
    children?: TreeNode[];
};
type Props = {
    nodes: TreeNode[];
    selected?: string | null;
    expanded?: string[];
    label?: string;
    dense?: boolean;
    onselect?: (node: TreeNode) => void;
    ontoggle?: (id: string, open: boolean) => void;
};
declare const Tree: import("svelte").Component<Props, {}, "selected" | "expanded">;
type Tree = ReturnType<typeof Tree>;
export default Tree;
