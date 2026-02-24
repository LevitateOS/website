# LevitateOS Website

Static documentation site built with Astro. Renders content from `@levitate/docs-content` package.

## Status

**Beta.** Builds and deploys. Mobile-first responsive design complete.

| Works | Not done |
|-------|----------|
| Static site builds | All documentation pages |
| Dark/light theme toggle | Search |
| Syntax highlighting | |
| Mobile-first responsive design | |
| Mobile hamburger navigation | |
| Mobile docs navigation dropdown | |

## Usage

```bash
bun install           # Install deps
bun run dev           # Dev server at localhost:43117
bun run build         # Production build to dist/
bun run preview       # Preview production build
```

## Deployment

Deployed to Cloudflare Pages as `levitateos-docs`.

**Production URL:** https://www.levitateos.org

```bash
bun run deploy    # Build and deploy to production
```

Prerequisites:
- Must be logged into Wrangler (`bunx wrangler login`)
- Account: vincepaul.liem@gmail.com

## Design Targets

| Viewport | Size | Notes |
|----------|------|-------|
| Desktop (primary) | 960x1080 | Main target for design/testing |
| iPhone | 393x852 | iPhone 15/16 Pro |
| Android | 412x915 | Pixel 8 / Galaxy S24 |

## Stack

- Astro 5.7
- Tailwind CSS 4.0
- Shiki (syntax highlighting)
- Bun (package manager)

## Structure

```
src/
├── pages/
│   ├── index.astro      # Homepage
│   ├── download.astro   # Download page
│   └── docs/[slug].astro
├── components/
│   ├── layout/          # Header, Footer, Sidebar
│   └── docs/            # Content block renderers
├── layouts/
│   └── BaseLayout.astro
└── styles/
    └── global.css
```

## Content Source

Documentation content comes from `@levitate/docs-content` workspace package. This README is about the website renderer, not the content.

### Dev vs Build Behavior

- Website uses live discovery from `docs/content/src/content/**` in both dev and build.
- No manual docs-content build step is required to update sidebar/routes for website.
- `docs/content` build is only needed when you want to regenerate `docs/content/src/generated/index.ts` for non-Vite consumers.

## Adding Pages

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Title">
  <main>Content here</main>
</BaseLayout>
```

## Known Limitations

- No search functionality
- Documentation content still being written

## Mobile Responsiveness

The site follows **mobile-first design principles**:

- Base styles target mobile devices
- Progressive enhancement via `sm:`, `md:`, `lg:` breakpoints
- Hamburger menu for mobile header navigation
- Dropdown navigation for docs pages on mobile
- Horizontally scrollable code blocks
- Responsive download cards and requirements table

## License

MIT
