import { createFileRoute } from "@tanstack/react-router"
import { DocsPage } from "@/components/docs"
import { recipesContent } from "@levitate/docs-content"

export const Route = createFileRoute("/docs/recipes")({
	component: RecipesPage,
})

function RecipesPage() {
	return <DocsPage content={recipesContent} />
}
