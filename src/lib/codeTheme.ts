import tokens from "../styles/field-notes/tokens.json"

// Syntax colors for code blocks, taken from the Field Notes code tokens. Code sits on
// the forest code field in both themes, so one theme serves light and dark.
const code = tokens.theme.light

export const fieldNotesCodeTheme = {
	name: "field-notes",
	type: "dark" as const,
	colors: {
		"editor.background": code["code-bg"],
		"editor.foreground": code["code-text"],
	},
	settings: [
		{ settings: { foreground: code["code-text"] } },
		{ scope: ["comment", "punctuation.definition.comment"], settings: { foreground: code["code-comment"] } },
		{
			scope: ["keyword", "storage", "storage.type", "storage.modifier", "keyword.control", "keyword.operator.new", "constant.language"],
			settings: { foreground: code["code-keyword"] },
		},
		{
			scope: ["string", "string.quoted", "constant.numeric", "constant.character", "markup.inline.raw"],
			settings: { foreground: code["code-string"] },
		},
	],
}
