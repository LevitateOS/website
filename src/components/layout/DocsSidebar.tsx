import { Link, useRouterState } from "@tanstack/react-router"
import { docsNav, contentBySlug } from "@levitate/docs-content"

/** Convert title to anchor slug */
function toAnchor(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-")
}

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
							{section.items.map((item) => {
								const isActive = currentPath === item.href
								const slug = item.href.replace("/docs/", "")
								const content = contentBySlug[slug]
								const sections = content?.sections || []

								return (
									<li key={item.href}>
										<Link
											to={item.href}
											className={`block px-3 py-1.5 text-sm transition-colors ${
												isActive
													? "bg-primary text-primary-foreground"
													: "text-muted-foreground hover:bg-muted hover:text-foreground"
											}`}
										>
											{item.title}
										</Link>
										{isActive && sections.length > 0 && (
											<ul className="mt-1 ml-3 border-l border-border space-y-0.5">
												{sections.map((s) => (
													<li key={s.title}>
														<a
															href={`#${toAnchor(s.title)}`}
															className={`block px-3 py-1 text-xs transition-colors text-muted-foreground hover:text-foreground ${
																s.level === 3 ? "pl-6" : ""
															}`}
														>
															{s.title}
														</a>
													</li>
												))}
											</ul>
										)}
									</li>
								)
							})}
						</ul>
					</div>
				))}
			</nav>
		</aside>
	)
}
