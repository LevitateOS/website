import { Button } from "@/components/ui/button";
import { GithubLogo, DownloadSimple } from "@phosphor-icons/react";

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-6 py-16 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight">
          <span className="text-primary">LevitateOS</span>
        </h1>
        <p className="text-lg text-muted-foreground">
          Be your own package maintainer
        </p>
      </div>

      <ul className="flex flex-col gap-1.5 text-left text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <span className="text-primary">+</span>
          Write simple recipes, build your own packages
        </li>
        <li className="flex items-center gap-2">
          <span className="text-primary">+</span>
          No waiting for upstream maintainers
        </li>
        <li className="flex items-center gap-2">
          <span className="text-primary">+</span>
          Optional LLM assists with maintenance
        </li>
        <li className="flex items-center gap-2">
          <span className="text-primary">+</span>
          Pure Wayland desktop (Sway)
        </li>
      </ul>

      <div className="flex gap-3">
        <Button asChild>
          <a href="/download">
            <DownloadSimple className="mr-2 h-4 w-4" />
            Download
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="https://github.com/LevitateOS/LevitateOS" target="_blank" rel="noopener noreferrer">
            <GithubLogo className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </Button>
      </div>
    </section>
  );
}
