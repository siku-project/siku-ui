<!-- Chip — jeton de choix : catégorie d'un éditeur, filtre d'une liste, option à activer. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';
  type Props = { label?: string; icon?: IconName; selected?: boolean; disabled?: boolean; count?: number; size?: 'sm' | 'md'; children?: Snippet; onclick?: (e: MouseEvent) => void };
  let { label, icon, selected = false, disabled = false, count, size = 'md', children, onclick }: Props = $props();
</script>
<button type="button" class={['sk-choice sk-focusable', selected && 'is-selected', size === 'sm' && 'sk-choice--sm'].filter(Boolean).join(' ')}
  aria-pressed={selected} {disabled} {onclick}>
  {#if icon}<Icon name={icon} size="sm" />{/if}
  <span class="sk-choice__label">{#if children}{@render children()}{:else}{label}{/if}</span>
  {#if count !== undefined}<span class="sk-choice__count">{count > 999 ? '999+' : count}</span>{/if}
</button>
