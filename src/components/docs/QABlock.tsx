import type { QABlock, ContentBlock } from "@levitate/docs-content"
import { InlineContentRenderer } from "./InlineContent"
import { TextBlockRenderer } from "./TextBlock"
import { CommandBlockRenderer } from "./CommandBlock"
import { ListBlockRenderer } from "./ListBlock"
import { CodeBlock } from "@/components/CodeBlock"

/** Renders a Q&A item's answer content blocks */
function AnswerContentRenderer({ block }: { block: ContentBlock }) {
	switch (block.type) {
		case "text":
			return <TextBlockRenderer content={block.content} />
		case "code":
			return (
				<CodeBlock language={block.language} filename={block.filename}>
					{block.content}
				</CodeBlock>
			)
		case "command":
			return <CommandBlockRenderer block={block} />
		case "list":
			return <ListBlockRenderer list={block} />
		default:
			return null
	}
}

export function QABlockRenderer({ block }: { block: QABlock }) {
	return (
		<div className="space-y-6 mb-6">
			{block.items.map((item, i) => (
				<div key={i} className="border-l-2 border-primary/30 pl-4">
					<h4 className="font-semibold text-lg mb-3">
						<InlineContentRenderer content={item.question} />
					</h4>
					<div className="space-y-3">
						{item.answer.map((answerBlock, j) => (
							<AnswerContentRenderer key={j} block={answerBlock} />
						))}
					</div>
				</div>
			))}
		</div>
	)
}
