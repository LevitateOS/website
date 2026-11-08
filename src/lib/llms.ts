// llms.txt and llms-full.txt, generated from the docs at build time.
import { docsNav, plainText } from "@levitate/docs-content"
import { HARDWARE } from "@levitate/docs-content/pages"
import { DISTROS, docsHref, isDistroPage, pageText, pagesOf } from "./docs"

// The canonical host is astro.config.mjs's `site`.
const site = String(import.meta.env.SITE ?? "").replace(/\/$/, "")

function header(): string {
	return [
		"# LevitateOS",
		"",
		"> LevitateOS is a Linux distribution where you maintain your own packages. Packages are Rhai scripts called \"recipes\" that declare how to acquire, build and install each piece of software, and every recipe runs inside an isolated Ginux domain. The installed system updates atomically: A/B slots are the default, each update is trial-booted before it is kept, and mutable mode is an explicit opt-in.",
		"",
		"Siblings (built by the same pipeline, installed and updated the same way):",
		...DISTROS.map((d) => `- **${d.osName}**: ${d.profile.libc}, ${d.profile.init}, ${d.profile.privilege}, kernel ${d.kernel.version}.`),
		"",
		`Hardware: ${HARDWARE.cpu}, ${HARDWARE.ram} RAM, ${HARDWARE.disk} disk, UEFI with Secure Boot disabled.`,
	].join("\n")
}

/** The page index: every page, and each distro page once per distro. */
export function llmsIndex(): string {
	type Intro = { intro?: Parameters<typeof plainText>[0] }
	const about = (page: Intro | undefined) => (page?.intro ? `: ${plainText(page.intro)}` : "")
	const pages = (id: (typeof DISTROS)[number]["id"]) => pagesOf(id) as Record<string, Intro>
	const sections = docsNav.map((section) => {
		const lines = section.items.flatMap((item) =>
			isDistroPage(item.slug)
				? DISTROS.map(
						(d) => `- [${item.title} (${d.osName})](${site}${docsHref(item.slug, d.id)})${about(pages(d.id)[item.slug])}`,
					)
				: [`- [${item.title}](${site}${docsHref(item.slug)})${about(pages(DISTROS[0]!.id)[item.slug])}`],
		)
		return [`## ${section.title}`, "", ...lines].join("\n")
	})
	return [header(), ...sections].join("\n\n") + "\n"
}

/** Every page's text: the shared pages once, and each distro's own pages. */
export function llmsFull(): string {
	const shared = pagesOf(DISTROS[0]!.id) as Record<string, Parameters<typeof pageText>[0]>
	const parts = [header()]
	for (const d of DISTROS) {
		const pages = pagesOf(d.id) as Record<string, Parameters<typeof pageText>[0]>
		parts.push(`# ${d.osName}`)
		for (const section of docsNav) {
			for (const item of section.items) if (isDistroPage(item.slug)) parts.push(pageText(pages[item.slug]!))
		}
	}
	parts.push("# Shared pages")
	for (const section of docsNav) {
		for (const item of section.items) if (!isDistroPage(item.slug)) parts.push(pageText(shared[item.slug]!))
	}
	return parts.join("\n\n---\n\n") + "\n"
}
