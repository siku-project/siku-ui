<!-- Tree — arborescence dépliable : fichiers d’une ressource, hiérarchie d’objets. Flèches, Entrée, sélection. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';
  type Tone = 'neutral' | 'live' | 'success' | 'warning' | 'danger';
  export type TreeNode = { id: string; label: string; icon?: IconName; meta?: string; count?: number; tone?: Tone; disabled?: boolean; children?: TreeNode[] };
  type Props = { nodes: TreeNode[]; selected?: string | null; expanded?: string[]; label?: string; dense?: boolean; onselect?: (node: TreeNode) => void; ontoggle?: (id: string, open: boolean) => void };
  let { nodes, selected = $bindable(null), expanded = $bindable([]), label = 'Arborescence', dense = false, onselect, ontoggle }: Props = $props();
  let root: HTMLElement;
  const isOpen = (id: string) => expanded.includes(id);
  function toggle(node: TreeNode) {
    const open = !isOpen(node.id);
    expanded = open ? [...expanded, node.id] : expanded.filter((e) => e !== node.id);
    ontoggle?.(node.id, open);
  }
  function pick(node: TreeNode) {
    if (node.disabled) return;
    selected = node.id;
    onselect?.(node);
  }
  function rows() {
    return Array.from(root.querySelectorAll<HTMLElement>('.sk-tree__row:not([aria-disabled="true"])'));
  }
  function onkey(e: KeyboardEvent, node: TreeNode, depth: number) {
    const list = rows();
    const i = list.indexOf(e.currentTarget as HTMLElement);
    const branch = !!node.children?.length;
    switch (e.key) {
      case 'ArrowDown': list[Math.min(i + 1, list.length - 1)]?.focus(); break;
      case 'ArrowUp': list[Math.max(i - 1, 0)]?.focus(); break;
      case 'Home': list[0]?.focus(); break;
      case 'End': list[list.length - 1]?.focus(); break;
      case 'ArrowRight':
        if (branch && !isOpen(node.id)) toggle(node);
        else if (branch) list[i + 1]?.focus();
        break;
      case 'ArrowLeft':
        if (branch && isOpen(node.id)) toggle(node);
        else {
          const parent = (e.currentTarget as HTMLElement).closest('[role="group"]')?.previousElementSibling as HTMLElement | null;
          if (depth > 0) parent?.focus();
        }
        break;
      case 'Enter': case ' ':
        if (branch && !node.disabled) toggle(node);
        pick(node);
        break;
      default: return;
    }
    e.preventDefault();
  }
</script>

{#snippet branch(items: TreeNode[], depth: number)}
  {#each items as node (node.id)}
    {@const open = isOpen(node.id)}
    {@const children = node.children ?? []}
    <div role="treeitem" tabindex={selected === node.id || (depth === 0 && !selected && items[0] === node) ? 0 : -1}
      aria-level={depth + 1} aria-expanded={children.length ? open : undefined} aria-selected={selected === node.id}
      aria-disabled={node.disabled ? 'true' : undefined}
      class={['sk-tree__row sk-focusable', selected === node.id && 'is-selected', node.disabled && 'is-disabled'].filter(Boolean).join(' ')}
      style="--depth:{depth}" onclick={() => { if (children.length) toggle(node); pick(node); }} onkeydown={(e) => onkey(e, node, depth)}>
      <span class="sk-tree__toggle" aria-hidden="true">{#if children.length}<Icon name={open ? 'chevd' : 'chev'} size={14} />{/if}</span>
      {#if node.icon}<Icon name={node.icon} size={16} />{/if}
      <span class="sk-tree__label">{node.label}</span>
      {#if node.tone}<i class="sk-tree__dot sk-tone--{node.tone}"></i>{/if}
      {#if node.count}<span class="sk-count">{node.count > 999 ? '999+' : node.count}</span>{/if}
      {#if node.meta}<span class="sk-tree__meta">{node.meta}</span>{/if}
    </div>
    {#if children.length && open}
      <div role="group">{@render branch(children, depth + 1)}</div>
    {/if}
  {/each}
{/snippet}

<div class="sk-tree" class:sk-tree--dense={dense} role="tree" aria-label={label} bind:this={root}>
  {@render branch(nodes, 0)}
</div>
