<!-- Select — liste déroulante. Clavier : Entrée/Espace ouvre, flèches parcourent, Entrée choisit, Échap ferme. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  type Option = { value: string; label: string; detail?: string; disabled?: boolean; meta?: string };
  type Props = { value?: string; options: Option[]; label?: string; placeholder?: string; group?: string; disabled?: boolean; onchange?: (v: string) => void };
  let { value = $bindable(''), options, label, placeholder = 'Choisir…', group, disabled = false, onchange }: Props = $props();
  const id = `sk-sel-${Math.random().toString(36).slice(2, 8)}`;
  let open = $state(false);
  let active = $state(0);
  let root: HTMLDivElement;
  const current = $derived(options.find((o) => o.value === value));

  function openList() { if (disabled) return; open = true; active = Math.max(0, options.findIndex((o) => o.value === value)); }
  function choose(i: number) { const o = options[i]; if (!o || o.disabled) return; value = o.value; open = false; onchange?.(o.value); root.querySelector<HTMLElement>('.sk-select')?.focus(); }
  function step(d: number) { let i = active; do { i = (i + d + options.length) % options.length; } while (options[i].disabled && i !== active); active = i; }
  function onkey(e: KeyboardEvent) {
    if (!open) { if (['Enter', ' ', 'ArrowDown'].includes(e.key)) { openList(); e.preventDefault(); } return; }
    if (e.key === 'ArrowDown') step(1); else if (e.key === 'ArrowUp') step(-1);
    else if (e.key === 'Enter' || e.key === ' ') choose(active);
    else if (e.key === 'Escape') { open = false; e.stopPropagation(); }
    else return;
    e.preventDefault();
  }
  $effect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => { if (!root.contains(e.target as Node)) open = false; };
    window.addEventListener('pointerdown', close);
    return () => window.removeEventListener('pointerdown', close);
  });
</script>

<div class="sk-field sk-select-wrap" bind:this={root}>
  {#if label}<span class="sk-field__label" id="{id}-l">{label}</span>{/if}
  <button type="button" role="combobox" class="sk-select sk-focusable" class:is-open={open} class:is-disabled={disabled} {disabled}
    aria-haspopup="listbox" aria-expanded={open} aria-activedescendant={open ? `${id}-o${active}` : undefined} aria-labelledby={label ? `${id}-l` : undefined} aria-controls="{id}-list"
    onclick={() => (open ? (open = false) : openList())} onkeydown={onkey}>
    <span>{#if current}{current.label}{#if current.detail}<small>{current.detail}</small>{/if}{:else}<span class="sk-input__ph">{placeholder}</span>{/if}</span>
    <Icon name="chevd" />
  </button>
  {#if open}
    <div class="sk-menu sk-select__list" role="listbox" id="{id}-list" tabindex="-1">
      {#if group}<div class="sk-menu__group">{group}</div>{/if}
      {#each options as o, i (o.value)}
        <!-- svelte-ignore a11y_click_events_have_key_events (clavier géré par le bouton via aria-activedescendant) -->
        <div role="option" tabindex="-1" id="{id}-o{i}" aria-selected={o.value === value} aria-disabled={o.disabled}
          class={['sk-menu__item', i === active && 'is-hover', o.value === value && 'is-selected', o.disabled && 'is-disabled'].filter(Boolean).join(' ')}
          onpointerenter={() => (active = i)} onclick={() => choose(i)}>
          <span>{o.label}</span>
          <span class="sk-menu__end">{#if o.value === value}<Icon name="check" />{:else if o.meta}{o.meta}{/if}</span>
        </div>
      {/each}
    </div>
  {/if}
</div>
