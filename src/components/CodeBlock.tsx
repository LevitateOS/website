import { Check, Copy } from "@phosphor-icons/react"
import { useCopyToClipboard } from "usehooks-ts"

interface CodeBlockProps {
	children: string
	language?: string
}

export function CodeBlock({ children, language }: CodeBlockProps) {
	const [copiedText, copy] = useCopyToClipboard()
	const hasCopied = copiedText === children

	return (
		<div className="relative">
			<div className="absolute top-0 right-0 flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground bg-muted rounded-bl">
				{language && <span>{language}</span>}
				{language && <span className="text-muted-foreground/50">|</span>}
				<button
					type="button"
					onClick={() => copy(children)}
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
			<pre className="bg-muted p-4 pt-8 overflow-x-auto text-sm rounded">
				<code>{children}</code>
			</pre>
		</div>
	)
}
