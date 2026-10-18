<script lang="ts">
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';
  type Props = { label: string; value: string; exclude?: boolean; icon?: IconName; removable?: boolean; title?: string; removeLabel?: string; onremove?: () => void; ontoggle?: (exclude: boolean) => void };
  let { label, value, exclude = false, icon, removable = true, title, removeLabel = 'Retirer', onremove, ontoggle }: Props = $props();
  const name = $derived(`${label} ${exclude ? 'différent de' : 'égal à'} ${value}`);
  function onkey(e: KeyboardEvent) {
    if ((e.key === 'Backspace' || e.key === 'Delete') && removable) { e.preventDefault(); onremove?.(); }
  }
</script>

<span class={['sk-chip', exclude && 'is-exclude'].filter(Boolean).join(' ')} {title}>
  {#if ontoggle || removable}
    <button type="button" class="sk-chip__main sk-focusable" aria-label={name} aria-pressed={ontoggle ? exclude : undefined} title={ontoggle ? (exclude ? 'Inclure' : 'Exclure') : undefined}
      onclick={() => ontoggle?.(!exclude)} onkeydown={onkey}>
      {#if icon}<Icon name={icon} size="sm" />{/if}<span class="sk-chip__key">{label}</span><span class="sk-chip__op" aria-hidden="true">{exclude ? '≠' : '='}</span><span class="sk-chip__val">{value}</span>
    </button>
  {:else}
    <span class="sk-chip__main" aria-label={name}>{#if icon}<Icon name={icon} size="sm" />{/if}<span class="sk-chip__key">{label}</span><span class="sk-chip__op" aria-hidden="true">{exclude ? '≠' : '='}</span><span class="sk-chip__val">{value}</span></span>
  {/if}
  {#if removable}<button type="button" class="sk-chip__x sk-focusable" aria-label="{removeLabel} {label}" onclick={() => onremove?.()} onkeydown={onkey}><Icon name="close" size="sm" /></button>{/if}
</span>
