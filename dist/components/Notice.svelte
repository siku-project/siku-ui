<!-- Notice — message en ligne qui reste dans le flux : erreur d'un formulaire, retour d'une action, information. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';
  type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';
  type Props = { tone?: Tone; title?: string; icon?: IconName; children?: Snippet; text?: string };
  let { tone = 'neutral', title, icon, children, text }: Props = $props();
  const defaults: Record<Tone, IconName> = { neutral: 'info', info: 'info', success: 'check', warning: 'alert', danger: 'alert' };
  const name = $derived(icon ?? defaults[tone]);
</script>
<div class={['sk-notice', tone !== 'neutral' && `sk-notice--${tone}`].filter(Boolean).join(' ')} role={tone === 'danger' ? 'alert' : 'status'}>
  <span class="sk-notice__icon"><Icon name={name} size="sm" /></span>
  <div class="sk-notice__text">
    {#if title}<b class="sk-notice__title">{title}</b>{/if}
    {#if children}{@render children()}{:else if text}{text}{/if}
  </div>
</div>
