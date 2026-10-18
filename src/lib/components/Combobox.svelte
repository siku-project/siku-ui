<script lang="ts">
  import { tick } from 'svelte';
  import type { ComboOption } from '../types';
  import Icon from './Icon.svelte';
  import Popover from './Popover.svelte';
  import Spinner from './Spinner.svelte';
  type Props = { options: ComboOption[]; value?: string | string[]; multiple?: boolean; search?: string; onsearch?: (q: string) => void; loading?: boolean; placeholder?: string; label?: string; empty?: string; inline?: boolean; max?: number; disabled?: boolean; searchLabel?: string; onchange?: (value: string | string[]) => void };
  let { options, value = $bindable(), multiple = false, search = $bindable(''), onsearch, loading = false, placeholder = 'Choisir…', label, empty = 'Aucun résultat', inline = false, max = 200, disabled = false, searchLabel = 'Rechercher', onchange }: Props = $props();
  const id = `sk-cb-${Math.random().toString(36).slice(2, 8)}`;
  let open = $state(false);
  let active = $state(0);
  let list = $state<HTMLDivElement | null>(null);
  const selectedSet = $derived(new Set(Array.isArray(value) ? value : value ? [value] : []));
  const filtered = $derived.by(() => {
    if (onsearch) return options;
    const q = search.trim().toLowerCase();
    return q ? options.filter((o) => o.label.toLowerCase().includes(q) || (o.detail ?? '').toLowerCase().includes(q) || o.value.toLowerCase().includes(q)) : options;
  });
  const shown = $derived(filtered.slice(0, max));
  const extra = $derived(filtered.length - shown.length);
  const summary = $derived.by(() => {
    const picked = options.filter((o) => selectedSet.has(o.value));
    if (!picked.length) return '';
    if (!multiple) return picked[0].label;
    return picked.length <= 2 ? picked.map((o) => o.label).join(', ') : `${picked.length} sélectionnés`;
  });
  const isSelected = (o: ComboOption) => selectedSet.has(o.value);
  function choose(o: ComboOption) {
    if (o.disabled) return;
    if (multiple) {
      const cur = Array.isArray(value) ? value : value ? [value] : [];
      value = cur.includes(o.value) ? cur.filter((v) => v !== o.value) : [...cur, o.value];
      onchange?.(value);
    } else {
      value = o.value;
      onchange?.(value);
      open = false;
    }
  }
  function step(d: number) {
    if (!shown.length) return;
    let i = active;
    for (let n = 0; n < shown.length; n++) { i = (i + d + shown.length) % shown.length; if (!shown[i].disabled) break; }
    active = i;
    tick().then(() => list?.querySelector<HTMLElement>(`[data-i="${active}"]`)?.scrollIntoView({ block: 'nearest' }));
  }
  function onkey(e: KeyboardEvent) {
    if (e.key === 'ArrowDown') step(1);
    else if (e.key === 'ArrowUp') step(-1);
    else if (e.key === 'Home') active = 0;
    else if (e.key === 'End') active = Math.max(0, shown.length - 1);
    else if (e.key === 'Enter') { const o = shown[active]; if (o) choose(o); }
    else return;
    e.preventDefault();
  }
  function oninput() { active = 0; onsearch?.(search); }
  $effect(() => { void shown.length; if (active >= shown.length) active = 0; });
</script>

{#snippet body()}
  <div class="sk-combo__search sk-input sk-input--sm">
    <Icon name="search" />
    <input class="sk-input__control" type="text" role="combobox" aria-expanded="true" aria-controls="{id}-list" aria-autocomplete="list" aria-label={searchLabel} placeholder={searchLabel}
      aria-activedescendant={shown[active] ? `${id}-o${active}` : undefined} bind:value={search} oninput={oninput} onkeydown={onkey} data-autofocus />
    {#if loading}<Spinner />{/if}
  </div>
  <div class="sk-combo__list" role="listbox" id="{id}-list" aria-multiselectable={multiple || undefined} aria-label={label} bind:this={list}>
    {#each shown as o, i (o.value)}
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div role="option" id="{id}-o{i}" data-i={i} tabindex="-1" aria-selected={isSelected(o)} aria-disabled={o.disabled || undefined}
        class={['sk-combo__opt', i === active && 'is-hover', isSelected(o) && 'is-selected', o.disabled && 'is-disabled'].filter(Boolean).join(' ')}
        onpointerenter={() => (active = i)} onclick={() => choose(o)}>
        {#if multiple}<span class="sk-check__box"><Icon name="check" size="sm" /></span>{/if}
        <span class="sk-combo__text"><span class="sk-combo__label">{o.label}</span>{#if o.detail}<span class="sk-combo__detail">{o.detail}</span>{/if}</span>
        {#if o.count !== undefined}<span class="sk-combo__count">{o.count}</span>{:else if !multiple && isSelected(o)}<Icon name="check" size="sm" />{/if}
      </div>
    {:else}
      <div class="sk-combo__empty">{loading ? '' : empty}</div>
    {/each}
    {#if extra > 0}<div class="sk-combo__more">+{extra}</div>{/if}
  </div>
{/snippet}

{#if inline}
  <div class="sk-combo is-inline" class:is-disabled={disabled}>
    {#if label}<span class="sk-field__label" id="{id}-l">{label}</span>{/if}
    {@render body()}
  </div>
{:else}
  <div class="sk-field sk-combo" class:is-disabled={disabled}>
    {#if label}<span class="sk-field__label" id="{id}-l">{label}</span>{/if}
    <Popover bind:open block matchWidth label={label ?? placeholder} onclose={() => { if (!onsearch) search = ''; }}>
      {#snippet trigger({ toggle, open: isOpen })}
        <button type="button" class="sk-select sk-focusable" class:is-open={isOpen} class:is-disabled={disabled} {disabled} aria-haspopup="dialog" aria-expanded={isOpen} aria-labelledby={label ? `${id}-l` : undefined} onclick={toggle}>
          <span>{#if summary}{summary}{:else}<span class="sk-input__ph">{placeholder}</span>{/if}</span>
          {#if multiple && selectedSet.size}<span class="sk-count">{selectedSet.size}</span>{/if}
          <Icon name="chevd" />
        </button>
      {/snippet}
      <div class="sk-combo__panel">{@render body()}</div>
    </Popover>
  </div>
{/if}
