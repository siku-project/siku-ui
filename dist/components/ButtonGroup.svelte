<!-- ButtonGroup — aligne des actions liées avec l'écart standard. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  type Props = { align?: 'start' | 'end' | 'between' | 'stretch'; children: Snippet; label?: string };
  let { align = 'end', children, label }: Props = $props();
</script>
<div class="sk-btn-group sk-btn-group--{align}" role="group" aria-label={label}>{@render children()}</div>
