<script lang="ts">
  import { Screen, Surface, Tabs, SlotGrid, Button, Meter, Hint, Toaster, Divider, Plate, toast, onNuiMessage, fetchNui, isBrowser, type SlotItem } from '@siku/ui';

  let open = $state(isBrowser());
  let title = $state('Exemple SIKU');
  let tab = $state('all');
  let selected = $state(0);
  let items = $state<(SlotItem | null)[]>([
    { name: 'Pistolet', icon: 'pistol', durability: 0.86 }, { name: 'Téléphone', icon: 'phone' }, { name: 'Eau', icon: 'bottle', count: 3 },
    { name: 'Trousse', icon: 'medkit', count: 2 }, { name: 'Radio', icon: 'radio' }, ...Array(10).fill(null),
  ]);

  $effect(() => onNuiMessage<{ title?: string }>('open', (d) => { open = true; if (d.title) title = d.title; }));
  $effect(() => onNuiMessage('close', () => (open = false)));

  function close() { open = false; fetchNui('close', {}, { ok: true }); }
  function use() { toast.push({ title: 'Inventaire', body: `${items[selected]?.name ?? 'Rien'} utilisé`, icon: 'check', tone: 'success' }); }
</script>

<Toaster />
{#if open}
  <Screen title={title} onclose={close}>
    <Surface padding="lg" elevated class="flex flex-col gap-6 self-center my-auto">
      <div class="flex items-center justify-between">
        <h2 class="t-heading">Ezra Valente</h2>
        <Plate text="82KJL217" />
      </div>
      <Tabs variant="pill" bind:value={tab} tabs={[{ value: 'all', label: 'Tout', count: 5 }, { value: 'tools', label: 'Outils', count: 2 }]} />
      <Meter label="Sur soi" value={7.4} max={30} valueLabel="7,4" unit="kg" warnAt={0.85} />
      <SlotGrid id="player" label="Sur soi" items={items} hotbar={5} bind:selected />
      <Divider />
      <div class="flex items-center gap-4">
        <Button variant="primary" key="E" onclick={use}>Utiliser</Button>
        <Button variant="quiet" onclick={close}>Fermer</Button>
        <span class="ml-auto"><Hint keys={['Échap']} gamepad={['B']} label="Fermer" /></span>
      </div>
    </Surface>
  </Screen>
{/if}
