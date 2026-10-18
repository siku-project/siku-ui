<script lang="ts">
  import { tick } from 'svelte';
  type Level = 'info' | 'success' | 'warning' | 'error' | 'debug' | 'muted' | 'trace' | 'warn' | 'fatal';
  type Part = { text: string; color?: string; background?: string; bold?: boolean; dim?: boolean; italic?: boolean; underline?: boolean; tone?: Level };
  type Line = { id: string | number; at?: string; text: string; parts?: Part[]; level?: Level };
  type Props = { lines: Line[]; follow?: boolean; height?: number | string; wrap?: boolean; timestamps?: boolean; format?: (at: string) => string; empty?: string; label?: string; selected?: string | number | null; highlight?: string; onfollow?: (v: boolean) => void; onreachtop?: () => void; onselect?: (line: Line) => void };
  let { lines, follow = $bindable(true), height = 420, wrap = true, timestamps = true, format = (at) => at, empty = '', label, selected = $bindable(null), highlight = '', onfollow, onreachtop, onselect }: Props = $props();
  const levelClass = (l: Level) => `sk-log--${l === 'warn' ? 'warning' : l === 'trace' ? 'muted' : l}`;
  const needle = $derived(highlight.trim().toLowerCase());
  function pieces(text: string): { text: string; hit: boolean }[] {
    if (!needle) return [{ text, hit: false }];
    const out: { text: string; hit: boolean }[] = [];
    const lower = text.toLowerCase();
    let i = 0;
    while (i < text.length) {
      const k = lower.indexOf(needle, i);
      if (k < 0) { out.push({ text: text.slice(i), hit: false }); break; }
      if (k > i) out.push({ text: text.slice(i, k), hit: false });
      out.push({ text: text.slice(k, k + needle.length), hit: true });
      i = k + needle.length;
    }
    return out;
  }
  function pick(l: Line) { if (!onselect) return; selected = l.id; onselect(l); }
  let box = $state<HTMLDivElement | null>(null);
  let count = $derived(lines.length);
  const h = $derived(typeof height === 'number' ? `${height}px` : height);
  $effect(() => {
    void count;
    if (!follow || !box) return;
    tick().then(() => { if (box) box.scrollTop = box.scrollHeight; });
  });
  function onscroll() {
    if (!box) return;
    const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 8;
    if (atBottom !== follow) { follow = atBottom; onfollow?.(atBottom); }
    if (box.scrollTop < 40) onreachtop?.();
  }
  const partClass = (p: Part) => ['sk-log__part', p.bold && 'is-bold', p.dim && 'is-dim', p.italic && 'is-italic', p.underline && 'is-underline', p.tone && levelClass(p.tone)].filter(Boolean).join(' ');
  const partStyle = (p: Part) => [p.color ? `color:${p.color}` : '', p.background ? `background:${p.background}` : ''].filter(Boolean).join(';') || undefined;
</script>

<div class={['sk-log', wrap && 'is-wrap'].filter(Boolean).join(' ')} style:height={h} role="log" aria-label={label} aria-live="polite" bind:this={box} onscroll={onscroll}>
  {#if !lines.length}
    <p class="sk-log__empty">{empty}</p>
  {:else}
    {#each lines as l (l.id)}
      <!-- Ligne sélectionnable seulement quand onselect est fourni. -->
      <!-- svelte-ignore a11y_no_static_element_interactions, a11y_no_noninteractive_tabindex -->
      <div class={['sk-log__line', levelClass(l.level ?? 'info'), onselect && 'is-selectable', selected !== null && selected === l.id && 'is-selected'].filter(Boolean).join(' ')} role={onselect ? 'button' : undefined} tabindex={onselect ? 0 : undefined} onclick={() => pick(l)} onkeydown={(e) => { if (onselect && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); pick(l); } }}>{#if timestamps && l.at}<time class="sk-log__time" datetime={l.at}>{format(l.at)}</time>{/if}<span class="sk-log__text">{#if l.parts}{#each l.parts as p, i (i)}<span class={partClass(p)} style={partStyle(p)}>{p.text}</span>{/each}{:else}{#each pieces(l.text) as piece, i (i)}{#if piece.hit}<mark class="sk-log__hit">{piece.text}</mark>{:else}{piece.text}{/if}{/each}{/if}</span></div>
    {/each}
  {/if}
</div>
