<!-- Meter — jauge continue (charge, progression). Passe en avertissement au-delà de `warnAt`. -->
<script lang="ts">
  type Props = { value: number; max?: number; tone?: 'neutral' | 'foreign' | 'live' | 'warning' | 'danger'; size?: 'sm' | 'lg';
    label?: string; valueLabel?: string; unit?: string; warnAt?: number; ariaLabel?: string };
  let { value, max = 100, tone = 'neutral', size = 'sm', label, valueLabel, unit, warnAt, ariaLabel }: Props = $props();
  const ratio = $derived(Math.min(1, Math.max(0, value / max)));
  const t = $derived(warnAt !== undefined && ratio >= warnAt ? 'warning' : tone);
</script>
<div class="sk-meter-field">
  {#if label}<div class="sk-meter__row"><span class:is-warn={t === 'warning'}>{label}</span><b>{valueLabel ?? value}{#if unit}<small>&nbsp;/ {max} {unit}</small>{/if}</b></div>{/if}
  <div class={['sk-meter', size === 'lg' && 'sk-meter--lg', t !== 'neutral' && `sk-meter--${t}`].filter(Boolean).join(' ')}
    role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={ariaLabel ?? label}><i style:width="{ratio * 100}%"></i></div>
</div>
