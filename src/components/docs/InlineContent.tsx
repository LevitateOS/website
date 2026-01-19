import type { RichText, InlineNode } from "@levitate/docs-content"

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
export function parseInlineContent(text: string): InlinePart[] {
	const parts: InlinePart[] = []
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

/** Renders a single inline node from RichText */
export function InlineNodeRenderer({ node }: { node: InlineNode }) {
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

/** Renders inline content - either a string (parsed) or RichText array (direct) */
export function InlineContentRenderer({ content }: { content: string | RichText }) {
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
		</>
	)
}
