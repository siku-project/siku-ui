<!-- Checkbox — choix multiple ou acceptation. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import Icon from './Icon.svelte';
  type Props = { checked?: boolean; indeterminate?: boolean; disabled?: boolean; label?: string; children?: Snippet; onchange?: (v: boolean) => void };
  let { checked = $bindable(false), indeterminate = false, disabled = false, label, children, onchange }: Props = $props();
</script>
<label class={['sk-check', checked && !indeterminate && 'is-checked', indeterminate && 'is-mixed', disabled && 'is-disabled'].filter(Boolean).join(' ')}>
  <input type="checkbox" class="sk-visually-hidden" bind:checked {disabled} indeterminate={indeterminate} onchange={() => onchange?.(checked)} />
  <span class="sk-check__box"><Icon name={indeterminate ? 'minus' : 'check'} size="sm" /></span>
  {#if children}{@render children()}{:else}{label}{/if}
</label>
