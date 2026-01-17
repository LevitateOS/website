interface CodeBlockProps {
	children: string
	language?: string
}

export function CodeBlock({ children, language }: CodeBlockProps) {
	return (
		<div className="relative">
			{language && (
				<div className="absolute top-0 right-0 px-2 py-1 text-xs text-muted-foreground bg-muted">
					{language}
				</div>
			)}
			<pre className="bg-muted p-4 overflow-x-auto text-sm">
				<code>{children}</code>
			</pre>
		</div>
	)
}
