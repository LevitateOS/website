function setCopyState(
	button: HTMLButtonElement,
	state: "idle" | "copied",
): void {
	const copyIcon = button.querySelector(".copy-icon")
	const checkIcon = button.querySelector(".check-icon")
	const copyText = button.querySelector(".copy-text")

	if (!(copyIcon && checkIcon && copyText)) {
		return
	}

	if (state === "copied") {
		copyIcon.classList.add("hidden")
		checkIcon.classList.remove("hidden")
		copyText.textContent = "COPIED"
		return
	}

	copyIcon.classList.remove("hidden")
	checkIcon.classList.add("hidden")
	copyText.textContent = "COPY"
}

function bindCopyButton(button: HTMLButtonElement): void {
	if (button.dataset.copyBound === "1") {
		return
	}

	button.dataset.copyBound = "1"
	button.addEventListener("click", async () => {
		const code = button.dataset.code
		if (!code) return

		await navigator.clipboard.writeText(code)
		setCopyState(button, "copied")
		setTimeout(() => {
			setCopyState(button, "idle")
		}, 600)
	})
}

export function bindCopyButtons(selector: string): void {
	document
		.querySelectorAll<HTMLButtonElement>(selector)
		.forEach(bindCopyButton)
}
