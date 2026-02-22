import type { DocsSyntaxLanguage } from "@levitate/docs-content"

const docsToAstroLanguage: Record<DocsSyntaxLanguage, string> = {
	bash: "bash",
	rust: "rust",
	rhai: "rust",
	toml: "toml",
	text: "text",
}

export function mapDocsSyntaxToAstro(language: string): string {
	if (Object.hasOwn(docsToAstroLanguage, language)) {
		return docsToAstroLanguage[language as DocsSyntaxLanguage]
	}

	return language
}
