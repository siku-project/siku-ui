import type { PickItem } from '../types';
type Props = {
    items: PickItem[];
    value?: string;
    label?: string;
    onchange?: (value: string) => void;
    onactivate?: (value: string) => void;
};
declare const PickList: import("svelte").Component<Props, {}, "value">;
type PickList = ReturnType<typeof PickList>;
export default PickList;
