<!-- Table — tableau dense (effectifs, classements, journaux). Chiffres alignés à droite. -->
<script lang="ts" generics="Row extends Record<string, unknown>">
  import type { Snippet } from 'svelte';
  type Column = { key: string; label: string; align?: 'left' | 'right'; width?: string };
  type Props = { columns: Column[]; rows: Row[]; selected?: number; caption?: string; cell?: Snippet<[Row, Column]>; onselect?: (i: number) => void };
  let { columns, rows, selected = $bindable(-1), caption, cell, onselect }: Props = $props();
</script>
<table class="sk-table">
  {#if caption}<caption class="sk-visually-hidden">{caption}</caption>{/if}
  <thead><tr>{#each columns as c (c.key)}<th class:num={c.align === 'right'} style:width={c.width}>{c.label}</th>{/each}</tr></thead>
  <tbody>
    {#each rows as r, i}
      <tr class:is-selected={i === selected} onclick={() => { if (onselect) { selected = i; onselect(i); } }}>
        {#each columns as c (c.key)}<td class:num={c.align === 'right'}>{#if cell}{@render cell(r, c)}{:else}{r[c.key] ?? '—'}{/if}</td>{/each}
      </tr>
    {/each}
  </tbody>
</table>
