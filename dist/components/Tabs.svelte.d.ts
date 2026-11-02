type Tab = {
    value: string;
    label: string;
    count?: number;
    tone?: 'neutral' | 'live' | 'success' | 'warning' | 'danger';
    disabled?: boolean;
};
type Props = {
    value?: string;
    tabs: Tab[];
    variant?: 'underline' | 'pill';
    label?: string;
    shortcuts?: boolean;
    onchange?: (v: string) => void;
};
declare const Tabs: import("svelte").Component<Props, {}, "value">;
type Tabs = ReturnType<typeof Tabs>;
export default Tabs;
