import { createFileRoute } from "@tanstack/react-router"
import { DocsPage } from "@/components/docs"
import { recipeFormatContent } from "@levitate/docs-content"

export const Route = createFileRoute("/docs/recipe-format")({
	component: RecipeFormatPage,
})

function RecipeFormatPage() {
	return <DocsPage content={recipeFormatContent} />
}
