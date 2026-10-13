<!-- Démonstrations vivantes : chaque bloc utilise les vrais composants de src/lib. `p` = valeurs des contrôles du playground. -->
<script lang="ts">
  import * as S from '../../src/lib/index';
  import type { SlotItem, MenuItem } from '../../src/lib/types';
  type Props = { name: string; p: Record<string, any> };
  let { name, p }: Props = $props();

  const pistol: SlotItem = { name: 'Pistolet', icon: 'pistol', durability: 0.86 };
  const water: SlotItem = { name: 'Eau', icon: 'bottle', count: 3 };
  const kit: SlotItem = { name: 'Trousse', icon: 'medkit', count: 2 };
  const pick: SlotItem = { name: 'Crochet', icon: 'lockpick', count: 4, durability: 0.35 };
  const cash: SlotItem = { name: 'Billets', icon: 'cash', label: '2 450 $' };

  let text = $state('Loyer d’octobre');
  let amount = $state('1 250,00');
  let chk = $state(true), sw = $state(true), sw2 = $state(false);
  let radio = $state('card');
  let sel = $state('main');
  let qty = $state(24);
  let vol = $state(64);
  let seg = $state('30');
  let tab = $state('all');
  let nav = $state('main');
  let menuLog = $state('—');
  let modal = $state(false);
  let tableSel = $state(1);
  let holdDone = $state(0);
  let player = $state<(SlotItem | null)[]>([pistol, { name: 'Téléphone', icon: 'phone' }, water, kit, { name: 'Radio', icon: 'radio' }, { name: '9 mm', icon: 'ammo', count: 48 }, pick, cash, null, null]);
  let trunk = $state<(SlotItem | null)[]>([{ name: 'Jerrican', icon: 'jerrican' }, { name: 'Gilet', icon: 'vest', durability: 0.72 }, null, null, null, null, null, null, null, null]);
  let pSel = $state(0), tSel = $state(-1);
  let promptSel = $state(0);
  function move(e: S.MoveEvent) {
    const src = e.from.container === 'player' ? player : trunk;
    const dst = e.to.container === 'player' ? player : trunk;
    const swap = dst[e.to.index];
    dst[e.to.index] = src[e.from.index];
    src[e.from.index] = swap;
  }
  const menuItems: MenuItem[] = [
    { id: 'use', label: 'Utiliser', icon: 'hand', key: 'E' }, { id: 'trunk', label: 'Vers le coffre', icon: 'transfer', key: 'Espace' },
    { id: 'split', label: 'Diviser la pile', icon: 'split', key: '⇧' }, { id: 'give', label: 'Donner', icon: 'give', key: 'G' },
    { id: 'inspect', label: 'Inspecter', icon: 'eye', meta: 'Aucun détail', disabled: true },
    { id: 'drop', label: 'Jeter', icon: 'trash', key: 'X', danger: true, separatorBefore: true },
  ];
  const accounts = [{ value: 'main', label: 'Compte courant', detail: '18 920,40 $ disponibles' }, { value: 'save', label: 'Épargne', detail: '42 600,00 $' }, { value: 'pro', label: 'Ezra Motors', detail: '7 315,90 $' }, { value: 'old', label: 'Compte clos', detail: 'Fermé le 2 oct.', disabled: true }];
</script>

{#snippet st(label: string, body: import('svelte').Snippet)}<div class="st">{@render body()}<span class="cap">{label}</span></div>{/snippet}

{#if name === 'Button'}
  <div class="play"><S.Button variant={p.variant} size={p.size} key={p.key || undefined} loading={p.loading} disabled={p.disabled}>Équiper</S.Button></div>
  <h4>Variantes</h4>
  <div class="row">
    {#snippet a()}<S.Button variant="primary" key="E">Équiper</S.Button>{/snippet}{@render st('primary', a)}
    {#snippet b()}<S.Button>Donner</S.Button>{/snippet}{@render st('secondary', b)}
    {#snippet c()}<S.Button variant="ghost" icon="transfer">Vers le coffre</S.Button>{/snippet}{@render st('ghost', c)}
    {#snippet d()}<S.Button variant="quiet">Annuler</S.Button>{/snippet}{@render st('quiet', d)}
    {#snippet e()}<S.Button variant="danger" icon="trash">Jeter</S.Button>{/snippet}{@render st('danger', e)}
    {#snippet f()}<S.Button iconOnly icon="settings" label="Réglages" />{/snippet}{@render st('iconOnly', f)}
  </div>
  <h4>États</h4>
  <div class="row">
    {#snippet g()}<S.Button variant="primary" class="is-hover">Équiper</S.Button>{/snippet}{@render st('survol', g)}
    {#snippet h()}<S.Button variant="primary" class="is-active">Équiper</S.Button>{/snippet}{@render st('pression', h)}
    {#snippet i()}<S.Button variant="primary" class="is-focus">Équiper</S.Button>{/snippet}{@render st('focus', i)}
    {#snippet j()}<S.Button variant="primary" disabled>Équiper</S.Button>{/snippet}{@render st('désactivé', j)}
    {#snippet k()}<S.Button variant="primary" loading>Envoyer</S.Button>{/snippet}{@render st('chargement', k)}
    {#snippet l()}<div style="width:15rem"><S.Button variant="primary" block key="E">Équiper</S.Button></div>{/snippet}{@render st('block + touche', l)}
  </div>
{:else if name === 'ButtonGroup'}
  <div class="play" style="width:28rem"><S.ButtonGroup><S.Button variant="quiet">Annuler</S.Button><S.Button variant="primary">Envoyer 1 250,00 $</S.Button></S.ButtonGroup></div>
  <div class="row" style="width:28rem"><S.ButtonGroup align="stretch"><S.Button variant="ghost">Donner</S.Button><S.Button variant="ghost">Vers le coffre</S.Button></S.ButtonGroup></div>
{:else if name === 'Key'}
  <div class="play"><S.Key label={p.label || 'E'} size={p.size} pad={p.pad} pressed={p.pressed} /></div>
  <div class="row"><S.Key label="E" /><S.Key label="Échap" /><S.Key label="Espace" /><S.Key label="⇧" /><S.Key arrow="up" /><S.Key arrow="right" /><S.Key label="A" pad /><S.Key label="LB" /><S.Key label="E" size="lg" /><S.Key label="E" pressed /></div>
{:else if name === 'Hint'}
  <div class="play"><S.Hint keys={['Q', 'D']} gamepad={['LB', 'RB']} label="Changer de côté" /><S.Hint keys={['↑', '↓', '←', '→']} gamepad={['↑', '↓']} label="Parcourir" /><S.Hint keys={['⇧']} label="Diviser une pile" /></div>
  <p class="note">Appuie sur une touche ou envoie <code>siku:nav</code> depuis Lua : les glyphes suivent l’entrée active.</p>
{:else if name === 'TextField'}
  <div class="play" style="width:22rem"><S.TextField label={p.label || 'Motif'} bind:value={text} help={p.help || undefined} error={p.error || undefined} variant={p.variant} size={p.size} disabled={p.disabled} suffix={p.variant === 'amount' ? '$' : undefined} /></div>
  <div class="grid3">
    <S.TextField label="Destinataire" placeholder="Nom ou numéro de compte" />
    <S.TextField label="Montant" value="25 000,00" suffix="$" error="Solde insuffisant : 18 920,40 $ disponibles" />
    <S.TextField label="Numéro de compte" value="LS76 0041 2290 8812" disabled icon="lock" />
    <S.TextField label="Recherche" size="sm" icon="search" placeholder="Rechercher un objet" />
    <S.TextField label="Montant" variant="amount" bind:value={amount} suffix="$" aside="Max. 18 920,40 $" help="Solde après virement : 17 670,40 $" />
  </div>
{:else if name === 'Checkbox'}
  <div class="play"><S.Checkbox checked={p.checked} indeterminate={p.indeterminate} disabled={p.disabled} label={p.label || 'Partager ma position'} /></div>
  <div class="row"><S.Checkbox bind:checked={chk} label="Interactif" /><S.Checkbox label="Repos" /><S.Checkbox indeterminate label="Tous les objets" /><S.Checkbox checked disabled label="Verrouillé" /></div>
{:else if name === 'RadioGroup'}
  <div class="play"><S.RadioGroup bind:value={radio} label="Paiement" options={[{ value: 'card', label: 'Carte' }, { value: 'cash', label: 'Espèces' }, { value: 'crypto', label: 'Crypto', disabled: true }]} /></div>
  <p class="note">Valeur : <code>{radio}</code> — flèches pour changer.</p>
{:else if name === 'Switch'}
  <div class="play" style="width:24rem"><S.Switch checked={p.checked} disabled={p.disabled} label={p.label || 'Ne pas déranger'} description={p.description || undefined} /></div>
  <div class="col" style="width:24rem"><S.Switch bind:checked={sw} label="Mode ne pas déranger" /><S.Switch bind:checked={sw2} label="Répéter chaque mois" description="Le 12 de chaque mois" /><S.Switch label="Synchronisation" disabled /></div>
{:else if name === 'Select'}
  <div class="play" style="width:22rem;min-height:16rem;align-items:flex-start"><S.Select label="Depuis" bind:value={sel} options={accounts} group="Comptes" /></div>
{:else if name === 'Stepper'}
  <div class="play"><S.Stepper bind:value={qty} max={48} label="Quantité à diviser" /><S.Stepper value={1} max={5} /></div>
{:else if name === 'Slider'}
  <div class="play" style="width:24rem"><S.Slider label="Volume radio" bind:value={vol} format={(v) => `${v} %`} /></div>
{:else if name === 'Segmented'}
  <div class="play"><S.Segmented bind:value={seg} label="Période" options={[{ value: '7', label: '7 jours' }, { value: '30', label: '30 jours' }, { value: 'y', label: 'Année' }]} /></div>
{:else if name === 'Tabs'}
  <div class="play" style="width:40rem"><S.Tabs variant={p.variant} bind:value={tab} label="Catégories" tabs={[{ value: 'all', label: 'Tout', count: 13 }, { value: 'weapons', label: 'Armes', count: 2 }, { value: 'care', label: 'Soins', count: 3 }, { value: 'food', label: 'Nourriture', count: 3 }, { value: 'keys', label: 'Clés', count: 0, disabled: true }]} /></div>
  <p class="note">Onglet : <code>{tab}</code> — flèches ←/→ quand un onglet a le focus.</p>
{:else if name === 'NavList'}
  <div class="play" style="width:17rem"><S.NavList bind:value={nav} items={[{ value: 'main', label: 'Compte courant', detail: '18 920,40 $', icon: 'card', group: 'Comptes' }, { value: 'save', label: 'Épargne', detail: '42 600,00 $', icon: 'bank', group: 'Comptes' }, { value: 'bills', label: 'Factures', icon: 'doc', count: 2, group: 'Services' }, { value: 'loans', label: 'Prêts', icon: 'loan', group: 'Services' }]} /></div>
{:else if name === 'Menu'}
  <div class="play" style="align-items:flex-start"><div style="width:17rem"><S.Menu label="Actions sur l’objet" items={menuItems} autofocus={false} onselect={(id) => (menuLog = id)} /></div><p class="note">Dernière action : <code>{menuLog}</code> — clique dans le menu puis flèches, Entrée ou la touche affichée.</p></div>
{:else if name === 'Modal'}
  <div class="play"><S.Button variant="danger" icon="trash" onclick={() => (modal = true)}>Jeter le pistolet</S.Button></div>
  <S.Modal bind:open={modal} title="Jeter le pistolet de combat ?">
    L’objet sera posé au sol à tes pieds. N’importe qui pourra le ramasser pendant 10 minutes, puis il disparaîtra.
    {#snippet actions()}<S.Button variant="quiet" data-autofocus onclick={() => (modal = false)}>Annuler</S.Button><S.Button variant="primary" onclick={() => (modal = false)}>Jeter au sol</S.Button>{/snippet}
  </S.Modal>
{:else if name === 'Tooltip'}
  <div class="play" style="padding-top:4rem"><S.Tooltip text="Diviser la pile" key="⇧"><S.Button iconOnly icon="split" label="Diviser" /></S.Tooltip><S.Tooltip text="Glisse sur le coffre pour transférer" placement="bottom"><S.Button variant="ghost">Survole-moi</S.Button></S.Tooltip></div>
{:else if name === 'Notice'}
  <div class="play"><S.Notice tone={p.tone} title={p.title || undefined} text="Email ou mot de passe incorrect. Vérifie les deux, puis réessaie." /></div>
  <div class="col">
    <S.Notice text="Les données servent uniquement à l’authentification : pseudonyme, email, mot de passe haché." />
    <S.Notice tone="info" title="Discord non lié">Connecte-toi avec ton mot de passe, puis lie Discord depuis ton tableau de bord.</S.Notice>
    <S.Notice tone="success" title="Compte créé">Tu peux te connecter dès maintenant.</S.Notice>
    <S.Notice tone="warning" title="Réserve d’essence">Station la plus proche : 600 m.</S.Notice>
    <S.Notice tone="danger" title="Connexion refusée">Trop de tentatives. Réessaie dans 60 secondes.</S.Notice>
  </div>
{:else if name === 'Toast'}
  <div class="play"><S.Toast tone={p.tone} compact={p.compact} title="Maze Bank" body="Virement reçu de Lina Moreau" value="+1 250 $" time="maintenant" icon="bank" progress={0.64} /></div>
  <div class="grid2">
    <S.Toast title="Ray Kowalski" body="Je suis devant le Bean Machine." time="il y a 1 min" icon="msg" />
    <S.Toast tone="danger" title="Inventaire plein" body="Il reste 0,6 kg : la caisse à outils pèse 6,5 kg." icon="alert" />
    <S.Toast tone="live" title="Radio" body="Canal 2 · 104.3 — 4 personnes" time="en direct" icon="radio" />
    <S.Toast tone="warning" title="Réserve d’essence" body="Station la plus proche : 600 m" icon="fuel" />
  </div>
{:else if name === 'Toaster'}
  <div class="play"><S.Button variant="primary" onclick={() => S.toast.push({ title: 'Maze Bank', body: 'Virement reçu de Lina Moreau', value: '+1 250 $', icon: 'bank', tone: 'success' })}>Envoyer une notification</S.Button><S.Button onclick={() => S.toast.push({ title: 'Radio', body: 'Tu as rejoint le canal 2', icon: 'radio', tone: 'live' })}>Une autre</S.Button></div>
  <p class="note">La pile s’affiche en haut à droite de la fenêtre (zone sûre GTA en jeu).</p>
  <S.Toaster />
{:else if name === 'Meter'}
  <div class="play" style="width:22rem"><S.Meter label="Sur soi" value={p.value ?? 7.4} max={30} unit="kg" tone={p.tone} warnAt={0.85} /></div>
  <div class="grid2" style="width:44rem">
    <S.Meter label="Coffre, Sultan RS" value={18.6} max={60} valueLabel="18,6" unit="kg" tone="foreign" />
    <S.Meter label="Presque plein" value={27.1} max={30} valueLabel="27,1" unit="kg" warnAt={0.85} />
    <S.Meter label="Téléchargement" value={62} valueLabel="62 %" tone="live" size="lg" />
  </div>
{:else if name === 'Segments'}
  <div class="play col" style="width:22rem"><S.Segments value={0.86} label="État" /><S.Segments value={0.55} count={24} hotFrom={20} label="Régime" /></div>
{:else if name === 'Spinner'}
  <div class="play"><S.Spinner /><S.Button variant="primary" loading>Envoyer</S.Button></div>
{:else if name === 'HoldAction'}
  <div class="play"><S.HoldAction key="E" label="Crochetage" duration={1800} oncomplete={() => holdDone++} /></div>
  <p class="note">Maintiens <code>E</code> (ou le clic) : réussites <code>{holdDone}</code>. Relâcher vide la jauge.</p>
{:else if name === 'DataRow'}
  <div class="play col" style="width:40rem">
    <S.DataRow icon="transfer" title="Lina Moreau" detail="Virement reçu, aujourd’hui 21:42" value="+1 250,00 $" tone="in" meta="18 920,40 $" />
    <S.DataRow icon="fuel" title="Ron Oil, Mirror Park" detail="Carte, aujourd’hui 19:05" value="−84,20 $" meta="17 670,40 $" onclick={() => {}} />
    <S.DataRow icon="wrench" title="Los Santos Customs" detail="Carte, hier 16:30" value="−1 480,00 $" meta="17 754,60 $" selected />
  </div>
{:else if name === 'Table'}
  <div class="play" style="width:40rem"><S.Table bind:selected={tableSel} onselect={() => {}} caption="Effectif" columns={[{ key: 'name', label: 'Employé' }, { key: 'grade', label: 'Grade' }, { key: 'hours', label: 'Heures', align: 'right' }, { key: 'bonus', label: 'Prime', align: 'right' }]}
    rows={[{ name: 'Ezra Valente', grade: 'Gérant', hours: '32,5', bonus: '1 220 $' }, { name: 'Lina Moreau', grade: 'Mécanicienne', hours: '28,0', bonus: '980 $' }, { name: 'Ray Kowalski', grade: 'Apprenti', hours: '14,5', bonus: '420 $' }]} /></div>
{:else if name === 'Badge'}
  <div class="play"><S.Badge tone={p.tone} label={p.label || 'En service'} /></div>
  <div class="row"><S.Badge label="Hors service" /><S.Badge tone="live" icon="signal" label="En service" /><S.Badge tone="success" label="Payé" /><S.Badge tone="warning" label="Échéance demain" /><S.Badge tone="danger" label="Recherché" /><S.Badge tone="solid" label="Nouveau" /></div>
{:else if name === 'Plate'}
  <div class="play"><S.Plate text="82KJL217" /></div>
{:else if name === 'Code'}
  <div class="play"><S.Code text="SK-7741-0093" /><S.Code text="LS76 0041 2290 8812" /></div>
{:else if name === 'Count'}
  <div class="play"><S.Count value={2} /><S.Count value={140} /></div>
{:else if name === 'Avatar'}
  <div class="play"><S.Avatar name="Ezra Valente" /><S.Avatar name="Lina Moreau" tone="foreign" /><S.Avatar name="Downtown Cab" size="sm" /></div>
{:else if name === 'EmptyState'}
  <div class="play" style="width:26rem"><S.EmptyState title="Le coffre est vide">Glisse un objet ici, ou sélectionne-le et appuie sur <S.Key label="Espace" /></S.EmptyState></div>
{:else if name === 'Stat'}
  <div class="play"><S.Stat size={p.size} value={p.size === 'xl' ? '84' : '18 920'} minor={p.size === 'xl' ? ' km/h' : ',40 $'} label="Compte courant" /></div>
{:else if name === 'Slot'}
  <div class="play"><S.Slot item={pistol} hotkey={1} size={p.size} selected={p.selected} locked={p.locked} dropState={p.dropState} /></div>
  <h4>Contenus</h4>
  <div class="row">
    {#snippet s1()}<S.Slot item={pistol} hotkey={1} />{/snippet}{@render st('accès rapide, usure', s1)}
    {#snippet s2()}<S.Slot item={water} />{/snippet}{@render st('pile', s2)}
    {#snippet s3()}<S.Slot item={cash} />{/snippet}{@render st('valeur', s3)}
    {#snippet s4()}<S.Slot item={pick} />{/snippet}{@render st('usure critique', s4)}
    {#snippet s5()}<S.Slot />{/snippet}{@render st('vide', s5)}
    {#snippet s6()}<S.Slot item={kit} hotkey={4} size="sm" />{/snippet}{@render st('compact', s6)}
  </div>
  <h4>États</h4>
  <div class="row">
    {#snippet t1()}<S.Slot item={kit} selected />{/snippet}{@render st('sélectionné', t1)}
    {#snippet t2()}<S.Slot item={kit} selected focused />{/snippet}{@render st('focus', t2)}
    {#snippet t3()}<S.Slot item={kit} dragging />{/snippet}{@render st('en glisser', t3)}
    {#snippet t4()}<S.Slot dropState="valid" />{/snippet}{@render st('cible', t4)}
    {#snippet t5()}<S.Slot item={{ name: 'Trop lourd', icon: 'toolbox' }} dropState="invalid" />{/snippet}{@render st('refusé', t5)}
    {#snippet t6()}<S.Slot locked />{/snippet}{@render st('verrouillé', t6)}
  </div>
{:else if name === 'SlotGrid'}
  <div class="play" style="align-items:flex-start;gap:2.5rem">
    <div class="col"><b class="t-subheading">Sur soi</b><S.SlotGrid id="player" label="Sur soi" items={player} hotbar={5} bind:selected={pSel} onmove={move} /></div>
    <div class="col"><b class="t-subheading">Coffre</b><S.SlotGrid id="trunk" label="Coffre" items={trunk} bind:selected={tSel} onmove={move} canDrop={(it) => it.name !== 'Pistolet'} /></div>
  </div>
  <p class="note">Glisse un objet d’une grille à l’autre (le pistolet est refusé par le coffre). Clique un emplacement puis flèches.</p>
{:else if name === 'Gauge'}
  <div class="play" style="width:14rem"><S.Gauge kind={p.kind} value={p.value ?? 64} /></div>
  <div class="grid2" style="width:24rem"><S.Gauge kind="health" value={100} /><S.Gauge kind="armor" value={64} /><S.Gauge kind="hunger" value={72} /><S.Gauge kind="thirst" value={18} /></div>
{:else if name === 'Prompt'}
  <div class="play"><S.Prompt bind:selected={promptSel} options={[{ id: 'open', key: 'E', label: 'Ouvrir le coffre', detail: 'Sultan RS' }, { id: 'lock', key: 'G', label: 'Verrouiller' }, { id: 'search', key: 'H', label: 'Fouiller', detail: 'Policier requis', disabled: true }]} />
    <S.Button size="sm" onclick={() => (promptSel = (promptSel + 1) % 2)}>Option suivante</S.Button></div>
{:else if name === 'HudAnchor'}
  <div class="hudbox"><p class="note">En jeu, HudAnchor se place dans un coin de l’écran, à l’intérieur de la zone sûre GTA (<code>--safe-x/--safe-y</code>), éventuellement à droite de la mini-carte. Ici, un aperçu de son contenu :</p>
    <div class="row sk-hud-text"><S.Stat size="xl" value="84" minor=" km/h" hud /><div class="col" style="width:12rem"><S.Gauge kind="health" value={100} /><S.Gauge kind="thirst" value={18} /></div></div></div>
{:else if name === 'Screen'}
  <p class="note">Screen occupe tout l’écran (voile + cadre 16:9 centré, Échap ferme). Voir la composition « Inventaire » et le gabarit de ressource.</p>
{:else if name === 'Surface'}
  <div class="play"><S.Surface level={p.level} elevated={p.elevated} padding="md"><b class="t-subheading">Surface {p.level}</b><p class="t-body-sm" style="color:var(--fg-secondary);margin:.25rem 0 0">Panneau, fenêtre, colonne de focus.</p></S.Surface></div>
  <div class="row"><S.Surface level="sunken" padding="sm">sunken</S.Surface><S.Surface padding="sm">base</S.Surface><S.Surface level="raised" padding="sm">raised</S.Surface><S.Surface padding="sm" elevated>elevated</S.Surface></div>
{:else if name === 'Divider'}
  <div class="play col" style="width:24rem"><S.Divider label="Accès rapide" /><S.Divider /><S.Divider strong /></div>
{:else if name === 'Icon'}
  <div class="icons">{#each S.iconNames as n (n)}<div class="ic"><S.Icon name={n} /><span>{n}</span></div>{/each}</div>
{/if}

<style>
  .play{display:flex;flex-wrap:wrap;gap:1rem;align-items:center;padding:1.5rem;border-radius:var(--radius-lg);background:var(--bg-base);box-shadow:inset 0 0 0 1px var(--border-subtle);margin-bottom:1.25rem}
  .row{display:flex;flex-wrap:wrap;gap:1.25rem 1.5rem;align-items:flex-end;margin-bottom:1rem}
  .col{display:flex;flex-direction:column;gap:.75rem}
  .grid2{display:grid;grid-template-columns:repeat(2,minmax(0,max-content));gap:1rem 1.5rem}
  .grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.25rem 1.5rem}
  .st{display:flex;flex-direction:column;gap:.5rem;align-items:flex-start}
  .cap{font-size:var(--fs-caption);color:var(--fg-tertiary)}
  h4{font-size:var(--fs-caption);font-weight:500;color:var(--fg-secondary);margin:1.25rem 0 .75rem}
  .note{font-size:var(--fs-body-sm);color:var(--fg-tertiary);margin:.5rem 0}
  .note code{font-family:var(--font-mono);color:var(--fg-secondary)}
  .hudbox{padding:1.5rem;border-radius:var(--radius-lg);background:linear-gradient(160deg,var(--n-600),var(--n-950))} /* siku-allow : décor de démonstration */
  .icons{display:grid;grid-template-columns:repeat(auto-fill,minmax(6rem,1fr));gap:.375rem}
  .ic{height:4.5rem;border-radius:var(--radius-sm);background:var(--bg-raised);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem}
  .ic span{font:500 var(--fs-key)/1 var(--font-mono);color:var(--fg-tertiary)}
</style>
