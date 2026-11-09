<!-- TextField — champ de saisie avec libellé, aide et erreur. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';
  type Props = Omit<HTMLInputAttributes, 'size' | 'value'> & {
    label?: string; value?: string | number; help?: string; error?: string; aside?: string;
    icon?: IconName; suffix?: string; end?: Snippet; size?: 'md' | 'sm'; variant?: 'default' | 'amount';
  };
  let { label, value = $bindable(''), help, error, aside, icon, suffix, end, size = 'md', variant = 'default',
        disabled = false, id = `sk-tf-${Math.random().toString(36).slice(2, 8)}`, ...rest }: Props = $props();
</script>
<div class="sk-field" class:is-error={!!error}>
  {#if label}<label class="sk-field__label" for={id}>{label}{#if aside}<span>{aside}</span>{/if}</label>{/if}
  <div class={['sk-input', size === 'sm' && 'sk-input--sm', variant === 'amount' && 'sk-input--amount', error && 'is-error', disabled && 'is-disabled'].filter(Boolean).join(' ')}>
    {#if icon}<Icon name={icon} />{/if}
    <input {...rest} {id} bind:value {disabled} class="sk-input__control"
      aria-invalid={error ? 'true' : undefined} aria-describedby={error || help ? `${id}-help` : undefined} />
    {#if suffix || end}<span class="sk-input__end">{#if end}{@render end()}{:else}{suffix}{/if}</span>{/if}
  </div>
  {#if error}<span class="sk-field__help" id="{id}-help" role="alert">{error}</span>{:else if help}<span class="sk-field__help" id="{id}-help">{help}</span>{/if}
</div>
