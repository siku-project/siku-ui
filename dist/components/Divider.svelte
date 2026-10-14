<!-- Divider — filet de structure. -->
<script lang="ts">
  type Props = { vertical?: boolean; strong?: boolean; label?: string };
  let { vertical = false, strong = false, label }: Props = $props();
</script>
{#if label}<div class="sk-divider-label">{label}</div>{:else}<hr class="sk-divider" class:sk-divider--v={vertical} class:sk-divider--strong={strong} aria-orientation={vertical ? 'vertical' : 'horizontal'} />{/if}
