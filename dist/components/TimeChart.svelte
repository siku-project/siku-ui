<script lang="ts">
  import type { ChartSeries, ChartTone } from '../types';
  type Props = { series: ChartSeries[]; labels?: string[]; min?: number; max?: number; unit?: string; format?: (v: number) => string; height?: number; area?: boolean; rows?: number; legend?: boolean; label?: string };
  let { series, labels = [], min, max, unit = '', format = (v) => String(Math.round(v)), height = 160, area = true, rows = 4, legend = true, label }: Props = $props();
  const TONES: ChartTone[] = ['live', 'neutral', 'success', 'warning', 'danger'];
  const pad = $derived({ top: 8, right: 8, bottom: labels.length ? 24 : 8, left: 44 });
  let width = $state(0);
  const all = $derived(series.flatMap((s) => s.values));
  const lo = $derived(min ?? (all.length ? Math.min(...all) : 0));
  const hi = $derived(max ?? (all.length ? Math.max(...all) : 1));
  const span = $derived(hi - lo || 1);
  const plotW = $derived(Math.max(0, width - pad.left - pad.right));
  const plotH = $derived(Math.max(0, height - pad.top - pad.bottom));
  const x = (i: number, n: number) => pad.left + (n > 1 ? (i / (n - 1)) * plotW : plotW / 2);
  const y = (v: number) => pad.top + plotH - ((v - lo) / span) * plotH;
  const ticks = $derived(Array.from({ length: rows + 1 }, (_, k) => lo + (span * k) / rows));
  const drawn = $derived(series.map((s, i) => {
    const n = s.values.length;
    const pts = s.values.map((v, k) => `${x(k, n).toFixed(1)} ${y(v).toFixed(1)}`);
    const line = pts.map((pt, k) => `${k ? 'L' : 'M'}${pt}`).join(' ');
    const last = s.values[n - 1];
    return {
      ...s,
      tone: s.tone ?? TONES[i % TONES.length],
      line,
      areaPath: n ? `${line} L${x(n - 1, n).toFixed(1)} ${(pad.top + plotH).toFixed(1)} L${pad.left} ${(pad.top + plotH).toFixed(1)} Z` : '',
      cx: n ? x(n - 1, n) : 0,
      cy: n ? y(last) : 0,
      last
    };
  }));
</script>

<figure class="sk-chart" aria-label={label}>
  {#if legend}
    <div class="sk-chart__legend">
      {#each drawn as s (s.id)}
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
          <text class="sk-chart__tick" x={x(k, labels.length)} y={height - 6} text-anchor={k === 0 ? 'start' : k === labels.length - 1 ? 'end' : 'middle'}>{l}</text>
        {/each}
        {#each drawn as s (s.id)}
          <g class="sk-chart__series sk-tone--{s.tone}">
            {#if area && s.areaPath}<path class="sk-chart__area" d={s.areaPath} />{/if}
            {#if s.line}<path class="sk-chart__line" d={s.line} /><circle class="sk-chart__dot" cx={s.cx} cy={s.cy} r="2.5" />{/if}
          </g>
        {/each}
      </svg>
    {/if}
  </div>
</figure>
