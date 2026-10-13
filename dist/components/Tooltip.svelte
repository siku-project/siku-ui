<!-- Tooltip — aide d'une phrase, au survol ou au focus. Jamais d'information indispensable. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  type Props = { text: string; key?: string; placement?: 'top' | 'bottom'; children: Snippet; delay?: number };
  let { text, key, placement = 'top', children, delay = 300 }: Props = $props();
  const id = `sk-tt-${Math.random().toString(36).slice(2, 8)}`;
  let shown = $state(false);
  let t: ReturnType<typeof setTimeout>;
  const show = () => { clearTimeout(t); t = setTimeout(() => (shown = true), delay); };
  const hide = () => { clearTimeout(t); shown = false; };
</script>
<!-- svelte-ignore a11y_no_static_element_interactions (enveloppe un élément interactif) -->
<span class="sk-tooltip-anchor" aria-describedby={shown ? id : undefined}
  onpointerenter={show} onpointerleave={hide} onfocusin={show} onfocusout={hide}>
  {@render children()}
  {#if shown}<span class="sk-tooltip sk-tooltip--{placement}" role="tooltip" {id}>{text}{#if key}<kbd class="sk-key">{key}</kbd>{/if}</span>{/if}
</span>
