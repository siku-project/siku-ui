import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { IconName } from '../icons/icons';
type Props = Omit<HTMLInputAttributes, 'size' | 'value'> & {
    label?: string;
    value?: string | number;
    help?: string;
    error?: string;
    aside?: string;
    icon?: IconName;
    suffix?: string;
    end?: Snippet;
    size?: 'md' | 'sm';
    variant?: 'default' | 'amount';
};
declare const TextField: import("svelte").Component<Props, {}, "value">;
type TextField = ReturnType<typeof TextField>;
export default TextField;
