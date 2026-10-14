<!-- SlotGrid — grille d'emplacements : navigation flèches/manette, sélection, glisser-déposer entre grilles. -->
<script lang="ts">
  import Slot from './Slot.svelte';
  import type { SlotItem, MoveEvent } from '../types';
  import { gridMove } from '../runtime/focus';
  type Props = {
    id: string; items: (SlotItem | null)[]; cols?: number; size?: 'sm' | 'md'; label: string;
    selected?: number; hotbar?: number; locked?: number[];
    canDrop?: (item: SlotItem, index: number, fromContainer: string) => boolean;
    onmove?: (e: MoveEvent) => void; onactivate?: (index: number, item: SlotItem | null) => void; oncontext?: (index: number, e: MouseEvent) => void;
  };
  let { id, items, cols = 5, size = 'md', label, selected = $bindable(-1), hotbar = 0, locked = [], canDrop, onmove, onactivate, oncontext }: Props = $props();
  let grid: HTMLDivElement;
  let over = $state(-1);
  let overValid = $state(true);
  let dragFrom = $state(-1);
  let focusIndex = $state(Math.max(0, selected));
  const MIME = 'application/x-siku-slot';

  function focusAt(i: number) { focusIndex = i; queueMicrotask(() => grid.querySelectorAll<HTMLElement>('.sk-slot')[i]?.focus()); }
  function onkey(e: KeyboardEvent) {
    const n = gridMove(focusIndex, e.key, cols, items.length);
    if (n !== focusIndex) { focusAt(n); e.preventDefault(); return; }
    if (e.key === 'Enter' || e.key === ' ') { selected = focusIndex; onactivate?.(focusIndex, items[focusIndex]); e.preventDefault(); }
  }
  // Glisser-déposer : la charge utile passe par une variable de module partagée (même document) et dataTransfer.
  const shared = globalThis as unknown as { __sikuDrag?: { container: string; index: number; item: SlotItem } | null };
</script>
<div class="sk-slot-grid" class:sk-slot-grid--sm={size === "sm"} style="--cols:{cols}" role="grid" tabindex="-1" aria-label={label} bind:this={grid} onkeydown={onkey}>
  {#each items as item, i}
    <Slot {item} {size} hotkey={i < hotbar ? i + 1 : undefined} selected={i === selected} locked={locked.includes(i)}
      tabindex={i === focusIndex ? 0 : -1} dragging={dragFrom === i}
      dropState={over === i ? (overValid ? 'valid' : 'invalid') : 'none'}
      onselect={() => { selected = i; focusIndex = i; onactivate?.(i, item); }}
      oncontext={(e) => oncontext?.(i, e)}
      ondragstart={(e) => { if (!item) return; dragFrom = i; shared.__sikuDrag = { container: id, index: i, item }; e.dataTransfer?.setData(MIME, `${id}:${i}`); if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move'; }}
      ondragend={() => { dragFrom = -1; over = -1; shared.__sikuDrag = null; }}
      ondragover={(e) => { const p = shared.__sikuDrag; if (!p || locked.includes(i)) return; e.preventDefault(); over = i; overValid = canDrop ? canDrop(p.item, i, p.container) : true; }}
      ondragleave={() => { if (over === i) over = -1; }}
      ondrop={(e) => { e.preventDefault(); const p = shared.__sikuDrag; over = -1; if (!p || (canDrop && !canDrop(p.item, i, p.container))) return; if (p.container === id && p.index === i) return; onmove?.({ from: { container: p.container, index: p.index }, to: { container: id, index: i }, item: p.item }); }} />
  {/each}
</div>
