import { Card, CardContent } from "@/components/ui/card"

interface Message {
	role: "user" | "assistant"
	text: string
	highlight?: boolean
}

interface ChatMessageProps {
	messages: Message[]
}

export function ChatMessage({ messages }: ChatMessageProps) {
	return (
		<Card>
			<CardContent className="p-3 space-y-2 text-sm">
				{messages.map((msg, i) => (
					<div key={i}>
						<span
							className={
								msg.role === "user"
									? "text-muted-foreground"
									: "text-muted-foreground"
							}
						>
							{msg.role === "user" ? "You:" : "Assistant:"}
						</span>
						<span className={msg.highlight ? "text-primary ml-2" : "ml-2"}>
							{msg.text}
						</span>
					</div>
				))}
			</CardContent>
		</Card>
	)
}
