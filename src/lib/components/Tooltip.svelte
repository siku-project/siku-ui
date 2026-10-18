<!-- Tooltip — aide d'une phrase, au survol ou au focus. Jamais d'information indispensable. Reste dans la fenêtre : décalée ou retournée si elle déborde. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  type Props = { text: string; key?: string; placement?: 'top' | 'bottom'; align?: 'center' | 'start' | 'end'; children: Snippet; delay?: number };
  let { text, key, placement = 'top', align = 'center', children, delay = 300 }: Props = $props();
  const id = `sk-tt-${Math.random().toString(36).slice(2, 8)}`;
  const MARGIN = 8;
  let shown = $state(false);
  let bubble = $state<HTMLSpanElement | null>(null);
  let shift = $state(0);
  let flipped = $state(false);
  let t: ReturnType<typeof setTimeout>;
  const show = () => { clearTimeout(t); t = setTimeout(() => (shown = true), delay); };
  const hide = () => { clearTimeout(t); shown = false; };
  const side = $derived(flipped ? (placement === 'top' ? 'bottom' : 'top') : placement);
  $effect(() => {
    if (!shown || !bubble) { shift = 0; flipped = false; return; }
    const r = bubble.getBoundingClientRect();
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (r.right > width - MARGIN) shift = Math.round(width - MARGIN - r.right);
    else if (r.left < MARGIN) shift = Math.round(MARGIN - r.left);
    if (placement === 'top' && r.top < MARGIN) flipped = true;
    else if (placement === 'bottom' && r.bottom > height - MARGIN) flipped = true;
  });
</script>
<!-- svelte-ignore a11y_no_static_element_interactions (enveloppe un élément interactif) -->
<span class="sk-tooltip-anchor" aria-describedby={shown ? id : undefined}
  onpointerenter={show} onpointerleave={hide} onfocusin={show} onfocusout={hide}>
  {@render children()}
  {#if shown}<span bind:this={bubble} class={['sk-tooltip', `sk-tooltip--${side}`, align !== 'center' && `sk-tooltip--${align}`].filter(Boolean).join(' ')} style:--sk-tt-shift="{shift}px" role="tooltip" {id}>{text}{#if key}<kbd class="sk-key">{key}</kbd>{/if}</span>{/if}
</span>
