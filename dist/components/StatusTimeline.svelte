<!-- StatusTimeline — disponibilité par tranche de temps : une barre de segments ok / dégradé / arrêt / inconnu. -->
<script lang="ts">
  import type { DataState, TimelineBucket } from '../types';
  import Skeleton from './Skeleton.svelte';
  type Props = { buckets: TimelineBucket[]; uptime?: number | null; label?: string; start?: string; end?: string; height?: number; state?: DataState; message?: string; format?: (b: TimelineBucket) => string; legend?: boolean };
  let { buckets, uptime = null, label, start, end, height = 24, state: dataState = 'ready', message = '', format = (b) => `${b.label ?? b.t} · ${b.state}`, legend = true }: Props = $props();
  const pct = $derived(uptime === null || uptime === undefined ? '' : `${(uptime * 100).toFixed(uptime >= 0.999 ? 2 : 1)} %`);
  const counts = $derived(buckets.reduce((acc, b) => { acc[b.state] = (acc[b.state] ?? 0) + 1; return acc; }, {} as Record<string, number>));
</script>

<div class="sk-timeline" aria-label={label}>
  {#if dataState === 'loading'}
    <Skeleton height="{height}px" radius="sm" />
  {:else if dataState !== 'ready'}
    <div class="sk-timeline__state">{message || (dataState === 'empty' ? 'Aucune donnée' : 'Indisponible')}</div>
  {:else}
    <div class="sk-timeline__bar" role="img" aria-label={label ? `${label}${pct ? `, ${pct}` : ''}` : pct} style:height="{height}px">
      {#each buckets as b, i (i)}
        <span class="sk-timeline__seg sk-timeline__seg--{b.state}" title={format(b)} style:opacity={b.state === 'degraded' && b.ratio !== undefined ? String(0.45 + b.ratio * 0.5) : undefined}></span>
      {/each}
    </div>
  {/if}
  {#if legend && dataState === 'ready'}
    <div class="sk-timeline__legend">
      {#if start}<span class="sk-timeline__edge">{start}</span>{/if}
      <span class="sk-timeline__keys">
        {#if pct}<b class="sk-timeline__uptime">{pct}</b>{/if}
        {#if counts.up}<span class="sk-timeline__key sk-timeline__key--up"><i></i>ok</span>{/if}
        {#if counts.degraded}<span class="sk-timeline__key sk-timeline__key--degraded"><i></i>dégradé</span>{/if}
        {#if counts.down}<span class="sk-timeline__key sk-timeline__key--down"><i></i>arrêt</span>{/if}
        {#if counts.unknown}<span class="sk-timeline__key sk-timeline__key--unknown"><i></i>inconnu</span>{/if}
      </span>
      {#if end}<span class="sk-timeline__edge">{end}</span>{/if}
    </div>
  {/if}
</div>
