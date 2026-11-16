<!-- Stat — la valeur clé d'un écran (solde, total, vitesse) avec sa partie secondaire en retrait. -->
<script lang="ts">
  type Props = { value: string; minor?: string; label?: string; size?: 'xl' | 'lg' | 'md'; hud?: boolean };
  let { value, minor, label, size = 'lg', hud = false }: Props = $props();
</script>
<div class="sk-stat sk-stat--{size}" class:sk-hud-text={hud}>
  {#if label}<span class="sk-value__label">{label}</span>{/if}
  <span class="sk-stat__num">{value}{#if minor}<small>{minor}</small>{/if}</span>
</div>
