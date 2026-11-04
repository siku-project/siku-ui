import type { IconName } from '../icons/icons';
type Props = {
    title: string;
    detail?: string;
    icon?: IconName;
    value?: string;
    tone?: 'in' | 'neutral';
    meta?: string;
    selected?: boolean;
    onclick?: () => void;
};
declare const DataRow: import("svelte").Component<Props, {}, "">;
type DataRow = ReturnType<typeof DataRow>;
export default DataRow;
