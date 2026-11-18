// The shape of one release's notes. Text is plain; `code` between backticks is shown as code.
export interface ReleaseNotes {
	os: "levitateos" | "acornos"
	version: string
	/** What the release is, in order: independence first, then where its userland comes from. */
	what: string[]
	/** What is in the ISO. */
	contents: string[]
	/** The installation, step by step. */
	install: string[]
	/** What was run, and where. */
	tested: string[]
	/** What this release lacks. Shown here and on the download page. */
	limits: string[]
}
