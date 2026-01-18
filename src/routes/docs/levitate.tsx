import { createFileRoute } from "@tanstack/react-router"
import { DocsPage } from "@/components/docs"
import { levitateContent } from "@levitate/docs-content"

export const Route = createFileRoute("/docs/levitate")({
	component: LevitatePage,
})

function LevitatePage() {
	return <DocsPage content={levitateContent} />
}
