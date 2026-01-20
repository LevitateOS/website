import { Check, Copy, File } from "@phosphor-icons/react"
import { useCopyToClipboard } from "usehooks-ts"
import { useState, useEffect } from "react"
import { highlightCode } from "@/lib/highlighter"

interface CodeBlockProps {
	children: string
	language?: string
	filename?: string
}

function inferLanguage(filename: string): string | undefined {
	const ext = filename.split(".").pop()?.toLowerCase()
	const langMap: Record<string, string> = {
		conf: "ini",
		json: "json",
		yaml: "yaml",
		yml: "yaml",
		toml: "toml",
		sh: "bash",
		bash: "bash",
		zsh: "bash",
		rhai: "rhai",
		ts: "typescript",
		tsx: "tsx",
		js: "javascript",
		jsx: "jsx",
		rs: "rust",
		py: "python",
		go: "go",
		md: "markdown",
	}
	return langMap[ext || ""]
}

export function CodeBlock({ children, language, filename }: CodeBlockProps) {
	const [copiedText, copy] = useCopyToClipboard()
	const hasCopied = copiedText === children
	const [html, setHtml] = useState<string | null>(null)

	// Resolve language: explicit > inferred from filename > undefined
	const resolvedLanguage = language || (filename ? inferLanguage(filename) : undefined)

	useEffect(() => {
		if (resolvedLanguage) {
			highlightCode(children, resolvedLanguage).then(setHtml)
		}
	}, [children, resolvedLanguage])

	// When filename is present, show file-style header
	if (filename) {
		return (
			<div className="mb-4 rounded overflow-hidden ring-1 ring-foreground/10">
				<div className="flex items-center justify-between px-3 py-2 bg-muted text-xs text-muted-foreground">
					<div className="flex items-center gap-2">
						<File className="h-4 w-4" weight="fill" />
						<span className="font-mono">{filename}</span>
					</div>
					<div className="flex items-center gap-2">
						{resolvedLanguage && <span>{resolvedLanguage}</span>}
						<span className="text-muted-foreground/50">|</span>
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
				</div>
				{html ? (
					<div
						dangerouslySetInnerHTML={{ __html: html }}
						className="bg-muted/30 [&>pre]:p-4 [&>pre]:overflow-x-auto [&>pre]:text-sm [&>pre]:font-mono"
					/>
				) : (
					<pre className="bg-muted/30 p-4 overflow-x-auto">
						<code className="text-sm font-mono">{children}</code>
					</pre>
				)}
			</div>
		)
	}

	// Standard code block without filename
	return (
		<div className="relative mb-4">
			<div className="absolute top-0 right-0 flex items-center gap-2 px-2 py-1 text-xs text-muted-foreground bg-muted rounded-bl z-10">
				{resolvedLanguage && <span>{resolvedLanguage}</span>}
				{resolvedLanguage && <span className="text-muted-foreground/50">|</span>}
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
