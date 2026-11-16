import { type IconName } from '../icons/icons';
type Props = {
    name: IconName;
    size?: 'sm' | 'md' | 'lg' | number;
    label?: string;
    class?: string;
};
declare const Icon: import("svelte").Component<Props, {}, "">;
type Icon = ReturnType<typeof Icon>;
export default Icon;
