import { createFileRoute } from "@tanstack/react-router"
import { DocsPage } from "@/components/docs"
import { gettingStartedContent } from "@levitate/docs-content"

export const Route = createFileRoute("/docs/getting-started")({
	component: GettingStartedPage,
})

function GettingStartedPage() {
	return <DocsPage content={gettingStartedContent} />
}
