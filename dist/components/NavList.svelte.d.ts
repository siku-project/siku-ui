import type { IconName } from '../icons/icons';
type Item = {
    value: string;
    label: string;
    detail?: string;
    icon?: IconName;
    count?: number;
    group?: string;
    disabled?: boolean;
    href?: string;
};
type Props = {
    value?: string;
    items: Item[];
    label?: string;
    compact?: boolean;
    onchange?: (v: string) => void;
};
declare const NavList: import("svelte").Component<Props, {}, "value">;
type NavList = ReturnType<typeof NavList>;
export default NavList;
