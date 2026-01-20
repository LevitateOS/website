import { DocsLayout } from "@/components/layout"
import { CodeBlock } from "@/components/CodeBlock"
import type { DocsContent, Section, ContentBlock, RichText } from "@levitate/docs-content"

import { CommandBlockRenderer } from "./CommandBlock"
import { InteractiveBlockRenderer } from "./InteractiveBlock"
import { TableBlockRenderer } from "./TableBlock"
import { ListBlockRenderer } from "./ListBlock"
import { ConversationBlockRenderer } from "./ConversationBlock"
import { TextBlockRenderer } from "./TextBlock"
import { InlineContentRenderer } from "./InlineContent"
import { QABlockRenderer } from "./QABlock"

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
	return (
		<p className="text-muted-foreground mb-8">
			<InlineContentRenderer content={content} />
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
			return (
				<CodeBlock language={block.language} filename={block.filename}>
					{block.content}
				</CodeBlock>
			)
		case "table":
			return <TableBlockRenderer table={block} />
		case "list":
			return <ListBlockRenderer list={block} />
		case "conversation":
			return <ConversationBlockRenderer conversation={block} />
		case "interactive":
			return <InteractiveBlockRenderer block={block} />
		case "command":
			return <CommandBlockRenderer block={block} />
		case "qa":
			return <QABlockRenderer block={block} />
		default:
			return null
	}
}
