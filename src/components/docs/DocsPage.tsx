import { DocsLayout } from "@/components/layout"
import { CodeBlock } from "@/components/CodeBlock"
import type {
	DocsContent,
	Section,
	ContentBlock,
	ListBlock,
	ConversationBlock,
	TableBlock,
} from "@levitate/docs-content"

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

function IntroRenderer({ content }: { content: string }) {
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

function SectionBlock({ section }: { section: Section }) {
	const level = section.level ?? 2
	const Heading = level === 2 ? "h2" : "h3"
	const headingClass =
		level === 2 ? "text-2xl font-semibold mb-4" : "text-xl font-medium mb-3"

	return (
		<section className="mb-8">
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
		default:
			return null
	}
}

function TextBlockRenderer({ content }: { content: string }) {
	// Handle inline code (wrapped in backticks) and links (markdown-style)
	const parts = parseInlineContent(content)

	return (
		<p className="text-muted-foreground mb-2">
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

type InlinePart =
	| { type: "text"; content: string }
	| { type: "code"; content: string }
	| { type: "link"; content: string; href: string }
	| { type: "bold"; content: string }

function parseInlineContent(text: string): InlinePart[] {
	const parts: InlinePart[] = []
	// Regex to match inline code `...`, links [text](url), or bold **...**
	const regex = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g
	let lastIndex = 0
	let match

	while ((match = regex.exec(text)) !== null) {
		// Add text before match
		if (match.index > lastIndex) {
			parts.push({ type: "text", content: text.slice(lastIndex, match.index) })
		}

		if (match[1]) {
			// Inline code
			parts.push({ type: "code", content: match[1] })
		} else if (match[2] && match[3]) {
			// Link
			parts.push({ type: "link", content: match[2], href: match[3] })
		} else if (match[4]) {
			// Bold
			parts.push({ type: "bold", content: match[4] })
		}

		lastIndex = match.index + match[0].length
	}

	// Add remaining text
	if (lastIndex < text.length) {
		parts.push({ type: "text", content: text.slice(lastIndex) })
	}

	return parts.length > 0 ? parts : [{ type: "text", content: text }]
}

function TableBlockRenderer({ table }: { table: TableBlock }) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b">
						{table.headers.map((header, i) => (
							<th key={i} className="text-left py-2 pr-4">
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="text-muted-foreground">
					{table.rows.map((row, i) => (
						<tr key={i} className={i < table.rows.length - 1 ? "border-b" : ""}>
							{row.map((cell, j) => (
								<td
									key={j}
									className={`py-2 pr-4 ${j === table.monospaceCol ? "font-mono" : ""}`}
								>
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

function ListBlockRenderer({ list }: { list: ListBlock }) {
	const ListTag = list.ordered ? "ol" : "ul"
	const listClass = list.ordered
		? "list-decimal list-inside space-y-1 text-muted-foreground mb-4"
		: "list-disc list-inside space-y-1 text-muted-foreground mb-4"

	return (
		<ListTag className={listClass}>
			{list.items.map((item, i) => {
				if (typeof item === "string") {
					const parts = parseInlineContent(item)
					return (
						<li key={i}>
							{parts.map((part, j) => {
								if (part.type === "code") {
									return (
										<code key={j} className="bg-muted px-1.5 py-0.5">
											{part.content}
										</code>
									)
								}
								if (part.type === "bold") {
									return <strong key={j}>{part.content}</strong>
								}
								return <span key={j}>{part.content}</span>
							})}
						</li>
					)
				}
				return (
					<li key={i}>
						{item.text}
						{item.children && (
							<ul className="list-disc list-inside ml-4 mt-1">
								{item.children.map((child, j) => (
									<li key={j}>{child}</li>
								))}
							</ul>
						)}
					</li>
				)
			})}
		</ListTag>
	)
}

function ConversationBlockRenderer({ conversation }: { conversation: ConversationBlock }) {
	return (
		<div className="bg-muted/50 p-4 space-y-3 text-sm mb-4">
			{conversation.messages.map((msg, i) => (
				<div key={i}>
					<span
						className={
							msg.role === "user"
								? "text-primary font-medium"
								: "text-muted-foreground font-medium"
						}
					>
						{msg.role === "user" ? "You:" : "AI:"}
					</span>
					<span className="ml-2">{msg.text}</span>
					{msg.list && (
						<ul className="list-disc list-inside ml-4 mt-1">
							{msg.list.map((item, j) => (
								<li key={j}>{item}</li>
							))}
						</ul>
					)}
				</div>
			))}
		</div>
	)
}
