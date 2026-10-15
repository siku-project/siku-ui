import type { Snippet } from 'svelte';
type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom';
type Props = {
    corner: Corner;
    scrim?: boolean;
    besideMinimap?: boolean;
    children: Snippet;
};
declare const HudAnchor: import("svelte").Component<Props, {}, "">;
type HudAnchor = ReturnType<typeof HudAnchor>;
export default HudAnchor;
