import { Check, Copy } from "@phosphor-icons/react"
import { useCopyToClipboard } from "usehooks-ts"
import { useState, useEffect } from "react"
import { highlightCode } from "@/lib/highlighter"
import type { CommandBlock } from "@levitate/docs-content"

export function CommandBlockRenderer({ block }: { block: CommandBlock }) {
	// Normalize command to string (join array with newlines)
	const commandText = Array.isArray(block.command)
		? block.command.join("\n")
		: block.command

	const [copiedText, copy] = useCopyToClipboard()
	const hasCopied = copiedText === commandText
	const [html, setHtml] = useState<string | null>(null)

	useEffect(() => {
		highlightCode(commandText, "bash").then(setHtml)
	}, [commandText])

	return (
		<div className="mb-4">
			<div className="bg-muted rounded text-sm overflow-hidden">
				<div className="text-muted-foreground px-4 py-2 border-b border-foreground/10">{block.description}</div>
				<div className="relative p-4">
					<div className="absolute top-0 right-0 flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground">
						<span>bash</span>
						<span className="text-muted-foreground/50">|</span>
						<button
							type="button"
							onClick={() => copy(commandText)}
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
					{html ? (
						<div
							dangerouslySetInnerHTML={{ __html: html }}
							className="[&>pre]:p-0 [&>pre]:overflow-x-auto"
						/>
					) : (
						<code>{commandText}</code>
					)}
				</div>
				{block.output && (
					<div className="bg-background/50 px-4 py-3 border-t border-dashed border-foreground/10">
						<pre className="text-muted-foreground/60 text-xs overflow-x-auto">{block.output}</pre>
					</div>
				)}
			</div>
		</div>
	)
}
