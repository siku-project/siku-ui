import type { MenuItem } from '../types';
type Props = {
    items: MenuItem[];
    label: string;
    onselect: (id: string) => void;
    onclose?: () => void;
    autofocus?: boolean;
    x?: number;
    y?: number;
};
declare const Menu: import("svelte").Component<Props, {}, "">;
type Menu = ReturnType<typeof Menu>;
export default Menu;
