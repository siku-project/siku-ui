<!-- Toast — une notification (présentation). Utiliser toast.push() + <Toaster /> pour la file. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';
  import type { ToastImageMode, ToastTone } from '../runtime/toast';
  type Props = { title: string; body?: string; value?: string; time?: string; icon?: IconName; tone?: ToastTone; compact?: boolean; progress?: number; duration?: number; image?: string; imageMode?: ToastImageMode; count?: number; dim?: boolean };
  let { title, body, value, time, icon = 'info', tone = 'neutral', compact = false, progress, duration, image, imageMode = 'side', count, dim = false }: Props = $props();
  const cover = $derived(Boolean(image) && imageMode === 'background');
  const media = $derived(Boolean(image) && imageMode === 'side');
  const repeats = $derived(count !== undefined && count > 1 ? count : undefined);
</script>
<div class={['sk-toast', tone !== 'neutral' && `sk-toast--${tone}`, compact && 'sk-toast--compact', media && 'sk-toast--media', cover && 'sk-toast--cover', dim && 'is-dim'].filter(Boolean).join(' ')}
  role={tone === 'danger' ? 'alert' : 'status'}>
  {#if cover}<img class="sk-toast__cover" src={image} alt="" />{/if}
  {#if media}<img class="sk-toast__media" src={image} alt="" />{:else}<span class="sk-toast__icon"><Icon name={icon} /></span>{/if}
  <span class="sk-toast__title">{title}</span>
  <span class="sk-toast__meta">
    {#if repeats}<span class="sk-toast__count">×{repeats}</span>{/if}
    {#if time}<span class="sk-toast__time">{time}</span>{/if}
  </span>
  {#if body}<span class="sk-toast__body">{body}</span>{/if}
  {#if value}<span class="sk-toast__value">{value}</span>{/if}
  {#if duration !== undefined && duration > 0}
    {#key repeats}<span class="sk-toast__timer sk-toast__timer--run" style:animation-duration="{duration}ms"></span>{/key}
  {:else if progress !== undefined}
    <span class="sk-toast__timer" style:width="{progress * 100}%"></span>
  {/if}
</div>
