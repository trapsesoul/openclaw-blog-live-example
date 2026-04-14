import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://trapsesoul.github.io',
  base: '/openclaw-blog-live-example',
  output: 'static',
  integrations: [sitemap()]
});
