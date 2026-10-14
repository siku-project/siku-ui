<script lang="ts">
  import type { ChartTone } from '../types';
  type Props = { values: number[]; tone?: ChartTone; width?: number; height?: number; area?: boolean; min?: number; max?: number; label?: string };
  let { values, tone = 'neutral', width = 96, height = 24, area = false, min, max, label }: Props = $props();
  const lo = $derived(min ?? (values.length ? Math.min(...values) : 0));
  const hi = $derived(max ?? (values.length ? Math.max(...values) : 1));
  const points = $derived(values.map((v, i) => {
    const x = values.length > 1 ? (i / (values.length - 1)) * width : width / 2;
    const y = height - 1.5 - ((v - lo) / (hi - lo || 1)) * (height - 3);
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  }));
  const line = $derived(points.map((pt, i) => `${i ? 'L' : 'M'}${pt}`).join(' '));
  const fill = $derived(points.length ? `${line} L${width} ${height} L0 ${height} Z` : '');
</script>

<svg class="sk-spark sk-tone--{tone}" viewBox="0 0 {width} {height}" {width} {height} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'}>
  {#if area && fill}<path class="sk-spark__area" d={fill} />{/if}
  {#if line}<path class="sk-spark__line" d={line} />{/if}
</svg>
