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
  let coords = $state<{ top: number; left: number; width: number | null } | null>(null);
  let returnTo: HTMLElement | null = null;
  const side = $derived(flipped ? (placement.startsWith('bottom') ? placement.replace('bottom', 'top') : placement.replace('top', 'bottom')) : placement);
  const fill = $derived(matchWidth || width === 'trigger');
  const GAP = 4;
  const MARGIN = 8;
  function place() {
    const anchor = root?.querySelector<HTMLElement>('.sk-popover__trigger');
    if (!anchor || !panel) return;
    const r = anchor.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    const below = r.bottom + GAP;
    const above = r.top - GAP - p.height;
    let top = placement.startsWith('bottom') ? below : above;
    let flip = false;
    if (placement.startsWith('bottom') && below + p.height > window.innerHeight && above >= MARGIN) { top = above; flip = true; }
    else if (placement.startsWith('top') && above < MARGIN) { top = below; flip = true; }
    const w = fill ? r.width : p.width;
    let left = placement.endsWith('end') ? r.right - w : r.left;
    left = Math.max(MARGIN, Math.min(left, window.innerWidth - w - MARGIN));
    flipped = flip;
    coords = { top, left, width: fill ? r.width : null };
  }
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
    if (!open || !root) { coords = null; return; }
    flipped = false;
    tick().then(() => {
      if (!panel) return;
      place();
      if (autofocus) (panel.querySelector<HTMLElement>('[data-autofocus]') ?? panel.querySelector<HTMLElement>('input,button:not([disabled]),[href],[tabindex]:not([tabindex="-1"])') ?? panel).focus();
    });
    const onDown = (e: PointerEvent) => { if (root && !root.contains(e.target as Node)) close(false); };
    const onMove = () => place();
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('scroll', onMove, true);
    window.addEventListener('resize', onMove);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('scroll', onMove, true);
      window.removeEventListener('resize', onMove);
    };
  });
  function onkey(e: KeyboardEvent) { if (e.key === 'Escape' && open) { e.stopPropagation(); close(); } }
  function onfocusout(e: FocusEvent) { if (open && root && e.relatedTarget && !root.contains(e.relatedTarget as Node)) close(false); }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="sk-popover" class:is-block={block} class:is-open={open} bind:this={root} onkeydown={onkey} onfocusout={onfocusout}>
  <div class="sk-popover__trigger">{@render trigger({ toggle, open })}</div>
  {#if open}
    <div class="sk-popover__panel sk-popover__panel--{side}" class:is-fill={fill} class:is-placed={coords !== null} role="dialog" aria-label={label} tabindex="-1" {id} bind:this={panel}
      style:top={coords ? `${coords.top}px` : undefined} style:left={coords ? `${coords.left}px` : undefined}
      style:width={coords?.width != null ? `${coords.width}px` : typeof width === 'number' ? `${width}px` : undefined}>
      {@render children()}
    </div>
  {/if}
</div>
