// The site's view of the generated docs: which pages each distro has, their URLs, and the
// page text for llms.txt. Every flavour has every page at /docs/<slug>/ (LevitateOS) or
// /acorn/docs/<slug>/ (AcornOS); distro pages come out in that flavour's version, shared
// pages are identical.
import {
	docsFor,
	docsNav,
	plainText,
	type ContentBlock,
	type DocsContent,
	type DocsSlug,
	type RichText,
} from "@levitate/docs-content"
import { DISTROS, type DistroId } from "@levitate/docs-content/distros"
import { distroName, href } from "./flavor"

export { DISTROS, distroName }
export type { DistroId }

const distroSlugs = new Set(docsNav.flatMap((section) => section.items.filter((i) => i.distro).map((i) => i.slug)))

/** Whether every distro has its own version of the page. */
export function isDistroPage(slug: string): boolean {
	return distroSlugs.has(slug)
}

/** A docs page's URL in `distro`'s flavour. */
export function docsHref(slug: string, distro: DistroId): string {
	return href(`/docs/${slug}/`, distro)
}

/** A hand-written link to a docs page: the slug is typed, so a renamed page fails the typecheck. */
export function docLink(slug: DocsSlug, distro: DistroId): string {
	return docsHref(slug, distro)
}

function localHref(link: string, distro: DistroId): string {
	return link.startsWith("/") && !link.startsWith("//") ? href(link, distro) : link
}

function localText<T extends string | RichText>(text: T, distro: DistroId): T {
	if (typeof text === "string") return text
	return text.map((node) =>
		typeof node !== "string" && node.type === "link" ? { ...node, href: localHref(node.href, distro) } : node,
	) as T
}

function localBlock(block: ContentBlock, distro: DistroId): ContentBlock {
	const t = <T extends string | RichText>(text: T) => localText(text, distro)
	switch (block.type) {
		case "text":
		case "note":
			return { ...block, content: t(block.content) }
		case "list":
			return {
				...block,
				items: block.items.map((item) =>
					typeof item === "string" || Array.isArray(item)
						? t(item)
						: { ...item, text: t(item.text), children: item.children?.map(t) },
				),
			}
		case "table":
			return { ...block, headers: block.headers.map(t), rows: block.rows.map((row) => row.map(t)) }
		case "interactive":
			return {
				...block,
				intro: block.intro && t(block.intro),
				steps: block.steps.map((step) => ({ ...step, description: t(step.description) })),
			}
		case "qa":
			return {
				...block,
				items: block.items.map((item) => ({
					question: t(item.question),
					answer: item.answer.map((answer) => localBlock(answer, distro)),
				})),
			}
		case "code":
		case "command":
			return block
	}
}

/** The page with its internal links pointed into `distro`'s flavour. */
export function localize(content: DocsContent, distro: DistroId): DocsContent {
	return {
		...content,
		intro: content.intro && localText(content.intro, distro),
		sections: content.sections.map((section) => ({
			...section,
			content: section.content.map((block) => localBlock(block, distro)),
		})),
	}
}

/** Every page of `distro`, by slug. */
export function pagesOf(distro: DistroId): Record<DocsSlug, DocsContent> {
	return docsFor(distro)
}

function blockText(block: ContentBlock): string[] {
	switch (block.type) {
		case "text":
			return [plainText(block.content)]
		case "note":
			return [`Note: ${plainText(block.content)}`]
		case "code":
			return ["```", block.content, "```"]
		case "command":
			return [
				`${block.description}:`,
				"```",
				...(Array.isArray(block.command) ? block.command : [block.command]),
				"```",
			]
		case "list":
			return block.items.map(
				(item) => `- ${plainText(typeof item === "string" || Array.isArray(item) ? item : item.text)}`,
			)
		case "table":
			return [
				`| ${block.headers.map(plainText).join(" | ")} |`,
				...block.rows.map((row) => `| ${row.map(plainText).join(" | ")} |`),
			]
		case "interactive":
			return block.steps.map((step) => `- \`${step.command}\`: ${plainText(step.description)}`)
		case "qa":
			return block.items.flatMap((item) => [`Q: ${plainText(item.question)}`, ...item.answer.flatMap(blockText)])
	}
}

/** A page as Markdown-ish plain text, for llms-full.txt. */
export function pageText(content: DocsContent): string {
	return [
		`## ${content.title}`,
		...(content.intro ? [plainText(content.intro)] : []),
		...content.sections.flatMap((section) => [
			`${"#".repeat((section.level ?? 2) + 1)} ${section.title}`,
			...section.content.flatMap(blockText),
		]),
	].join("\n\n")
}
