<!-- Surface — un niveau de surface. Utiliser pour composer une fenêtre, un panneau, une colonne de focus. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  type Props = { level?: 'base' | 'raised' | 'sunken'; padding?: 'none' | 'sm' | 'md' | 'lg'; radius?: 'none' | 'lg' | 'xl'; elevated?: boolean; bordered?: boolean; as?: string; children: Snippet; class?: string };
  let { level = 'base', padding = 'md', radius = 'xl', elevated = false, bordered = true, as = 'div', children, class: cls = '' }: Props = $props();
</script>
<svelte:element this={as} class={['sk-surface', `sk-surface--${level}`, `sk-pad-${padding}`, `sk-radius-${radius}`, elevated && 'is-elevated', bordered && 'is-bordered', cls].filter(Boolean).join(' ')}>{@render children()}</svelte:element>
