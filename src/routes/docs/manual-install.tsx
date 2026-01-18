import { createFileRoute } from "@tanstack/react-router"
import { DocsPage } from "@/components/docs"
import { manualInstallContent } from "@levitate/docs-content"

export const Route = createFileRoute("/docs/manual-install")({
	component: ManualInstallPage,
})

function ManualInstallPage() {
	return <DocsPage content={manualInstallContent} />
}
