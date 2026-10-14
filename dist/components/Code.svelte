<!-- Code — identifiant à recopier (numéro de série, IBAN, fréquence), en Geist Mono. -->
<script lang="ts">
  type Props = { text: string };
  let { text }: Props = $props();
</script>
<span class="sk-code">{text}</span>
