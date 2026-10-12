// Tailwind v3 : toutes les valeurs viennent du preset SIKU (tokens). Ne pas ajouter de couleurs ici.
import siku from '@siku/ui/tailwind-preset';
/** @type {import('tailwindcss').Config} */
export default {
  presets: [siku],
  content: ['./index.html', './src/**/*.{svelte,ts}'],
  corePlugins: { preflight: false }, // la base SIKU s'en charge
};
