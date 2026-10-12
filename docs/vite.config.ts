import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
export default defineConfig({ root: 'docs', base: './', plugins: [svelte()], build: { outDir: 'dist', emptyOutDir: true, target: 'chrome103' } });
