<!-- DataTable — tableau triable, lignes sélectionnables au clavier, états de données, en-tête collant. -->
<script lang="ts" generics="Row extends Record<string, unknown>">
  import type { Snippet } from 'svelte';
  import { tick } from 'svelte';
  import type { DataColumn, DataState, SortState } from '../types';
  import Skeleton from './Skeleton.svelte';
  import Icon from './Icon.svelte';
  type Props = { columns: DataColumn[]; rows: Row[]; sort?: SortState | null; rowKey?: (row: Row, index: number) => string | number; selected?: string | number | null; caption?: string; empty?: string; state?: DataState; message?: string; dense?: boolean; sticky?: boolean; maxHeight?: string; virtual?: boolean; rowHeight?: number; cell?: Snippet<[Row, DataColumn]>; onselect?: (row: Row, index: number) => void; onsort?: (sort: SortState) => void };
  let { columns, rows, sort = $bindable(null), rowKey = (_, i) => i, selected = $bindable(null), caption, empty = 'Aucune ligne', state: dataState = 'ready', message = '', dense = false, sticky = false, maxHeight, virtual = false, rowHeight, cell, onselect, onsort }: Props = $props();
  const OVERSCAN = 10;
  const ordered = $derived.by(() => {
    if (!sort || onsort) return rows;
    const { key, dir } = sort;
    const sign = dir === 'asc' ? 1 : -1;
    return [...rows].sort((a, b) => {
      const va = a[key], vb = b[key];
      if (va === vb) return 0;
      if (va === null || va === undefined) return 1;
      if (vb === null || vb === undefined) return -1;
      if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * sign;
      return String(va).localeCompare(String(vb)) * sign;
    });
  });
  const rh = $derived(rowHeight ?? (dense ? 34 : 44));
  const windowed = $derived(virtual && !!maxHeight);
  let box = $state<HTMLDivElement | null>(null);
  let scrollTop = $state(0);
  let viewH = $state(0);
  const start = $derived(windowed ? Math.max(0, Math.floor(scrollTop / rh) - OVERSCAN) : 0);
  const end = $derived(windowed ? Math.min(ordered.length, Math.ceil((scrollTop + viewH) / rh) + OVERSCAN) : ordered.length);
  const slice = $derived(windowed ? ordered.slice(start, end) : ordered);
  function toggleSort(c: DataColumn) {
    if (!c.sortable) return;
    const next: SortState = sort && sort.key === c.key ? { key: c.key, dir: sort.dir === 'asc' ? 'desc' : 'asc' } : { key: c.key, dir: c.align === 'right' ? 'desc' : 'asc' };
    sort = next;
    onsort?.(next);
  }
  function pick(row: Row, i: number) { if (!onselect) return; selected = rowKey(row, i); onselect(row, i); }
  function reveal(i: number) {
    if (!box || !windowed) return;
    const top = i * rh;
    if (top < box.scrollTop) box.scrollTop = top;
    else if (top + rh > box.scrollTop + box.clientHeight) box.scrollTop = top + rh - box.clientHeight;
  }
  async function focusRow(i: number) {
    if (i < 0 || i >= ordered.length) return;
    reveal(i);
    await tick();
    const row = box?.querySelector<HTMLElement>(`tr[data-i="${i}"]`);
    if (row) { row.focus(); if (!windowed) row.scrollIntoView({ block: 'nearest' }); }
  }
  function onkey(e: KeyboardEvent, r: Row, i: number) {
    if (!onselect) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(r, i); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); focusRow(i + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusRow(i - 1); }
    else if (e.key === 'Home') { e.preventDefault(); focusRow(0); }
    else if (e.key === 'End') { e.preventDefault(); focusRow(ordered.length - 1); }
  }
  $effect(() => {
    if (!windowed || selected === null) return;
    const i = ordered.findIndex((r, k) => rowKey(r, k) === selected);
    if (i >= 0) reveal(i);
  });
  const text = (row: Row, c: DataColumn) => (c.format ? c.format(row[c.key], row) : row[c.key] === null || row[c.key] === undefined ? '—' : String(row[c.key]));
</script>

<div class={['sk-datatable', dense && 'is-dense', sticky && 'is-sticky', windowed && 'is-virtual'].filter(Boolean).join(' ')} style:max-height={maxHeight} bind:this={box} bind:clientHeight={viewH} onscroll={() => { if (box) scrollTop = box.scrollTop; }}>
  <table class="sk-table">
    {#if caption}<caption class="sk-visually-hidden">{caption}</caption>{/if}
    <thead>
      <tr>
        {#each columns as c (c.key)}
          <th class:num={c.align === 'right'} style:width={c.width} aria-sort={sort && sort.key === c.key ? (sort.dir === 'asc' ? 'ascending' : 'descending') : undefined}>
            {#if c.sortable}
              <button type="button" class="sk-datatable__sort" class:is-active={sort?.key === c.key} onclick={() => toggleSort(c)}>{c.label}{#if sort && sort.key === c.key}<Icon name={sort.dir === 'asc' ? 'arrow-up' : 'arrow-down'} size="sm" />{/if}</button>
            {:else}{c.label}{/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#if dataState === 'loading'}
        {#each [0, 1, 2] as i (i)}<tr>{#each columns as c (c.key)}<td><Skeleton height="0.875rem" width={c.align === 'right' ? '40%' : '70%'} /></td>{/each}</tr>{/each}
      {:else if dataState !== 'ready' || !ordered.length}
        <tr><td class="sk-datatable__empty" colspan={columns.length}>{dataState === 'ready' ? empty : message || (dataState === 'empty' ? empty : 'Indisponible')}</td></tr>
      {:else}
        {#if windowed && start > 0}<tr class="sk-datatable__spacer" aria-hidden="true" style:height="{start * rh}px"><td colspan={columns.length}></td></tr>{/if}
        {#each slice as r, k (rowKey(r, start + k))}
          {@const i = start + k}
          <!-- svelte-ignore a11y_no_noninteractive_tabindex (ligne sélectionnable seulement quand onselect est fourni) -->
          <tr data-i={i} class:is-selected={selected !== null && selected === rowKey(r, i)} class:is-selectable={!!onselect} tabindex={onselect ? 0 : undefined} style:height={windowed ? `${rh}px` : undefined} onclick={() => pick(r, i)} onkeydown={(e) => onkey(e, r, i)}>
            {#each columns as c (c.key)}<td class:num={c.align === 'right'} class:mono={c.mono}>{#if cell}{@render cell(r, c)}{:else}{text(r, c)}{/if}</td>{/each}
          </tr>
        {/each}
        {#if windowed && end < ordered.length}<tr class="sk-datatable__spacer" aria-hidden="true" style:height="{(ordered.length - end) * rh}px"><td colspan={columns.length}></td></tr>{/if}
      {/if}
    </tbody>
  </table>
</div>
