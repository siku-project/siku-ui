<!-- Prompt — invite d'interaction ancrée à un objet du monde. L'option ciblée passe en blanc. -->
<script lang="ts">
  type Option = { id: string; key: string; label: string; detail?: string; disabled?: boolean };
  type Props = { options: Option[]; selected?: number; anchor?: boolean; label?: string };
  let { options, selected = $bindable(0), anchor = true, label = 'Interactions' }: Props = $props();
</script>
<div class="sk-prompt-wrap">
  {#if anchor}<span class="sk-anchor" aria-hidden="true"></span>{/if}
  <div class="sk-prompt" role="listbox" aria-label={label}>
    {#each options as o, i (o.id)}
      <div class={['sk-prompt__item', i === selected && 'is-selected', o.disabled && 'is-disabled'].filter(Boolean).join(' ')} role="option" aria-selected={i === selected} aria-disabled={o.disabled}>
        <kbd class="sk-key">{o.key}</kbd>{o.label}{#if o.detail}<small>{o.detail}</small>{/if}
      </div>
    {/each}
  </div>
</div>
