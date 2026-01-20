import type { RichText } from "@levitate/docs-content"
import { InlineContentRenderer } from "./InlineContent"

export function TextBlockRenderer({ content }: { content: string | RichText }) {
	return (
		<p className="text-muted-foreground mb-2">
			<InlineContentRenderer content={content} />
		</p>
	)
}
