<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';
  type Props = { title: string; open?: boolean; count?: number; dense?: boolean; children: Snippet; actions?: Snippet; ontoggle?: (open: boolean) => void };
  let { title, open = $bindable(false), count, dense = false, children, actions, ontoggle }: Props = $props();
  const id = `sk-dc-${Math.random().toString(36).slice(2, 8)}`;
  function toggle() { open = !open; ontoggle?.(open); }
</script>

<section class={['sk-disclosure', open && 'is-open', dense && 'is-dense'].filter(Boolean).join(' ')}>
  <div class="sk-disclosure__head">
    <button type="button" class="sk-disclosure__toggle sk-focusable" aria-expanded={open} aria-controls="{id}-b" onclick={toggle}>
      <Icon name="chev" size="sm" class="sk-disclosure__chev" />
      <span class="sk-disclosure__title">{title}</span>
      {#if count !== undefined}<span class="sk-disclosure__count">{count}</span>{/if}
    </button>
    {#if actions}<div class="sk-disclosure__actions">{@render actions()}</div>{/if}
  </div>
  {#if open}<div class="sk-disclosure__body" id="{id}-b">{@render children()}</div>{/if}
</section>
