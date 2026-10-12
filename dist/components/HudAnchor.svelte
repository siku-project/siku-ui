<!-- HudAnchor — place un groupe du HUD dans un coin, à l'intérieur de la zone sûre GTA. Voile local par défaut : sans lui, le texte devient illisible sur les décors clairs (neige, ciel). -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom';
  type Props = { corner: Corner; scrim?: boolean; besideMinimap?: boolean; children: Snippet };
  let { corner, scrim = true, besideMinimap = false, children }: Props = $props();
</script>
{#if scrim}<div class="sk-hud-scrim sk-hud-scrim--{corner}" aria-hidden="true"></div>{/if}
<div class="sk-hud sk-hud--{corner}" class:sk-hud--beside-minimap={besideMinimap}>{@render children()}</div>
