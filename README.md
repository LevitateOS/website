# LevitateOS Website

Static documentation site built with Astro. Renders content from `@levitate/docs-content` package.

## Status

**Beta.** Builds and deploys. Mobile-first responsive design complete.

| Works | Not done |
|-------|----------|
| Static site builds | All documentation pages |
| System / Light / Dark appearance | Search |
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

- Astro 5
- Tailwind CSS 4 (utilities resolve to the Field Notes role tokens)
- Shiki (syntax highlighting, with a theme built from the code tokens)
- Bun (package manager)

## Visual identity

The site uses Field Notes v3 for LevitateOS and AcornOS: warm paper, pine for
LevitateOS and brown for AcornOS, Newsreader for statements and headings,
Instrument Sans for reading and controls, and a native monospace for code. The
homepage opens inside a dark botanical frame; red is kept for the one primary
action per page and the occasional note. Square corners throughout.

- `design/field-notes-v3/` holds the identity kit's handoff, its tokens as
  delivered, the font sources and the original frame artwork with its
  generation brief. It is reference material and is not served.
- `src/styles/field-notes/tokens.json` is the site's single source for palette,
  type, shape, spacing, layout, frame and motion; the night palette is a site
  addition the kit does not define. After editing it, run
  `python3 scripts/export-tokens.py` to regenerate `tokens.css`. Components use
  the `--fn-*` role tokens, never raw hex values. `data-product="acorn"` on an
  element switches `--fn-brand` to the AcornOS brown inside it.
- Every surface sets its own foreground. Light lettering appears only on the red
  action and the pine ending and footer; the footer stays pine in both
  appearances.
- `public/art/levitate-frame.webp` is drawn as a CSS `border-image` around live
  paper (`ImageFrame.astro`, slices `15% 10%`, no `fill`). It appears at the
  homepage hero, the introductory statement, and the downloads status heading.
  Its thickness follows each container's width; long reading sections and
  documentation pages stay on plain paper.
- `public/brand/` holds the selected marks (standard and micro) and the outlined
  monochrome lockups: `-ink` on paper, `-paper` on dark surfaces. Use them as
  supplied.
- `public/fonts/field-notes/` holds the self-hosted WOFF2 files (Latin subsets)
  and their SIL OFL licenses. Fonts are never loaded from a third-party CDN.
- Pages with several sections use the numbered margin index
  (`src/components/PageIndex.astro`); the entry for the section in view is
  marked in pine with an underline.
- Appearance follows the system unless the visitor picks Light or Dark in the
  footer; the choice is kept in `localStorage` and applied before first paint
  through `data-theme` on `<html>`.

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
