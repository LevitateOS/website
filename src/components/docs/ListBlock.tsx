import type { ListBlock } from "@levitate/docs-content"
import { InlineContentRenderer } from "./InlineContent"

export function ListBlockRenderer({ list }: { list: ListBlock }) {
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
