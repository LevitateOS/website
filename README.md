# LevitateOS Website

Static documentation site built with Astro. Renders content from `@levitate/docs-content` package.

## Status

**Beta.** Builds and deploys. Content incomplete.

| Works | Not done |
|-------|----------|
| Static site builds | All documentation pages |
| Dark/light theme toggle | Mobile navigation |
| Syntax highlighting | Search |

## Usage

```bash
bun install           # Install deps
bun run dev           # Dev server at localhost:3000
bun run build         # Production build to dist/
bun run preview       # Preview production build
```

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
- Mobile navigation incomplete
- Documentation content still being written

## License

MIT
