<script lang="ts">
  import Button from './Button.svelte';
  type Props = { code: string; wrap?: boolean; lineNumbers?: boolean; maxHeight?: number | string; copy?: boolean; label?: string; copyLabel?: string; copiedLabel?: string; oncopy?: (code: string) => void };
  let { code, wrap = false, lineNumbers = false, maxHeight, copy = false, label, copyLabel = 'Copier', copiedLabel = 'Copié', oncopy }: Props = $props();
  const lines = $derived(code.split('\n'));
  const mh = $derived(typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight);
  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout>;
  async function doCopy() {
    try { await navigator.clipboard?.writeText(code); } catch { copied = false; }
    oncopy?.(code);
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 1500);
  }
</script>

<div class={['sk-codeblock', wrap && 'is-wrap', lineNumbers && 'has-lines'].filter(Boolean).join(' ')}>
  {#if label || copy}
    <div class="sk-codeblock__head">
      {#if label}<span class="sk-codeblock__label">{label}</span>{/if}
      {#if copy}<Button variant="quiet" size="sm" icon="copy" onclick={doCopy} aria-live="polite">{copied ? copiedLabel : copyLabel}</Button>{/if}
    </div>
  {/if}
  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <pre class="sk-codeblock__pre" style:max-height={mh} tabindex="0" aria-label={label}><code>{#each lines as l, i (i)}<span class="sk-codeblock__line">{#if lineNumbers}<span class="sk-codeblock__n" aria-hidden="true">{i + 1}</span>{/if}<span class="sk-codeblock__text">{l}</span>{#if i < lines.length - 1}{'\n'}{/if}</span>{/each}</code></pre>
</div>
