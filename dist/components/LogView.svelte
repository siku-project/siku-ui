<script lang="ts">
  import { tick } from 'svelte';
  type Level = 'info' | 'success' | 'warning' | 'error' | 'debug' | 'muted';
  type Part = { text: string; color?: string; background?: string; bold?: boolean; dim?: boolean; italic?: boolean; underline?: boolean; tone?: Level };
  type Line = { id: string | number; at?: string; text: string; parts?: Part[]; level?: Level };
  type Props = { lines: Line[]; follow?: boolean; height?: number | string; wrap?: boolean; timestamps?: boolean; format?: (at: string) => string; empty?: string; label?: string; onfollow?: (v: boolean) => void; onreachtop?: () => void };
  let { lines, follow = $bindable(true), height = 420, wrap = true, timestamps = true, format = (at) => at, empty = '', label, onfollow, onreachtop }: Props = $props();
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
  const partClass = (p: Part) => ['sk-log__part', p.bold && 'is-bold', p.dim && 'is-dim', p.italic && 'is-italic', p.underline && 'is-underline', p.tone && `sk-log--${p.tone}`].filter(Boolean).join(' ');
  const partStyle = (p: Part) => [p.color ? `color:${p.color}` : '', p.background ? `background:${p.background}` : ''].filter(Boolean).join(';') || undefined;
</script>

<div class={['sk-log', wrap && 'is-wrap'].filter(Boolean).join(' ')} style:height={h} role="log" aria-label={label} aria-live="polite" bind:this={box} onscroll={onscroll}>
  {#if !lines.length}
    <p class="sk-log__empty">{empty}</p>
  {:else}
    {#each lines as l (l.id)}
      <div class="sk-log__line sk-log--{l.level ?? 'info'}">{#if timestamps && l.at}<time class="sk-log__time" datetime={l.at}>{format(l.at)}</time>{/if}<span class="sk-log__text">{#if l.parts}{#each l.parts as p, i (i)}<span class={partClass(p)} style={partStyle(p)}>{p.text}</span>{/each}{:else}{l.text}{/if}</span></div>
    {/each}
  {/if}
</div>
