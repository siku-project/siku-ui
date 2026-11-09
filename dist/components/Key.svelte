<!-- Key — une touche clavier ou un bouton de manette. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';
  type Props = { label?: string; arrow?: 'up' | 'down' | 'left' | 'right'; pad?: boolean; size?: 'md' | 'lg'; pressed?: boolean; onInverse?: boolean; children?: Snippet };
  let { label, arrow, pad = false, size = 'md', pressed = false, onInverse = false, children }: Props = $props();
  const rot = { up: -90, down: 90, left: 180, right: 0 };
</script>
<kbd class={['sk-key', pad && 'sk-key--pad', size === 'lg' && 'sk-key--lg', pressed && 'is-active', onInverse && 'sk-key--on-inverse'].filter(Boolean).join(' ')}
  aria-label={arrow ? `Flèche ${arrow}` : undefined}>
  {#if arrow}<span style:display="inline-flex" style:transform={`rotate(${rot[arrow]}deg)`}><Icon name="chev" size="sm" /></span>
  {:else if children}{@render children()}{:else}{label}{/if}
</kbd>
