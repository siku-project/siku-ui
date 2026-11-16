<!-- Avatar — initiales d'une personne ou d'une entreprise. -->
<script lang="ts">
  type Props = { name: string; size?: 'sm' | 'md'; tone?: 'neutral' | 'foreign' };
  let { name, size = 'md', tone = 'neutral' }: Props = $props();
  const initials = $derived(name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase());
</script>
<span class="sk-avatar" class:sk-avatar--sm={size === 'sm'} class:sk-avatar--foreign={tone === 'foreign'} aria-label={name} role="img">{initials}</span>
