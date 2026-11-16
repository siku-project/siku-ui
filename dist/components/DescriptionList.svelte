<!-- DescriptionList — paires clé / valeur d’un détail (attributs d’un événement, propriétés d’un objet). -->
<script lang="ts">
  type Item = { label: string; value: string; mono?: boolean; href?: string; copy?: boolean };
  type Props = { items: Item[]; columns?: 1 | 2 | 3; label?: string; copyLabel?: string; oncopy?: (item: Item) => void };
  let { items, columns = 1, label, copyLabel = 'Copier', oncopy }: Props = $props();
  async function copy(item: Item) {
    try { await navigator.clipboard.writeText(item.value); } catch { /* presse-papiers indisponible : rien à faire */ }
    oncopy?.(item);
  }
</script>

<dl class="sk-dl sk-dl--{columns}" aria-label={label}>
  {#each items as item (item.label)}
    <div class="sk-dl__row">
      <dt class="sk-dl__key">{item.label}</dt>
      <dd class="sk-dl__val" class:mono={item.mono}>
        {#if item.href}<a href={item.href}>{item.value}</a>{:else}{item.value}{/if}
        {#if item.copy}<button type="button" class="sk-dl__copy" aria-label="{copyLabel} {item.label}" onclick={() => copy(item)}><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5v-3a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/></svg></button>{/if}
      </dd>
    </div>
  {/each}
</dl>
