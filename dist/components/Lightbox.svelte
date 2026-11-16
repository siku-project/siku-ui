<!-- Lightbox — image ou média en très grand au-dessus de la page, sans la quitter. Échap, la croix en haut à droite et le voile ferment. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import Button from './Button.svelte';
  import { trapFocus } from '../runtime/focus';
  type Props = { open?: boolean; src?: string; alt?: string; title?: string; caption?: string; children?: Snippet; closeLabel?: string; onclose?: () => void };
  let { open = $bindable(false), src, alt = '', title, caption, children, closeLabel = 'Fermer', onclose }: Props = $props();
  const id = `sk-lb-${Math.random().toString(36).slice(2, 8)}`;
  function close() { open = false; onclose?.(); }
</script>
{#if open}
  <div class="sk-lightbox-layer" role="presentation" use:trapFocus={{ initial: '[data-autofocus]' }}
    onpointerdown={(e) => e.target === e.currentTarget && close()}
    onkeydown={(e) => { if (e.key === 'Escape') { close(); e.stopPropagation(); } }}>
    <div class="sk-lightbox__close"><Button variant="secondary" iconOnly icon="close" label={closeLabel} onclick={close} data-autofocus /></div>
    <div class="sk-lightbox" role="dialog" aria-modal="true" aria-label={title ?? alt ?? closeLabel} aria-describedby={caption ? `${id}-c` : undefined}>
      {#if children}{@render children()}{:else if src}<img class="sk-lightbox__media" {src} {alt} draggable="false" />{/if}
      {#if title || caption}
        <div class="sk-lightbox__caption">
          {#if title}<span class="sk-lightbox__title">{title}</span>{/if}
          {#if caption}<span class="sk-lightbox__meta" id="{id}-c">{caption}</span>{/if}
        </div>
      {/if}
    </div>
  </div>
{/if}
