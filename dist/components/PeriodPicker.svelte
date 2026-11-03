<!-- PeriodPicker — période d’un graphique, rafraîchissement et fraîcheur des données. -->
<script lang="ts">
  import Segmented from './Segmented.svelte';
  import Button from './Button.svelte';
  type Option = { value: string; label: string; disabled?: boolean };
  type Props = { value?: string; options?: Option[]; updatedAt?: number | string | Date | null; refreshing?: boolean; label?: string; refreshLabel?: string; size?: 'sm' | 'md'; ago?: (seconds: number) => string; onchange?: (v: string) => void; onrefresh?: () => void };
  const DEFAULTS: Option[] = [{ value: '15m', label: '15 min' }, { value: '1h', label: '1 h' }, { value: '6h', label: '6 h' }, { value: '24h', label: '24 h' }, { value: '7d', label: '7 j' }];
  let { value = $bindable('1h'), options = DEFAULTS, updatedAt = null, refreshing = false, label = 'Période', refreshLabel = 'Rafraîchir', size = 'sm', ago = (s) => (s < 5 ? 'à l’instant' : s < 60 ? `il y a ${s} s` : s < 3600 ? `il y a ${Math.round(s / 60)} min` : `il y a ${Math.round(s / 3600)} h`), onchange, onrefresh }: Props = $props();
  let now = $state(Date.now());
  $effect(() => {
    if (updatedAt === null || updatedAt === undefined) return;
    const timer = setInterval(() => (now = Date.now()), 10_000);
    return () => clearInterval(timer);
  });
  const stamp = $derived(updatedAt === null || updatedAt === undefined ? null : new Date(updatedAt).getTime());
  const text = $derived(stamp === null || Number.isNaN(stamp) ? '' : ago(Math.max(0, Math.round((now - stamp) / 1000))));
</script>

<div class="sk-period" role="group" aria-label={label}>
  <Segmented bind:value {options} {size} {label} onchange={(v) => onchange?.(v)} />
  {#if onrefresh}<Button variant="quiet" size="sm" iconOnly icon="refresh" label={refreshLabel} loading={refreshing} onclick={() => onrefresh?.()} />{/if}
  {#if text}<span class="sk-period__fresh" aria-live="polite">{text}</span>{/if}
</div>
