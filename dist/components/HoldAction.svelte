<!-- HoldAction — action à maintenir. La jauge se remplit tant que la touche (ou le clic) est maintenue et se vide au relâchement. -->
<script lang="ts">
  import Key from './Key.svelte';
  type Props = { key?: string; label: string; detail?: string; duration?: number; disabled?: boolean; oncomplete: () => void; progress?: number };
  let { key = 'E', label, detail, duration = 1200, disabled = false, oncomplete, progress = $bindable(0) }: Props = $props();
  let holding = $state(false);
  let raf = 0, last = 0;
  function frame(t: number) {
    const dt = last ? t - last : 16; last = t;
    progress = Math.min(1, Math.max(0, progress + (holding ? dt / duration : -dt / (duration / 3))));
    if (progress >= 1) { holding = false; progress = 0; last = 0; oncomplete(); return; }
    if (holding || progress > 0) raf = requestAnimationFrame(frame); else last = 0;
  }
  function start() { if (disabled || holding) return; holding = true; cancelAnimationFrame(raf); last = 0; raf = requestAnimationFrame(frame); }
  function stop() { holding = false; }
  $effect(() => {
    const down = (e: KeyboardEvent) => { if (!e.repeat && e.key.toLowerCase() === key.toLowerCase()) start(); };
    const up = (e: KeyboardEvent) => { if (e.key.toLowerCase() === key.toLowerCase()) stop(); };
    window.addEventListener('keydown', down); window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); cancelAnimationFrame(raf); };
  });
</script>
<div class="sk-hold-action" class:is-disabled={disabled}>
  <button type="button" class="sk-hold sk-focusable" style="--p:{Math.round(progress * 100)}" aria-label="{label} — maintenir {key}"
    onpointerdown={start} onpointerup={stop} onpointerleave={stop}><Key label={key} size="lg" pressed={holding} /></button>
  <div class="sk-hold-action__text sk-hud-text"><b>{label}</b><span>{detail ?? (progress > 0 ? `Maintenir · ${Math.round(progress * 100)} %` : `Maintenir ${key}`)}</span></div>
</div>
