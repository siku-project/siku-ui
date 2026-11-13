import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Chaque ressource est autonome une fois buildée : polices et styles de @siku/ui sont copiés dans ../html.
export default defineConfig({
  plugins: [svelte()],
  base: './',                       // chemins relatifs pour nui://<ressource>/html/
  build: {
    outDir: '../html',
    emptyOutDir: true,
    target: 'chrome144',            // CEF de FiveM, pas plus haut
    cssTarget: 'chrome144',
    assetsInlineLimit: 0,           // polices en fichiers, pas en base64
  },
  server: { port: 5173 },
});
