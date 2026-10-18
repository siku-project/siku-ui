<script lang="ts">
  import type { ChartTone, TraceSpan } from '../types';
  import Icon from './Icon.svelte';
  type Row = { span: TraceSpan; depth: number; hasChildren: boolean };
  type Props = { spans: TraceSpan[]; totalMs?: number; selected?: string | null; collapsed?: string[]; rowHeight?: number; maxRows?: number; label?: string; formatDuration?: (ms: number) => string; onselect?: (span: TraceSpan) => void };
  let { spans, totalMs, selected = $bindable(null), collapsed = $bindable([]), rowHeight = 28, maxRows = 500, label = 'Trace', formatDuration = defaultFormat, onselect }: Props = $props();
  const TONES: ChartTone[] = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'chart-6'];
  let root: HTMLElement;
  let hover = $state<string | null>(null);
  let focused = $state<string | null>(null);
  function defaultFormat(ms: number) {
    if (ms < 1) return `${ms.toFixed(2)} ms`;
    if (ms < 10) return `${ms.toFixed(1)} ms`;
    if (ms < 1000) return `${Math.round(ms)} ms`;
    return `${(ms / 1000).toFixed(2)} s`;
  }
  const total = $derived(totalMs ?? Math.max(1, ...spans.map((s) => s.startMs + s.durationMs)));
  const services = $derived.by(() => {
    const map = new Map<string, ChartTone>();
    for (const s of spans) if (s.service && !map.has(s.service)) map.set(s.service, TONES[map.size % TONES.length]);
    return map;
  });
  const tree = $derived.by(() => {
    const ids = new Set(spans.map((s) => s.id));
    const kids = new Map<string | null, TraceSpan[]>();
    for (const s of spans) {
      const parent = s.parentId !== null && ids.has(s.parentId) ? s.parentId : null;
      const list = kids.get(parent) ?? [];
      list.push(s);
      kids.set(parent, list);
    }
    for (const list of kids.values()) list.sort((a, b) => a.startMs - b.startMs);
    const out: Row[] = [];
    const walk = (parent: string | null, depth: number) => {
      for (const s of kids.get(parent) ?? []) {
        const children = kids.get(s.id) ?? [];
        out.push({ span: s, depth, hasChildren: children.length > 0 });
        if (children.length && !collapsed.includes(s.id)) walk(s.id, depth + 1);
      }
    };
    walk(null, 0);
    return out;
  });
  const rows = $derived(tree.slice(0, maxRows));
  const truncated = $derived(tree.length - rows.length);
  const ticks = $derived.by(() => {
    const steps = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 30000, 60000];
    const s = steps.find((v) => total / v <= 6) ?? 60000;
    const out: number[] = [];
    for (let t = 0; t <= total; t += s) out.push(t);
    return out;
  });
  const pct = (ms: number) => `${Math.min(100, Math.max(0, (ms / total) * 100))}%`;
  const share = (ms: number) => `${Math.round((ms / total) * 1000) / 10} %`;
  const tone = (s: TraceSpan) => (s.status === 'error' ? 'danger' : (s.service && services.get(s.service)) || 'neutral');
  function toggleCollapse(id: string) { collapsed = collapsed.includes(id) ? collapsed.filter((c) => c !== id) : [...collapsed, id]; }
  function pick(s: TraceSpan) { selected = s.id; onselect?.(s); }
  const items = () => Array.from(root.querySelectorAll<HTMLElement>('.sk-trace__row'));
  function onkey(e: KeyboardEvent, r: Row) {
    const list = items();
    const i = list.indexOf(e.currentTarget as HTMLElement);
    switch (e.key) {
      case 'ArrowDown': list[Math.min(i + 1, list.length - 1)]?.focus(); break;
      case 'ArrowUp': list[Math.max(i - 1, 0)]?.focus(); break;
      case 'Home': list[0]?.focus(); break;
      case 'End': list[list.length - 1]?.focus(); break;
      case 'ArrowRight': if (r.hasChildren && collapsed.includes(r.span.id)) toggleCollapse(r.span.id); else list[i + 1]?.focus(); break;
      case 'ArrowLeft': if (r.hasChildren && !collapsed.includes(r.span.id)) toggleCollapse(r.span.id); else { const p = rows.slice(0, i).reverse().find((x) => x.depth < r.depth); if (p) list[rows.indexOf(p)]?.focus(); } break;
      case 'Enter': case ' ': pick(r.span); break;
      default: return;
    }
    e.preventDefault();
  }
  const tipId = $derived(hover ?? focused);
</script>

<div class="sk-trace" role="tree" aria-label={label} bind:this={root} style="--sk-row:{rowHeight}px">
  <div class="sk-trace__head" aria-hidden="true">
    <div class="sk-trace__names"></div>
    <div class="sk-trace__axis">{#each ticks as t (t)}<span class="sk-trace__tick" style:left={pct(t)}>{formatDuration(t)}</span>{/each}</div>
  </div>
  {#each rows as r, i (r.span.id)}
    {@const s = r.span}
    {@const tn = tone(s)}
    <div role="treeitem" aria-level={r.depth + 1} aria-selected={selected === s.id} aria-expanded={r.hasChildren ? !collapsed.includes(s.id) : undefined}
      tabindex={selected === s.id || (!selected && i === 0) ? 0 : -1}
      class={['sk-trace__row sk-focusable', selected === s.id && 'is-selected', s.status === 'error' && 'is-error'].filter(Boolean).join(' ')} style="--depth:{r.depth}"
      onclick={() => pick(s)} onkeydown={(e) => onkey(e, r)} onpointerenter={() => (hover = s.id)} onpointerleave={() => (hover = null)} onfocus={() => (focused = s.id)} onblur={() => (focused = null)}>
      <div class="sk-trace__names">
        <button type="button" class="sk-trace__toggle" tabindex="-1" aria-hidden="true" disabled={!r.hasChildren} onclick={(e) => { e.stopPropagation(); toggleCollapse(s.id); }}>{#if r.hasChildren}<Icon name={collapsed.includes(s.id) ? 'chev' : 'chevd'} size={14} />{/if}</button>
        <span class="sk-trace__name">{s.name}</span>
        {#if s.service}<span class="sk-trace__service sk-tone--{tn}"><i></i>{s.service}</span>{/if}
        <span class="sk-trace__dur">{formatDuration(s.durationMs)}</span>
      </div>
      <div class="sk-trace__lane">
        {#each ticks as t (t)}<i class="sk-trace__grid" style:left={pct(t)}></i>{/each}
        <div class="sk-trace__bar sk-tone--{tn}" style:left={pct(s.startMs)} style:width={`max(${pct(s.durationMs)}, 2px)`}>
          {#if s.status === 'error'}<Icon name="alert" size={12} label="Erreur" />{/if}
        </div>
        {#if tipId === s.id}
          <div class="sk-chart__tip" class:is-flip={s.startMs / total > 0.6} style:left={pct(s.startMs / total > 0.6 ? s.startMs : s.startMs + s.durationMs)} role="status">
            <div class="sk-chart__tip-time">{s.name}</div>
            {#if s.service}<div class="sk-chart__tip-row sk-tone--{tn}"><i></i><span>Service</span><b>{s.service}</b></div>{/if}
            <div class="sk-chart__tip-row"><span>Durée</span><b>{formatDuration(s.durationMs)}</b></div>
            <div class="sk-chart__tip-row"><span>Début</span><b>{formatDuration(s.startMs)}</b></div>
            <div class="sk-chart__tip-row"><span>Part</span><b>{share(s.durationMs)}</b></div>
            {#if s.status === 'error'}<div class="sk-chart__tip-row sk-tone--danger"><i></i><span>Statut</span><b>Erreur</b></div>{/if}
          </div>
        {/if}
      </div>
    </div>
  {/each}
  {#if truncated > 0}<div class="sk-trace__note">{truncated} spans non affichés (maxRows = {maxRows})</div>{/if}
</div>
