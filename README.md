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

The site uses Field Notes v3 for LevitateOS and AcornOS: warm paper and a dark
night, each flavour in its own colours (pine for LevitateOS, brown and sand for
AcornOS), Newsreader for statements and headings,
Instrument Sans for reading and controls, and a native monospace for code. The
homepage opens inside a dark botanical frame; red is kept for the one primary
action per page and the occasional note. Square corners throughout.

- `design/field-notes-v3/` holds the identity kit's handoff, its tokens as
  delivered, the font sources and the original frame artwork with its
  generation brief. It is reference material and is not served.
- Colours come from the distros: each declares its light and dark look in
  `distro/variants/<id>/distro.toml`, generated into `@levitate/docs-content/distros`
  (`DISTROS[].look`, `profile.appearance`). `src/lib/look.ts` turns the current
  flavour's looks into the `--fn-*` colour properties, emitted in a `<style>` by
  `BaseLayout.astro`. LevitateOS opens in light, AcornOS in dark; a stored footer
  choice applies on both.
- `src/styles/field-notes/tokens.json` is the site's source for type, shape,
  spacing, layout, frame, motion and the site-only colours (the red action and the
  syntax colours). After editing it, run `python3 scripts/export-tokens.py` to
  regenerate `tokens.css`. Components use the `--fn-*` role tokens, never raw hex
  values. `data-product` on an element sets `--fn-brand` to that product's colour
  inside it; `<html>` carries the page's flavour.
- Every surface sets its own foreground. Light lettering appears only on the red
  action and the ending band and footer, which keep the flavour's band colour in
  both appearances.
- `ImageFrame.astro` draws six distinct pieces of artwork as CSS `border-image`
  around live paper (slices `15% 10%`, no `fill`). The original botanical hero
  is joined by fern, circuit, mineral, folded paper and contour-map frames in
  `public/art/`. They mark different kinds of content at different scales across
  the homepage, downloads and getting-started guide. Frame thickness follows
  each container's width; long reading sections stay on plain paper.
- `public/brand/` holds the selected marks (standard and micro) and the outlined
  monochrome lockups: `-ink` on paper, `-paper` on dark surfaces. Use them as
  supplied.
- `public/fonts/field-notes/` holds the self-hosted WOFF2 files (Latin subsets)
  and their SIL OFL licenses. Fonts are never loaded from a third-party CDN.
- Pages with several sections use the numbered margin index
  (`src/components/PageIndex.astro`); the entry for the section in view is
  marked in the brand colour with an underline.
- `data-theme` on `<html>` is the flavour's default appearance (`light` for
  LevitateOS, `dark` for AcornOS). A choice of Light, Dark or System in the footer
  is kept in `localStorage` and applied before first paint on both flavours.

## Flavours and URLs

The site has two flavours, LevitateOS and AcornOS, chosen by the logos in the top
bar. The flavour is part of the URL, so everything is static and the switch is a
plain link to the same page in the other flavour.

| Page | LevitateOS | AcornOS |
|------|------------|---------|
| Home | `/` | `/acorn/` |
| Docs page | `/docs/<slug>/` | `/acorn/docs/<slug>/` |
| Downloads | `/download/` | `/acorn/download/` |
| Privacy | `/privacy/` | `/acorn/privacy/` |

Each docs tree renders `docsFor(<distro>)` for every slug: distro pages (nav items
with `distro: true`) come out in that distro's version, shared pages are
identical, and their AcornOS copies name the LevitateOS URL as canonical.
`src/lib/flavor.ts` owns the prefixes (`href`, `siblingHref`); the per-flavour
homepage copy is on each variant in `src/lib/variants.ts`. The old
`/docs/levitate/*` and `/docs/acorn/*` URLs redirect through `public/_redirects`.

## Structure

```
src/
├── pages/
│   ├── index.astro, download.astro, privacy.astro, docs/[slug].astro
│   └── acorn/           # the same routes for AcornOS
├── components/
│   ├── pages/           # Home, Download and Privacy bodies, taking a `distro`
│   ├── layout/          # Header (flavour switch), Footer, Sidebar
│   └── docs/            # Content block renderers
├── layouts/
│   └── BaseLayout.astro
├── lib/
│   └── flavor.ts        # flavour prefixes and the switch's target
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
