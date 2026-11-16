<!-- Plate — plaque d'immatriculation ou identifiant d'un contenant tiers. -->
<script lang="ts">
  type Props = { text: string };
  let { text }: Props = $props();
</script>
<span class="sk-plate" aria-label="Plaque {text}">{text}</span>
