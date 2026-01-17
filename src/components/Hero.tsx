import { Button } from "@/components/ui/button";
import { GithubLogo, DownloadSimple } from "@phosphor-icons/react";

export function Hero() {
  return (
    <section className="container flex flex-col items-center gap-8 py-20 md:py-32 px-4 md:px-6 text-center">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="text-primary">LevitateOS</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-[700px]">
          The first Linux with an AI-powered installer
        </p>
      </div>

      <ul className="flex flex-col gap-2 text-left text-muted-foreground">
        <li className="flex items-center gap-2">
          <span className="text-primary">•</span>
          Chat with your installer in natural language
        </li>
        <li className="flex items-center gap-2">
          <span className="text-primary">•</span>
          Self-sufficient package manager (no apt/dnf/pacman)
        </li>
        <li className="flex items-center gap-2">
          <span className="text-primary">•</span>
          Pure Wayland desktop, no X11 bloat
        </li>
        <li className="flex items-center gap-2">
          <span className="text-primary">•</span>
          Lightweight musl-based system
        </li>
      </ul>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" asChild>
          <a href="#download">
            <DownloadSimple className="mr-2 h-5 w-5" />
            Download ISO
          </a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="https://github.com/LevitateOS/LevitateOS" target="_blank" rel="noopener noreferrer">
            <GithubLogo className="mr-2 h-5 w-5" />
            View on GitHub
          </a>
        </Button>
      </div>
    </section>
  );
}
