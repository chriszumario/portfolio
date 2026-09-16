// @ts-check
import { defineConfig, envField, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import solidJs from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  site: 'https://portfolio.dev',

  fonts: [
    {
      name: 'DM Sans',
      cssVariable: '--portfolio-font-sans',
      provider: fontProviders.google(),
      weights: [400, 500, 600, 700],
    },
    {
      name: 'Syne',
      cssVariable: '--portfolio-font-heading',
      provider: fontProviders.google(),
      weights: [500, 600, 700, 800],
    },
  ],

  env: {
    schema: {
      PUBLIC_API_URL: envField.string({
        context: 'client',
        access: 'public',
        default: 'http://127.0.0.1:8000/api/v1',
        optional: true,
      }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [solidJs()],
});
