<script lang="ts">
  import type { ChartSeries, ChartTone } from '../types';
  type Props = { series: ChartSeries[]; labels?: string[]; stacked?: boolean; max?: number; unit?: string; format?: (v: number) => string; height?: number; rows?: number; legend?: boolean; label?: string };
  let { series, labels = [], stacked = false, max, unit = '', format = (v) => String(Math.round(v)), height = 160, rows = 4, legend = true, label }: Props = $props();
  const TONES: ChartTone[] = ['live', 'neutral', 'success', 'warning', 'danger'];
  const pad = $derived({ top: 8, right: 8, bottom: labels.length ? 24 : 8, left: 44 });
  let width = $state(0);
  const n = $derived(Math.max(0, ...series.map((s) => s.values.length)));
  const tops = $derived(Array.from({ length: n }, (_, k) => stacked ? series.reduce((sum, s) => sum + (s.values[k] ?? 0), 0) : Math.max(0, ...series.map((s) => s.values[k] ?? 0))));
  const hi = $derived(max ?? (tops.length ? Math.max(1, ...tops) : 1));
  const plotW = $derived(Math.max(0, width - pad.left - pad.right));
  const plotH = $derived(Math.max(0, height - pad.top - pad.bottom));
  const slot = $derived(n ? plotW / n : plotW);
  const gap = $derived(Math.min(4, slot * 0.2));
  const groups = $derived(stacked ? 1 : Math.max(1, series.length));
  const barW = $derived(Math.max(1, (slot - gap) / groups));
  const y = (v: number) => pad.top + plotH - (Math.min(v, hi) / hi) * plotH;
  const ticks = $derived(Array.from({ length: rows + 1 }, (_, k) => (hi * k) / rows));
  const toned = $derived(series.map((s, i) => ({ ...s, tone: s.tone ?? TONES[i % TONES.length], last: s.values[s.values.length - 1] })));
  const bars = $derived(toned.flatMap((s, si) => s.values.map((v, k) => {
    const below = stacked ? toned.slice(0, si).reduce((sum, o) => sum + (o.values[k] ?? 0), 0) : 0;
    const x = pad.left + k * slot + gap / 2 + (stacked ? 0 : si * barW);
    const top = y(below + v);
    const bottom = y(below);
    return { key: `${s.id}:${k}`, tone: s.tone, x, y: top, w: barW, h: Math.max(0, bottom - top) };
  })));
</script>

<figure class="sk-chart" aria-label={label}>
  {#if legend}
    <div class="sk-chart__legend">
      {#each toned as s (s.id)}
        <span class="sk-chart__key sk-tone--{s.tone}"><i></i>{s.label}{#if s.last !== undefined}<b>{format(s.last)}{unit}</b>{/if}</span>
      {/each}
    </div>
  {/if}
  <div class="sk-chart__plot" bind:clientWidth={width} style:height="{height}px">
    {#if width > 0}
      <svg {width} {height} viewBox="0 0 {width} {height}" role="img" aria-label={label}>
        {#each ticks as t, k (k)}
          <line class="sk-chart__grid" x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} />
          <text class="sk-chart__tick" x={pad.left - 8} y={y(t)} text-anchor="end" dominant-baseline="middle">{format(t)}{unit}</text>
        {/each}
        {#each labels as l, k (k)}
          <text class="sk-chart__tick" x={pad.left + k * slot + slot / 2} y={height - 6} text-anchor="middle">{l}</text>
        {/each}
        {#each bars as b (b.key)}
          <rect class="sk-chart__bar sk-tone--{b.tone}" x={b.x} y={b.y} width={b.w} height={b.h} rx="1" />
        {/each}
      </svg>
    {/if}
  </div>
</figure>
