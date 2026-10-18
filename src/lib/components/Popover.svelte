<script lang="ts">
  import type { Snippet } from 'svelte';
  import { tick } from 'svelte';
  type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  type Props = { open?: boolean; placement?: Placement; trigger: Snippet<[{ toggle: () => void; open: boolean }]>; children: Snippet; onclose?: () => void; width?: number | 'trigger'; matchWidth?: boolean; block?: boolean; label?: string; autofocus?: boolean };
  let { open = $bindable(false), placement = 'bottom-start', trigger, children, onclose, width, matchWidth = false, block = false, label, autofocus = true }: Props = $props();
  const id = `sk-po-${Math.random().toString(36).slice(2, 8)}`;
  let root = $state<HTMLDivElement | null>(null);
  let panel = $state<HTMLDivElement | null>(null);
  let flipped = $state(false);
  let returnTo: HTMLElement | null = null;
  const side = $derived(flipped ? (placement.startsWith('bottom') ? placement.replace('bottom', 'top') : placement.replace('top', 'bottom')) : placement);
  const fill = $derived(matchWidth || width === 'trigger');
  function toggle() { open ? close() : show(); }
  function show() {
    const active = document.activeElement as HTMLElement | null;
    returnTo = active && root?.contains(active) ? active : (root?.querySelector<HTMLElement>('.sk-popover__trigger button, .sk-popover__trigger [tabindex]') ?? null);
    open = true;
  }
  function close(focusBack = true) {
    if (!open) return;
    open = false;
    onclose?.();
    if (focusBack) returnTo?.focus?.();
  }
  $effect(() => {
    if (!open || !root) return;
    flipped = false;
    tick().then(() => {
      if (!panel) return;
      const r = panel.getBoundingClientRect();
      if (placement.startsWith('bottom') && r.bottom > window.innerHeight && r.top > r.height) flipped = true;
      else if (placement.startsWith('top') && r.top < 0) flipped = true;
      if (autofocus) (panel.querySelector<HTMLElement>('[data-autofocus]') ?? panel.querySelector<HTMLElement>('input,button:not([disabled]),[href],[tabindex]:not([tabindex="-1"])') ?? panel).focus();
    });
    const onDown = (e: PointerEvent) => { if (root && !root.contains(e.target as Node)) close(false); };
    window.addEventListener('pointerdown', onDown);
    return () => window.removeEventListener('pointerdown', onDown);
  });
  function onkey(e: KeyboardEvent) { if (e.key === 'Escape' && open) { e.stopPropagation(); close(); } }
  function onfocusout(e: FocusEvent) { if (open && root && e.relatedTarget && !root.contains(e.relatedTarget as Node)) close(false); }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="sk-popover" class:is-block={block} class:is-open={open} bind:this={root} onkeydown={onkey} onfocusout={onfocusout}>
  <div class="sk-popover__trigger">{@render trigger({ toggle, open })}</div>
  {#if open}
    <div class="sk-popover__panel sk-popover__panel--{side}" class:is-fill={fill} role="dialog" aria-label={label} tabindex="-1" {id} bind:this={panel}
      style:width={typeof width === 'number' ? `${width}px` : undefined}>
      {@render children()}
    </div>
  {/if}
</div>
