<!-- Hint — touche(s) + libellé ; affiche les glyphes manette quand la manette est l'entrée active. -->
<script lang="ts">
  import Key from './Key.svelte';
  import { inputMode } from '../runtime/input';
  type Props = { keys: string[]; gamepad?: string[]; label: string };
  let { keys, gamepad, label }: Props = $props();
  let mode = $state(inputMode.get());
  $effect(() => inputMode.subscribe((m) => (mode = m)));
  const arrows: Record<string, 'up' | 'down' | 'left' | 'right'> = { '↑': 'up', '↓': 'down', '←': 'left', '→': 'right' };
  const shown = $derived(mode === 'gamepad' && gamepad ? gamepad : keys);
</script>
<span class="sk-hint">{#each shown as k (k)}{#if arrows[k]}<Key arrow={arrows[k]} />{:else}<Key label={k} pad={mode === 'gamepad' && !!gamepad && k.length === 1} />{/if}{/each}{label}</span>
