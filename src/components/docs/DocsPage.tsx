import { DocsLayout } from "@/components/layout"
import { CodeBlock } from "@/components/CodeBlock"
import { Check, Copy, File } from "@phosphor-icons/react"
import { useCopyToClipboard } from "usehooks-ts"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type {
	DocsContent,
	Section,
	ContentBlock,
	FileBlock,
	ListBlock,
	ConversationBlock,
	TableBlock,
	RichText,
	InlineNode,
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

function IntroRenderer({ content }: { content: string | RichText }) {
	// If it's a RichText array, render directly without parsing
	if (Array.isArray(content)) {
		return (
			<p className="text-muted-foreground mb-8">
				{content.map((node, i) => (
					<InlineNodeRenderer key={i} node={node} />
				))}
			</p>
		)
	}

	// Otherwise parse the markdown string (legacy support)
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
		default:
			return null
	}
}

function FileBlockRenderer({ file }: { file: FileBlock }) {
	const [copiedText, copy] = useCopyToClipboard()
	const hasCopied = copiedText === file.content
	const language = file.language || inferLanguage(file.filename)

	return (
		<Card className="mb-4">
			<CardHeader className="py-2 px-3 border-b flex-row items-center justify-between">
				<div className="flex items-center gap-2">
					<File className="h-4 w-4 text-muted-foreground" weight="fill" />
					<span className="text-sm font-mono">{file.filename}</span>
				</div>
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					{language && <span>{language}</span>}
					{language && <span className="text-muted-foreground/50">|</span>}
					<button
						type="button"
						onClick={() => copy(file.content)}
						className="flex items-center gap-1 hover:text-foreground transition-colors"
					>
						{hasCopied ? (
							<>
								<Check className="w-3 h-3" />
								copied
							</>
						) : (
							<>
								<Copy className="w-3 h-3" />
								copy
							</>
						)}
					</button>
				</div>
			</CardHeader>
			<CardContent className="p-0">
				<pre className="bg-muted/30 p-4 overflow-x-auto">
					<code className="text-sm font-mono">{file.content}</code>
				</pre>
			</CardContent>
		</Card>
	)
}

function inferLanguage(filename: string): string | undefined {
	const ext = filename.split(".").pop()?.toLowerCase()
	const langMap: Record<string, string> = {
		conf: "conf",
		json: "json",
		yaml: "yaml",
		yml: "yaml",
		toml: "toml",
		sh: "bash",
		bash: "bash",
		zsh: "bash",
		rhai: "rhai",
	}
	return langMap[ext || ""]
}

function TextBlockRenderer({ content }: { content: string | RichText }) {
	// If it's a RichText array, render directly without parsing
	if (Array.isArray(content)) {
		return (
			<p className="text-muted-foreground mb-2">
				{content.map((node, i) => (
					<InlineNodeRenderer key={i} node={node} />
				))}
			</p>
		)
	}

	// Otherwise parse the markdown string (legacy support)
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

/** Renders a single inline node from RichText */
function InlineNodeRenderer({ node }: { node: InlineNode }) {
	if (typeof node === "string") {
		return <>{node}</>
	}

	switch (node.type) {
		case "link":
			return (
				<a href={node.href} className="text-primary hover:underline">
					{node.text}
				</a>
			)
		case "bold":
			return <strong>{node.text}</strong>
		case "code":
			return <code className="bg-muted px-1.5 py-0.5">{node.text}</code>
		case "italic":
			return <em>{node.text}</em>
		default:
			return null
	}
}

type InlinePart =
	| { type: "text"; content: string }
	| { type: "code"; content: string }
	| { type: "link"; content: string; href: string }
	| { type: "bold"; content: string }

/**
 * Parse legacy markdown strings into inline parts.
 * Supports: `code`, [link](url), **bold**
 *
 * Note: For new content, use the RichText system (rich`...`) instead.
 * This parser handles URLs with query params and one level of nested parentheses.
 */
function parseInlineContent(text: string): InlinePart[] {
	const parts: InlinePart[] = []
	// Improved regex:
	// - Code: `...` (no backticks inside)
	// - Links: [text](url) where url can contain query params and one level of nested parens
	// - Bold: **...** using non-greedy match (allows * inside)
	const regex = /`([^`]+)`|\[([^\]]+)\]\(((?:[^()]+|\([^()]*\))+)\)|\*\*(.+?)\*\*/g
	let lastIndex = 0
	let match

	while ((match = regex.exec(text)) !== null) {
		if (match.index > lastIndex) {
			parts.push({ type: "text", content: text.slice(lastIndex, match.index) })
		}

		if (match[1]) {
			parts.push({ type: "code", content: match[1] })
		} else if (match[2] && match[3]) {
			parts.push({ type: "link", content: match[2], href: match[3] })
		} else if (match[4]) {
			parts.push({ type: "bold", content: match[4] })
		}

		lastIndex = match.index + match[0].length
	}

	if (lastIndex < text.length) {
		parts.push({ type: "text", content: text.slice(lastIndex) })
	}

	return parts.length > 0 ? parts : [{ type: "text", content: text }]
}

function TableBlockRenderer({ table }: { table: TableBlock }) {
	return (
		<Table className="mb-4">
			<TableHeader>
				<TableRow>
					{table.headers.map((header, i) => (
						<TableHead key={i}>{header}</TableHead>
					))}
				</TableRow>
			</TableHeader>
			<TableBody>
				{table.rows.map((row, i) => (
					<TableRow key={i}>
						{row.map((cell, j) => (
							<TableCell
								key={j}
								className={j === table.monospaceCol ? "font-mono" : ""}
							>
								{cell}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}

/** Renders inline content - either a string (parsed) or RichText array (direct) */
function InlineContentRenderer({ content }: { content: string | RichText }) {
	if (Array.isArray(content)) {
		return (
			<>
				{content.map((node, i) => (
					<InlineNodeRenderer key={i} node={node} />
				))}
			</>
		)
	}

	const parts = parseInlineContent(content)
	return (
		<>
			{parts.map((part, i) => {
				if (part.type === "code") {
					return (
						<code key={i} className="bg-muted px-1.5 py-0.5">
							{part.content}
						</code>
					)
				}
				if (part.type === "bold") {
					return <strong key={i}>{part.content}</strong>
				}
				return <span key={i}>{part.content}</span>
			})}
		</>
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
				// String or RichText array - render inline content
				if (typeof item === "string" || Array.isArray(item)) {
					return (
						<li key={i}>
							<InlineContentRenderer content={item} />
						</li>
					)
				}
				// ListItem object with text and optional children
				return (
					<li key={i}>
						<InlineContentRenderer content={item.text} />
						{item.children && (
							<ul className="list-disc list-inside ml-4 mt-1">
								{item.children.map((child, j) => (
									<li key={j}>
										<InlineContentRenderer content={child} />
									</li>
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
		<Card className="mb-4">
			<CardContent className="p-4 space-y-3 text-sm">
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
			</CardContent>
		</Card>
	)
}
