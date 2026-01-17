import { DocsSidebar } from "./DocsSidebar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="container flex gap-6 py-8">
      <DocsSidebar />
      <article className="flex-1 min-w-0 prose prose-sm prose-invert prose-headings:font-semibold prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-pre:bg-muted">
        {children}
      </article>
    </div>
  );
}
