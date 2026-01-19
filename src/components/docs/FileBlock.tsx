import { Check, Copy, File } from "@phosphor-icons/react"
import { useCopyToClipboard } from "usehooks-ts"
import { useState, useEffect } from "react"
import { highlightCode } from "@/lib/highlighter"
import type { FileBlock } from "@levitate/docs-content"

function inferLanguage(filename: string): string | undefined {
	const ext = filename.split(".").pop()?.toLowerCase()
	const langMap: Record<string, string> = {
		conf: "conf",
		json: "json",
		yaml: "yaml",
		yml: "yaml",
		toml: "toml",
		sh: "bash",
		bash: "bash",
		zsh: "bash",
		rhai: "rhai",
	}
	return langMap[ext || ""]
}

export function FileBlockRenderer({ file }: { file: FileBlock }) {
	const [copiedText, copy] = useCopyToClipboard()
	const hasCopied = copiedText === file.content
	const language = file.language || inferLanguage(file.filename)
	const [html, setHtml] = useState<string | null>(null)

	useEffect(() => {
		if (language) {
			highlightCode(file.content, language).then(setHtml)
		}
	}, [file.content, language])

	return (
		<div className="mb-4 rounded overflow-hidden ring-1 ring-foreground/10">
			<div className="flex items-center justify-between px-3 py-2 bg-muted text-xs text-muted-foreground">
				<div className="flex items-center gap-2">
					<File className="h-4 w-4" weight="fill" />
					<span className="font-mono">{file.filename}</span>
				</div>
				<div className="flex items-center gap-2">
					{language && <span>{language}</span>}
					<span className="text-muted-foreground/50">|</span>
					<button
						type="button"
						onClick={() => copy(file.content)}
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
					<code className="text-sm font-mono">{file.content}</code>
				</pre>
			)}
		</div>
	)
}
