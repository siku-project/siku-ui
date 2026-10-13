<!-- Icon — pictogramme SIKU au trait. Décoratif par défaut ; fournir `label` s'il porte un sens. -->
<script lang="ts">
  import { icons, type IconName } from '../icons/icons';
  type Props = { name: IconName; size?: 'sm' | 'md' | 'lg' | number; label?: string; class?: string };
  let { name, size = 'md', label, class: cls = '' }: Props = $props();
  const px = $derived(typeof size === 'number' ? `${size / 16}rem` : `var(--icon-${size})`);
</script>

<svg class="sk-ic {cls}" viewBox="0 0 24 24" style:width={px} style:height={px}
  role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : 'true'}>{@html icons[name]}</svg>
