<!-- Stepper — quantité entière (diviser une pile, acheter). Flèches gauche/droite au clavier et à la manette. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  type Props = { value?: number; min?: number; max: number; step?: number; label?: string; showMax?: boolean; onchange?: (v: number) => void };
  let { value = $bindable(1), min = 1, max, step = 1, label = 'Quantité', showMax = true, onchange }: Props = $props();
  function set(v: number) { const n = Math.min(max, Math.max(min, v)); if (n !== value) { value = n; onchange?.(n); } }
  function onkey(e: KeyboardEvent) {
    const map: Record<string, number> = { ArrowRight: step, ArrowUp: step, ArrowLeft: -step, ArrowDown: -step, PageUp: step * 10, PageDown: -step * 10 };
    if (e.key in map) { set(value + map[e.key]); e.preventDefault(); }
    else if (e.key === 'Home') { set(min); e.preventDefault(); } else if (e.key === 'End') { set(max); e.preventDefault(); }
  }
</script>
<div class="sk-stepper sk-focusable" role="spinbutton" tabindex="0" aria-label={label} aria-valuenow={value} aria-valuemin={min} aria-valuemax={max} onkeydown={onkey}>
  <button type="button" tabindex="-1" class="sk-stepper__btn" class:is-disabled={value <= min} aria-label="Moins" onclick={() => set(value - step)}><Icon name="minus" size="sm" /></button>
  <span class="sk-stepper__val">{value}{#if showMax}<small> / {max}</small>{/if}</span>
  <button type="button" tabindex="-1" class="sk-stepper__btn" class:is-disabled={value >= max} aria-label="Plus" onclick={() => set(value + step)}><Icon name="plus" size="sm" /></button>
</div>
