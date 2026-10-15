<!-- StatTile — un indicateur clé avec sa variation, sa tendance et son état de données. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ChartTone, DataState } from '../types';
  import type { IconName } from '../icons/icons';
  import Icon from './Icon.svelte';
  import Skeleton from './Skeleton.svelte';
  type Props = { label: string; value?: string; unit?: string; delta?: number; deltaLabel?: string; good?: 'up' | 'down' | 'none'; tone?: ChartTone; state?: DataState; message?: string; icon?: IconName; href?: string; size?: 'md' | 'lg'; children?: Snippet };
  let { label, value = '', unit = '', delta, deltaLabel, good = 'none', tone = 'neutral', state: dataState = 'ready', message = '', icon, href, size = 'md', children }: Props = $props();
  const deltaTone = $derived(delta === undefined || delta === 0 || good === 'none' ? 'neutral' : (delta > 0) === (good === 'up') ? 'success' : 'danger');
  const deltaText = $derived(delta === undefined ? '' : `${delta > 0 ? '+' : ''}${Math.abs(delta) >= 10 ? Math.round(delta) : Math.round(delta * 10) / 10} %`);
</script>

<svelte:element this={href ? 'a' : 'article'} href={href} class="sk-tile sk-tile--{size} sk-tone--{tone}" class:is-link={!!href}>
  <div class="sk-tile__head">{#if icon}<Icon name={icon} size="sm" />{/if}<span class="sk-tile__label">{label}</span></div>
  {#if dataState === 'loading'}
    <Skeleton width="60%" height="1.75rem" />
  {:else if dataState !== 'ready'}
    <div class="sk-tile__state">{message || (dataState === 'empty' ? 'Aucune donnée' : 'Indisponible')}</div>
  {:else}
    <div class="sk-tile__row">
      <span class="sk-tile__value">{value}{#if unit}<small>{unit}</small>{/if}</span>
      {#if delta !== undefined}
        <span class="sk-tile__delta sk-tile__delta--{deltaTone}">{#if delta > 0}<Icon name="arrow-up" size="sm" />{:else if delta < 0}<Icon name="arrow-down" size="sm" />{/if}{deltaText}</span>
      {/if}
    </div>
    {#if children}<div class="sk-tile__trend">{@render children()}</div>{/if}
    {#if deltaLabel}<div class="sk-tile__caption">{deltaLabel}</div>{/if}
  {/if}
</svelte:element>
