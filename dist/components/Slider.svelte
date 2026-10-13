<!-- Slider — valeur continue (volume, fréquence). -->
<script lang="ts">
  type Props = { value?: number; min?: number; max?: number; step?: number; label: string; format?: (v: number) => string; disabled?: boolean };
  let { value = $bindable(50), min = 0, max = 100, step = 1, label, format = (v) => `${v}`, disabled = false }: Props = $props();
  const pct = $derived(((value - min) / (max - min)) * 100);
</script>
<label class="sk-slider-field" class:is-disabled={disabled}>
  <span class="sk-meter__row"><span>{label}</span><b>{format(value)}</b></span>
  <span class="sk-slider">
    <span class="sk-slider__track"></span><span class="sk-slider__fill" style:width="{pct}%"></span><span class="sk-slider__thumb" style:left="{pct}%"></span>
    <input type="range" class="sk-slider__input" {min} {max} {step} bind:value {disabled} aria-label={label} />
  </span>
</label>
