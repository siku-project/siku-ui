<!-- Count — compteur (non lus, en attente). -->
<script lang="ts">
  type Props = { value: number; max?: number; label?: string };
  let { value, max = 99, label }: Props = $props();
</script>
{#if value > 0}<span class="sk-count" aria-label={label ?? `${value}`}>{value > max ? `${max}+` : value}</span>{/if}
