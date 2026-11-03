<script lang="ts">
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';
  type Item = { value: string; label: string; detail?: string; icon?: IconName; count?: number; group?: string; disabled?: boolean; href?: string };
  type Props = { value?: string; items: Item[]; label?: string; compact?: boolean; onchange?: (v: string) => void };
  let { value = $bindable(''), items, label = 'Navigation', compact = false, onchange }: Props = $props();
  let nav: HTMLElement;
  function onkey(e: KeyboardEvent) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const entries = Array.from(nav.querySelectorAll<HTMLElement>('.sk-nav__item:not([disabled]):not([aria-disabled="true"])'));
    const i = entries.indexOf(document.activeElement as HTMLElement);
    entries[(i + (e.key === 'ArrowDown' ? 1 : -1) + entries.length) % entries.length]?.focus();
    e.preventDefault();
  }
  function pick(it: Item) { value = it.value; onchange?.(it.value); }
</script>

{#snippet content(it: Item)}
  {#if it.icon}<Icon name={it.icon} />{/if}
  <span class="sk-nav__text">{it.label}{#if it.detail}<small>{it.detail}</small>{/if}</span>
  {#if it.count}<span class="sk-count">{it.count}</span>{/if}
{/snippet}

<!-- svelte-ignore a11y_no_noninteractive_element_interactions (flèches haut/bas entre les entrées) -->
<nav class="sk-nav" class:sk-nav--compact={compact} aria-label={label} bind:this={nav} onkeydown={onkey}>
  {#each items as it, i (it.value)}
    {#if it.group && it.group !== items[i - 1]?.group}<div class="sk-nav__group">{it.group}</div>{/if}
    {#if it.href}
      <a href={it.disabled ? undefined : it.href} class="sk-nav__item sk-focusable" class:is-selected={it.value === value} class:is-disabled={it.disabled}
        aria-current={it.value === value ? 'page' : undefined} aria-disabled={it.disabled ? 'true' : undefined} title={compact ? it.label : undefined}
        onclick={() => pick(it)}>
        {@render content(it)}
      </a>
    {:else}
      <button type="button" class="sk-nav__item sk-focusable" class:is-selected={it.value === value} aria-current={it.value === value ? 'page' : undefined}
        disabled={it.disabled} title={compact ? it.label : undefined} onclick={() => pick(it)}>
        {@render content(it)}
      </button>
    {/if}
  {/each}
</nav>
