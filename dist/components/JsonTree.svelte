<script lang="ts">
  import Icon from './Icon.svelte';
  import Button from './Button.svelte';
  type Props = { value: unknown; depth?: number; dense?: boolean; label?: string; toolbar?: boolean; expandLabel?: string; collapseLabel?: string; expanded?: string[]; maxString?: number; oncopy?: (path: string, value: unknown) => void; onfilter?: (path: string, value: unknown) => void };
  let { value, depth = 2, dense = false, label = 'Structure', toolbar = true, expandLabel = 'Tout déplier', collapseLabel = 'Tout replier', expanded = $bindable(), maxString = 80, oncopy, onfilter }: Props = $props();
  let root: HTMLElement;
  let longOpen = $state<string[]>([]);
  const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
  const isContainer = (v: unknown) => Array.isArray(v) || isObj(v);
  const entries = (v: unknown): [string, unknown][] => Array.isArray(v) ? v.map((x, i) => [String(i), x]) : isObj(v) ? Object.entries(v) : [];
  const join = (path: string, key: string, parentIsArray: boolean) => (parentIsArray ? `${path}[${key}]` : path ? `${path}.${key}` : key);
  function containers(v: unknown, path: string, level: number, limit: number, out: string[]): string[] {
    if (!isContainer(v) || level >= limit) return out;
    out.push(path);
    for (const [k, child] of entries(v)) containers(child, join(path, k, Array.isArray(v)), level + 1, limit, out);
    return out;
  }
  const isOpen = (path: string, level: number) => (expanded ? expanded.includes(path) : level < depth);
  function toggle(path: string, level: number) {
    const cur = expanded ?? containers(value, '', 0, depth, []);
    expanded = cur.includes(path) ? cur.filter((p) => p !== path) : [...cur, path];
    void level;
  }
  const expandAll = () => (expanded = containers(value, '', 0, Infinity, []));
  const collapseAll = () => (expanded = []);
  const kind = (v: unknown) => (v === null || v === undefined ? 'null' : typeof v === 'string' ? 'string' : typeof v === 'number' || typeof v === 'bigint' ? 'number' : typeof v === 'boolean' ? 'boolean' : 'other');
  const scalar = (v: unknown) => (v === null ? 'null' : v === undefined ? 'undefined' : typeof v === 'string' ? JSON.stringify(v) : String(v));
  const rows = () => Array.from(root.querySelectorAll<HTMLElement>('.sk-json__row'));
  function onkey(e: KeyboardEvent, path: string, v: unknown, level: number) {
    const list = rows();
    const i = list.indexOf(e.currentTarget as HTMLElement);
    const branch = isContainer(v) && entries(v).length > 0;
    switch (e.key) {
      case 'ArrowDown': list[Math.min(i + 1, list.length - 1)]?.focus(); break;
      case 'ArrowUp': list[Math.max(i - 1, 0)]?.focus(); break;
      case 'Home': list[0]?.focus(); break;
      case 'End': list[list.length - 1]?.focus(); break;
      case 'ArrowRight':
        if (branch && !isOpen(path, level)) toggle(path, level);
        else if (branch) list[i + 1]?.focus();
        break;
      case 'ArrowLeft':
        if (branch && isOpen(path, level)) toggle(path, level);
        else if (level > 0) ((e.currentTarget as HTMLElement).closest('[role="group"]')?.previousElementSibling as HTMLElement | null)?.focus();
        break;
      case 'Enter': case ' ':
        if (branch) toggle(path, level);
        else if (typeof v === 'string' && v.length > maxString) toggleLong(path);
        break;
      case 'c': if (oncopy) oncopy(path, v); else return; break;
      case 'f': if (onfilter && !isContainer(v)) onfilter(path, v); else return; break;
      default: return;
    }
    e.preventDefault();
  }
  function toggleLong(path: string) { longOpen = longOpen.includes(path) ? longOpen.filter((p) => p !== path) : [...longOpen, path]; }
</script>

{#snippet node(key: string, v: unknown, path: string, level: number, inArray: boolean)}
  {@const branch = isContainer(v)}
  {@const kids = entries(v)}
  {@const open = branch && isOpen(path, level)}
  {@const long = typeof v === 'string' && v.length > maxString}
  <div role="treeitem" tabindex={level === 0 && key === '' ? 0 : -1} aria-level={level + 1} aria-selected={false} aria-expanded={branch && kids.length ? open : undefined}
    class="sk-json__row sk-focusable" style="--depth:{level}" onclick={() => { if (branch && kids.length) toggle(path, level); }} onkeydown={(e) => onkey(e, path, v, level)}>
    <span class="sk-json__toggle" aria-hidden="true">{#if branch && kids.length}<Icon name={open ? 'chevd' : 'chev'} size={14} />{/if}</span>
    {#if key !== ''}<span class="sk-json__key" class:is-index={inArray}>{key}</span><span class="sk-json__colon" aria-hidden="true">:</span>{/if}
    {#if branch}
      <span class="sk-json__meta">{Array.isArray(v) ? `[${kids.length}]` : `{${kids.length}}`}</span>
    {:else if long && !longOpen.includes(path)}
      <button type="button" class="sk-json__val sk-json__val--string sk-json__long" title="Afficher la valeur entière" onclick={(e) => { e.stopPropagation(); toggleLong(path); }}>{JSON.stringify((v as string).slice(0, maxString))}…</button>
    {:else}
      <span class="sk-json__val sk-json__val--{kind(v)}" class:is-long={long}>{scalar(v)}</span>
    {/if}
    {#if oncopy || (onfilter && !branch)}
      <span class="sk-json__actions">
        {#if onfilter && !branch}<button type="button" class="sk-json__act" tabindex="-1" aria-label="Filtrer sur {path}" title="Filtrer (F)" onclick={(e) => { e.stopPropagation(); onfilter(path, v); }}><Icon name="filter" size="sm" /></button>{/if}
        {#if oncopy}<button type="button" class="sk-json__act" tabindex="-1" aria-label="Copier {path || 'la valeur'}" title="Copier (C)" onclick={(e) => { e.stopPropagation(); oncopy(path, v); }}><Icon name="copy" size="sm" /></button>{/if}
      </span>
    {/if}
  </div>
  {#if open}
    <div role="group">{#each kids as [k, child] (k)}{@render node(k, child, join(path, k, Array.isArray(v)), level + 1, Array.isArray(v))}{/each}</div>
  {/if}
{/snippet}

<div class={['sk-json', dense && 'is-dense'].filter(Boolean).join(' ')}>
  {#if toolbar}
    <div class="sk-json__bar">
      <Button variant="quiet" size="sm" icon="expand" onclick={expandAll}>{expandLabel}</Button>
      <Button variant="quiet" size="sm" icon="collapse" onclick={collapseAll}>{collapseLabel}</Button>
    </div>
  {/if}
  <div class="sk-json__tree" role="tree" aria-label={label} bind:this={root}>
    {@render node('', value, '', 0, false)}
  </div>
</div>
