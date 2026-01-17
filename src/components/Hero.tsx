import { CaretDown, Check, DownloadSimple, GithubLogo } from "@phosphor-icons/react"
import { useTernaryDarkMode } from "usehooks-ts"

import { CodeBlock } from "@/components/CodeBlock"
import { buttonVariants } from "@/components/ui/button"
import { useHasMounted } from "@/hooks/useHasMounted"

const features = [
	"Write simple recipes, build your own packages",
	"No waiting for upstream maintainers",
	"Optional LLM assists with maintenance",
	"Terminal first, like Arch",
]

export function Hero() {
	const mounted = useHasMounted()
	const { isDarkMode } = useTernaryDarkMode()

	return (
		<section className="relative min-h-[80vh] flex flex-col items-center justify-center text-center py-16 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent">
			<div className="container flex flex-col items-center">
				{/* Logo */}
				<div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
					{mounted ? (
						<img
							src={isDarkMode ? "/levitateos-dark.png" : "/levitateos-light.png"}
							alt="LevitateOS"
							className="h-80 w-auto"
						/>
					) : (
						<picture>
							<source srcSet="/levitateos-dark.png" media="(prefers-color-scheme: dark)" />
							<img
								src="/levitateos-light.png"
								alt="LevitateOS"
								className="h-80 w-auto"
							/>
						</picture>
					)}
				</div>

				{/* Headline */}
				<h1 className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-backwards mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
					Be your own
					<br />
					<span className="text-primary">package maintainer</span>
				</h1>

				{/* Subheadline */}
				<p className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-backwards mt-4 text-lg text-muted-foreground max-w-xl">
					A Linux distribution where you control your packages. Write recipes, build from source, and never wait for upstream again.
				</p>

				{/* Terminal Preview */}
				<div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-backwards mt-8 w-full max-w-md text-left">
					<CodeBlock language="bash">{`$ recipe install ripgrep
Installing ripgrep@14.1.0...
Done in 2.3s`}</CodeBlock>
				</div>

				{/* Features Grid */}
				<div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 fill-mode-backwards mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg">
					{features.map((feature) => (
						<div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
							<Check className="w-4 h-4 text-primary flex-shrink-0" weight="bold" />
							{feature}
						</div>
					))}
				</div>

				{/* CTAs */}
				<div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-backwards mt-8 flex flex-col sm:flex-row gap-4">
					<a
						href="/download"
						className={buttonVariants({ size: "lg", className: "px-8 py-6 text-base" })}
					>
						<DownloadSimple data-icon="inline-start" weight="bold" />
						Download
					</a>
					<a
						href="https://github.com/LevitateOS/LevitateOS"
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({ variant: "outline", size: "lg", className: "px-8 py-6 text-base" })}
					>
						<GithubLogo data-icon="inline-start" weight="bold" />
						GitHub
					</a>
				</div>
			</div>

			{/* Scroll Indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
				<CaretDown className="w-6 h-6 text-muted-foreground/50" weight="bold" />
			</div>
		</section>
	)
}
