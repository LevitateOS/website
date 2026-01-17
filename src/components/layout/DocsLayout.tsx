import { DocsSidebar } from "./DocsSidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="container flex gap-8 py-8 px-4 md:px-6">
      <DocsSidebar />
      <article className="flex-1 max-w-3xl prose prose-invert prose-headings:font-semibold prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted">
        {children}
      </article>
    </div>
  );
}
