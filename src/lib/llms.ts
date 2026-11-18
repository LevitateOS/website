// llms.txt and llms-full.txt, generated from the docs at build time.
import { docsNav, plainText } from "@levitate/docs-content"
import { HARDWARE } from "@levitate/docs-content/pages"
import { releaseOf, RELEASE_LABEL, formatSize, isoFileName } from "./releases"
import { DISTROS, docsHref, isDistroPage, pageText, pagesOf } from "./docs"

// The canonical host is astro.config.ts's `site`.
const site = String(import.meta.env.SITE ?? "").replace(/\/$/, "")

function header(): string {
	return [
		"# LevitateOS",
		"",
		"> LevitateOS and AcornOS are independent operating systems; their userlands are built from Fedora 45 RPM packages and Alpine 3.24 APK packages. You maintain your own packages with Recipe: Rhai scripts called \"recipes\" that declare how to acquire, build and install each piece of software. A recipe that starts programs runs inside an isolated Ginux domain; one that starts none runs on the host, confined by Recipe. The installed system keeps two roots, A and B, by default: the booted root is locked and changes are made in the other root. Mutable mode, one root, is an explicit opt-in.",
		"",
		"Siblings (built by the same pipeline, installed the same way):",
		...DISTROS.map((d) => `- **${d.osName}**: ${d.profile.libc}, ${d.profile.init}, ${d.profile.privilege}, kernel ${d.kernel.version}.`),
		"",
		"",
		"Releases:",
		...DISTROS.map((d) => {
			const release = releaseOf(d.id)
			if (!release) return `- **${d.osName}**: not released yet.`
			return `- **${d.osName}** ${release.version} (${RELEASE_LABEL}, ${release.date}): ISO ${isoFileName(release)} (${formatSize(release.iso.size)}), SHA-512 ${release.iso.sha512}, notes ${release.notes}`
		}),
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
				: [`- [${item.title}](${site}${docsHref(item.slug, "levitate")})${about(pages("levitate")[item.slug])}`],
		)
		return [`## ${section.title}`, "", ...lines].join("\n")
	})
	return [header(), ...sections].join("\n\n") + "\n"
}

/** Every page's text: the shared pages once, and each distro's own pages. */
export function llmsFull(): string {
	const shared = pagesOf("levitate") as Record<string, Parameters<typeof pageText>[0]>
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
