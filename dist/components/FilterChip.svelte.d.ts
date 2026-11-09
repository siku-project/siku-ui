import type { IconName } from '../icons/icons';
type Props = {
    label: string;
    value: string;
    exclude?: boolean;
    icon?: IconName;
    removable?: boolean;
    title?: string;
    removeLabel?: string;
    onremove?: () => void;
    ontoggle?: (exclude: boolean) => void;
};
declare const FilterChip: import("svelte").Component<Props, {}, "">;
type FilterChip = ReturnType<typeof FilterChip>;
export default FilterChip;
