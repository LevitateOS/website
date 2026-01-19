import { createFileRoute } from "@tanstack/react-router"
import { DocsPage } from "@/components/docs"
import { helperFunctionsContent } from "@levitate/docs-content"

export const Route = createFileRoute("/docs/helper-functions")({
	component: HelperFunctionsPage,
})

function HelperFunctionsPage() {
	return <DocsPage content={helperFunctionsContent} />
}
