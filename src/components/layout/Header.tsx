import { GithubLogo } from "@phosphor-icons/react"
import { Link } from "@tanstack/react-router"

import { ThemeToggle } from "@/components/ThemeToggle"
import { buttonVariants } from "@/components/ui/button"

export function Header() {
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between px-4 md:px-6">
				<Link to="/" className="flex items-center gap-2">
					<span className="text-xl font-bold font-logo">LevitateOS</span>
				</Link>

				<nav className="hidden md:flex items-center gap-6">
					<Link
						to="/"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						Home
					</Link>
					<Link
						to="/download"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						Download
					</Link>
					<Link
						to="/docs/getting-started"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						Docs
					</Link>
					<Link
						to="/docs/recipes"
						className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
					>
						Recipes
					</Link>
				</nav>

				<div className="flex items-center gap-2">
					<ThemeToggle />
					<a
						href="https://github.com/LevitateOS/LevitateOS"
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({ variant: "ghost", size: "icon" })}
					>
						<GithubLogo className="h-5 w-5" />
						<span className="sr-only">GitHub</span>
					</a>
				</div>
			</div>
		</header>
	)
}
