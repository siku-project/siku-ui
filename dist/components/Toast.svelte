<!-- Toast — une notification (présentation). Utiliser toast.push() + <Toaster /> pour la file. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';
  import type { ToastTone } from '../runtime/toast';
  type Props = { title: string; body?: string; value?: string; time?: string; icon?: IconName; tone?: ToastTone; compact?: boolean; progress?: number; dim?: boolean };
  let { title, body, value, time, icon = 'info', tone = 'neutral', compact = false, progress, dim = false }: Props = $props();
</script>
<div class={['sk-toast', tone !== 'neutral' && `sk-toast--${tone}`, compact && 'sk-toast--compact', dim && 'is-dim'].filter(Boolean).join(' ')}
  role={tone === 'danger' ? 'alert' : 'status'}>
  <span class="sk-toast__icon"><Icon name={icon} /></span>
  <span class="sk-toast__title">{title}</span><span class="sk-toast__time">{time ?? ''}</span>
  {#if body}<span class="sk-toast__body">{body}</span>{/if}
  {#if value}<span class="sk-toast__value">{value}</span>{/if}
  {#if progress !== undefined}<span class="sk-toast__timer" style:width="{progress * 100}%"></span>{/if}
</div>
