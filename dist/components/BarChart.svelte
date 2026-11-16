<!-- BarChart — barres par intervalle, groupées ou empilées, avec survol et états. -->
<script lang="ts">
  import type { ChartSeries, ChartTone, DataState } from '../types';
  import Skeleton from './Skeleton.svelte';
  type Props = { series: ChartSeries[]; labels?: string[]; stacked?: boolean; max?: number; unit?: string; format?: (v: number) => string; height?: number; rows?: number; legend?: boolean; label?: string; state?: DataState; message?: string; interactive?: boolean; onselect?: (index: number | null) => void };
  let { series, labels = [], stacked = false, max, unit = '', format = (v) => String(Math.round(v)), height = 160, rows = 4, legend = true, label, state: dataState = 'ready', message = '', interactive = true, onselect }: Props = $props();
  const TONES: ChartTone[] = ['live', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'chart-6'];
  const pad = $derived({ top: 8, right: 8, bottom: labels.length ? 24 : 8, left: 44 });
  let width = $state(0);
  let hover = $state<number | null>(null);
  const vals = (s: ChartSeries) => s.values ?? (s.points ?? []).map((p) => p.v ?? 0);
  const n = $derived(Math.max(0, ...series.map((s) => vals(s).length)));
  const tops = $derived(Array.from({ length: n }, (_, k) => stacked ? series.reduce((sum, s) => sum + (vals(s)[k] ?? 0), 0) : Math.max(0, ...series.map((s) => vals(s)[k] ?? 0))));
  const hi = $derived(max ?? (tops.length ? Math.max(1, ...tops) : 1));
  const plotW = $derived(Math.max(0, width - pad.left - pad.right));
  const plotH = $derived(Math.max(0, height - pad.top - pad.bottom));
  const slot = $derived(n ? plotW / n : plotW);
  const gap = $derived(Math.min(4, slot * 0.2));
  const groups = $derived(stacked ? 1 : Math.max(1, series.length));
  const barW = $derived(Math.max(1, (slot - gap) / groups));
  const y = (v: number) => pad.top + plotH - (Math.min(v, hi) / hi) * plotH;
  const ticks = $derived(Array.from({ length: rows + 1 }, (_, k) => (hi * k) / rows));
  const toned = $derived(series.map((s, i) => ({ ...s, tone: s.tone ?? TONES[i % TONES.length], values: vals(s), last: vals(s)[vals(s).length - 1] })));
  const bars = $derived(toned.flatMap((s, si) => s.values.map((v, k) => {
    const below = stacked ? toned.slice(0, si).reduce((sum, o) => sum + (o.values[k] ?? 0), 0) : 0;
    const x = pad.left + k * slot + gap / 2 + (stacked ? 0 : si * barW);
    const top = y(below + v);
    const bottom = y(below);
    return { key: `${s.id}:${k}`, k, tone: s.tone, x, y: top, w: barW, h: Math.max(0, bottom - top) };
  })));
  const hoverRows = $derived(hover === null ? [] : toned.map((s) => ({ id: s.id, label: s.label, tone: s.tone, value: s.values[hover!] === undefined ? '—' : format(s.values[hover!]) + unit })));
  function setHover(k: number | null) { if (k !== hover) { hover = k; onselect?.(k); } }
  function onmove(e: PointerEvent) {
    if (!interactive || !n) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const k = Math.floor((e.clientX - rect.left - pad.left) / (slot || 1));
    setHover(k >= 0 && k < n ? k : null);
  }
  function onkey(e: KeyboardEvent) {
    if (!interactive || !n) return;
    if (e.key === 'Escape') { setHover(null); return; }
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    setHover(hover === null ? (d > 0 ? 0 : n - 1) : Math.min(n - 1, Math.max(0, hover + d)));
  }
  const tipLeft = $derived(hover === null ? 0 : pad.left + hover * slot + slot / 2);
  const tipFlip = $derived(hover !== null && tipLeft > width * 0.6);
</script>

<figure class="sk-chart" aria-label={label}>
  {#if legend}
    <div class="sk-chart__legend">
      {#each toned as s (s.id)}
        <span class="sk-chart__key sk-tone--{s.tone}"><i></i>{s.label}{#if s.last !== undefined}<b>{format(s.last)}{unit}</b>{/if}</span>
      {/each}
    </div>
  {/if}
  <!-- Survol et clavier décrivent les intervalles. -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_no_noninteractive_tabindex -->
  <div class="sk-chart__plot" class:is-interactive={interactive && dataState === 'ready'} role="group" aria-label={label} tabindex={interactive && dataState === 'ready' ? 0 : undefined} bind:clientWidth={width} style:height="{height}px"
    onpointermove={onmove} onpointerleave={() => setHover(null)} onkeydown={onkey} onblur={() => setHover(null)}>
    {#if dataState === 'loading'}
      <div class="sk-chart__state"><Skeleton lines={3} /></div>
    {:else if dataState !== 'ready'}
      <div class="sk-chart__state sk-chart__state--text">{message || (dataState === 'empty' ? 'Aucune donnée' : 'Indisponible')}</div>
    {:else if width > 0}
      <svg {width} {height} viewBox="0 0 {width} {height}" role="img" aria-label={label}>
        {#each ticks as t, k (k)}
          <line class="sk-chart__grid" x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} />
          <text class="sk-chart__tick" x={pad.left - 8} y={y(t)} text-anchor="end" dominant-baseline="middle">{format(t)}{unit}</text>
        {/each}
        {#if hover !== null}<rect class="sk-chart__slot" x={pad.left + hover * slot} y={pad.top} width={slot} height={plotH} />{/if}
        {#each labels as l, k (k)}
          <text class="sk-chart__tick" x={pad.left + k * slot + slot / 2} y={height - 6} text-anchor="middle">{l}</text>
        {/each}
        {#each bars as b (b.key)}
          <rect class="sk-chart__bar sk-tone--{b.tone}" class:is-dim={hover !== null && hover !== b.k} x={b.x} y={b.y} width={b.w} height={b.h} rx="1" />
        {/each}
      </svg>
      {#if hover !== null && hoverRows.length}
        <div class="sk-chart__tip" class:is-flip={tipFlip} style:left="{tipLeft}px" role="status">
          {#if labels[hover]}<div class="sk-chart__tip-time">{labels[hover]}</div>{/if}
          {#each hoverRows as r (r.id)}<div class="sk-chart__tip-row sk-tone--{r.tone}"><i></i><span>{r.label}</span><b>{r.value}</b></div>{/each}
        </div>
      {/if}
    {/if}
  </div>
</figure>
