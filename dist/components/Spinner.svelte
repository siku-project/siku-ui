<!-- Spinner — attente indéterminée. -->
<script lang="ts">
  type Props = { label?: string };
  let { label = 'Chargement' }: Props = $props();
</script>
<span class="sk-spinner" role="status" aria-label={label}></span>
