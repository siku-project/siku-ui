type Item = {
    label: string;
    value: string;
    mono?: boolean;
    href?: string;
    copy?: boolean;
};
type Props = {
    items: Item[];
    columns?: 1 | 2 | 3;
    label?: string;
    copyLabel?: string;
    oncopy?: (item: Item) => void;
};
declare const DescriptionList: import("svelte").Component<Props, {}, "">;
type DescriptionList = ReturnType<typeof DescriptionList>;
export default DescriptionList;
