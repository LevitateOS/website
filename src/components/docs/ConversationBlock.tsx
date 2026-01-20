import { Card, CardContent } from "@/components/ui/card"
import type { ConversationBlock } from "@levitate/docs-content"
import { InlineContentRenderer } from "./InlineContent"

export function ConversationBlockRenderer({ conversation }: { conversation: ConversationBlock }) {
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
						<span className="ml-2">
							<InlineContentRenderer content={msg.text} />
						</span>
						{msg.list && (
							<ul className="list-disc list-inside ml-4 mt-1">
								{msg.list.map((item, j) => (
									<li key={j}>
										<InlineContentRenderer content={item} />
									</li>
								))}
							</ul>
						)}
					</div>
				))}
			</CardContent>
		</Card>
	)
}
