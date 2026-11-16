<!-- FlowChart — flux entre colonnes de nœuds : d’où vient quoi et où ça va, rubans proportionnels aux volumes. -->
<script lang="ts">
  import type { ChartTone, DataState, FlowColumn, FlowLink, FlowNode } from '../types';
  import Skeleton from './Skeleton.svelte';
  type Props = { nodes: FlowNode[]; links: FlowLink[]; columns?: FlowColumn[]; label: string; height?: number; nodeWidth?: number; gap?: number; format?: (value: number) => string; state?: DataState; message?: string; onselect?: (id: string | null) => void; onpick?: (id: string) => void };
  let { nodes, links, columns, label, height = 280, nodeWidth = 10, gap = 10, format = (v) => String(Math.round(v)), state: dataState = 'ready', message = '', onselect, onpick }: Props = $props();
  const tones = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'chart-6'] as const;
  const uid = $props.id();
  let width = $state(0);
  let hovered = $state<string | null>(null);

  const cols = $derived.by<FlowColumn[]>(() => {
    if (columns && columns.length > 0) return columns;
    const seen: FlowColumn[] = [];
    for (const n of nodes) if (!seen.some((c) => c.id === n.column)) seen.push({ id: n.column });
    return seen;
  });
  const headRoom = $derived(cols.some((c) => c.label) ? 22 : 0);
  const estimate = (text: string) => text.length * 6.4 + 6;

  type Laid = FlowNode & { tone: ChartTone; value: number; x: number; y: number; h: number; col: number; side: 'left' | 'right'; outOffset: number; inOffset: number };
  type Ribbon = { key: string; from: Laid; to: Laid; value: number; d: string };

  const layout = $derived.by(() => {
    const byId = new Map<string, Laid>();
    const outSum = new Map<string, number>();
    const inSum = new Map<string, number>();
    for (const l of links) {
      const v = Math.max(0, l.value);
      outSum.set(l.from, (outSum.get(l.from) ?? 0) + v);
      inSum.set(l.to, (inSum.get(l.to) ?? 0) + v);
    }
    const grouped = cols.map((c, ci) => nodes.filter((n) => n.column === c.id).map((n) => ({ n, ci })));
    const flat = grouped.flat();
    const values = flat.map(({ n }) => Math.max(outSum.get(n.id) ?? 0, inSum.get(n.id) ?? 0));
    const totals = grouped.map((g) => g.reduce((sum, { n }) => sum + Math.max(outSum.get(n.id) ?? 0, inSum.get(n.id) ?? 0), 0));
    const counts = grouped.map((g) => g.length);
    const padY = 4;
    const availH = height - headRoom - padY * 2;
    let scale = Infinity;
    grouped.forEach((g, ci) => {
      if (totals[ci] <= 0) return;
      const room = availH - gap * Math.max(0, counts[ci] - 1);
      scale = Math.min(scale, room / totals[ci]);
    });
    if (!Number.isFinite(scale)) scale = 0;
    const first = grouped[0] ?? [];
    const last = grouped[grouped.length - 1] ?? [];
    const leftMargin = Math.min(width * 0.3, Math.max(0, ...first.map(({ n }) => estimate(n.label) + estimate(format(Math.max(outSum.get(n.id) ?? 0, inSum.get(n.id) ?? 0))))) + 10);
    const rightMargin = cols.length > 1 ? Math.min(width * 0.3, Math.max(0, ...last.map(({ n }) => estimate(n.label) + estimate(format(Math.max(outSum.get(n.id) ?? 0, inSum.get(n.id) ?? 0))))) + 10) : leftMargin;
    const span = Math.max(0, width - leftMargin - rightMargin - nodeWidth);
    const step = cols.length > 1 ? span / (cols.length - 1) : 0;
    let i = 0;
    const laid: Laid[] = [];
    grouped.forEach((g, ci) => {
      const colH = totals[ci] * scale + gap * Math.max(0, counts[ci] - 1);
      let y = headRoom + padY + (availH - colH) / 2;
      for (const { n } of g) {
        const value = values[i];
        const h = Math.max(value > 0 ? 2 : 0, value * scale);
        const node: Laid = { ...n, tone: n.tone ?? tones[i % tones.length], value, x: leftMargin + ci * step, y, h, col: ci, side: ci === 0 ? 'left' : 'right', outOffset: 0, inOffset: 0 };
        laid.push(node);
        byId.set(n.id, node);
        y += h + gap;
        i += 1;
      }
    });
    const order = new Map(laid.map((n, k) => [n.id, k]));
    const sorted = links.filter((l) => byId.has(l.from) && byId.has(l.to) && l.value > 0).sort((a, b) => (order.get(a.from)! - order.get(b.from)!) || (order.get(a.to)! - order.get(b.to)!));
    const ribbons: Ribbon[] = [];
    const inQueue = [...sorted].sort((a, b) => (order.get(a.to)! - order.get(b.to)!) || (order.get(a.from)! - order.get(b.from)!));
    const inStart = new Map<string, number>();
    for (const l of inQueue) {
      const to = byId.get(l.to)!;
      inStart.set(`${l.from}>${l.to}`, to.inOffset);
      to.inOffset += l.value * scale;
    }
    for (const l of sorted) {
      const from = byId.get(l.from)!;
      const to = byId.get(l.to)!;
      const thick = l.value * scale;
      const sy0 = from.y + from.outOffset;
      const sy1 = sy0 + thick;
      const ty0 = to.y + (inStart.get(`${l.from}>${l.to}`) ?? 0);
      const ty1 = ty0 + thick;
      from.outOffset += thick;
      const x0 = from.x + nodeWidth;
      const x1 = to.x;
      const cx = (x0 + x1) / 2;
      ribbons.push({ key: `${l.from}>${l.to}`, from, to, value: l.value, d: `M${x0},${sy0}C${cx},${sy0} ${cx},${ty0} ${x1},${ty0}L${x1},${ty1}C${cx},${ty1} ${cx},${sy1} ${x0},${sy1}Z` });
    }
    const heads = cols.map((c, ci) => ({ ...c, x: leftMargin + ci * step + nodeWidth / 2, anchor: ci === 0 ? 'start' : ci === cols.length - 1 ? 'end' : 'middle' }));
    return { nodes: laid, ribbons, heads, total: totals[0] ?? 0 };
  });

  const touches = (r: Ribbon, id: string) => r.from.id === id || r.to.id === id;
  function hover(id: string | null) {
    hovered = id;
    onselect?.(id);
  }
  const summary = $derived(layout.nodes.map((n) => `${n.label} ${format(n.value)}`).join(', '));
</script>

<div class="sk-flow" aria-label={label} bind:clientWidth={width} style:height="{height}px">
  {#if dataState === 'loading'}
    <div class="sk-flow__state"><Skeleton lines={3} /></div>
  {:else if dataState !== 'ready' || layout.ribbons.length === 0}
    <div class="sk-flow__state sk-flow__state--text">{message || (dataState === 'ready' || dataState === 'empty' ? 'Aucun flux' : 'Indisponible')}</div>
  {:else if width > 0}
    <svg {width} {height} viewBox="0 0 {width} {height}" role="img" aria-label="{label} : {summary}" onmouseleave={() => hover(null)}>
      <defs>
        {#each layout.ribbons as r, k (r.key)}
          <linearGradient id="{uid}-g{k}" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" class="sk-tone--{r.from.tone}" style:stop-color="currentColor" />
            <stop offset="1" class="sk-tone--{r.to.tone}" style:stop-color="currentColor" />
          </linearGradient>
        {/each}
      </defs>
      {#each layout.heads as h (h.id)}
        {#if h.label}<text class="sk-flow__head" x={h.x} y={12} text-anchor={h.anchor}>{h.label}</text>{/if}
      {/each}
      {#each layout.ribbons as r, k (r.key)}
        <path class="sk-flow__link" role="presentation" class:is-dim={hovered !== null && !touches(r, hovered)} class:is-active={hovered !== null && touches(r, hovered)} d={r.d} fill="url(#{uid}-g{k})" onmouseenter={() => hover(r.from.id)}>
          <title>{r.from.label} → {r.to.label} · {format(r.value)}</title>
        </path>
      {/each}
      {#each layout.nodes as n (n.id)}
        {#if n.h > 0}
          <g class="sk-flow__node sk-tone--{n.tone}" class:is-dim={hovered !== null && hovered !== n.id && !layout.ribbons.some((r) => touches(r, hovered ?? '') && touches(r, n.id))} class:is-pickable={!!onpick} role="presentation" onmouseenter={() => hover(n.id)} onclick={() => onpick?.(n.id)}>
            <rect class="sk-flow__bar" x={n.x} y={n.y} width={nodeWidth} height={n.h} rx="3" />
            <text class="sk-flow__label" x={n.side === 'left' ? n.x - 8 : n.x + nodeWidth + 8} y={n.y + n.h / 2} text-anchor={n.side === 'left' ? 'end' : 'start'} dominant-baseline="middle">{n.label} <tspan class="sk-flow__value">{format(n.value)}</tspan></text>
            <title>{n.label} · {format(n.value)}{n.hint ? ` · ${n.hint}` : ''}</title>
          </g>
        {/if}
      {/each}
    </svg>
  {/if}
</div>
