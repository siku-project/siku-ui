<script lang="ts">
  type Props = { width?: string; height?: string; radius?: 'sm' | 'md' | 'full'; lines?: number; label?: string };
  let { width = '100%', height = '1rem', radius = 'sm', lines = 1, label = 'Chargement' }: Props = $props();
</script>

<span class="sk-skeleton-group" role="status" aria-label={label} aria-busy="true">
  {#each Array.from({ length: Math.max(1, Math.round(lines)) }) as _, i (i)}
    <span class="sk-skeleton sk-skeleton--{radius}" style:width={lines > 1 && i === Math.round(lines) - 1 ? '72%' : width} style:height={height}></span>
  {/each}
</span>
