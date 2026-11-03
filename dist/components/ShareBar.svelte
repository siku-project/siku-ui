<!-- ShareBar — répartition en parts : une barre empilée horizontale avec la part de chaque segment et sa légende. -->
<script lang="ts">
  import type { ChartTone, DataState } from '../types';
  import Skeleton from './Skeleton.svelte';
  type Segment = { id: string; label: string; value: number; tone?: ChartTone; hint?: string };
  type Props = { segments: Segment[]; label?: string; legend?: boolean; height?: number; format?: (value: number, share: number) => string; state?: DataState; message?: string };
  let { segments, label, legend = true, height = 10, format = (_value, share) => `${share < 1 && share > 0 ? '< 1' : Math.round(share)} %`, state: dataState = 'ready', message = '' }: Props = $props();
  const total = $derived(segments.reduce((sum, s) => sum + Math.max(0, s.value), 0));
  const shares = $derived(segments.map((s) => ({ ...s, share: total > 0 ? (Math.max(0, s.value) / total) * 100 : 0 })));
  const tones = ['chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5', 'chart-6'] as const;
</script>

<div class="sk-share" aria-label={label}>
  {#if dataState === 'loading'}
    <Skeleton height="{height}px" radius="full" />
  {:else if dataState !== 'ready' || total === 0}
    <div class="sk-share__state">{message || (dataState === 'ready' || dataState === 'empty' ? 'Aucune donnée' : 'Indisponible')}</div>
  {:else}
    <div class="sk-share__bar" role="img" aria-label={label ? `${label} : ${shares.map((s) => `${s.label} ${format(s.value, s.share)}`).join(', ')}` : undefined} style:height="{height}px">
      {#each shares as s, i (s.id)}
        {#if s.share > 0}
          <span class="sk-share__seg sk-tone--{s.tone ?? tones[i % tones.length]}" style:flex-basis="{s.share}%" title="{s.label} · {format(s.value, s.share)}{s.hint ? ` · ${s.hint}` : ''}"></span>
        {/if}
      {/each}
    </div>
  {/if}
  {#if legend && dataState === 'ready' && total > 0}
    <div class="sk-share__legend">
      {#each shares as s, i (s.id)}
        <span class="sk-share__key sk-tone--{s.tone ?? tones[i % tones.length]}" title={s.hint}><i></i>{s.label}<b>{format(s.value, s.share)}</b></span>
      {/each}
    </div>
  {/if}
</div>
