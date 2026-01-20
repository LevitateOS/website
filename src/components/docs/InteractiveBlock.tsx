import type { InteractiveBlock } from "@levitate/docs-content"
import { InlineContentRenderer } from "./InlineContent"

export function InteractiveBlockRenderer({ block }: { block: InteractiveBlock }) {
	return (
		<div className="mb-4 space-y-3">
			{block.intro && (
				<p className="text-muted-foreground">
					<InlineContentRenderer content={block.intro} />
				</p>
			)}
			{block.steps.map((step, i) => (
				<div key={i} className="flex items-start gap-3">
					<code className="bg-muted px-3 py-1.5 rounded text-sm font-mono shrink-0">
						{step.command}
					</code>
					<span className="text-muted-foreground text-sm pt-1.5">
						<InlineContentRenderer content={step.description} />
					</span>
				</div>
			))}
		</div>
	)
}
