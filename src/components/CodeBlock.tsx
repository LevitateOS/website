import { Check, Copy } from "@phosphor-icons/react"
import { useCopyToClipboard } from "usehooks-ts"
import { useState, useEffect } from "react"
import { highlightCode } from "@/lib/highlighter"

interface CodeBlockProps {
	children: string
	language?: string
}

export function CodeBlock({ children, language }: CodeBlockProps) {
	const [copiedText, copy] = useCopyToClipboard()
	const hasCopied = copiedText === children
	const [html, setHtml] = useState<string | null>(null)

	useEffect(() => {
		if (language) {
			highlightCode(children, language).then(setHtml)
		}
	}, [children, language])

	return (
		<div className="relative mb-4">
			<div className="absolute top-0 right-0 flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground bg-muted rounded-bl z-10">
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
			{html ? (
				<div
					dangerouslySetInnerHTML={{ __html: html }}
					className="bg-muted rounded [&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:text-sm"
				/>
			) : (
				<pre className="bg-muted p-4 overflow-x-auto text-sm rounded">
					<code>{children}</code>
				</pre>
			)}
		</div>
	)
}
