<script lang="ts">
  import Demos from '../Demos.svelte';
  import { components, groups } from '../../../catalog/catalog.js';
  import { Segmented, Switch, TextField, Slider, Badge, Divider } from '../../../src/lib/index';
  type Props = { name: string; embedded?: boolean };
  let { name, embedded = false }: Props = $props();
  const c = $derived(components.find((x) => x.name === name)!);
  function init(name: string) {
    const comp = components.find((x) => x.name === name)!;
    const v: Record<string, any> = {};
    for (const ctl of comp.controls ?? []) {
      const prop = comp.props.find((q) => q.name === ctl.prop);
      const def = prop?.default?.replace(/'/g, '');
      v[ctl.prop] = ctl.options ? (def && def !== '—' ? def : ctl.options[0]) : ctl.bool ? def === 'true' : ctl.number ? ctl.number[1] / 2 : '';
    }
    return v;
  }
  // svelte-ignore state_referenced_locally
  let values = $state<Record<string, any>>(init(name));
</script>

<article class="page" class:embedded>
  {#if !embedded}<header><span class="grp">{groups.find((g) => g.id === c.group)?.label}</span><h1 class="t-title-lg">{c.name}</h1><p class="lead">{c.summary}</p></header>{/if}
  {#if c.controls?.length}
    <div class="controls">
      {#each c.controls as ctl (ctl.prop)}
        {#if ctl.options}<label class="ctl"><span>{ctl.prop}</span><Segmented size="sm" bind:value={values[ctl.prop]} options={ctl.options.map((o: string) => ({ value: o, label: o }))} /></label>
        {:else if ctl.bool}<div class="ctl"><Switch bind:checked={values[ctl.prop]} label={ctl.prop} /></div>
        {:else if ctl.number}<div class="ctl" style="width:12rem"><Slider label={ctl.prop} min={ctl.number[0]} max={ctl.number[1]} bind:value={values[ctl.prop]} /></div>
        {:else}<div class="ctl" style="width:12rem"><TextField size="sm" label={ctl.prop} bind:value={values[ctl.prop]} placeholder="—" /></div>{/if}
      {/each}
    </div>
  {/if}
  <Demos name={c.name} p={values} />
  <div class="rules">
    {#if c.use?.length}<div><Badge tone="success" label="Utiliser" />{#each c.use as u}<p>{u}</p>{/each}</div>{/if}
    {#if c.avoid?.length}<div><Badge tone="danger" label="Éviter" />{#each c.avoid as u}<p>{u}</p>{/each}</div>{/if}
  </div>
  <Divider label="Propriétés" />
  <table class="sk-table props"><thead><tr><th>Prop</th><th>Type</th><th>Défaut</th><th>Description</th></tr></thead>
    <tbody>{#each c.props as pr (pr.name)}<tr><td><code>{pr.name}</code></td><td><code class="ty">{pr.type}</code></td><td>{pr.default}</td><td>{pr.desc}</td></tr>{/each}</tbody></table>
  <Divider label="Exemple" />
  <pre class="code"><code>{`import { ${c.name === 'Toast' ? 'Toaster, toast' : c.name} } from '@siku/ui';\n\n${c.example}`}</code></pre>
</article>

<style>
  .page{max-width:64rem;padding:2.5rem 3rem 4rem}
  .page.embedded{padding:1.5rem 1.75rem 2rem;max-width:none}
  header{margin-bottom:1.75rem}
  .grp{font-size:var(--fs-caption);color:var(--fg-tertiary)}
  h1{margin:.25rem 0 .5rem}
  .lead{font-size:var(--fs-subheading);color:var(--fg-secondary);margin:0;max-width:44rem}
  .controls{display:flex;flex-wrap:wrap;gap:1rem 1.5rem;align-items:flex-end;margin-bottom:1rem}
  .ctl{display:flex;flex-direction:column;gap:.375rem;font-size:var(--fs-caption);color:var(--fg-tertiary)}
  .rules{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin:1.5rem 0}
  .rules p{font-size:var(--fs-body-sm);color:var(--fg-secondary);margin:.5rem 0 0;line-height:var(--lh-body-sm)}
  .props{margin:.75rem 0 1.5rem}
  .props td{font-size:var(--fs-body-sm);vertical-align:top;padding-top:.625rem;padding-bottom:.625rem;height:auto}
  code{font-family:var(--font-mono);font-size:var(--fs-caption)}
  .ty{color:var(--fg-tertiary)}
  .code{margin:.75rem 0 0;padding:1.25rem 1.5rem;border-radius:var(--radius-lg);background:var(--bg-sunken);box-shadow:inset 0 0 0 1px var(--border-subtle);overflow:auto;font-size:var(--fs-caption);line-height:1.6;color:var(--fg-secondary)}
</style>
