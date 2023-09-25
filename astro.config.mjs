import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://ponjimon.github.io',
  base: '/f1score',
  integrations: [tailwind(), react({ experimentalReactChildren: true })],
});
