<!-- SpritePicker — une case parmi une planche d'images (couleurs d'yeux, motifs, emblèmes). Flèches entre les cases. -->
<script lang="ts">
  type Props = { image: string; count: number; columns: number; value?: number; label?: string; size?: number; shape?: 'round' | 'square'; disabled?: boolean; format?: (index: number) => string; onchange?: (index: number) => void };
  let { image, count, columns, value = $bindable(0), label, size = 44, shape = 'round', disabled = false, format = (i) => `${i + 1} / ${count}`, onchange }: Props = $props();
  const id = `sk-sp-${Math.random().toString(36).slice(2, 8)}`;
  let root: HTMLDivElement;
  const rows = $derived(Math.max(1, Math.ceil(count / columns)));
  const cell = $derived(`${size / 16}rem`);
  function position(i: number) {
    const x = columns > 1 ? ((i % columns) / (columns - 1)) * 100 : 0;
    const y = rows > 1 ? (Math.floor(i / columns) / (rows - 1)) * 100 : 0;
    return `${x}% ${y}%`;
  }
  function pick(i: number) {
    if (disabled || i < 0 || i >= count || i === value) return;
    value = i;
    onchange?.(i);
  }
  function focusCurrent() { queueMicrotask(() => root.querySelector<HTMLElement>('[role="radio"][tabindex="0"]')?.focus()); }
  function onkey(e: KeyboardEvent) {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : e.key === 'ArrowDown' ? columns : e.key === 'ArrowUp' ? -columns : 0;
    if (d) pick(Math.min(count - 1, Math.max(0, value + d)));
    else if (e.key === 'Home') pick(0);
    else if (e.key === 'End') pick(count - 1);
    else return;
    e.preventDefault();
    focusCurrent();
  }
</script>
<div class="sk-field sk-sprites" class:is-disabled={disabled} bind:this={root}>
  {#if label}<span class="sk-field__label" id="{id}-l">{label}<span>{format(value)}</span></span>{/if}
  <div class={['sk-sprites__row', shape === 'square' && 'sk-sprites--square'].filter(Boolean).join(' ')} role="radiogroup" tabindex="-1" aria-labelledby={label ? `${id}-l` : undefined} onkeydown={onkey}>
    {#each { length: count } as _, i (i)}
      <button type="button" role="radio" aria-checked={i === value} aria-label={format(i)} tabindex={i === value ? 0 : -1} {disabled}
        class="sk-sprite" class:is-selected={i === value} style:width={cell} style:height={cell}
        style:background-image="url({image})" style:background-size="{columns * 100}% {rows * 100}%" style:background-position={position(i)} onclick={() => pick(i)}></button>
    {/each}
  </div>
</div>
