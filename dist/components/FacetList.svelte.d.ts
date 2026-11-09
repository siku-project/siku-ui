import type { FacetItem } from '../types';
type Props = {
    items: FacetItem[];
    label?: string;
    dense?: boolean;
    mono?: boolean;
    format?: (count: number) => string;
    empty?: string;
    more?: string;
    onpick?: (item: FacetItem) => void;
    onmore?: () => void;
};
declare const FacetList: import("svelte").Component<Props, {}, "">;
type FacetList = ReturnType<typeof FacetList>;
export default FacetList;
