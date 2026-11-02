<!-- Steps — parcours en étapes : rail vertical ou barre horizontale ; étapes faites, courante, atteignables, verrouillées. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import type { StepItem } from '../types';
  type Props = { steps: StepItem[]; current?: string; reached?: string; orientation?: 'vertical' | 'horizontal'; compact?: boolean; label?: string; onselect?: (id: string) => void };
  let { steps, current = $bindable(''), reached, orientation = 'vertical', compact = false, label = 'Étapes', onselect }: Props = $props();
  let root: HTMLDivElement;
  const currentIndex = $derived(Math.max(0, steps.findIndex((s) => s.id === current)));
  const reachedIndex = $derived(Math.max(currentIndex, reached ? steps.findIndex((s) => s.id === reached) : -1));
  const stateOf = (i: number) => (i < currentIndex ? 'done' : i === currentIndex ? 'current' : i <= reachedIndex && !steps[i].disabled ? 'reachable' : 'locked');
  function go(i: number) {
    if (i === currentIndex || stateOf(i) === 'locked') return;
    current = steps[i].id;
    onselect?.(steps[i].id);
    queueMicrotask(() => root.querySelector<HTMLElement>('[role="tab"][tabindex="0"]')?.focus());
  }
  function onkey(e: KeyboardEvent) {
    const next = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';
    const prev = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
    if (e.key === next) go(Math.min(reachedIndex, currentIndex + 1));
    else if (e.key === prev) go(Math.max(0, currentIndex - 1));
    else if (e.key === 'Home') go(0);
    else if (e.key === 'End') go(reachedIndex);
    else return;
    e.preventDefault();
  }
</script>
<div class={['sk-steps', orientation === 'horizontal' && 'sk-steps--h', compact && 'sk-steps--compact'].filter(Boolean).join(' ')}
  role="tablist" tabindex="-1" aria-label={label} aria-orientation={orientation} bind:this={root} onkeydown={onkey}>
  {#each steps as s, i (s.id)}
    {@const state = stateOf(i)}
    <button type="button" role="tab" aria-selected={i === currentIndex} aria-disabled={state === 'locked' || undefined} tabindex={i === currentIndex ? 0 : -1}
      title={compact ? s.label : undefined} class="sk-step sk-focusable is-{state}" onclick={() => go(i)}>
      <span class="sk-step__icon">{#if s.icon}<Icon name={s.icon} />{:else}<span class="sk-step__num">{i + 1}</span>{/if}</span>
      {#if !compact}<span class="sk-step__label">{s.label}</span>{/if}
      <i class="sk-step__dot"></i>
    </button>
  {/each}
</div>
