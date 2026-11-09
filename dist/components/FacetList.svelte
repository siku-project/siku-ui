<!-- FacetList — valeurs d’une dimension avec leur compte : cliquer ajoute ou retire le filtre ; une valeur indisponible reste visible mais désactivée, une valeur active se retire toujours. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import type { FacetItem } from '../types';
  type Props = { items: FacetItem[]; label?: string; dense?: boolean; mono?: boolean; format?: (count: number) => string; empty?: string; more?: string; onpick?: (item: FacetItem) => void; onmore?: () => void };
  let { items, label, dense = false, mono = false, format = (n) => String(n), empty = 'Aucune valeur', more, onpick, onmore }: Props = $props();
  let root = $state<HTMLUListElement | null>(null);
  function focusAt(i: number) {
    root?.querySelectorAll<HTMLButtonElement>('.sk-facet')[Math.max(0, Math.min(items.length - 1, i))]?.focus();
  }
  function onkey(e: KeyboardEvent, i: number) {
    if (e.key === 'ArrowDown') { e.preventDefault(); focusAt(i + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusAt(i - 1); }
    else if (e.key === 'Home') { e.preventDefault(); focusAt(0); }
    else if (e.key === 'End') { e.preventDefault(); focusAt(items.length - 1); }
  }
</script>

<ul class={['sk-facets', dense && 'is-dense', mono && 'is-mono'].filter(Boolean).join(' ')} aria-label={label} bind:this={root}>
  {#each items as item, i (item.value)}
    <li>
      <button type="button" class={['sk-facet sk-focusable', item.active && 'is-active', item.unavailable && 'is-unavailable'].filter(Boolean).join(' ')}
        aria-pressed={item.active ?? false} disabled={Boolean(item.unavailable) && !item.active} title={item.title} onclick={() => onpick?.(item)} onkeydown={(e) => onkey(e, i)}>
        <span class="sk-facet__mark" aria-hidden="true">{#if item.active}<Icon name="check" size="sm" />{/if}</span>
        <span class="sk-facet__label">{item.label ?? item.value}</span>
        {#if item.count !== undefined}<span class="sk-facet__count">{format(item.count)}</span>{/if}
      </button>
    </li>
  {:else}
    <li class="sk-facets__empty">{empty}</li>
  {/each}
  {#if more}<li><button type="button" class="sk-facets__more sk-focusable" onclick={() => onmore?.()}>{more}</button></li>{/if}
</ul>
