import { createFileRoute } from "@tanstack/react-router"
import { DocsPage } from "@/components/docs"
import { contentBySlug } from "@levitate/docs-content"

export const Route = createFileRoute("/docs/$slug")({
	component: DocsSlugPage,
})

function DocsSlugPage() {
	const { slug } = Route.useParams()
	const content = contentBySlug[slug]

	if (!content) {
		return (
			<div className="container py-12">
				<h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
				<p className="text-muted-foreground">
					No documentation found for "{slug}".
				</p>
			</div>
		)
	}

	return <DocsPage content={content} />
}
