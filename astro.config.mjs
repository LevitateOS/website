import { defineConfig } from "astro/config"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  output: "static",

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
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },
})
