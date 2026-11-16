<script lang="ts">
  import { severityLabel, severityTone, type Severity } from '../types';
  type Props = { severity: Severity; label?: string; size?: 'sm' | 'md' | 'lg'; title?: string };
  let { severity, label, size = 'md', title }: Props = $props();
  const tone = $derived(severityTone(severity));
</script>

<span class={['sk-sev', `sk-sev--${tone}`, size !== 'md' && `sk-sev--${size}`, severity === 'fatal' && 'is-fatal'].filter(Boolean).join(' ')} role={label ? undefined : 'img'} aria-label={label ? undefined : severityLabel(severity)} title={title ?? (label ? undefined : severityLabel(severity))}>
  <i class="sk-sev__dot"></i>{#if label}<span class="sk-sev__label">{label}</span>{/if}
</span>
