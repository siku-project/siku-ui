<!-- Modal — confirmation d'une action irréversible ou coûteuse. Échap ferme ; le focus arrive sur l'action la moins destructrice. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from './Button.svelte';
  import { trapFocus } from '../runtime/focus';
  type Props = { open?: boolean; title: string; children?: Snippet; actions?: Snippet; dismissible?: boolean; onclose?: () => void; scrim?: boolean };
  let { open = $bindable(false), title, children, actions, dismissible = true, onclose, scrim = true }: Props = $props();
  const id = `sk-m-${Math.random().toString(36).slice(2, 8)}`;
  function close() { if (!dismissible) return; open = false; onclose?.(); }
</script>
{#if open}
  <div class="sk-modal-layer" role="presentation" class:has-scrim={scrim} onpointerdown={(e) => e.target === e.currentTarget && close()}>
    <div class="sk-modal" role="dialog" tabindex="-1" aria-modal="true" aria-labelledby="{id}-t" use:trapFocus={{ initial: '[data-autofocus]' }}
      onkeydown={(e) => { if (e.key === 'Escape') { close(); e.stopPropagation(); } }}>
      <div class="sk-modal__head"><div class="sk-modal__title" id="{id}-t">{title}</div>
        {#if dismissible}<Button variant="quiet" size="sm" iconOnly icon="close" label="Fermer" onclick={close} tabindex={-1} />{/if}</div>
      {#if children}<div class="sk-modal__body">{@render children()}</div>{/if}
      {#if actions}<div class="sk-modal__foot">{@render actions()}</div>{/if}
    </div>
  </div>
{/if}
