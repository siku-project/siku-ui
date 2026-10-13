<!-- NavList — navigation latérale d'une fenêtre (comptes, catégories, sections). -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';
  type Item = { value: string; label: string; detail?: string; icon?: IconName; count?: number; group?: string; disabled?: boolean };
  type Props = { value?: string; items: Item[]; label?: string; onchange?: (v: string) => void };
  let { value = $bindable(''), items, label = 'Navigation', onchange }: Props = $props();
  let nav: HTMLElement;
  function onkey(e: KeyboardEvent) {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const btns = Array.from(nav.querySelectorAll<HTMLButtonElement>('button:not([disabled])'));
    const i = btns.indexOf(document.activeElement as HTMLButtonElement);
    btns[(i + (e.key === 'ArrowDown' ? 1 : -1) + btns.length) % btns.length]?.focus();
    e.preventDefault();
  }
</script>
<!-- svelte-ignore a11y_no_noninteractive_element_interactions (flèches haut/bas entre les entrées) -->
<nav class="sk-nav" aria-label={label} bind:this={nav} onkeydown={onkey}>
  {#each items as it, i (it.value)}
    {#if it.group && it.group !== items[i - 1]?.group}<div class="sk-nav__group">{it.group}</div>{/if}
    <button type="button" class="sk-nav__item sk-focusable" class:is-selected={it.value === value} aria-current={it.value === value ? 'page' : undefined}
      disabled={it.disabled} onclick={() => { value = it.value; onchange?.(it.value); }}>
      {#if it.icon}<Icon name={it.icon} />{/if}
      <span class="sk-nav__text">{it.label}{#if it.detail}<small>{it.detail}</small>{/if}</span>
      {#if it.count}<span class="sk-count">{it.count}</span>{/if}
    </button>
  {/each}
</nav>
