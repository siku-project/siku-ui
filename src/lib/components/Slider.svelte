<!-- Slider — valeur continue (volume, fréquence, trait d'un visage). Pôles en option ; centered remplit depuis le milieu. -->
<script lang="ts">
  type Props = { value?: number; min?: number; max?: number; step?: number; label: string; format?: (v: number) => string; disabled?: boolean; minLabel?: string; maxLabel?: string; centered?: boolean; onchange?: (v: number) => void };
  let { value = $bindable(50), min = 0, max = 100, step = 1, label, format = (v) => `${v}`, disabled = false, minLabel, maxLabel, centered = false, onchange }: Props = $props();
  const pct = $derived(((value - min) / (max - min)) * 100);
  const origin = $derived(centered ? 50 : 0);
  const fillLeft = $derived(Math.min(pct, origin));
  const fillWidth = $derived(Math.abs(pct - origin));
  const lit = $derived(!centered ? null : pct < 49 ? 'min' : pct > 51 ? 'max' : null);
</script>
<label class="sk-slider-field" class:is-disabled={disabled}>
  <span class="sk-meter__row"><span>{label}</span><b>{format(value)}</b></span>
  <span class="sk-slider">
    <span class="sk-slider__track"></span>
    {#if centered}<span class="sk-slider__origin"></span>{/if}
    <span class="sk-slider__fill" style:left="{fillLeft}%" style:width="{fillWidth}%"></span>
    <span class="sk-slider__thumb" style:left="{pct}%"></span>
    <input type="range" class="sk-slider__input" {min} {max} {step} bind:value {disabled} aria-label={label} oninput={() => onchange?.(value)} />
  </span>
  {#if minLabel || maxLabel}<span class="sk-slider__poles"><span class:is-lit={lit === 'min'}>{minLabel ?? ''}</span><span class:is-lit={lit === 'max'}>{maxLabel ?? ''}</span></span>{/if}
</label>
