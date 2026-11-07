/** The id a docs section heading gets, shared by the page and its navigation. */
export function toAnchor(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
}
