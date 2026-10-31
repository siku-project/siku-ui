<!-- DateField — date saisie au clavier (chiffres seuls, séparateurs posés automatiquement) ou choisie dans un calendrier ancré au champ. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import Popover from './Popover.svelte';
  import Calendar from './Calendar.svelte';
  type Order = 'dmy' | 'mdy' | 'ymd';
  type Placement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  type Props = { label?: string; value?: string; order?: Order; placeholder?: string; help?: string; error?: string; aside?: string; minYear?: number; maxYear?: number; locale?: string; disabled?: boolean; calendarLabel?: string; placement?: Placement; onchange?: (value: string) => void };
  let { label, value = $bindable(''), order = 'dmy', placeholder, help, error, aside, minYear = 1900, maxYear = new Date().getFullYear(), locale = 'fr', disabled = false, calendarLabel = 'Ouvrir le calendrier', placement = 'bottom-start', onchange }: Props = $props();
  const id = `sk-df-${Math.random().toString(36).slice(2, 8)}`;
  const parts: Record<Order, ('d' | 'm' | 'y')[]> = { dmy: ['d', 'm', 'y'], mdy: ['m', 'd', 'y'], ymd: ['y', 'm', 'd'] };
  const width = { d: 2, m: 2, y: 4 };
  const hint = $derived(placeholder ?? parts[order].map((k) => ({ d: 'JJ', m: 'MM', y: 'AAAA' })[k]).join('/'));
  let digits = $state('');
  let open = $state(false);
  let typed = false;
  function fromIso(iso: string): string {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!m) return '';
    const by = { y: m[1], m: m[2], d: m[3] };
    return parts[order].map((k) => by[k]).join('');
  }
  function toIso(raw: string): string {
    if (raw.length !== 8) return '';
    let at = 0;
    const by: Record<string, string> = {};
    for (const k of parts[order]) { by[k] = raw.slice(at, at + width[k]); at += width[k]; }
    const d = new Date(Number(by.y), Number(by.m) - 1, Number(by.d));
    return d.getFullYear() === Number(by.y) && d.getMonth() === Number(by.m) - 1 && d.getDate() === Number(by.d) ? `${by.y}-${by.m}-${by.d}` : '';
  }
  $effect(() => { if (!typed) digits = fromIso(value); typed = false; });
  const display = $derived.by(() => {
    let out = '', at = 0;
    for (const k of parts[order]) {
      const chunk = digits.slice(at, at + width[k]);
      if (!chunk) break;
      out += (out ? '/' : '') + chunk;
      at += width[k];
    }
    return out;
  });
  function commit(next: string) {
    digits = next;
    typed = true;
    const iso = next.length === 8 ? toIso(next) : '';
    if (iso !== value) { value = iso; onchange?.(iso); }
  }
  function append(ch: string) {
    if (digits.length >= 8) return;
    const at = digits.length;
    let pos = 0;
    for (const k of parts[order]) {
      if (at === pos && (k === 'd' || k === 'm') && Number(ch) > (k === 'd' ? 3 : 1)) { commit(`${digits}0${ch}`); return; }
      pos += width[k];
    }
    commit(digits + ch);
  }
  function onkeydown(e: KeyboardEvent) {
    if (e.key === 'Backspace' || e.key === 'Delete') { e.preventDefault(); commit(digits.slice(0, -1)); return; }
    if (/^\d$/.test(e.key)) { e.preventDefault(); append(e.key); return; }
    if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) e.preventDefault();
  }
  function onpaste(e: ClipboardEvent) {
    e.preventDefault();
    for (const ch of (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '')) append(ch);
  }
  function picked(iso: string) {
    typed = false;
    value = iso;
    onchange?.(iso);
    open = false;
  }
</script>
<div class="sk-field sk-datefield" class:is-error={!!error}>
  {#if label}<label class="sk-field__label" for={id}>{label}{#if aside}<span>{aside}</span>{/if}</label>{/if}
  <Popover bind:open block {placement} label={calendarLabel} autofocus={false}>
    {#snippet trigger({ toggle, open: isOpen })}
      <div class={['sk-input', error && 'is-error', disabled && 'is-disabled'].filter(Boolean).join(' ')}>
        <input {id} class="sk-input__control sk-datefield__input" type="text" inputmode="numeric" autocomplete="off" value={display} placeholder={hint} {disabled}
          aria-invalid={error ? 'true' : undefined} aria-describedby={error || help ? `${id}-help` : undefined} onkeydown={onkeydown} onpaste={onpaste} />
        <button type="button" class="sk-datefield__btn sk-focusable" aria-label={calendarLabel} aria-expanded={isOpen} {disabled} onclick={toggle}><Icon name="calendar" /></button>
      </div>
    {/snippet}
    <Calendar value={value} {minYear} {maxYear} {locale} onpick={picked} />
  </Popover>
  {#if error}<span class="sk-field__help" id="{id}-help" role="alert">{error}</span>{:else if help}<span class="sk-field__help" id="{id}-help">{help}</span>{/if}
</div>
