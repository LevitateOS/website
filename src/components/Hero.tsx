import { DownloadSimple, GithubLogo } from "@phosphor-icons/react"
import { useTernaryDarkMode } from "usehooks-ts"

import { buttonVariants } from "@/components/ui/button"
import { useHasMounted } from "@/hooks/useHasMounted"

export function Hero() {
	const mounted = useHasMounted()
	const { isDarkMode } = useTernaryDarkMode()

	return (
		<section className="container flex flex-col items-center text-center py-16">
			{mounted ? (
				<img
					src={isDarkMode ? "/levitateos-dark.png" : "/levitateos-light.png"}
					alt="LevitateOS"
					className="h-64 w-auto rounded-br-[4rem]"
				/>
			) : (
				<picture>
					<source srcSet="/levitateos-dark.png" media="(prefers-color-scheme: dark)" />
					<img
						src="/levitateos-light.png"
						alt="LevitateOS"
						className="h-64 w-auto rounded-br-[4rem]"
					/>
				</picture>
			)}
			<p className="text-xl text-muted-foreground mb-6">Be your own package maintainer</p>

			<ul className="flex flex-col gap-1.5 text-left text-sm text-muted-foreground mb-8">
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
					Terminal first, like Arch
				</li>
			</ul>

			<div className="flex gap-6">
				<a href="/download" className={buttonVariants()}>
					<DownloadSimple data-icon="inline-start" />
					Download
				</a>
				<a
					href="https://github.com/LevitateOS/LevitateOS"
					target="_blank"
					rel="noopener noreferrer"
					className={buttonVariants({ variant: "outline" })}
				>
					<GithubLogo data-icon="inline-start" />
					GitHub
				</a>
			</div>
		</section>
	)
}
