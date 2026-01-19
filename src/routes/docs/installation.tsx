import { createFileRoute } from "@tanstack/react-router"
import { DocsPage } from "@/components/docs"
import { installationContent } from "@levitate/docs-content"

export const Route = createFileRoute("/docs/installation")({
	component: InstallationPage,
})

function InstallationPage() {
	return <DocsPage content={installationContent} />
}
