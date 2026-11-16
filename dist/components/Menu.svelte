<!-- Menu — menu contextuel ou liste d'actions. Flèches, Entrée, Échap ; raccourcis affichés. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import type { MenuItem } from '../types';
  type Props = { items: MenuItem[]; label: string; onselect: (id: string) => void; onclose?: () => void; autofocus?: boolean; x?: number; y?: number };
  let { items, label, onselect, onclose, autofocus = true, x, y }: Props = $props();
  let el: HTMLDivElement;
  // svelte-ignore state_referenced_locally
  let active = $state(items.findIndex((i) => !i.disabled));
  $effect(() => { if (autofocus) el.focus(); });
  function step(d: number) { let i = active; for (let n = 0; n < items.length; n++) { i = (i + d + items.length) % items.length; if (!items[i].disabled) break; } active = i; }
  function onkey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') step(1); else if (e.key === 'ArrowUp') step(-1);
    else if (e.key === 'Enter') { const it = items[active]; if (it && !it.disabled) onselect(it.id); }
    else if (e.key === 'Escape') onclose?.();
    else { const hit = items.find((i) => !i.disabled && i.key && i.key.toLowerCase() === e.key.toLowerCase()); if (hit) onselect(hit.id); else return; }
    e.preventDefault(); e.stopPropagation();
  }
</script>
<div class="sk-menu sk-focusable" role="menu" aria-label={label} tabindex="0" bind:this={el} onkeydown={onkey}
  style:position={x !== undefined ? 'absolute' : undefined} style:left={x !== undefined ? `${x}px` : undefined} style:top={y !== undefined ? `${y}px` : undefined}
  aria-activedescendant={items[active] ? `mi-${items[active].id}` : undefined}>
  {#each items as it, i (it.id)}
    {#if it.separatorBefore}<div class="sk-menu__sep" role="separator"></div>{/if}
    {#if it.group && it.group !== items[i - 1]?.group}<div class="sk-menu__group">{it.group}</div>{/if}
    <!-- svelte-ignore a11y_click_events_have_key_events (clavier géré par le menu) -->
    <div id="mi-{it.id}" role="menuitem" tabindex="-1" aria-disabled={it.disabled}
      class={['sk-menu__item', i === active && 'is-hover', it.disabled && 'is-disabled', it.danger && 'sk-menu__item--danger'].filter(Boolean).join(' ')}
      onpointerenter={() => !it.disabled && (active = i)} onclick={() => !it.disabled && onselect(it.id)}>
      {#if it.icon}<Icon name={it.icon} />{/if}{it.label}
      <span class="sk-menu__end">{#if it.meta}{it.meta}{/if}{#if it.key}<kbd class="sk-key">{it.key}</kbd>{/if}</span>
    </div>
  {/each}
</div>
