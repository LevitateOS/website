import { Link, useRouterState } from "@tanstack/react-router"
import { docsNav } from "@levitate/docs-content"

export function DocsSidebar() {
	const router = useRouterState()
	const currentPath = router.location.pathname

	return (
		<aside className="hidden md:block w-48 shrink-0">
			<nav className="sticky top-20 space-y-4">
				{docsNav.map((section) => (
					<div key={section.title}>
						<h3 className="font-semibold mb-2">{section.title}</h3>
						<ul className="space-y-1">
							{section.items.map((item) => (
								<li key={item.href}>
									<Link
										to={item.href}
										className={`block px-3 py-1.5 text-sm transition-colors ${
											currentPath === item.href
												? "bg-primary text-primary-foreground"
												: "text-muted-foreground hover:bg-muted hover:text-foreground"
										}`}
									>
										{item.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</nav>
		</aside>
	)
}
