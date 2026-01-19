import { DocsLayout } from "@/components/layout"
import { CodeBlock } from "@/components/CodeBlock"
import type { DocsContent, Section, ContentBlock, RichText } from "@levitate/docs-content"

import { CommandBlockRenderer } from "./CommandBlock"
import { InteractiveBlockRenderer } from "./InteractiveBlock"
import { FileBlockRenderer } from "./FileBlock"
import { TableBlockRenderer } from "./TableBlock"
import { ListBlockRenderer } from "./ListBlock"
import { ConversationBlockRenderer } from "./ConversationBlock"
import { TextBlockRenderer } from "./TextBlock"
import { InlineNodeRenderer, parseInlineContent } from "./InlineContent"

interface DocsPageProps {
	content: DocsContent
}

export function DocsPage({ content }: DocsPageProps) {
	return (
		<DocsLayout>
			<h1 className="text-3xl font-bold mb-6">{content.title}</h1>
			{content.intro && <IntroRenderer content={content.intro} />}
			{content.sections.map((section, i) => (
				<SectionBlock key={i} section={section} />
			))}
		</DocsLayout>
	)
}

function IntroRenderer({ content }: { content: string | RichText }) {
	if (Array.isArray(content)) {
		return (
			<p className="text-muted-foreground mb-8">
				{content.map((node, i) => (
					<InlineNodeRenderer key={i} node={node} />
				))}
			</p>
		)
	}

	const parts = parseInlineContent(content)
	return (
		<p className="text-muted-foreground mb-8">
			{parts.map((part, i) => {
				if (part.type === "code") {
					return (
						<code key={i} className="bg-muted px-1.5 py-0.5">
							{part.content}
						</code>
					)
				}
				if (part.type === "link") {
					return (
						<a key={i} href={part.href} className="text-primary hover:underline">
							{part.content}
						</a>
					)
				}
				if (part.type === "bold") {
					return <strong key={i}>{part.content}</strong>
				}
				return <span key={i}>{part.content}</span>
			})}
		</p>
	)
}

/** Convert title to anchor slug */
function toAnchor(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
}

function SectionBlock({ section }: { section: Section }) {
	const level = section.level ?? 2
	const Heading = level === 2 ? "h2" : "h3"
	const headingClass =
		level === 2 ? "text-2xl font-semibold mb-4" : "text-xl font-medium mb-3"
	const anchor = toAnchor(section.title)

	return (
		<section id={anchor} className="mb-8 scroll-mt-20">
			<Heading className={headingClass}>{section.title}</Heading>
			{section.content.map((block, i) => (
				<ContentBlockRenderer key={i} block={block} />
			))}
		</section>
	)
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
	switch (block.type) {
		case "text":
			return <TextBlockRenderer content={block.content} />
		case "code":
			return <CodeBlock language={block.language}>{block.content}</CodeBlock>
		case "file":
			return <FileBlockRenderer file={block} />
		case "table":
			return <TableBlockRenderer table={block} />
		case "list":
			return <ListBlockRenderer list={block} />
		case "conversation":
			return <ConversationBlockRenderer conversation={block} />
		case "link":
			return (
				<p className="text-muted-foreground mb-2">
					<a href={block.href} className="text-primary hover:underline">
						{block.text}
					</a>
				</p>
			)
		case "inline-code":
			return (
				<p className="text-muted-foreground mb-2">
					<code className="bg-muted px-1.5 py-0.5">{block.content}</code>
				</p>
			)
		case "interactive":
			return <InteractiveBlockRenderer block={block} />
		case "command":
			return <CommandBlockRenderer block={block} />
		default:
			return null
	}
}
