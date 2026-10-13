<!-- Button — déclenche une action. Le libellé dit exactement ce qui se passe. -->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import Icon from './Icon.svelte';
  import type { IconName } from '../icons/icons';

  type Props = Omit<HTMLButtonAttributes, 'children'> & Pick<HTMLAnchorAttributes, 'target' | 'rel' | 'download'> & {
    /** Rend un lien <a> avec le même rendu : navigation plutôt qu'action. */
    href?: string;
    /** primary : l'action qui fait avancer la tâche. secondary par défaut. */
    variant?: 'primary' | 'secondary' | 'ghost' | 'quiet' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    /** Touche affichée à droite (« E », « Espace »). */
    key?: string;
    icon?: IconName;
    /** Bouton carré sans texte : `label` devient le nom accessible. */
    iconOnly?: boolean;
    label?: string;
    loading?: boolean;
    block?: boolean;
    children?: Snippet;
  };
  let { href, variant = 'secondary', size = 'md', key, icon, iconOnly = false, label, loading = false, block = false,
        disabled = false, type = 'button', children, class: cls = '', ...rest }: Props = $props();
  const classes = $derived(['sk-btn sk-focusable', variant !== 'secondary' && `sk-btn--${variant}`, size !== 'md' && `sk-btn--${size}`,
    iconOnly && 'sk-btn--icon', block && 'sk-btn--block', block && key && 'sk-btn--split', loading && 'is-loading', (disabled || loading) && href && 'is-disabled', cls].filter(Boolean).join(' '));
</script>

{#snippet content()}
  {#if icon}<Icon name={icon} />{/if}
  {#if !iconOnly}{#if children}{@render children()}{:else}{label}{/if}{/if}
  {#if key && !iconOnly}<kbd class="sk-key">{key}</kbd>{/if}
{/snippet}

{#if href}
  <a {...(rest as HTMLAnchorAttributes)} href={disabled || loading ? undefined : href} class={classes} role={disabled || loading ? 'link' : undefined}
    aria-disabled={disabled || loading || undefined} aria-busy={loading || undefined} aria-label={iconOnly ? label : undefined}>{@render content()}</a>
{:else}
  <button {...rest} {type} class={classes}
    disabled={disabled || loading} aria-busy={loading || undefined} aria-label={iconOnly ? label : undefined}>{@render content()}</button>
{/if}
