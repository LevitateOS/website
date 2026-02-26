import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import sitemap from "@astrojs/sitemap"
import { INDUSTRIAL_PASTEL_1984_THEMES } from "@levitate/docs-content/syntax-theme"

export default defineConfig({
  site: "https://levitateos.org",
  output: "static",

  integrations: [sitemap()],

  vite: {
    plugins: [tailwindcss()],
    // Workspace package resolution
    ssr: {
      noExternal: ["@levitate/docs-content"],
    },
  },

  // Shiki dual themes for code highlighting
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      themes: INDUSTRIAL_PASTEL_1984_THEMES,
      defaultColor: false,
    },
  },
})
