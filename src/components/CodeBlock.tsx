import { useCopyToClipboard } from "@levitate/docs-content"

interface CodeBlockProps {
	children: string
	language?: string
}

export function CodeBlock({ children, language }: CodeBlockProps) {
	const { copied, copy } = useCopyToClipboard()

	return (
		<div className="relative group">
			<div className="absolute top-0 right-0 px-2 py-1 text-xs text-muted-foreground bg-muted/80 flex items-center gap-2">
				{language && <span>{language}</span>}
				{language && <span className="text-muted-foreground/50">|</span>}
				<button
					onClick={() => copy(children)}
					className="hover:text-foreground transition-colors"
				>
					{copied ? "copied!" : "copy"}
				</button>
			</div>
			<pre className="bg-muted p-4 pt-8 overflow-x-auto text-sm">
				<code>{children}</code>
			</pre>
		</div>
	)
}
