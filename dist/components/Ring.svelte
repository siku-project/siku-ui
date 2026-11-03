<!-- Ring — anneau de progression : une part (0–1) avec sa valeur au centre, un libellé et un état de données. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ChartTone, DataState } from '../types';
  import Skeleton from './Skeleton.svelte';
  type Props = { value: number | null; label: string; valueLabel?: string; caption?: string; tone?: ChartTone; size?: 'sm' | 'md' | 'lg'; thickness?: number; state?: DataState; message?: string; children?: Snippet };
  let { value, label, valueLabel, caption, tone = 'neutral', size = 'md', thickness, state: dataState = 'ready', message = '', children }: Props = $props();
  const px = $derived(size === 'sm' ? 64 : size === 'lg' ? 128 : 96);
  const stroke = $derived(thickness ?? (size === 'sm' ? 6 : size === 'lg' ? 10 : 8));
  const radius = $derived((px - stroke) / 2);
  const circumference = $derived(2 * Math.PI * radius);
  const ratio = $derived(value === null ? 0 : Math.min(1, Math.max(0, value)));
  const text = $derived(valueLabel ?? (value === null ? '—' : `${Math.round(ratio * 100)} %`));
</script>

<div class="sk-ring sk-ring--{size} sk-tone--{tone}" role={dataState === 'ready' ? 'meter' : undefined} aria-label={label} aria-valuenow={dataState === 'ready' && value !== null ? Math.round(ratio * 100) : undefined} aria-valuemin={0} aria-valuemax={100} aria-valuetext={dataState === 'ready' ? text : undefined}>
  {#if dataState === 'loading'}
    <Skeleton width="{px}px" height="{px}px" radius="full" />
  {:else}
    <div class="sk-ring__dial" style:width="{px}px" style:height="{px}px">
      <svg viewBox="0 0 {px} {px}" width={px} height={px} aria-hidden="true">
        <circle class="sk-ring__track" cx={px / 2} cy={px / 2} r={radius} stroke-width={stroke} />
        {#if dataState === 'ready' && value !== null}
          <circle class="sk-ring__fill" cx={px / 2} cy={px / 2} r={radius} stroke-width={stroke} stroke-dasharray={circumference} stroke-dashoffset={circumference * (1 - ratio)} transform="rotate(-90 {px / 2} {px / 2})" />
        {/if}
      </svg>
      <div class="sk-ring__center">
        {#if dataState !== 'ready'}
          <span class="sk-ring__state">{message || (dataState === 'empty' ? '—' : '?')}</span>
        {:else if children}
          {@render children()}
        {:else}
          <span class="sk-ring__value">{text}</span>
        {/if}
      </div>
    </div>
  {/if}
  <div class="sk-ring__text">
    <span class="sk-ring__label">{label}</span>
    {#if caption}<span class="sk-ring__caption">{caption}</span>{/if}
  </div>
</div>
