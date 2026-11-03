<!-- Veil — voile dégradé posé sur le jeu depuis un bord, à courbe douce (aucune cassure visible), pour asseoir une colonne ou un pied d'écran sans cadre. -->
<script lang="ts">
  type Props = { side?: 'left' | 'right' | 'top' | 'bottom'; size?: string; hold?: string; strength?: 'light' | 'standard' | 'heavy' };
  let { side = 'left', size = '50%', hold = '30%', strength = 'standard' }: Props = $props();
</script>
<div class={['sk-veil', `sk-veil--${side}`, strength !== 'standard' && `sk-veil--${strength}`].filter(Boolean).join(' ')}
  style:--veil-size={size} style:--veil-hold={hold} aria-hidden="true"></div>
