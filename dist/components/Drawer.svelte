<!-- Drawer — panneau latéral posé sur la page (voile, piège de focus, glissement) ou ancré dans le flux (docked). -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import { fade } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Button from './Button.svelte';
  import Tooltip from './Tooltip.svelte';
  import { trapFocus } from '../runtime/focus';
  type Props = { open?: boolean; title?: string; side?: 'left' | 'right'; size?: 'sm' | 'md' | 'lg' | 'xl'; docked?: boolean; width?: number; children: Snippet; footer?: Snippet; onclose?: () => void; closeLabel?: string };
  let { open = $bindable(false), title, side = 'left', size = 'sm', docked = false, width, children, footer, onclose, closeLabel = 'Fermer' }: Props = $props();
  const id = `sk-d-${Math.random().toString(36).slice(2, 8)}`;
  const FADE_MS = 200;
  const SLIDE_MS = 320;
  function close() { open = false; onclose?.(); }
  function onkey(e: KeyboardEvent) { if (e.key === 'Escape') { close(); e.stopPropagation(); } }
  function slide(_node: HTMLElement, params: { side: 'left' | 'right' }) {
    const direction = params.side === 'right' ? 1 : -1;
    return { duration: SLIDE_MS, easing: cubicOut, css: (t: number) => `transform: translateX(${(1 - t) * 100 * direction}%)` };
  }
  $effect(() => {
    if (!open || docked || typeof document === 'undefined') return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  });
</script>

{#snippet panel()}
  <div class="sk-drawer__head">
    {#if title}<div class="sk-drawer__title" id="{id}-t">{title}</div>{/if}
    <Tooltip text={closeLabel} key="Échap"><Button variant="quiet" size="sm" iconOnly icon="close" label={closeLabel} onclick={close} /></Tooltip>
  </div>
  <div class="sk-drawer__body">{@render children()}</div>
  {#if footer}<div class="sk-drawer__foot">{@render footer()}</div>{/if}
{/snippet}

{#if open && docked}
  <div class="sk-drawer sk-drawer--docked sk-drawer--{side} sk-drawer--{size}" role="dialog" tabindex="-1" aria-labelledby={title ? `${id}-t` : undefined} aria-label={title ? undefined : closeLabel}
    style:width={width ? `${width}px` : undefined} onkeydown={onkey}>
    {@render panel()}
  </div>
{:else if open}
  <div class="sk-drawer-layer" role="presentation" transition:fade={{ duration: FADE_MS }} onpointerdown={(e) => e.target === e.currentTarget && close()}>
    <div class="sk-drawer sk-drawer--{side} sk-drawer--{size}" role="dialog" tabindex="-1" aria-modal="true" aria-labelledby={title ? `${id}-t` : undefined} aria-label={title ? undefined : closeLabel}
      style:width={width ? `min(${width}px, 94vw)` : undefined} transition:slide={{ side }}
      use:trapFocus={{ initial: '.sk-drawer__body [href], .sk-drawer__body button:not([disabled]), .sk-drawer__body input' }} onkeydown={onkey}>
      {@render panel()}
    </div>
  </div>
{/if}
