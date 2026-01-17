import { Link } from "@tanstack/react-router"

export function Footer() {
	return (
		<footer className="border-t bg-muted/40">
			<div className="container flex flex-col gap-4 py-10 md:flex-row md:justify-between md:gap-0 px-4 md:px-6">
				<div className="flex flex-col gap-2">
					<span className="text-lg font-semibold">LevitateOS</span>
					<p className="text-sm text-muted-foreground">Be your own package maintainer.</p>
				</div>

				<div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
					<div className="flex flex-col gap-2">
						<span className="font-medium">Documentation</span>
						<Link
							to="/docs/install"
							className="text-sm text-muted-foreground hover:text-foreground"
						>
							Installation
						</Link>
						<Link
							to="/docs/recipes"
							className="text-sm text-muted-foreground hover:text-foreground"
						>
							Recipes
						</Link>
						<Link
							to="/docs/levitate"
							className="text-sm text-muted-foreground hover:text-foreground"
						>
							CLI Reference
						</Link>
					</div>

					<div className="flex flex-col gap-2">
						<span className="font-medium">Community</span>
						<a
							href="https://github.com/LevitateOS/LevitateOS"
							className="text-sm text-muted-foreground hover:text-foreground"
						>
							GitHub
						</a>
						<a
							href="https://github.com/LevitateOS/LevitateOS/issues"
							className="text-sm text-muted-foreground hover:text-foreground"
						>
							Issues
						</a>
					</div>

					<div className="flex flex-col gap-2">
						<span className="font-medium">Legal</span>
						<a
							href="https://github.com/LevitateOS/LevitateOS/blob/master/LICENSE"
							className="text-sm text-muted-foreground hover:text-foreground"
						>
							License (LGPL-2.1)
						</a>
					</div>
				</div>
			</div>

			<div className="container border-t py-4 px-4 md:px-6">
				<p className="text-center text-sm text-muted-foreground">
					&copy; {new Date().getFullYear()} LevitateOS. Built with Rust.
				</p>
			</div>
		</footer>
	)
}
