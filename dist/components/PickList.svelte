<!-- PickList — une entrée parmi quelques-unes, posée sur le jeu : personnages, sauvegardes, véhicules, serveurs. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import type { PickItem } from '../types';
  type Props = { items: PickItem[]; value?: string; label?: string; onchange?: (value: string) => void; onactivate?: (value: string) => void };
  let { items, value = $bindable(''), label = 'Choix', onchange, onactivate }: Props = $props();
  let root: HTMLDivElement;
  const index = $derived(items.findIndex((it) => it.value === value));
  const focusIndex = $derived(index >= 0 ? index : Math.max(0, items.findIndex((it) => !it.disabled)));
  function pick(i: number, focus = false) {
    const it = items[i];
    if (!it || it.disabled) return;
    if (it.value !== value) {
      value = it.value;
      onchange?.(it.value);
    }
    if (focus) queueMicrotask(() => root.querySelector<HTMLElement>('[role="option"][tabindex="0"]')?.focus());
  }
  function step(dir: 1 | -1) {
    if (index < 0) return pick(focusIndex, true);
    for (let n = 1; n <= items.length; n++) {
      const i = (index + dir * n + items.length) % items.length;
      if (!items[i].disabled) return pick(i, true);
    }
  }
  function onkey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') step(1);
    else if (e.key === 'ArrowUp') step(-1);
    else if (e.key === 'Home') pick(items.findIndex((it) => !it.disabled), true);
    else if (e.key === 'End') pick(items.length - 1 - [...items].reverse().findIndex((it) => !it.disabled), true);
    else if (e.key === 'Enter' && onactivate && index >= 0) onactivate(items[index].value);
    else return;
    e.preventDefault();
  }
</script>
<div class="sk-pick" role="listbox" tabindex="-1" aria-label={label} aria-orientation="vertical" bind:this={root} onkeydown={onkey}>
  {#each items as it, i (it.value)}
    <button type="button" role="option" aria-selected={i === index} aria-disabled={it.disabled || undefined} tabindex={i === focusIndex ? 0 : -1}
      class={['sk-pick__item sk-focusable', i === index && 'is-selected', it.empty && 'sk-pick__item--empty'].filter(Boolean).join(' ')}
      disabled={it.disabled} onclick={() => pick(i)} ondblclick={() => onactivate?.(it.value)}>
      <span class="sk-pick__lead">{#if it.icon}<Icon name={it.icon} />{:else}<span class="sk-pick__num">{i + 1}</span>{/if}</span>
      <span class="sk-pick__text"><span class="sk-pick__label">{it.label}</span>{#if it.detail}<small>{it.detail}</small>{/if}</span>
      {#if it.meta}<span class="sk-pick__meta">{it.meta}</span>{/if}
      <i class="sk-pick__mark" aria-hidden="true"></i>
    </button>
  {/each}
</div>
