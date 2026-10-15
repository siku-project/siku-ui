<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from './Button.svelte';
  import { trapFocus } from '../runtime/focus';
  type Props = { open?: boolean; title?: string; side?: 'left' | 'right'; size?: 'sm' | 'md' | 'lg'; children: Snippet; footer?: Snippet; onclose?: () => void; closeLabel?: string };
  let { open = $bindable(false), title, side = 'left', size = 'sm', children, footer, onclose, closeLabel = 'Fermer' }: Props = $props();
  const id = `sk-d-${Math.random().toString(36).slice(2, 8)}`;
  function close() { open = false; onclose?.(); }
</script>

{#if open}
  <div class="sk-drawer-layer" role="presentation" onpointerdown={(e) => e.target === e.currentTarget && close()}>
    <div class="sk-drawer sk-drawer--{side} sk-drawer--{size}" role="dialog" tabindex="-1" aria-modal="true" aria-labelledby={title ? `${id}-t` : undefined} aria-label={title ? undefined : closeLabel}
      use:trapFocus={{ initial: '.sk-drawer__body [href], .sk-drawer__body button:not([disabled]), .sk-drawer__body input' }}
      onkeydown={(e) => { if (e.key === 'Escape') { close(); e.stopPropagation(); } }}>
      <div class="sk-drawer__head">
        {#if title}<div class="sk-drawer__title" id="{id}-t">{title}</div>{/if}
        <Button variant="quiet" size="sm" iconOnly icon="close" label={closeLabel} onclick={close} />
      </div>
      <div class="sk-drawer__body">{@render children()}</div>
      {#if footer}<div class="sk-drawer__foot">{@render footer()}</div>{/if}
    </div>
  </div>
{/if}
