<!-- SwatchPicker — une couleur parmi une palette : cheveux, maquillage, peinture. Flèches entre les pastilles. -->
<script lang="ts">
  type Props = { colors: string[]; value?: number; label?: string; size?: 'sm' | 'md'; disabled?: boolean; format?: (index: number) => string; onchange?: (index: number) => void };
  let { colors, value = $bindable(0), label, size = 'md', disabled = false, format = (i) => `${i + 1} / ${colors.length}`, onchange }: Props = $props();
  const id = `sk-sw-${Math.random().toString(36).slice(2, 8)}`;
  let root: HTMLDivElement;
  function pick(i: number) {
    if (disabled || i < 0 || i >= colors.length || i === value) return;
    value = i;
    onchange?.(i);
  }
  function focusCurrent() { queueMicrotask(() => root.querySelector<HTMLElement>('[role="radio"][tabindex="0"]')?.focus()); }
  function onkey(e: KeyboardEvent) {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
    if (d) pick((value + d + colors.length) % colors.length);
    else if (e.key === 'Home') pick(0);
    else if (e.key === 'End') pick(colors.length - 1);
    else return;
    e.preventDefault();
    focusCurrent();
  }
</script>
<div class="sk-field sk-swatches" class:is-disabled={disabled} bind:this={root}>
  {#if label}<span class="sk-field__label" id="{id}-l">{label}<span>{format(value)}</span></span>{/if}
  <div class={['sk-swatches__row', size === 'sm' && 'sk-swatches--sm'].filter(Boolean).join(' ')} role="radiogroup" tabindex="-1" aria-labelledby={label ? `${id}-l` : undefined} onkeydown={onkey}>
    {#each colors as color, i (i)}
      <button type="button" role="radio" aria-checked={i === value} aria-label={format(i)} tabindex={i === value ? 0 : -1} {disabled}
        class="sk-swatch" class:is-selected={i === value} style:background={color} onclick={() => pick(i)}></button>
    {/each}
  </div>
</div>
