<script lang="ts">
  import tokens from '../../../tokens/tokens.json';
  import { computeScale, Segmented, Divider, Badge, Button, Stat, Gauge, HudAnchor } from '../../../src/lib/index';
  type Props = { section: string; embedded?: boolean };
  let { section, embedded = false }: Props = $props();
  const colors = tokens.color.tokens;
  const tiers = [['Primitives', 'Primitive'], ['Sémantique', 'Sémantique'], ['Composants', 'Composant']] as const;
  const resolve = (n: string): string => { const v = colors.find((c) => c.name === n)?.value ?? ''; const m = /^\{(.+)\}$/.exec(v); return m ? resolve(m[1]) : v; };
  const styles = tokens.type.groups.flatMap((g: any) => g.styles.map((s: any) => ({ ...s, family: s.family ?? g.family, group: g.name })));
  const floors: Record<string, string> = (tokens.meta as any).floors;
  const RES = [['1280×720', 1280, 720], ['1366×768', 1366, 768], ['1920×1080', 1920, 1080], ['1920×1200', 1920, 1200], ['2560×1080', 2560, 1080], ['2560×1440', 2560, 1440], ['3440×1440', 3440, 1440], ['3840×2160', 3840, 2160]] as const;
  let res = $state('1280×720');
  const cur = $derived(RES.find((r) => r[0] === res)!);
  const sc = $derived(computeScale(cur[1], cur[2]));
  const px = (rem: string, floor?: string) => { const v = parseFloat(rem) * 16 * sc.scale; const f = floor ? parseFloat((tokens.size.tokens.find((t: any) => t.name === floor) as any).value) : 0; return Math.max(v, f); };
  let bg = $state('city');
</script>

<article class="page" class:embedded>
{#if section === 'colors'}
  {#if !embedded}<h1 class="t-title-lg">Couleurs</h1>{/if}
  <p class="lead">Trois niveaux. Les interfaces consomment la sémantique et les composants ; les primitives ne servent qu’à définir les autres.</p>
  {#each tiers as [label, key]}
    <Divider label={label} />
    <div class="sw">{#each colors.filter((c) => c.usage.startsWith(key)) as c (c.name)}
      <div class="chip"><span class="dot" style:background={`var(--${c.name})`}></span><div><code>{c.name}</code><small>{c.value.startsWith('{') ? `→ ${c.value.slice(1, -1)} · ${resolve(c.name)}` : c.value}</small><p>{c.usage.replace(/^\w+\. /, '')}</p></div></div>
    {/each}</div>
  {/each}
{:else if section === 'type'}
  {#if !embedded}<h1 class="t-title-lg">Typographie</h1>{/if}
  <p class="lead">Instrument Sans pour tout ; Geist Mono pour les identifiants. Les tailles suivent l’échelle, sauf qu’elles ne descendent jamais sous leur plancher.</p>
  <div class="ty">{#each styles as s (s.name)}<div class="tyrow"><code>{s.name}</code><span class={s.name}>{s.sample}</span><small>{s.fontSize} · {s.fontWeight}{#if floors[s.name]} · plancher {floors[s.name].replace('text-floor-', '')}{/if}</small></div>{/each}</div>
{:else if section === 'scale'}
  {#if !embedded}<h1 class="t-title-lg">Échelle et résolutions</h1>{/if}
  <p class="lead">La mise en page suit min(largeur/1920, hauteur/1080), bornée 0,667–2. Le texte garde ses planchers. Sous 900 px de haut, la densité passe en compact et les écrans changent de disposition.</p>
  <Segmented bind:value={res} options={RES.map((r) => ({ value: r[0], label: r[0] }))} />
  <div class="scale">
    <Stat value={sc.scale.toFixed(3)} label="Échelle" size="md" />
    <Stat value={`${(16 * sc.scale).toFixed(1)}`} minor=" px" label="1 rem" size="md" />
    <Stat value={sc.density} label="Densité" size="md" />
    <Stat value={sc.aspect} label="Format" size="md" />
  </div>
  <table class="sk-table"><thead><tr><th>Style</th><th class="num">Conçu (1080p)</th><th class="num">Rendu ici</th><th>Plancher</th></tr></thead><tbody>
    {#each styles as s (s.name)}{@const v = px(s.fontSize, floors[s.name])}<tr><td><code>{s.name}</code></td><td class="num">{parseFloat(s.fontSize) * 16} px</td><td class="num">{v.toFixed(1)} px</td><td>{#if floors[s.name] && v === parseFloat(tokens.size.tokens.find((t: any) => t.name === floors[s.name])!.value)}<Badge tone="live" label="plancher actif" />{:else}—{/if}</td></tr>{/each}
  </tbody></table>
{:else if section === 'surfaces'}
  {#if !embedded}<h1 class="t-title-lg">Surfaces, rayons, ombres, mouvement</h1>{/if}
  <div class="levels">{#each ['bg-sunken', 'bg-base', 'bg-raised', 'bg-control', 'bg-control-hover', 'bg-control-active', 'bg-inverse'] as l}<div class="lv" style:background={`var(--${l})`} style:color={l === 'bg-inverse' ? 'var(--fg-inverse)' : undefined}><code>{l}</code></div>{/each}</div>
  <Divider label="Rayons" />
  <div class="radii">{#each tokens.radius.tokens as r (r.name)}<div class="rd" style:border-radius={`var(--${r.name})`}><code>{r.name}</code><small>{r.value}</small></div>{/each}</div>
  <Divider label="Mouvement" />
  <div class="motion">{#each tokens.duration.tokens as d (d.name)}<div class="mv"><code>{d.name}</code><span class="bar"><i style:width={`${Math.min(100, parseInt(d.value) / 12)}%`}></i></span><small>{d.value} — {d.usage}</small></div>{/each}</div>
  <Divider label="Focus" />
  <div class="row"><Button class="is-focus">Focus clavier / manette</Button><span class="t-body-sm" style="color:var(--fg-secondary)">Anneau focus-ring 2 px, séparé de 2 px — identique sur tous les composants.</span></div>
{:else if section === 'legibility'}
  {#if !embedded}<h1 class="t-title-lg">Lisibilité en jeu</h1>{/if}
  <p class="lead">Le HUD n’a pas de plaque : ombre de texte et voile local. Test sur quatre décors difficiles.</p>
  <Segmented bind:value={bg} options={[{ value: 'city', label: 'Ville la nuit' }, { value: 'snow', label: 'Neige en plein jour' }, { value: 'sunset', label: 'Couchant saturé' }, { value: 'neon', label: 'Néons' }]} />
  <div class="leg leg--{bg}"><div class="sk-hud-scrim sk-hud-scrim--bottom-left" style="position:absolute;width:85%;height:100%"></div><div class="sk-hud-scrim sk-hud-scrim--bottom-right" style="position:absolute;width:45%;height:90%"></div>
    <div class="legin sk-hud-text"><b class="t-heading">Vinewood Boulevard</b><span class="t-body-sm" style="color:var(--fg-secondary)">Downtown Vinewood, 21:42</span>
      <div class="g"><Gauge kind="health" value={100} /><Gauge kind="armor" value={64} /><Gauge kind="thirst" value={18} /></div></div>
    <div class="legr sk-hud-text"><Stat size="xl" value="84" minor=" km/h" hud /></div></div>
  <p class="note">Test réel : sans voile, l’ombre de texte seule ne suffit pas sur la neige en plein jour (le chiffre de vitesse devenait illisible). Règle retenue : chaque groupe du HUD ancré à un coin reçoit un voile local (HudAnchor le pose par défaut), assez large pour couvrir tout son contenu ; l’ombre de texte traite les éclats ponctuels.</p>
{/if}
</article>

<style>
  .page{max-width:72rem;padding:2.5rem 3rem 4rem}.page.embedded{padding:1.5rem 1.75rem 2rem;max-width:none}
  .lead{font-size:var(--fs-body);color:var(--fg-secondary);max-width:46rem;margin:.5rem 0 1.25rem}
  code{font-family:var(--font-mono);font-size:var(--fs-caption)}
  .sw{display:grid;grid-template-columns:repeat(auto-fill,minmax(19rem,1fr));gap:.75rem;margin:.75rem 0 1.5rem}
  .chip{display:flex;gap:.75rem;padding:.75rem;border-radius:var(--radius-md);background:var(--bg-raised)}
  .dot{width:2.75rem;height:2.75rem;border-radius:var(--radius-sm);flex:none;box-shadow:inset 0 0 0 1px var(--border-default)}
  .chip small{display:block;font-size:var(--fs-caption);color:var(--fg-tertiary)}.chip p{font-size:var(--fs-caption);color:var(--fg-secondary);margin:.25rem 0 0;line-height:var(--lh-caption)}
  .tyrow{display:grid;grid-template-columns:10rem 1fr 14rem;align-items:baseline;gap:1rem;padding:.75rem 0;box-shadow:inset 0 -1px 0 var(--border-subtle)}
  .tyrow small{color:var(--fg-tertiary);font-size:var(--fs-caption);text-align:right}
  .scale{display:flex;gap:3rem;margin:1.5rem 0}
  .levels{display:grid;grid-template-columns:repeat(7,1fr);gap:.5rem}.lv{height:6rem;border-radius:var(--radius-md);display:flex;align-items:flex-end;padding:.75rem;box-shadow:inset 0 0 0 1px var(--border-subtle)}
  .radii{display:flex;gap:1rem;margin:.75rem 0 1.5rem}.rd{width:7rem;height:5rem;background:var(--bg-control);display:flex;flex-direction:column;justify-content:flex-end;padding:.625rem}.rd small{font-size:var(--fs-caption);color:var(--fg-tertiary)}
  .motion{display:flex;flex-direction:column;gap:.5rem;margin:.75rem 0 1.5rem}.mv{display:grid;grid-template-columns:10rem 12rem 1fr;gap:1rem;align-items:center}.mv small{font-size:var(--fs-caption);color:var(--fg-tertiary)}
  .bar{height:3px;background:var(--track);border-radius:2px}.bar i{display:block;height:100%;background:var(--fg-primary);border-radius:2px}
  .row{display:flex;gap:1rem;align-items:center;margin:.75rem 0}
  .leg{position:relative;height:22rem;border-radius:var(--radius-lg);overflow:hidden;margin-top:1rem}
  /* siku-allow-next-line : décors simulés de GTA pour le test de lisibilité */
  .leg--city{background:linear-gradient(180deg,#1b2333,#3b3346 55%,#0d0e11)} .leg--snow{background:linear-gradient(180deg,#cfe3f5,#f4f7fa 50%,#dfe7ee)} .leg--sunset{background:linear-gradient(180deg,#ff8a3d,#ffcf6b 45%,#7a3b2a)} .leg--neon{background:linear-gradient(120deg,#ff2bd6,#2bd0ff 50%,#0d0e11)}
  .legin{position:absolute;z-index:11;left:2rem;bottom:2rem;display:flex;flex-direction:column;gap:.25rem}.g{display:grid;grid-template-columns:repeat(3,10rem);gap:1.25rem;margin-top:1rem}
  .legr{position:absolute;z-index:11;right:2rem;bottom:2rem}
  .note{font-size:var(--fs-body-sm);color:var(--fg-tertiary);max-width:46rem}
</style>
