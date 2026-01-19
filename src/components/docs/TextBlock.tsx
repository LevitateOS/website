import type { RichText } from "@levitate/docs-content"
import { InlineNodeRenderer, parseInlineContent } from "./InlineContent"

export function TextBlockRenderer({ content }: { content: string | RichText }) {
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
