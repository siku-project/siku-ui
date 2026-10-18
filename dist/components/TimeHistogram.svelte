<script lang="ts">
  import type { ChartTone, DataState, HistogramSeries, TimeRange } from '../types';
  import Skeleton from './Skeleton.svelte';
  type Props = { series: HistogramSeries[]; from?: number; to?: number; step: number; height?: number; format?: (v: number) => string; formatTime?: (t: number) => string; unit?: string; label?: string; state?: DataState; message?: string; legend?: boolean; brush?: TimeRange | null; onpick?: (t: number) => void; onbrush?: (range: TimeRange | null) => void };
  let { series, from, to, step, height = 140, format = (v) => String(Math.round(v)), formatTime, unit = '', label, state: dataState = 'ready', message = '', legend = true, brush = $bindable(null), onpick, onbrush }: Props = $props();
  const TONES: ChartTone[] = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'chart-6'];
  const pad = { top: 8, right: 8, bottom: 24, left: 44 };
  let width = $state(0);
  let hidden = $state<number[]>([]);
  let hover = $state<number | null>(null);
  let drag = $state<{ a: number; b: number; x: number; moved: boolean } | null>(null);
  const toned = $derived(series.map((s, i) => ({ ...s, i, tone: s.tone ?? TONES[i % TONES.length], total: s.points.reduce((sum, p) => sum + p.v, 0) })));
  const visible = $derived(toned.filter((s) => !hidden.includes(s.i)));
  const times = $derived([...new Set(series.flatMap((s) => s.points.map((p) => p.t)))].sort((a, b) => a - b));
  const x0 = $derived(from ?? (times.length ? times[0] : 0));
  const x1 = $derived(to ?? (times.length ? times[times.length - 1] + step : x0 + step));
  const xspan = $derived(x1 - x0 || 1);
  const plotW = $derived(Math.max(0, width - pad.left - pad.right));
  const plotH = $derived(Math.max(0, height - pad.top - pad.bottom));
  const x = (t: number) => pad.left + ((t - x0) / xspan) * plotW;
  const buckets = $derived(times.map((t) => {
    const parts = visible.map((s) => ({ i: s.i, label: s.label, tone: s.tone, v: s.points.find((p) => p.t === t)?.v ?? 0 }));
    return { t, parts, total: parts.reduce((sum, p) => sum + p.v, 0) };
  }));
  const hi = $derived(Math.max(1, ...buckets.map((b) => b.total)));
  const y = (v: number) => pad.top + plotH - (Math.min(v, hi) / hi) * plotH;
  const ticks = $derived([0, 1, 2, 3].map((k) => (hi * k) / 3));
  const barW = $derived(Math.max(1, (step / xspan) * plotW - 1));
  const bars = $derived(buckets.flatMap((b, k) => {
    let below = 0;
    return b.parts.map((p) => {
      const top = y(below + p.v), bottom = y(below);
      below += p.v;
      return { key: `${p.i}:${b.t}`, k, tone: p.tone, x: x(b.t) + 0.5, y: top, w: barW, h: Math.max(0, bottom - top) };
    });
  }));
  const fmt = $derived(formatTime ?? ((t: number) => {
    const d = new Date(t);
    const hm = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    return xspan > 2 * 86400e3 ? `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')} ${hm}` : hm;
  }));
  const timeTicks = $derived.by(() => {
    const steps = [60e3, 300e3, 900e3, 1800e3, 3600e3, 3 * 3600e3, 6 * 3600e3, 12 * 3600e3, 86400e3, 7 * 86400e3];
    const s = steps.find((v) => xspan / v <= 6) ?? 7 * 86400e3;
    const out: { t: number; label: string }[] = [];
    for (let t = Math.ceil(x0 / s) * s; t <= x1; t += s) out.push({ t, label: fmt(t) });
    return out;
  });
  const bucketAt = (clientX: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const t = x0 + ((clientX - rect.left - pad.left) / (plotW || 1)) * xspan;
    const k = Math.floor((t - x0) / step);
    return k >= 0 && k * step + x0 < x1 ? k : null;
  };
  const bucketStart = (k: number) => x0 + k * step;
  const kOf = (t: number) => Math.floor((t - x0) / step);
  const hovered = $derived(hover === null ? null : buckets.find((b) => kOf(b.t) === hover) ?? { t: bucketStart(hover), parts: visible.map((s) => ({ i: s.i, label: s.label, tone: s.tone, v: 0 })), total: 0 });
  function setBrush(a: number | null, b: number | null) {
    const next = a === null || b === null ? null : { from: bucketStart(Math.min(a, b)), to: bucketStart(Math.max(a, b)) + step };
    brush = next;
    onbrush?.(next);
  }
  function onmove(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    const k = bucketAt(e.clientX, el);
    if (drag) {
      if (Math.abs(e.clientX - drag.x) > 3) drag.moved = true;
      if (k !== null && drag.moved) { drag.b = k; brush = { from: bucketStart(Math.min(drag.a, k)), to: bucketStart(Math.max(drag.a, k)) + step }; }
    }
    hover = k;
  }
  function ondown(e: PointerEvent) {
    if (dataState !== 'ready' || e.button !== 0) return;
    const k = bucketAt(e.clientX, e.currentTarget as HTMLElement);
    if (k === null) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    drag = { a: k, b: k, x: e.clientX, moved: false };
  }
  function onup(e: PointerEvent) {
    if (!drag) return;
    const d = drag;
    drag = null;
    if (d.moved) setBrush(d.a, d.b);
    else onpick?.(bucketStart(d.a));
    void e;
  }
  function onkey(e: KeyboardEvent) {
    if (dataState !== 'ready') return;
    const n = Math.ceil(xspan / step);
    if (e.key === 'Escape') { hover = null; if (brush) setBrush(null, null); return; }
    if (e.key === 'Enter' && hover !== null) { onpick?.(bucketStart(hover)); return; }
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = hover === null ? (d > 0 ? 0 : n - 1) : Math.min(n - 1, Math.max(0, hover + d));
    if (e.shiftKey) {
      const anchor = brush ? (hover !== null && kOf(brush.from) === hover ? kOf(brush.to) - 1 : kOf(brush.from)) : (hover ?? next);
      setBrush(anchor, next);
    }
    hover = next;
  }
  function toggle(i: number) { hidden = hidden.includes(i) ? hidden.filter((h) => h !== i) : [...hidden, i]; }
  const tipLeft = $derived(hover === null ? 0 : Math.min(Math.max(x(bucketStart(hover)) + barW / 2, pad.left), width - 8));
  const tipFlip = $derived(hover !== null && tipLeft > width * 0.6);
  const brushX = $derived(brush ? Math.max(pad.left, x(brush.from)) : 0);
  const brushW = $derived(brush ? Math.max(0, Math.min(width - pad.right, x(brush.to)) - brushX) : 0);
</script>

<figure class="sk-chart sk-histogram" aria-label={label}>
  {#if legend}
    <div class="sk-chart__legend">
      {#each toned as s (s.i)}
        <button type="button" class="sk-chart__key sk-tone--{s.tone}" class:is-off={hidden.includes(s.i)} aria-pressed={!hidden.includes(s.i)} onclick={() => toggle(s.i)}><i></i>{s.label}<b>{format(s.total)}{unit}</b></button>
      {/each}
    </div>
  {/if}
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_no_noninteractive_tabindex -->
  <div class="sk-chart__plot" class:is-interactive={dataState === 'ready'} class:is-dragging={!!drag} role="group" aria-label={label} tabindex={dataState === 'ready' ? 0 : undefined} bind:clientWidth={width} style:height="{height}px"
    onpointermove={onmove} onpointerleave={() => { if (!drag) hover = null; }} onpointerdown={ondown} onpointerup={onup} onpointercancel={() => (drag = null)} onkeydown={onkey} onblur={() => (hover = null)}>
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
        {#each timeTicks as tk, k (k)}
          <text class="sk-chart__tick" x={x(tk.t)} y={height - 6} text-anchor="middle">{tk.label}</text>
        {/each}
        {#if hover !== null}<rect class="sk-chart__slot" x={x(bucketStart(hover))} y={pad.top} width={barW + 1} height={plotH} />{/if}
        {#each bars as b (b.key)}
          <rect class="sk-chart__bar sk-tone--{b.tone}" class:is-dim={brush !== null && (b.x + b.w / 2 < brushX || b.x + b.w / 2 > brushX + brushW)} x={b.x} y={b.y} width={b.w} height={b.h} rx="1" />
        {/each}
        {#if brush && brushW > 0}<rect class="sk-chart__brush" x={brushX} y={pad.top} width={brushW} height={plotH} />{/if}
      </svg>
      {#if hovered}
        <div class="sk-chart__tip" class:is-flip={tipFlip} style:left="{tipLeft}px" role="status">
          <div class="sk-chart__tip-time">{fmt(hovered.t)}</div>
          {#each hovered.parts as r (r.i)}<div class="sk-chart__tip-row sk-tone--{r.tone}"><i></i><span>{r.label}</span><b>{format(r.v)}{unit}</b></div>{/each}
          {#if hovered.parts.length > 1}<div class="sk-chart__tip-row sk-chart__tip-total"><i></i><span>Total</span><b>{format(hovered.total)}{unit}</b></div>{/if}
        </div>
      {/if}
    {/if}
  </div>
</figure>
