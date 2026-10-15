<!-- Segmented — une valeur parmi deux à quatre. -->
<script lang="ts">
  type Option = { value: string; label: string; disabled?: boolean };
  type Props = { value?: string; options: Option[]; label?: string; size?: 'sm' | 'md'; onchange?: (v: string) => void };
  let { value = $bindable(''), options, label, size = 'md', onchange }: Props = $props();
  function onkey(e: KeyboardEvent) {
    const i = options.findIndex((o) => o.value === value);
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    const n = options[(i + d + options.length) % options.length];
    if (!n.disabled) { value = n.value; onchange?.(n.value); }
    e.preventDefault();
  }
</script>
<div class={['sk-seg', 'sk-focusable', size === 'sm' && 'sk-seg--sm'].filter(Boolean).join(' ')} role="radiogroup" aria-label={label} tabindex="0" onkeydown={onkey}>
  {#each options as o (o.value)}
    <button type="button" tabindex="-1" role="radio" aria-checked={o.value === value} disabled={o.disabled}
      class="sk-seg__item" class:is-selected={o.value === value} onclick={() => { value = o.value; onchange?.(o.value); }}>{o.label}</button>
  {/each}
</div>
