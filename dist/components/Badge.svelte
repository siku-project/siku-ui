<!-- Badge — un mot d'état. La couleur suit le sens, le mot le porte. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';
  type Props = { tone?: 'neutral' | 'live' | 'info' | 'success' | 'warning' | 'danger' | 'solid'; icon?: IconName; label?: string; children?: Snippet };
  let { tone = 'neutral', icon, label, children }: Props = $props();
</script>
<span class={['sk-badge', tone !== 'neutral' && `sk-badge--${tone}`].filter(Boolean).join(' ')}>{#if icon}<Icon name={icon} size="sm" />{/if}{#if children}{@render children()}{:else}{label}{/if}</span>
