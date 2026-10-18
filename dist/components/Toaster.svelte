<!-- Toaster — pile de notifications en haut à droite (dans la zone sûre). Trois visibles, les anciennes en compact. -->
<script lang="ts">
  import Toast from './Toast.svelte';
  import { toasts, type ToastItem } from '../runtime/toast';
  type Props = { max?: number };
  let { max = 3 }: Props = $props();
  let list = $state<ToastItem[]>([]);
  $effect(() => toasts.subscribe((v) => (list = v)));
</script>
<div class="sk-toaster" aria-live="polite">
  {#each list.slice(0, max) as t, i (t.id)}
    <div class="sk-toaster__item"><Toast title={t.title} body={t.body} value={t.value} time={t.time ?? 'maintenant'} icon={t.icon} tone={t.tone} compact={i > 0} dim={i > 0} /></div>
  {/each}
</div>
