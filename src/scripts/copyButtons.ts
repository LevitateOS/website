// Copy buttons on code blocks: say "Copied" only after the clipboard accepted the
// text, and "Copy failed" otherwise (the code stays selectable). A shared live region
// announces the result.

function announce(message: string): void {
	let region = document.getElementById("copy-status")
	if (!region) {
		region = document.createElement("p")
		region.id = "copy-status"
		region.className = "sr-only"
		region.setAttribute("aria-live", "polite")
		document.body.append(region)
	}
	region.textContent = message
}

function bindCopyButton(button: HTMLButtonElement): void {
	if (button.dataset.copyBound === "1") return
	button.dataset.copyBound = "1"

	let reset: number | undefined
	button.addEventListener("click", async () => {
		const code = button.dataset.code ?? ""
		window.clearTimeout(reset)
		try {
			await navigator.clipboard.writeText(code)
			button.textContent = "Copied"
			announce("Code copied.")
		} catch {
			button.textContent = "Copy failed"
			announce("Copy failed. Select the code and copy it manually.")
		}
		reset = window.setTimeout(() => {
			button.textContent = "Copy"
		}, 2000)
	})
}

export function bindCopyButtons(selector = ".copy-button"): void {
	document.querySelectorAll<HTMLButtonElement>(selector).forEach(bindCopyButton)
}
