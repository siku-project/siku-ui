<!-- DonutChart — répartition en parts sur un anneau : chaque segment avec sa part, une valeur au centre et une légende. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ChartTone, DataState } from '../types';
  import Skeleton from './Skeleton.svelte';
  type Segment = { id: string; label: string; value: number; tone?: ChartTone; hint?: string };
  type Props = { segments: Segment[]; label: string; size?: number; thickness?: number; legend?: boolean; valueLabel?: string; caption?: string; format?: (value: number, share: number) => string; state?: DataState; message?: string; onselect?: (id: string | null) => void; children?: Snippet };
  let { segments, label, size = 160, thickness = 18, legend = true, valueLabel, caption, format = (_value, share) => `${share < 1 && share > 0 ? '< 1' : Math.round(share)} %`, state: dataState = 'ready', message = '', onselect, children }: Props = $props();
  const tones = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'chart-6'] as const;
  const total = $derived(segments.reduce((sum, s) => sum + Math.max(0, s.value), 0));
  const radius = $derived((size - thickness) / 2);
  const circumference = $derived(2 * Math.PI * radius);
  const gap = $derived(segments.length > 1 ? Math.min(3, circumference * 0.01) : 0);
  const arcs = $derived.by(() => {
    let offset = 0;
    return segments.map((s, i) => {
      const share = total > 0 ? (Math.max(0, s.value) / total) * 100 : 0;
      const length = (share / 100) * circumference;
      const arc = { ...s, share, length: Math.max(0, length - gap), offset, tone: s.tone ?? tones[i % tones.length] };
      offset += length;
      return arc;
    });
  });
  let hovered = $state<string | null>(null);
  const active = $derived(arcs.find((a) => a.id === hovered) ?? null);
  const centerValue = $derived(active ? format(active.value, active.share) : (valueLabel ?? (total > 0 ? format(total, 100) : '—')));
  const centerCaption = $derived(active ? active.label : caption);
  function hover(id: string | null) {
    hovered = id;
    onselect?.(id);
  }
</script>

<div class="sk-donut" aria-label={label}>
  {#if dataState === 'loading'}
    <Skeleton width="{size}px" height="{size}px" radius="full" />
  {:else if dataState !== 'ready' || total === 0}
    <div class="sk-donut__dial" style:width="{size}px" style:height="{size}px">
      <svg viewBox="0 0 {size} {size}" width={size} height={size} aria-hidden="true">
        <circle class="sk-donut__track" cx={size / 2} cy={size / 2} r={radius} stroke-width={thickness} />
      </svg>
      <div class="sk-donut__center"><span class="sk-donut__state">{message || (dataState === 'ready' || dataState === 'empty' ? 'Aucune donnée' : 'Indisponible')}</span></div>
    </div>
  {:else}
    <div class="sk-donut__dial" style:width="{size}px" style:height="{size}px" role="img" aria-label="{label} : {arcs.map((a) => `${a.label} ${format(a.value, a.share)}`).join(', ')}">
      <svg viewBox="0 0 {size} {size}" width={size} height={size} aria-hidden="true" onmouseleave={() => hover(null)}>
        <circle class="sk-donut__track" cx={size / 2} cy={size / 2} r={radius} stroke-width={thickness} />
        {#each arcs as a (a.id)}
          {#if a.length > 0}
            <circle class="sk-donut__seg sk-tone--{a.tone}" role="presentation" class:is-dim={hovered !== null && hovered !== a.id} class:is-active={hovered === a.id} cx={size / 2} cy={size / 2} r={radius} stroke-width={thickness} stroke-dasharray="{a.length} {circumference - a.length}" stroke-dashoffset={-a.offset} transform="rotate(-90 {size / 2} {size / 2})" onmouseenter={() => hover(a.id)}>
              <title>{a.label} · {format(a.value, a.share)}{a.hint ? ` · ${a.hint}` : ''}</title>
            </circle>
          {/if}
        {/each}
      </svg>
      <div class="sk-donut__center">
        {#if children && !active}
          {@render children()}
        {:else}
          <span class="sk-donut__value">{centerValue}</span>
          {#if centerCaption}<span class="sk-donut__caption">{centerCaption}</span>{/if}
        {/if}
      </div>
    </div>
  {/if}
  {#if legend && dataState === 'ready' && total > 0}
    <ul class="sk-donut__legend">
      {#each arcs as a (a.id)}
        <li class="sk-donut__key sk-tone--{a.tone}" class:is-dim={hovered !== null && hovered !== a.id} title={a.hint} onmouseenter={() => hover(a.id)} onmouseleave={() => hover(null)}>
          <i></i><span class="sk-donut__name">{a.label}</span><b>{format(a.value, a.share)}</b>
        </li>
      {/each}
    </ul>
  {/if}
</div>
