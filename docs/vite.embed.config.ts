import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
export default defineConfig({
  plugins: [svelte({ compilerOptions: { css: 'injected' } })],
  build: { outDir: 'docs/embed', emptyOutDir: true, target: 'chrome103', cssCodeSplit: false,
    lib: { entry: 'docs/src/embed.ts', name: 'SikuDocs', formats: ['iife'], fileName: () => 'siku-docs.js' } },
});
