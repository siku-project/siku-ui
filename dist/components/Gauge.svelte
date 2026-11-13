<!-- Gauge — statut du HUD (santé, armure, besoins). Critique sous `critical` : icône, jauge et valeur passent en status-critical. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';
  type Kind = 'health' | 'armor' | 'hunger' | 'thirst' | 'stress' | 'stamina' | 'custom';
  const ICON: Record<Kind, IconName> = { health: 'heart', armor: 'shield', hunger: 'food', thirst: 'drop', stress: 'spark', stamina: 'signal', custom: 'info' };
  const LABEL: Record<Kind, string> = { health: 'Santé', armor: 'Armure', hunger: 'Faim', thirst: 'Soif', stress: 'Stress', stamina: 'Endurance', custom: '' };
  type Props = { kind?: Kind; value: number; icon?: IconName; label?: string; critical?: number; showValue?: boolean };
  let { kind = 'custom', value, icon, label, critical = 25, showValue = true }: Props = $props();
  const low = $derived(value < critical);
</script>
<div class={['sk-gauge', `sk-gauge--${kind}`, low && 'is-low'].filter(Boolean).join(' ')}>
  <Icon name={icon ?? ICON[kind]} />
  <span class="sk-meter" role="meter" aria-label={label ?? LABEL[kind]} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><i style:width="{Math.max(0, Math.min(100, value))}%"></i></span>
  {#if showValue}<span class="sk-gauge__val">{Math.round(value)}</span>{/if}
</div>
