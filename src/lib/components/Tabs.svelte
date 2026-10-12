<!-- Tabs — sections d'un même contenu (underline) ou filtres de barre d'écran (pill). Q/E en option. -->
<script lang="ts">
  type Tab = { value: string; label: string; count?: number; disabled?: boolean };
  type Props = { value?: string; tabs: Tab[]; variant?: 'underline' | 'pill'; label?: string; shortcuts?: boolean; onchange?: (v: string) => void };
  let { value = $bindable(''), tabs, variant = 'underline', label, shortcuts = false, onchange }: Props = $props();
  let list: HTMLDivElement;
  function select(v: string, focus = false) {
    value = v; onchange?.(v);
    if (focus) queueMicrotask(() => list.querySelector<HTMLElement>(`[data-v="${CSS.escape(v)}"]`)?.focus());
  }
  function move(d: number, focus: boolean) {
    const enabled = tabs.filter((t) => !t.disabled);
    const i = enabled.findIndex((t) => t.value === value);
    select(enabled[(i + d + enabled.length) % enabled.length].value, focus);
  }
  function onkey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') move(1, true); else if (e.key === 'ArrowLeft') move(-1, true); else return;
    e.preventDefault();
  }
  $effect(() => {
    if (!shortcuts) return;
    const k = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('input,textarea')) return;
      if (e.key === 'q' || e.key === 'Q') move(-1, false); else if (e.key === 'e' || e.key === 'E') move(1, false);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });
</script>
<div class="sk-tabs" class:sk-tabs--pill={variant === 'pill'} role="tablist" aria-label={label} bind:this={list} tabindex="-1" onkeydown={onkey}>
  {#each tabs as t (t.value)}
    <button type="button" role="tab" data-v={t.value} aria-selected={t.value === value} tabindex={t.value === value ? 0 : -1} disabled={t.disabled}
      class={['sk-tab sk-focusable', t.value === value && 'is-selected', t.disabled && 'is-disabled'].filter(Boolean).join(' ')}
      onclick={() => select(t.value)}>{t.label}{#if t.count !== undefined}<small>{t.count}</small>{/if}</button>
  {/each}
</div>
