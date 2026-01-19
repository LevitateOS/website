import { createFileRoute } from "@tanstack/react-router"
import { DocsPage } from "@/components/docs"
import { cliReferenceContent } from "@levitate/docs-content"

export const Route = createFileRoute("/docs/cli-reference")({
	component: CliReferencePage,
})

function CliReferencePage() {
	return <DocsPage content={cliReferenceContent} />
}
