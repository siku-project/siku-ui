// Bundle autonome pour l'artifact « SIKU » : chaque fiche charge ce script et monte la page voulue.
//   <div id="app"></div><script src="../../docs/siku-docs.js"></script>
//   <script>SikuDocs.mount(document.getElementById('app'), { component: 'Button' })</script>
import css from '../../src/lib/styles/siku.css?inline';
import { mount as svelteMount } from 'svelte';
import { initInput } from '../../src/lib/index';
import ComponentPage from './pages/ComponentPage.svelte';
import Foundations from './pages/Foundations.svelte';

function inject(fontBase: string) {
  if (document.getElementById('siku-docs-css')) return;
  const style = document.createElement('style');
  style.id = 'siku-docs-css';
  style.textContent = css.replace(/url\((["']?)[^)"']*?\/?(InstrumentSans|GeistMono)-Variable[^)"']*\.woff2\1\)/g, (_m, _q, f) => `url("${fontBase}${f}-Variable.woff2")`)
    + 'html,body{margin:0;background:var(--bg-base);overflow:auto}';
  document.head.appendChild(style);
}

export function mount(target: HTMLElement, opts: { component?: string; foundation?: string; fontBase?: string }) {
  inject(opts.fontBase ?? '../../fonts/');
  document.documentElement.dataset.theme = 'dark';
  target.classList.add('sk');
  initInput();
  return opts.component
    ? svelteMount(ComponentPage, { target, props: { name: opts.component, embedded: true } })
    : svelteMount(Foundations, { target, props: { section: opts.foundation ?? 'colors', embedded: true } });
}
