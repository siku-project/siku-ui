<!-- Screen — famille « écran plein » : voile, cadre 16:9 centré (écrans larges), Échap pour fermer. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  type Props = { title?: string; scrim?: 'light' | 'standard' | 'edges'; onclose?: () => void; header?: Snippet; children: Snippet };
  let { title, scrim = 'edges', onclose, header, children }: Props = $props();
  $effect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape' && !e.defaultPrevented) onclose?.(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  });
</script>
<div class="sk sk-screen sk-screen--{scrim}" role="dialog" aria-label={title}>
  <div class="sk-screen__frame">
    {#if header || title}<header class="sk-screen__bar">{#if header}{@render header()}{:else}<h1 class="t-title-lg">{title}</h1>{/if}</header>{/if}
    {@render children()}
  </div>
</div>
