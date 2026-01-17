import { useEffect } from "react"
import { Moon, Sun } from "@phosphor-icons/react"
import { useTernaryDarkMode } from "usehooks-ts"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
	const { isDarkMode, toggleTernaryDarkMode } = useTernaryDarkMode()

	useEffect(() => {
		document.documentElement.classList.toggle("dark", isDarkMode)
	}, [isDarkMode])

	return (
		<Button variant="ghost" size="icon" onClick={toggleTernaryDarkMode}>
			{isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
