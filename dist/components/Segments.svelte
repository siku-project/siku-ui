<!-- Segments — valeur discrète (état, régime). `hotFrom` colore la zone critique. -->
<script lang="ts">
  type Props = { value: number; count?: number; hotFrom?: number; label?: string };
  let { value, count = 20, hotFrom, label }: Props = $props();
  const on = $derived(Math.round(Math.min(1, Math.max(0, value)) * count));
</script>
<div class="sk-segs" role="meter" aria-valuenow={Math.round(value * 100)} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
  {#each Array(count) as _, i}<i class:on={i < on && (hotFrom === undefined || i < hotFrom)} class:hot={hotFrom !== undefined && i >= hotFrom}></i>{/each}
</div>
