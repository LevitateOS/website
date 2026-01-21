# LevitateOS Website

> **STOP. READ. THEN ACT.** Before writing code, read the existing components and pages. Before deleting anything, read it first.

The official website for [LevitateOS](https://github.com/LevitateOS/LevitateOS), built with Astro.

## Tech Stack

- **[Astro](https://astro.build)** v5.7 - Static site generator
- **[Tailwind CSS](https://tailwindcss.com)** v4.0 - Styling
- **[Shiki](https://shiki.style)** - Syntax highlighting
- **[Bun](https://bun.sh)** - Package manager & runtime

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server (http://localhost:3000)
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type check
bun run typecheck
```

## Project Structure

```
src/
├── components/
│   ├── docs/           # Documentation block renderers
│   └── layout/         # Header, Footer, Sidebar
├── layouts/
│   └── BaseLayout.astro
├── pages/
│   ├── index.astro     # Homepage
│   ├── download.astro  # Download page
│   └── docs/[slug].astro
└── styles/
    └── global.css
```

## Documentation Content

Documentation content is sourced from the `@levitate/docs-content` workspace package in the main monorepo. This keeps content separate from presentation.

## Development

### Adding a New Page

Create a new `.astro` file in `src/pages/`:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Title">
  <main>
    <!-- Content -->
  </main>
</BaseLayout>
```

### Theme Support

The site supports light/dark themes via CSS custom properties and a theme toggle. Theme preference is persisted to localStorage.

## License

MIT License - see [LICENSE](LICENSE)
