<!-- TimeChart — courbe ou aire dans le temps : axe temporel réel (points) ou index régulier (values), survol, seuils, états. -->
<script lang="ts">
  import type { ChartBand, ChartSeries, ChartThreshold, ChartTone, DataState } from '../types';
  import Skeleton from './Skeleton.svelte';
  type Props = {
    series: ChartSeries[]; labels?: string[]; from?: number; to?: number; min?: number; max?: number; unit?: string;
    format?: (v: number) => string; formatTime?: (t: number) => string; height?: number; area?: boolean; rows?: number; legend?: boolean;
    label?: string; thresholds?: ChartThreshold[]; bands?: ChartBand[]; state?: DataState; message?: string; interactive?: boolean;
    onhover?: (t: number | null) => void;
  };
  let { series, labels = [], from, to, min, max, unit = '', format = (v) => String(Math.round(v)), formatTime, height = 160, area = true, rows = 4, legend = true, label, thresholds = [], bands = [], state: dataState = 'ready', message = '', interactive = true, onhover }: Props = $props();
  const TONES: ChartTone[] = ['live', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'chart-6'];
  const pad = $derived({ top: 8, right: 8, bottom: 24, left: 44 });
  let width = $state(0);
  let hidden = $state<string[]>([]);
  let hover = $state<number | null>(null);
  const timeMode = $derived(series.some((s) => s.points && s.points.length));
  const norm = $derived(series.map((s, i) => ({
    ...s,
    tone: s.tone ?? TONES[i % TONES.length],
    pts: s.points ? s.points.map((p) => ({ t: p.t, v: p.v })) : (s.values ?? []).map((v, k) => ({ t: k, v })),
  })));
  const visible = $derived(norm.filter((s) => !hidden.includes(s.id)));
  const allT = $derived(norm.flatMap((s) => s.pts.map((p) => p.t)));
  const x0 = $derived(from ?? (allT.length ? Math.min(...allT) : 0));
  const x1 = $derived(to ?? (allT.length ? Math.max(...allT) : 1));
  const xspan = $derived(x1 - x0 || 1);
  const allV = $derived(visible.flatMap((s) => s.pts.map((p) => p.v)).filter((v): v is number => v !== null && Number.isFinite(v)));
  const lo = $derived(min ?? (allV.length ? Math.min(...allV, ...thresholds.map((t) => t.value)) : 0));
  const hi = $derived(max ?? (allV.length ? Math.max(...allV, ...thresholds.map((t) => t.value)) : 1));
  const yspan = $derived(hi - lo || 1);
  const plotW = $derived(Math.max(0, width - pad.left - pad.right));
  const plotH = $derived(Math.max(0, height - pad.top - pad.bottom));
  const x = (t: number) => pad.left + ((t - x0) / xspan) * plotW;
  const y = (v: number) => pad.top + plotH - ((Math.min(Math.max(v, lo), hi) - lo) / yspan) * plotH;
  const ticks = $derived(Array.from({ length: rows + 1 }, (_, k) => lo + (yspan * k) / rows));
  const drawn = $derived(visible.map((s) => {
    let d = '';
    let open = false;
    const segs: string[] = [];
    for (const p of s.pts) {
      if (p.v === null || !Number.isFinite(p.v)) { if (open) { segs.push(d); d = ''; open = false; } continue; }
      d += `${open ? 'L' : 'M'}${x(p.t).toFixed(1)} ${y(p.v).toFixed(1)} `;
      open = true;
    }
    if (open) segs.push(d);
    const base = (pad.top + plotH).toFixed(1);
    const areas = segs.map((seg) => {
      const first = seg.slice(1).split(' ')[0];
      const parts = seg.trim().split(' ');
      const lastX = parts[parts.length - 2].replace(/^[ML]/, '');
      return `${seg} L${lastX} ${base} L${first} ${base} Z`;
    });
    const lastPoint = [...s.pts].reverse().find((p) => p.v !== null);
    return { ...s, segs, areas, last: lastPoint?.v ?? undefined, cx: lastPoint ? x(lastPoint.t) : 0, cy: lastPoint && lastPoint.v !== null ? y(lastPoint.v) : 0 };
  }));
  const timeTicks = $derived.by(() => {
    if (!timeMode) return labels.map((l, k) => ({ t: labels.length > 1 ? x0 + (k / (labels.length - 1)) * xspan : (x0 + x1) / 2, label: l }));
    const span = x1 - x0;
    if (span <= 0) return [];
    const steps = [60e3, 300e3, 900e3, 1800e3, 3600e3, 3 * 3600e3, 6 * 3600e3, 12 * 3600e3, 86400e3, 7 * 86400e3];
    const step = steps.find((s) => span / s <= 6) ?? 7 * 86400e3;
    const out: { t: number; label: string }[] = [];
    const fmt = formatTime ?? ((t: number) => {
      const d = new Date(t);
      const hm = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      return span > 2 * 86400e3 ? `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')} ${hm}` : hm;
    });
    for (let t = Math.ceil(x0 / step) * step; t <= x1; t += step) out.push({ t, label: fmt(t) });
    return out;
  });
  const xs = $derived([...new Set(visible.flatMap((s) => s.pts.map((p) => p.t)))].sort((a, b) => a - b));
  const hoverIndex = $derived(hover === null ? -1 : xs.indexOf(hover));
  const hoverRows = $derived(hover === null ? [] : visible.map((s) => {
    const p = s.pts.find((q) => q.t === hover);
    return { id: s.id, label: s.label, tone: s.tone, value: p && p.v !== null ? (s.format ?? format)(p.v) + (s.unit ?? unit) : '—' };
  }));
  const hoverLabel = $derived(hover === null ? '' : timeMode ? (formatTime ?? ((t: number) => new Date(t).toLocaleString()))(hover) : labels[Math.round(hover)] ?? String(hover));
  function nearest(clientX: number, el: HTMLElement) {
    if (!xs.length) return null;
    const rect = el.getBoundingClientRect();
    const t = x0 + ((clientX - rect.left - pad.left) / (plotW || 1)) * xspan;
    let best = xs[0];
    for (const c of xs) if (Math.abs(c - t) < Math.abs(best - t)) best = c;
    return best;
  }
  function setHover(t: number | null) { if (t !== hover) { hover = t; onhover?.(t); } }
  function onmove(e: PointerEvent) { if (interactive) setHover(nearest(e.clientX, e.currentTarget as HTMLElement)); }
  function onkey(e: KeyboardEvent) {
    if (!interactive || !xs.length) return;
    if (e.key === 'Escape') { setHover(null); return; }
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const i = hoverIndex < 0 ? (d > 0 ? 0 : xs.length - 1) : Math.min(xs.length - 1, Math.max(0, hoverIndex + d));
    setHover(xs[i]);
  }
  function toggle(id: string) { hidden = hidden.includes(id) ? hidden.filter((h) => h !== id) : [...hidden, id]; }
  const tipLeft = $derived(hover === null ? 0 : Math.min(Math.max(x(hover), pad.left), width - 8));
  const tipFlip = $derived(hover !== null && x(hover) > width * 0.6);
</script>

<figure class="sk-chart" aria-label={label}>
  {#if legend}
    <div class="sk-chart__legend">
      {#each norm as s (s.id)}
        <button type="button" class="sk-chart__key sk-tone--{s.tone}" class:is-off={hidden.includes(s.id)} aria-pressed={!hidden.includes(s.id)} onclick={() => toggle(s.id)}><i></i>{s.label}{#if !hidden.includes(s.id)}{@const d = drawn.find((x) => x.id === s.id)}{#if d && d.last !== undefined}<b>{(s.format ?? format)(d.last)}{s.unit ?? unit}</b>{/if}{/if}</button>
      {/each}
    </div>
  {/if}
  <!-- Survol et clavier décrivent les points ; l’image reste lisible sans. -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions, a11y_no_noninteractive_tabindex -->
  <div class="sk-chart__plot" class:is-interactive={interactive && dataState === 'ready'} role="group" aria-label={label} tabindex={interactive && dataState === 'ready' ? 0 : undefined} bind:clientWidth={width} style:height="{height}px"
    onpointermove={onmove} onpointerleave={() => setHover(null)} onkeydown={onkey} onblur={() => setHover(null)}>
    {#if dataState === 'loading'}
      <div class="sk-chart__state"><Skeleton lines={3} /></div>
    {:else if dataState !== 'ready'}
      <div class="sk-chart__state sk-chart__state--text">{message || (dataState === 'empty' ? 'Aucune donnée' : 'Indisponible')}</div>
    {:else if width > 0}
      <svg {width} {height} viewBox="0 0 {width} {height}" role="img" aria-label={label}>
        {#each bands as b, k (k)}
          <rect class="sk-chart__band sk-tone--{b.tone ?? 'neutral'}" x={x(Math.max(b.from, x0))} y={pad.top} width={Math.max(0, x(Math.min(b.to, x1)) - x(Math.max(b.from, x0)))} height={plotH} />
        {/each}
        {#each ticks as t, k (k)}
          <line class="sk-chart__grid" x1={pad.left} x2={width - pad.right} y1={y(t)} y2={y(t)} />
          <text class="sk-chart__tick" x={pad.left - 8} y={y(t)} text-anchor="end" dominant-baseline="middle">{format(t)}{unit}</text>
        {/each}
        {#each timeTicks as tk, k (k)}
          <text class="sk-chart__tick" x={x(tk.t)} y={height - 6} text-anchor={k === 0 && !timeMode ? 'start' : k === timeTicks.length - 1 && !timeMode ? 'end' : 'middle'}>{tk.label}</text>
        {/each}
        {#each thresholds as th, k (k)}
          <line class="sk-chart__threshold sk-tone--{th.tone ?? 'warning'}" x1={pad.left} x2={width - pad.right} y1={y(th.value)} y2={y(th.value)} />
          {#if th.label}<text class="sk-chart__threshold-label sk-tone--{th.tone ?? 'warning'}" x={width - pad.right} y={y(th.value) - 4} text-anchor="end">{th.label}</text>{/if}
        {/each}
        {#each drawn as s (s.id)}
          <g class="sk-chart__series sk-tone--{s.tone}">
            {#if area}{#each s.areas as a, k (k)}<path class="sk-chart__area" d={a} />{/each}{/if}
            {#each s.segs as seg, k (k)}<path class="sk-chart__line" d={seg} />{/each}
            {#if s.last !== undefined && hover === null}<circle class="sk-chart__dot" cx={s.cx} cy={s.cy} r="2.5" />{/if}
          </g>
        {/each}
        {#if hover !== null}
          <line class="sk-chart__cursor" x1={x(hover)} x2={x(hover)} y1={pad.top} y2={pad.top + plotH} />
          {#each visible as s (s.id)}
            {@const p = s.pts.find((q) => q.t === hover)}
            {#if p && p.v !== null}<circle class="sk-chart__dot sk-tone--{s.tone}" cx={x(p.t)} cy={y(p.v)} r="3" />{/if}
          {/each}
        {/if}
      </svg>
      {#if hover !== null && hoverRows.length}
        <div class="sk-chart__tip" class:is-flip={tipFlip} style:left="{tipLeft}px" role="status">
          <div class="sk-chart__tip-time">{hoverLabel}</div>
          {#each hoverRows as r (r.id)}<div class="sk-chart__tip-row sk-tone--{r.tone}"><i></i><span>{r.label}</span><b>{r.value}</b></div>{/each}
        </div>
      {/if}
    {/if}
  </div>
</figure>
