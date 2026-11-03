<!-- Slot — emplacement d'inventaire. Places fixes : touche ↖, quantité ↗, nom en bas, usure sur le bord. -->
<script lang="ts">
  import { icons } from '../icons/icons';
  import type { SlotItem } from '../types';
  type Props = {
    item?: SlotItem | null; hotkey?: number; size?: 'sm' | 'md'; selected?: boolean; focused?: boolean; locked?: boolean;
    dropState?: 'none' | 'valid' | 'invalid'; dragging?: boolean; tabindex?: number;
    onselect?: () => void; oncontext?: (e: MouseEvent) => void;
    ondragstart?: (e: DragEvent) => void; ondragend?: (e: DragEvent) => void; ondragover?: (e: DragEvent) => void; ondragleave?: (e: DragEvent) => void; ondrop?: (e: DragEvent) => void;
  };
  let { item = null, hotkey, size = 'md', selected = false, focused = false, locked = false, dropState = 'none', dragging = false, tabindex = 0,
        onselect, oncontext, ondragstart, ondragend, ondragover, ondragleave, ondrop }: Props = $props();
  const low = $derived(item?.durability !== undefined && item.durability < 0.4);
</script>
<button type="button" {tabindex}
  class={['sk-slot sk-focusable', size === 'sm' && 'sk-slot--sm', !item && !locked && 'sk-slot--empty', selected && 'is-selected', focused && 'is-focus',
    locked && 'is-locked', dragging && 'is-dragging', dropState === 'valid' && 'is-drop', dropState === 'invalid' && 'is-invalid'].filter(Boolean).join(' ')}
  aria-pressed={selected} aria-disabled={locked || undefined}
  aria-label={locked ? 'Emplacement verrouillé' : item ? `${item.name}${item.count ? `, ${item.count}` : ''}${hotkey ? `, touche ${hotkey}` : ''}${low ? ', usé' : ''}` : `Emplacement vide${hotkey ? `, touche ${hotkey}` : ''}`}
  draggable={!!item && !locked} onclick={() => !locked && onselect?.()} oncontextmenu={(e) => { if (oncontext) { e.preventDefault(); oncontext(e); } }}
  {ondragstart} {ondragend} {ondragover} {ondragleave} {ondrop}>
  {#if hotkey}<span class="sk-slot__key">{hotkey}</span>{/if}
  {#if locked}<svg class="sk-slot__icon" viewBox="0 0 24 24" aria-hidden="true">{@html icons.lock}</svg>
  {:else if item}
    {#if item.count !== undefined && item.count > 1}<span class="sk-slot__qty"><i>×</i>{item.count}</span>{:else if item.label}<span class="sk-slot__qty">{item.label}</span>{/if}
    <svg class="sk-slot__icon" viewBox="0 0 24 24" aria-hidden="true">{@html icons[item.icon]}</svg>
    <span class="sk-slot__name">{item.name}</span>
    {#if item.durability !== undefined}<span class="sk-slot__dur" class:is-low={low}><i style:width="{item.durability * 100}%"></i></span>{/if}
  {/if}
</button>
