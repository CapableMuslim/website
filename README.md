# The Capable Muslim — Website

Static site for [The Capable Muslim](https://capablemuslim.tech), built with [Astro](https://astro.build), React, and Tailwind CSS.

Live site: [https://capablemuslim.tech](https://capablemuslim.tech)

## Project structure

- `src/pages` — routes and pages
- `src/components` — UI components
- `src/content/posts` — article markdown
- `src/data` — site config, navigation, pillars
- `public` — static assets (logos, favicons)
- `Static Pages` — production build output (generated, not committed)

## Local development

```bash
npm install
npm run dev
```

Dev server: `http://localhost:2026`

## Production build

```bash
npm run build
npm run preview
```