<!-- DataRow — ligne de liste (opérations, journaux, contacts). Entrées en succès avec signe, sorties neutres. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';
  type Props = { title: string; detail?: string; icon?: IconName; value?: string; tone?: 'in' | 'neutral'; meta?: string; selected?: boolean; onclick?: () => void };
  let { title, detail, icon, value, tone = 'neutral', meta, selected = false, onclick }: Props = $props();
</script>
<svelte:element this={onclick ? 'button' : 'div'} type={onclick ? 'button' : undefined} class="sk-row" class:sk-focusable={!!onclick} class:is-selected={selected} {onclick} role={onclick ? undefined : 'listitem'}>
  {#if icon}<span class="sk-row__lead"><Icon name={icon} /></span>{/if}
  <span class="sk-row__main">{title}{#if detail}<small>{detail}</small>{/if}</span>
  {#if value}<span class="sk-row__value" class:is-in={tone === 'in'}>{value}</span>{/if}
  {#if meta}<span class="sk-row__meta">{meta}</span>{/if}
</svelte:element>
