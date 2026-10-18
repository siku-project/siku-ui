<!-- RadioGroup — un choix parmi peu, tous visibles. Flèches pour changer. -->
<script lang="ts">
  type Option = { value: string; label: string; disabled?: boolean };
  type Props = { value?: string; options: Option[]; name?: string; label?: string; orientation?: 'horizontal' | 'vertical' };
  let { value = $bindable(''), options, name = `sk-rg-${Math.random().toString(36).slice(2, 8)}`, label, orientation = 'horizontal' }: Props = $props();
</script>
<div class="sk-radio-group sk-radio-group--{orientation}" role="radiogroup" aria-label={label}>
  {#each options as o (o.value)}
    <label class={['sk-radio', value === o.value && 'is-checked', o.disabled && 'is-disabled'].filter(Boolean).join(' ')}>
      <input type="radio" class="sk-visually-hidden" {name} value={o.value} bind:group={value} disabled={o.disabled} />
      <span class="sk-radio__dot"></span>{o.label}
    </label>
  {/each}
</div>
