import { createFileRoute } from "@tanstack/react-router"
import { DocsPage } from "@/components/docs"
import { installContent } from "@levitate/docs-content"

export const Route = createFileRoute("/docs/install")({
	component: InstallPage,
})

function InstallPage() {
	return <DocsPage content={installContent} />
}
