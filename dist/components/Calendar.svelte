<!-- Calendar — grille d'un mois : choisir une date, naviguer par mois et par année ; flèches, Page haut/bas, Début, Fin, Entrée. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  type Labels = { prevYear?: string; prevMonth?: string; nextMonth?: string; nextYear?: string };
  type Props = { value?: string; minYear?: number; maxYear?: number; locale?: string; weekStart?: 0 | 1; label?: string; labels?: Labels; onpick?: (value: string) => void };
  let { value = $bindable(''), minYear = 1900, maxYear = new Date().getFullYear(), locale = 'fr', weekStart = 1, label = 'Calendrier', labels = {}, onpick }: Props = $props();
  const text = $derived({ prevYear: 'Année précédente', prevMonth: 'Mois précédent', nextMonth: 'Mois suivant', nextYear: 'Année suivante', ...labels });
  const pad = (n: number) => String(n).padStart(2, '0');
  const toIso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  function parse(iso: string): Date | null {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
    if (!m) return null;
    const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    return d.getFullYear() === Number(m[1]) && d.getMonth() === Number(m[2]) - 1 && d.getDate() === Number(m[3]) ? d : null;
  }
  const clampYear = (y: number) => Math.min(maxYear, Math.max(minYear, y));
  const today = toIso(new Date());
  const start = parse(value) ?? new Date(clampYear(new Date().getFullYear()), new Date().getMonth(), 1);
  let viewYear = $state(clampYear(start.getFullYear()));
  let viewMonth = $state(start.getMonth());
  let focused = $state<string | null>(null);
  let root: HTMLDivElement;
  $effect(() => { const d = parse(value); if (d) { viewYear = clampYear(d.getFullYear()); viewMonth = d.getMonth(); } });
  const title = $derived.by(() => { const t = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(new Date(viewYear, viewMonth, 1)); return t.charAt(0).toUpperCase() + t.slice(1); });
  const weekdays = $derived(Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(2023, 11, 31 + ((i + weekStart) % 7))).replace('.', '')));
  const cells = $derived.by(() => {
    const offset = (new Date(viewYear, viewMonth, 1).getDay() - weekStart + 7) % 7;
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(viewYear, viewMonth, i + 1 - offset);
      return { iso: toIso(d), day: d.getDate(), inMonth: d.getMonth() === viewMonth, allowed: d.getFullYear() >= minYear && d.getFullYear() <= maxYear };
    });
  });
  const focusIso = $derived(focused && cells.some((c) => c.iso === focused) ? focused : (cells.find((c) => c.iso === value)?.iso ?? cells.find((c) => c.inMonth)?.iso ?? ''));
  function show(d: Date) {
    const y = clampYear(d.getFullYear());
    viewYear = y;
    if (y === d.getFullYear()) viewMonth = d.getMonth();
  }
  function shiftMonth(n: number) { show(new Date(viewYear, viewMonth + n, 1)); }
  function shiftYear(n: number) { viewYear = clampYear(viewYear + n); }
  function pick(iso: string) {
    const cell = cells.find((c) => c.iso === iso);
    if (!cell?.allowed) return;
    value = iso;
    onpick?.(iso);
  }
  function moveFocus(days: number, months = 0) {
    const from = parse(focusIso) ?? new Date(viewYear, viewMonth, 1);
    const d = new Date(from.getFullYear(), from.getMonth() + months, from.getDate() + days);
    if (d.getFullYear() < minYear || d.getFullYear() > maxYear) return;
    show(d);
    focused = toIso(d);
    queueMicrotask(() => root.querySelector<HTMLElement>('.sk-cal__day[tabindex="0"]')?.focus());
  }
  function onkey(e: KeyboardEvent) {
    const map: Record<string, [number, number]> = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [7, 0], ArrowUp: [-7, 0], PageDown: [0, 1], PageUp: [0, -1] };
    if (e.key in map) moveFocus(...map[e.key]);
    else if (e.key === 'Home' || e.key === 'End') {
      const d = parse(focusIso);
      if (!d) return;
      const dow = (d.getDay() - weekStart + 7) % 7;
      moveFocus(e.key === 'Home' ? -dow : 6 - dow);
    } else if (e.key === 'Enter' || e.key === ' ') pick(focusIso);
    else return;
    e.preventDefault();
  }
</script>
<div class="sk-cal" role="group" aria-label={label} bind:this={root}>
  <div class="sk-cal__head">
    <span class="sk-cal__nav">
      <button type="button" class="sk-cal__btn sk-focusable" aria-label={text.prevYear} disabled={viewYear <= minYear} onclick={() => shiftYear(-1)}><Icon name="chevll" size="sm" /></button>
      <button type="button" class="sk-cal__btn sk-focusable" aria-label={text.prevMonth} onclick={() => shiftMonth(-1)}><Icon name="chevl" size="sm" /></button>
    </span>
    <span class="sk-cal__title" aria-live="polite">{title}</span>
    <span class="sk-cal__nav">
      <button type="button" class="sk-cal__btn sk-focusable" aria-label={text.nextMonth} onclick={() => shiftMonth(1)}><Icon name="chev" size="sm" /></button>
      <button type="button" class="sk-cal__btn sk-focusable" aria-label={text.nextYear} disabled={viewYear >= maxYear} onclick={() => shiftYear(1)}><Icon name="chevrr" size="sm" /></button>
    </span>
  </div>
  <div class="sk-cal__grid" aria-hidden="true">{#each weekdays as w, i (i)}<span class="sk-cal__wd">{w}</span>{/each}</div>
  <div class="sk-cal__grid" role="grid" tabindex="-1" onkeydown={onkey}>
    {#each cells as c (c.iso)}
      <button type="button" role="gridcell" aria-selected={c.iso === value} tabindex={c.iso === focusIso ? 0 : -1} disabled={!c.allowed}
        class="sk-cal__day sk-focusable" class:is-out={!c.inMonth} class:is-selected={c.iso === value} class:is-today={c.iso === today}
        onclick={() => pick(c.iso)} onfocus={() => (focused = c.iso)}>{c.day}</button>
    {/each}
  </div>
</div>
