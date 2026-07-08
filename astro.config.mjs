import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
    site: 'https://capablemuslim.tech',
    integrations: [react(), tailwind()],
    output: 'static',
    outDir: './Static Pages',
    server: {
        port: 2026,
        strictPort: true,
    },
});