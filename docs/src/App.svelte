<script lang="ts">
  import { NavList, Badge, version } from '../../src/lib/index';
  import { components, groups } from '../../catalog/catalog.js';
  import ComponentPage from './pages/ComponentPage.svelte';
  import Foundations from './pages/Foundations.svelte';
  const found = [['colors', 'Couleurs'], ['type', 'Typographie'], ['surfaces', 'Surfaces et mouvement'], ['scale', 'Échelle et résolutions'], ['legibility', 'Lisibilité en jeu']];
  const items = [
    ...found.map(([v, l]) => ({ value: `f:${v}`, label: l, group: 'Fondations' })),
    ...groups.flatMap((g) => components.filter((c) => c.group === g.id).map((c) => ({ value: `c:${c.name}`, label: c.name, group: g.label }))),
  ];
  let page = $state(location.hash.slice(1) || 'f:colors');
  $effect(() => { location.hash = page; });
</script>
<div class="sk docs">
  <aside><div class="brand"><b>SIKU</b><Badge label={`@siku/ui ${version}`} /></div><NavList bind:value={page} {items} label="Documentation" /></aside>
  <main>{#key page}{#if page.startsWith('f:')}<Foundations section={page.slice(2)} />{:else}<ComponentPage name={page.slice(2)} />{/if}{/key}</main>
</div>
<style>
  .docs{display:grid;grid-template-columns:16rem 1fr;height:100vh;background:var(--bg-base)}
  aside{overflow:auto;padding:1.5rem .75rem;background:var(--bg-sunken);box-shadow:1px 0 0 var(--border-subtle)}
  .brand{display:flex;align-items:center;gap:.75rem;padding:0 .75rem 1rem}.brand b{font-size:var(--fs-heading);letter-spacing:.02em}
  main{overflow:auto;background:var(--bg-raised)}
  :global(.docs .sk-nav__item){min-height:2.25rem;padding-top:.25rem;padding-bottom:.25rem}
</style>
