import { useState } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { docsNav, contentBySlug } from "@levitate/docs-content"
import { ScrollArea } from "@/components/ui/scroll-area"

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
	const [collapsed, setCollapsed] = useState(false)

	return (
		<aside className="hidden md:block w-48 shrink-0 sticky top-20 h-[calc(100vh-6rem)]">
			<ScrollArea className="h-full">
				<nav className="space-y-4 pr-4">
					{docsNav.map((section) => (
					<div key={section.title}>
						<h3 className="font-semibold mb-2">{section.title}</h3>
						<ul className="space-y-1">
							{section.items.map((item) => {
								const isActive = currentPath === item.href
								const slug = item.href.replace("/docs/", "")
								const content = contentBySlug[slug]
								const sections = content?.sections || []
								const showSections = isActive && !collapsed && sections.length > 0

								return (
									<li key={item.href}>
										<Link
											to={item.href}
											onClick={(e) => {
												if (isActive) {
													e.preventDefault()
													setCollapsed(!collapsed)
												} else {
													setCollapsed(false)
												}
											}}
											className={`block px-3 py-1.5 text-sm transition-colors ${
												isActive
													? "bg-primary text-primary-foreground"
													: "text-muted-foreground hover:bg-muted hover:text-foreground"
											}`}
										>
											{item.title}
										</Link>
										{showSections && (
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
			</ScrollArea>
		</aside>
	)
}
