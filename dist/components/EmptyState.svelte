<!-- EmptyState — un état vide propose l'action suivante. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  type Props = { title: string; children?: Snippet; action?: Snippet };
  let { title, children, action }: Props = $props();
</script>
<div class="sk-empty"><b>{title}</b>{#if children}<span>{@render children()}</span>{/if}{#if action}<div class="sk-empty__action">{@render action()}</div>{/if}</div>
