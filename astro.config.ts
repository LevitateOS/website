import { rename, rm } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { defineConfig } from "astro/config"
import type { AstroIntegration } from "astro"
import tailwindcss from "@tailwindcss/vite"
import sitemap from "@astrojs/sitemap"
import { docsNav } from "@levitate/docs-content"

const site = "https://levitateos.org"

/** Docs pages that are shared by both flavours (their nav item is not a distro page). */
const sharedSlugs = new Set(docsNav.flatMap((section) => section.items.filter((item) => !item.distro).map((item) => item.slug)))

/** Whether the sitemap should list a page: only canonical URLs, not stubs or the AcornOS copies of shared pages. */
function listed(page: string): boolean {
	const { pathname } = new URL(page)
	if (["/acorn/404/", "/docs/", "/acorn/docs/", "/acorn/privacy/"].includes(pathname)) return false
	const slug = /^\/acorn\/docs\/([^/]+)\/$/.exec(pathname)?.[1]
	return !(slug && sharedSlugs.has(slug))
}

/** Astro writes only the root 404 as `404.html`; Cloudflare Pages serves the nearest `404.html`
 * up the directory tree, so the AcornOS one has to be moved from `acorn/404/index.html`. */
const acornNotFound: AstroIntegration = {
	name: "acorn-404",
	hooks: {
		"astro:build:done": async ({ dir }) => {
			const root = fileURLToPath(dir)
			await rename(`${root}acorn/404/index.html`, `${root}acorn/404.html`)
			await rm(`${root}acorn/404`, { recursive: true })
		},
	},
}

export default defineConfig({
	site,
	output: "static",

	integrations: [sitemap({ filter: listed }), acornNotFound],

	vite: {
		// Tailwind resolves its own copy of vite, so its plugin type differs from Astro's.
		plugins: [tailwindcss() as never],
		// Workspace package resolution
		ssr: {
			noExternal: ["@levitate/docs-content"],
		},
	},
})
