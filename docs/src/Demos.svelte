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
  let drawer = $state(false);
  let facetActive = $state<string | null>('siku_inventory');
  let navPage = $state('overview');
  let treeSel = $state<string | null>('server/main.lua');
  let treeOpen = $state(['server']);
  const treeNodes = [
    { id: 'fxmanifest.lua', label: 'fxmanifest.lua', icon: 'doc' as const, meta: 'manifest' },
    { id: 'client', label: 'client', icon: 'folder' as const, children: [{ id: 'client/main.lua', label: 'main.lua', icon: 'doc' as const, meta: '12,4 Ko' }, { id: 'client/nui.lua', label: 'nui.lua', icon: 'doc' as const, meta: '3,1 Ko', count: 1, tone: 'warning' as const }] },
    { id: 'server', label: 'server', icon: 'folder' as const, children: [{ id: 'server/main.lua', label: 'main.lua', icon: 'doc' as const, meta: '8,0 Ko', count: 3, tone: 'danger' as const }, { id: 'server/db.lua', label: 'db.lua', icon: 'doc' as const, meta: '2,2 Ko' }] },
    { id: 'html', label: 'html', icon: 'folder' as const, children: [{ id: 'html/index.html', label: 'index.html', icon: 'globe' as const, meta: 'ui_page' }] }
  ];
  const cpu = [22, 24, 21, 28, 35, 31, 29, 44, 52, 48, 41, 38, 36, 33, 30, 34, 37, 35, 32, 31];
  const t0 = Date.UTC(2026, 9, 15, 10, 0, 0);
  const cpuPts = cpu.map((v, i) => ({ t: t0 + i * 3 * 60_000, v: i === 9 ? null : v }));
  const buckets = Array.from({ length: 48 }, (_, i) => ({ t: t0 + i * 30 * 60_000, state: (i === 20 || i === 21 ? 'down' : i === 22 ? 'degraded' : i > 44 ? 'unknown' : 'up') as S.TimelineState, ratio: i === 22 ? 0.6 : undefined, label: `${i * 30} min` }));
  const events = [{ id: 1, at: '10:02:14', severity: 'INFO', source: 'agent', message: 'FXServer started by the agent (pid 1832)' }, { id: 2, at: '10:17:40', severity: 'WARN', source: 'fxserver', message: 'hitch warning: frame time of 212 milliseconds' }, { id: 3, at: '10:41:03', severity: 'ERROR', source: 'fxserver', message: 'FXServer exited unexpectedly (exit status 1)' }];
  let period = $state('1h');
  let sort = $state<S.SortState | null>({ key: 'at', dir: 'desc' });
  let logSel = $state<string | number | null>(null);
  const ram = [41, 41, 42, 42, 43, 43, 44, 46, 47, 47, 48, 48, 48, 49, 49, 50, 50, 51, 51, 52];
  const hostPts = ram.map((v, i) => ({ t: t0 + i * 3 * 60_000, v }));
  const navItems = [{ value: 'overview', label: 'Overview', icon: 'home' as const, href: '#overview' }, { value: 'server', label: 'Server', icon: 'server' as const, href: '#server', group: 'Monitor' }, { value: 'resources', label: 'Resources', icon: 'layers' as const, href: '#resources', group: 'Monitor', count: 2 }, { value: 'logs', label: 'Logs & errors', icon: 'doc' as const, href: '#logs', group: 'Monitor' }, { value: 'settings', label: 'Settings', icon: 'settings' as const, href: '#settings', group: 'Manage' }];
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
  let popOpen = $state(false);
  let popCols = $state({ service: true, trace: false, host: true });
  const serviceOptions: S.ComboOption[] = [{ value: 'fxserver', label: 'fxserver', detail: 'Processus principal', count: 12840 }, { value: 'siku_core', label: 'siku_core', count: 3210 }, { value: 'siku_banking', label: 'siku_banking', count: 842 }, { value: 'siku_inventory', label: 'siku_inventory', count: 511 }, { value: 'siku_agent', label: 'siku-agent', detail: 'Service hôte', count: 96 }, { value: 'txadmin', label: 'txAdmin', count: 0, disabled: true }];
  let comboMulti = $state<string | string[]>(['fxserver', 'siku_core']);
  let comboOne = $state<string | string[]>('');
  let comboInline = $state<string | string[]>([]);
  let chips = $state([{ key: 'service', value: 'fxserver', exclude: false }, { key: 'severity', value: 'error', exclude: false }, { key: 'resource', value: 'monitor', exclude: true }]);
  let discOpen = $state(true);
  const minute = 60_000;
  const histInfo = Array.from({ length: 30 }, (_, i) => ({ t: t0 + i * minute, v: 40 + Math.round(25 * Math.abs(Math.sin(i / 3))) }));
  const histWarn = Array.from({ length: 30 }, (_, i) => ({ t: t0 + i * minute, v: i % 4 === 0 ? 6 : 2 }));
  const histError = Array.from({ length: 30 }, (_, i) => ({ t: t0 + i * minute, v: i >= 17 && i <= 19 ? 14 - Math.abs(18 - i) * 5 : i % 7 === 0 ? 1 : 0 }));
  let brush = $state<S.TimeRange | null>(null);
  let noseWidth = $state(0.2);
  let blend = $state(50);
  let chipActive = $state('hair');
  const chipCats = [{ id: 'hair', label: 'Cheveux', icon: 'scissors' as const }, { id: 'eyebrows', label: 'Sourcils', icon: 'eyebrow' as const }, { id: 'beard', label: 'Barbe', icon: 'beard' as const }, { id: 'eyes', label: 'Yeux', icon: 'eye' as const }, { id: 'nose', label: 'Nez', icon: 'nose' as const }, { id: 'lips', label: 'Lèvres', icon: 'lips' as const }];
  const hairColors = ['#1c1f21', '#272a2c', '#312e2c', '#35261c', '#4b321f', '#5c3b24', '#6d4c35', '#765c45', '#99815d', '#af9c70', '#d6b97b', '#dac38e', '#845039', '#682b1f', '#a02e19', '#b64b28', '#626262', '#808080', '#aaaaaa', '#c5c5c5', '#463955', '#763c76', '#ed74e3', '#04959e', '#023974', '#3fa16a', '#b6c034', '#e5b103', '#f28831', '#ce3120'];
  let hairColor = $state(4);
  const eyeSheet = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">' + Array.from({ length: 32 }, (_, i) => `<circle cx="${(i % 8) * 100 + 50}" cy="${Math.floor(i / 8) * 100 + 50}" r="42" fill="hsl(${i * 11} 55% ${35 + (i % 4) * 8}%)"/><circle cx="${(i % 8) * 100 + 50}" cy="${Math.floor(i / 8) * 100 + 50}" r="16" fill="#0c0e12"/>`).join('') + '</svg>');
  let eyeColor = $state(3);
  let stepCur = $state('face');
  const stepList = [{ id: 'model', label: 'Modèle', icon: 'user' as const }, { id: 'heritage', label: 'Héritage', icon: 'dna' as const }, { id: 'face', label: 'Visage', icon: 'face' as const }, { id: 'clothes', label: 'Vêtements', icon: 'shirt' as const }, { id: 'accessories', label: 'Accessoires', icon: 'glasses' as const }, { id: 'tattoos', label: 'Tatouages', icon: 'pen' as const }, { id: 'summary', label: 'Récapitulatif', icon: 'clipboard' as const }];
  let birth = $state('');
  let calDate = $state('1996-03-14');
  const birthYearMax = new Date().getFullYear() - 18;
  const ageOf = (iso: string) => { const d = new Date(iso); if (!iso || Number.isNaN(d.getTime())) return null; const n = new Date(); return n.getFullYear() - d.getFullYear() - (n.getMonth() < d.getMonth() || (n.getMonth() === d.getMonth() && n.getDate() < d.getDate()) ? 1 : 0); };
  let picked = $state<number | null>(null);
  const attributes = { event: { name: 'player.connect', id: 'ev_0af3c2d19e4b', received_at: '2026-10-15T10:17:40.221Z' }, player: { id: 42, name: 'Lina Moreau', identifiers: ['license:3f9a2c…', 'discord:2210…'], ping_ms: 48, vip: false, ban: null }, resource: 'siku_core', tags: ['join', 'queue'], user_agent: 'CitizenFX/1.0 (FiveM b12345; Windows NT 10.0; Win64; x64) fx/13 Chromium/103 (KHTML, like Gecko) Safari/537.36 long user agent string for the truncation demo' };
  let jsonLog = $state('—');
  const spans: S.TraceSpan[] = [
    { id: 'a', parentId: null, name: 'POST /api/bank/transfer', service: 'control-center', startMs: 0, durationMs: 184, status: 'ok' },
    { id: 'b', parentId: 'a', name: 'auth.verify', service: 'control-center', startMs: 2, durationMs: 9, status: 'ok' },
    { id: 'c', parentId: 'a', name: 'bank.transfer', service: 'siku_banking', startMs: 14, durationMs: 150, status: 'ok' },
    { id: 'd', parentId: 'c', name: 'SELECT accounts', service: 'mysql', startMs: 16, durationMs: 22, status: 'ok' },
    { id: 'e', parentId: 'c', name: 'UPDATE accounts', service: 'mysql', startMs: 42, durationMs: 31, status: 'ok' },
    { id: 'f', parentId: 'c', name: 'notify.push', service: 'siku_core', startMs: 78, durationMs: 64, status: 'error' },
    { id: 'g', parentId: 'f', name: 'nui.send', service: 'siku_core', startMs: 80, durationMs: 4, status: 'ok' },
    { id: 'h', parentId: 'f', name: 'discord.webhook', service: 'discord', startMs: 86, durationMs: 55, status: 'error' },
    { id: 'i', parentId: 'a', name: 'telemetry.export', service: 'siku-agent', startMs: 168, durationMs: 12, status: 'unset' },
    { id: 'z', parentId: 'missing', name: 'orphan.span', service: 'siku-agent', startMs: 120, durationMs: 20, status: 'ok' },
  ];
  let spanSel = $state<string | null>('f');
  let spanCollapsed = $state<string[]>([]);
  const stack = `TypeError: Cannot read properties of undefined (reading 'balance')\n    at transfer (siku_banking/server/accounts.lua:142)\n    at handler (siku_banking/server/main.lua:88)\n    at RegisterNetEvent callback (citizen:/scripting/lua/scheduler.lua:217)\n    at <anonymous>`;
  const manyRows = Array.from({ length: 2000 }, (_, i) => ({ id: i + 1, at: `10:${String(Math.floor(i / 60) % 60).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}`, severity: i % 97 === 0 ? 'ERROR' : i % 13 === 0 ? 'WARN' : 'INFO', source: i % 3 ? 'fxserver' : 'siku_core', message: i % 97 === 0 ? 'FXServer exited unexpectedly (exit status 1)' : i % 13 === 0 ? 'hitch warning: frame time of 212 milliseconds' : `Started resource siku_${['core', 'banking', 'inventory'][i % 3]}` }));
  let dockOpen = $state(true);
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
  <h4>Boutons ronds (round, iconOnly)</h4>
  <div class="play"><S.Button variant="secondary" iconOnly round icon="code" label="Stack" /><S.Button variant="secondary" size="lg" iconOnly round icon="layers" label="Interfaces" /><S.Button variant="primary" size="sm" iconOnly round icon="plus" label="Ajouter" /></div>
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
  <div class="play" style="width:24rem"><S.Slider label="Volume radio" bind:value={vol} format={(v) => `${v} %`} centered={p.centered} disabled={p.disabled} /></div>
  <h4>Trait d’un visage (centered, pôles)</h4>
  <div class="play" style="width:24rem"><S.Slider label="Largeur du nez" bind:value={noseWidth} min={-1} max={1} step={0.05} centered minLabel="Étroit" maxLabel="Large" format={(v) => v.toFixed(2)} /></div>
  <h4>Mélange entre deux pôles</h4>
  <div class="play" style="width:24rem"><S.Slider label="Ressemblance" bind:value={blend} min={0} max={100} centered minLabel="Mère" maxLabel="Père" format={(v) => `${100 - v} % · ${v} %`} /></div>
{:else if name === 'Segmented'}
  <div class="play"><S.Segmented bind:value={seg} label="Période" options={[{ value: '7', label: '7 jours' }, { value: '30', label: '30 jours' }, { value: 'y', label: 'Année' }]} /></div>
{:else if name === 'Tabs'}
  <div class="play" style="width:40rem"><S.Tabs variant={p.variant} bind:value={tab} label="Catégories" tabs={[{ value: 'all', label: 'Tout', count: 13 }, { value: 'weapons', label: 'Armes', count: 2 }, { value: 'care', label: 'Soins', count: 3 }, { value: 'food', label: 'Nourriture', count: 3 }, { value: 'keys', label: 'Clés', count: 0, disabled: true }]} /></div>
  <p class="note">Onglet : <code>{tab}</code> — flèches ←/→ quand un onglet a le focus.</p>
  <h4>Filtres par niveau (pill, tone)</h4>
  <div class="play" style="width:40rem"><S.Tabs variant="pill" value="all" label="Niveau" tabs={[{ value: 'all', label: 'Tout', count: 35 }, { value: 'info', label: 'Info', count: 21, tone: 'live' }, { value: 'success', label: 'Succès', count: 7, tone: 'success' }, { value: 'warning', label: 'Avertissements', count: 3, tone: 'warning' }, { value: 'error', label: 'Erreurs', count: 0, tone: 'danger' }, { value: 'debug', label: 'Debug', count: 4, tone: 'neutral' }]} /></div>
{:else if name === 'NavList'}
  <div class="play" style="width:17rem"><S.NavList bind:value={navPage} compact={p.compact} items={navItems} /></div>
  <h4>Liste de valeurs (boutons)</h4>
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
{:else if name === 'Skeleton'}
  <div class="play" style="width:22rem"><div class="col" style="width:100%"><div class="row" style="margin:0;align-items:center"><S.Skeleton width="2.25rem" height="2.25rem" radius={p.radius} /><S.Skeleton width="9rem" height="0.875rem" /></div><S.Skeleton lines={p.lines ?? 3} radius={p.radius} /></div></div>
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
{:else if name === 'Sparkline'}
  <div class="play"><S.Sparkline values={cpu} tone={p.tone} area={p.area} label="CPU, 20 relevés" /><S.Stat size="md" value="31" minor=" %" label="CPU" /></div>
  <h4>Tons</h4>
  <div class="row">
    {#snippet sp1()}<S.Sparkline values={ram} />{/snippet}{@render st('neutral', sp1)}
    {#snippet sp2()}<S.Sparkline values={cpu} tone="live" area />{/snippet}{@render st('live, area', sp2)}
    {#snippet sp3()}<S.Sparkline values={[8, 7, 7, 6, 5, 5, 4]} tone="success" />{/snippet}{@render st('success', sp3)}
    {#snippet sp4()}<S.Sparkline values={[2, 2, 3, 5, 9, 14, 21]} tone="danger" />{/snippet}{@render st('danger', sp4)}
  </div>
{:else if name === 'TimeChart'}
  <div class="play" style="width:40rem"><div style="width:100%"><S.TimeChart label="CPU du processus et de l’hôte, 1 heure" unit="%" min={0} max={100} area={p.area} legend={p.legend} state={p.state} message="Telemetry injoignable" thresholds={[{ value: 80, label: 'Seuil', tone: 'danger' }]} bands={[{ from: t0 + 27 * 60_000, to: t0 + 30 * 60_000, tone: 'danger', label: 'Interruption' }]} series={[{ id: 'cpu', label: 'Processus', points: cpuPts }, { id: 'host', label: 'Hôte', points: hostPts, tone: 'chart-2' }]} /></div></div>
  <h4>Suite régulière avec repères</h4>
  <div class="row"><div style="width:30rem"><S.TimeChart label="CPU, 6 heures" unit="%" min={0} max={100} height={120} labels={['-6 h', '-3 h', 'now']} series={[{ id: 'cpu', label: 'CPU', values: cpu }]} /></div></div>
{:else if name === 'BarChart'}
  <div class="play" style="width:40rem"><div style="width:100%"><S.BarChart label="Ticks par seuil, 10 dernières minutes" stacked={p.stacked} legend={p.legend} state={p.state} message="Aucun tick mesuré" labels={['-10', '-8', '-6', '-4', '-2', 'now']} series={[{ id: 'ok', label: '< 50 ms', values: [320, 318, 330, 290, 325, 331], tone: 'success' }, { id: 'slow', label: '50–250 ms', values: [2, 4, 1, 28, 6, 0], tone: 'warning' }, { id: 'bad', label: '> 250 ms', values: [0, 0, 0, 3, 0, 0], tone: 'danger' }]} /></div></div>
{:else if name === 'LogView'}
  <div class="play" style="width:40rem"><div style="width:100%"><S.LogView label="Console FXServer" bind:selected={logSel} highlight="hitch" onselect={() => {}} height={220} wrap={p.wrap} timestamps={p.timestamps} empty="Aucune ligne reçue." lines={[{ id: 1, at: '12:00:01', text: '[   fake] FXServer-master SERVER v1.0.0.12345 starting' }, { id: 2, at: '12:00:02', text: '[  script:siku_core] Started resource siku_core' }, { id: 3, at: '12:00:04', text: 'hitch warning: frame time of 212 milliseconds', level: 'warning' }, { id: 4, at: '12:00:05', text: 'Fatal error: simulated crash', level: 'error' }, { id: 5, at: '12:00:06', text: '[chat] server: hello', level: 'muted' }, { id: 6, at: '12:00:07', text: 'trace: nui message siku:env', level: 'trace' }, { id: 7, at: '12:00:08', text: 'warn: resource monitor is slow to start', level: 'warn' }, { id: 8, at: '12:00:09', text: 'fatal: out of memory', level: 'fatal' }]} /></div></div>
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
{:else if name === 'StatTile'}
  <div class="play" style="width:16rem"><div style="width:100%"><S.StatTile label="Joueurs (pic)" value="42" unit="/ 64" delta={12.4} good={p.good} state={p.state} size={p.size} deltaLabel="vs 24 h précédentes" icon="users" message="Pas encore de mesure"><S.Sparkline values={cpu} tone="live" width="auto" area /></S.StatTile></div></div>
  <h4>Variations</h4>
  <div class="row">
    <div style="width:14rem"><S.StatTile label="Erreurs (1 h)" value="3" delta={-40} good="down" icon="alert" /></div>
    <div style="width:14rem"><S.StatTile label="Tick moyen" value="4.8" unit="ms" delta={9} good="down" icon="timer" /></div>
    <div style="width:14rem"><S.StatTile label="Disque" state="unavailable" message="Non collecté par l’agent" icon="database" /></div>
  </div>
{:else if name === 'StatusTimeline'}
  <div class="play" style="width:40rem"><div style="width:100%"><S.StatusTimeline label="Disponibilité, 24 h" uptime={0.983} start="-24 h" end="now" legend={p.legend} state={p.state} message="Aucune mesure de disponibilité" {buckets} /></div></div>
{:else if name === 'Tree'}
  <div class="play" style="width:22rem"><S.Tree bind:selected={treeSel} bind:expanded={treeOpen} dense={p.dense} nodes={treeNodes} /></div>
{:else if name === 'Ring'}
  <div class="play"><S.Ring label="Ticks dans le budget" caption="svMain, 1 h" value={p.value === undefined ? 0.994 : Number(p.value)} tone={p.tone} size={p.size} state={p.state} message="Pas de mesure" /></div>
  <h4>Variantes</h4>
  <div class="row">
    <S.Ring label="Mémoire hôte" caption="12,3 / 32 Go" value={0.38} size="sm" />
    <S.Ring label="CPU FXServer" caption="d’un cœur" value={0.82} tone="warning" valueLabel="82 %" />
    <S.Ring label="Disponibilité" caption="24 h" value={0.9992} tone="success" size="lg" valueLabel="99,92 %" />
    <S.Ring label="Disque" value={null} state="unavailable" message="Non collecté" />
  </div>
{:else if name === 'ShareBar'}
  <div class="play" style="width:36rem"><div style="width:100%"><S.ShareBar label="Ticks par classe" legend={p.legend} state={p.state} message="Aucun tick mesuré" segments={[{ id: 'ok', label: 'Dans le budget', value: 59120, tone: 'success', hint: '≤ 50 ms' }, { id: 'late', label: 'En retard', value: 420, tone: 'warning', hint: '50 à 150 ms' }, { id: 'hitch', label: 'Hitchs', value: 3, tone: 'danger', hint: '> 150 ms' }]} /></div></div>
  <h4>Palette catégorielle</h4>
  <div class="play" style="width:36rem"><div style="width:100%"><S.ShareBar label="Mémoire par usage" height={14} segments={[{ id: 'a', label: 'FXServer', value: 2.1 }, { id: 'b', label: 'Base de données', value: 1.4 }, { id: 'c', label: 'Système', value: 3.2 }, { id: 'd', label: 'Libre', value: 25.3 }]} format={(v) => `${v.toFixed(1)} Go`} /></div></div>
{:else if name === 'PeriodPicker'}
  <div class="play"><S.PeriodPicker bind:value={period} updatedAt={Date.now() - 42_000} refreshing={p.refreshing} onrefresh={() => {}} /></div>
  <p class="cap">Période : {period}</p>
{:else if name === 'DataTable'}
  <div class="play" style="width:40rem"><div style="width:100%"><S.DataTable bind:sort rows={events} rowKey={(r) => r.id} dense={p.dense} state={p.state} message="Telemetry injoignable" caption="Événements" onselect={() => {}} columns={[{ key: 'at', label: 'Heure', sortable: true, width: '6rem', mono: true }, { key: 'severity', label: 'Niveau', sortable: true, width: '6rem' }, { key: 'source', label: 'Source', width: '6rem' }, { key: 'message', label: 'Message' }]}>
    {#snippet cell(row, col)}{#if col.key === 'severity'}<S.Badge tone={row.severity === 'ERROR' ? 'danger' : row.severity === 'WARN' ? 'warning' : 'info'} label={String(row.severity)} />{:else}{String((row as Record<string, unknown>)[col.key])}{/if}{/snippet}
  </S.DataTable></div></div>
  <h4>Fenêtre virtuelle (2 000 lignes)</h4>
  <div class="play" style="width:40rem"><div style="width:100%"><S.DataTable virtual dense sticky maxHeight="16rem" rows={manyRows} rowKey={(r) => r.id} caption="Événements" onselect={() => {}} columns={[{ key: 'id', label: '#', width: '4rem', align: 'right', mono: true }, { key: 'at', label: 'Heure', width: '6rem', mono: true }, { key: 'severity', label: 'Niveau', width: '6rem' }, { key: 'message', label: 'Message' }]} /></div></div>
{:else if name === 'DescriptionList'}
  <div class="play" style="width:32rem"><div style="width:100%"><S.DescriptionList columns={p.columns === '1' ? 1 : p.columns === '3' ? 3 : 2} label="Détail de l’événement" items={[{ label: 'Service', value: 'fxserver.8f1c' }, { label: 'Serveur', value: 'SIKU RP' }, { label: 'Trace', value: '0af3c2d19e4b7f6a0af3c2d19e4b7f6a', mono: true, copy: true }, { label: 'Sévérité', value: 'ERROR' }]} /></div></div>
{:else if name === 'Drawer'}
  <div class="play"><S.Button icon="layers" onclick={() => (drawer = true)}>Ouvrir la navigation</S.Button></div>
  <S.Drawer bind:open={drawer} title="Navigation"><S.NavList bind:value={navPage} items={navItems} onchange={() => (drawer = false)} /></S.Drawer>
  <h4>Ancré (docked) dans une grille</h4>
  <div class="play" style="width:44rem;align-items:stretch;padding:0;overflow:hidden"><div style="display:grid;grid-template-columns:minmax(0,1fr) auto;width:100%;min-height:14rem"><div style="padding:1.5rem"><p class="note">Contenu de la page. {#if !dockOpen}<S.Button size="sm" onclick={() => (dockOpen = true)}>Ouvrir l’inspecteur</S.Button>{/if}</p></div>
    <S.Drawer bind:open={dockOpen} docked side="right" width={300} title="Événement"><S.DescriptionList items={[{ label: 'Service', value: 'fxserver' }, { label: 'Trace', value: '0af3c2d1', mono: true, copy: true }]} /></S.Drawer></div></div>
{:else if name === 'Popover'}
  <div class="play" style="min-height:16rem;align-items:flex-start">
    <S.Popover bind:open={popOpen} placement={p.placement} label="Colonnes" width={240}>
      {#snippet trigger({ toggle, open })}<S.Button variant="ghost" icon="columns" aria-expanded={open} onclick={toggle}>Colonnes</S.Button>{/snippet}
      <div class="col" style="padding:.75rem;gap:.5rem"><S.Checkbox bind:checked={popCols.service} label="Service" /><S.Checkbox bind:checked={popCols.trace} label="Trace" /><S.Checkbox bind:checked={popCols.host} label="Hôte" /></div>
    </S.Popover>
    <S.Popover label="Partager" placement="bottom-end">
      {#snippet trigger({ toggle, open })}<S.Button iconOnly icon="more" label="Plus d’actions" aria-expanded={open} onclick={toggle} />{/snippet}
      <S.Menu label="Actions" autofocus={false} onselect={() => (popOpen = false)} items={[{ id: 'link', label: 'Copier le lien', icon: 'link' }, { id: 'star', label: 'Enregistrer la requête', icon: 'star' }, { id: 'dl', label: 'Exporter en CSV', icon: 'download' }]} />
    </S.Popover>
  </div>
  <p class="note">Clic extérieur ou <code>Échap</code> ferme et rend le focus au déclencheur ; le panneau se retourne s’il déborde du bas de la fenêtre.</p>
{:else if name === 'Combobox'}
  <div class="play" style="width:40rem;min-height:20rem;align-items:flex-start">
    <div style="width:18rem"><S.Combobox label="Services" multiple={p.multiple} inline={p.inline} loading={p.loading} bind:value={comboMulti} options={serviceOptions} /></div>
    <div style="width:18rem"><S.Combobox label="Ressource" placeholder="Toutes les ressources" bind:value={comboOne} options={serviceOptions} max={4} /></div>
  </div>
  <h4>Facette (inline, multiple)</h4>
  <div class="play" style="width:18rem;align-items:flex-start"><div style="width:100%"><S.Combobox inline multiple bind:value={comboInline} options={serviceOptions} searchLabel="Filtrer les services" /></div></div>
  <p class="note">Valeur : <code>{JSON.stringify(comboMulti)}</code> — flèches, Entrée, Début/Fin dans la recherche.</p>
{:else if name === 'FacetList'}
  <div class="play" style="width:16rem;align-items:flex-start"><div style="width:100%"><S.FacetList dense={p.dense} mono={p.mono} label="Ressource" more="Voir plus" onmore={() => {}}
    items={[{ value: 'siku_inventory', count: 538, active: facetActive === 'siku_inventory' }, { value: 'siku_core', count: 223, active: facetActive === 'siku_core' }, { value: 'siku_banking', count: 214, active: facetActive === 'siku_banking' }, { value: 'siku_hud', count: 0, unavailable: true, title: 'Aucun log avec les filtres actuels' }]}
    onpick={(item) => (facetActive = facetActive === item.value ? null : item.value)} /></div></div>
{:else if name === 'FilterChip'}
  <div class="play"><S.FilterChip label="service" value="fxserver" icon="server" exclude={p.exclude} removable={p.removable} ontoggle={() => {}} onremove={() => {}} /></div>
  <div class="row">
    {#each chips as c (c.key + c.value)}<S.FilterChip label={c.key} value={c.value} exclude={c.exclude} title="Entrée bascule, Retour arrière retire" ontoggle={(ex) => (c.exclude = ex)} onremove={() => (chips = chips.filter((x) => x !== c))} />{/each}
    <S.FilterChip label="trace" value="0af3c2d1" icon="link" removable={false} />
    {#if chips.length < 3}<S.Button size="sm" variant="quiet" onclick={() => (chips = [{ key: 'service', value: 'fxserver', exclude: false }, { key: 'severity', value: 'error', exclude: false }, { key: 'resource', value: 'monitor', exclude: true }])}>Remettre les filtres</S.Button>{/if}
  </div>
{:else if name === 'Disclosure'}
  <div class="play" style="width:20rem;align-items:flex-start"><div style="width:100%"><S.Disclosure title="Service" count={5} open={p.open} dense={p.dense}>
    {#snippet actions()}<S.Button variant="quiet" size="sm" onclick={() => (comboInline = [])}>Effacer</S.Button>{/snippet}
    <S.Combobox inline multiple bind:value={comboInline} options={serviceOptions} searchLabel="Filtrer les services" />
  </S.Disclosure></div></div>
  <div class="col" style="width:20rem">
    <S.Disclosure title="Sévérité" count={6} bind:open={discOpen} dense><div class="col" style="gap:.5rem;padding-top:.25rem">{#each ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as sev (sev)}<S.Checkbox checked={sev !== 'trace'} label={S.severityLabel(sev as S.Severity)} />{/each}</div></S.Disclosure>
    <S.Disclosure title="Hôte" count={2} dense><S.Checkbox checked label="cc-prod" /></S.Disclosure>
  </div>
{:else if name === 'TimeHistogram'}
  <div class="play" style="width:44rem"><div style="width:100%"><S.TimeHistogram label="Logs par minute, 30 dernières minutes" step={minute} legend={p.legend} state={p.state} message="Aucun log sur la période" bind:brush onbrush={(r) => (brush = r)} onpick={(t) => (picked = t)}
    series={[{ label: 'Info', tone: 'neutral', points: histInfo }, { label: 'Warn', tone: 'warning', points: histWarn }, { label: 'Error', tone: 'danger', points: histError }]} /></div></div>
  <p class="note">Glisse sur le graphique pour sélectionner une plage, clique un intervalle pour le choisir. Plage : <code>{brush ? `${new Date(brush.from).toISOString().slice(11, 16)} → ${new Date(brush.to).toISOString().slice(11, 16)}` : '—'}</code> · intervalle : <code>{picked ? new Date(picked).toISOString().slice(11, 16) : '—'}</code>. Maj + flèches étendent la sélection, Échap l’efface.</p>
{:else if name === 'JsonTree'}
  <div class="play" style="width:40rem;align-items:flex-start"><div style="width:100%"><S.JsonTree value={attributes} depth={p.depth ?? 2} dense={p.dense} oncopy={(path, v) => (jsonLog = `copie ${path || '/'} = ${JSON.stringify(v)}`.slice(0, 80))} onfilter={(path, v) => (jsonLog = `filtre ${path} = ${JSON.stringify(v)}`)} /></div></div>
  <p class="note">Dernière action : <code>{jsonLog}</code> — flèches, Entrée déplie, <code>C</code> copie, <code>F</code> filtre.</p>
{:else if name === 'TraceWaterfall'}
  <div class="play" style="width:46rem;align-items:flex-start"><div style="width:100%"><S.TraceWaterfall spans={spans} totalMs={200} rowHeight={p.rowHeight ?? 28} bind:selected={spanSel} bind:collapsed={spanCollapsed} /></div></div>
  <p class="note">Span sélectionné : <code>{spanSel ?? '—'}</code> — flèches pour parcourir, ← → replient, Entrée sélectionne. Le span orphelin devient une racine.</p>
{:else if name === 'CodeBlock'}
  <div class="play" style="width:40rem;align-items:flex-start"><div style="width:100%"><S.CodeBlock label="Pile d’appels" code={stack} wrap={p.wrap} lineNumbers={p.lineNumbers} copy={p.copy} maxHeight={200} /></div></div>
  <h4>Corps brut</h4>
  <div class="play" style="width:40rem;align-items:flex-start"><div style="width:100%"><S.CodeBlock code={JSON.stringify(attributes.player, null, 2)} copy lineNumbers /></div></div>
{:else if name === 'SeverityDot'}
  <div class="play"><S.SeverityDot severity={p.severity} size={p.size} label={S.severityLabel(p.severity)} /></div>
  <div class="row">{#each ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as sev (sev)}<S.SeverityDot severity={sev as S.Severity} label={S.severityLabel(sev as S.Severity)} />{/each}</div>
  <div class="row">{#each ['trace', 'debug', 'info', 'warn', 'error', 'fatal'] as sev (sev)}<S.SeverityDot severity={sev as S.Severity} size="sm" />{/each}</div>
  <div class="row">{#each ['trace', 'info', 'warn', 'error', 'fatal'] as sev (sev)}<S.Badge tone={S.severityTone(sev as S.Severity) === 'info' ? 'info' : S.severityTone(sev as S.Severity)} label={S.severityLabel(sev as S.Severity)} />{/each}</div>
{:else if name === 'Chip'}
  <div class="play"><S.Chip label={p.label || 'Cheveux'} icon="scissors" selected={p.selected} size={p.size} disabled={p.disabled} count={12} /></div>
  <div class="play" style="width:36rem">{#each chipCats as c (c.id)}<S.Chip label={c.label} icon={c.icon} selected={c.id === chipActive} onclick={() => (chipActive = c.id)} />{/each}</div>
  <p class="note">Catégorie : <code>{chipActive}</code></p>
{:else if name === 'SwatchPicker'}
  <div class="play" style="width:30rem;align-items:flex-start"><div style="width:100%"><S.SwatchPicker label="Couleur des cheveux" colors={hairColors} bind:value={hairColor} size={p.size} disabled={p.disabled} /></div></div>
  <p class="note">Index : <code>{hairColor}</code> — flèches, Début, Fin entre les pastilles.</p>
{:else if name === 'SpritePicker'}
  <div class="play" style="width:30rem;align-items:flex-start"><div style="width:100%"><S.SpritePicker label="Couleur des yeux" image={eyeSheet} count={32} columns={8} bind:value={eyeColor} shape={p.shape} disabled={p.disabled} /></div></div>
  <p class="note">Index : <code>{eyeColor}</code> — la planche de démonstration est dessinée en SVG ; en jeu, une image de 8 × 4 cases.</p>
{:else if name === 'Steps'}
  <div class="play" style="align-items:flex-start"><S.Steps bind:current={stepCur} reached="accessories" steps={stepList} orientation={p.orientation} compact={p.compact} /></div>
  <p class="note">Étape : <code>{stepCur}</code> — « Tatouages » et « Récapitulatif » restent verrouillées tant que l’appelant n’avance pas <code>reached</code>.</p>
{:else if name === 'Calendar'}
  <div class="play" style="align-items:flex-start"><S.Calendar bind:value={calDate} minYear={1916} maxYear={birthYearMax} weekStart={Number(p.weekStart ?? 1) === 0 ? 0 : 1} /></div>
  <p class="note">Date : <code>{calDate || '—'}</code></p>
{:else if name === 'DateField'}
  <div class="play" style="width:22rem;min-height:22rem;align-items:flex-start"><div style="width:100%"><S.DateField label="Date de naissance" bind:value={birth} minYear={1916} maxYear={birthYearMax} help={p.help || (birth ? `${ageOf(birth)} ans` : undefined)} error={p.error || (birth && (ageOf(birth) ?? 0) < 18 ? '18 ans minimum' : undefined)} disabled={p.disabled} /></div></div>
  <p class="note">Valeur ISO : <code>{birth || '—'}</code> — tape les chiffres, les séparateurs se posent seuls ; le bouton ouvre le calendrier.</p>
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
