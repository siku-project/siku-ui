<!-- Switch — réglage à effet immédiat, sans validation. -->
<script lang="ts">
  type Props = { checked?: boolean; label: string; description?: string; disabled?: boolean; onchange?: (v: boolean) => void };
  let { checked = $bindable(false), label, description, disabled = false, onchange }: Props = $props();
</script>
<label class={['sk-switch', checked && 'is-checked', disabled && 'is-disabled'].filter(Boolean).join(' ')}>
  <input type="checkbox" role="switch" class="sk-visually-hidden" bind:checked {disabled} onchange={() => onchange?.(checked)} />
  <span class="sk-switch__track"></span>
  <span class="sk-switch__text">{label}{#if description}<small>{description}</small>{/if}</span>
</label>
