import type { IconName } from '../icons/icons';
import type { ToastTone } from '../runtime/toast';
type Props = {
    title: string;
    body?: string;
    value?: string;
    time?: string;
    icon?: IconName;
    tone?: ToastTone;
    compact?: boolean;
    progress?: number;
    dim?: boolean;
};
declare const Toast: import("svelte").Component<Props, {}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
