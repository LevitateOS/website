import { createFileRoute } from "@tanstack/react-router"
import { Brain, Desktop, Package, Terminal } from "@phosphor-icons/react"
import { Hero } from "@/components/Hero"
import { FeatureCard } from "@/components/FeatureCard"
import { CodeBlock } from "@/components/CodeBlock"

export const Route = createFileRoute("/")({ component: HomePage })

function HomePage() {
	return (
		<>
			<Hero />

			{/* Features Section */}
			<section className="container py-16">
				<h2 className="text-2xl font-bold text-center mb-8">Features</h2>
				<div className="grid gap-6 grid-cols-2">
					<FeatureCard
						icon={<Package className="h-8 w-8" />}
						title="Your Own Packages"
						description="Write simple Rhai recipes. Be the maintainer. No waiting for upstream repos."
					>
						<CodeBlock language="rhai">{`let name = "ripgrep";
let version = "14.1.0";

fn acquire() {
    download_bin("rg", ARCH);
}

fn install() {
    install_bin("rg");
}`}</CodeBlock>
					</FeatureCard>

					<FeatureCard
						icon={<Terminal className="h-8 w-8" />}
						title="recipe Package Manager"
						description="No apt, dnf, or pacman dependency. Full lifecycle from acquire to remove."
					>
						<CodeBlock language="bash">{`recipe install ripgrep
recipe deps firefox
recipe remove ripgrep`}</CodeBlock>
					</FeatureCard>

					<FeatureCard
						icon={<Brain className="h-8 w-8" />}
						title="SmolLM3 Recipe Assistant"
						description="Optional local LLM (SmolLM3 from Hugging Face) helps draft recipes, suggest updates, and debug builds. Runs entirely on your machine."
					>
						<div className="bg-muted/50 p-3 text-sm">
							<p className="text-muted-foreground mb-1">You:</p>
							<p>"create a recipe for ripgrep"</p>
							<p className="text-muted-foreground mt-2 mb-1">SmolLM3:</p>
							<p>"Here's a recipe using the latest binary release..."</p>
						</div>
					</FeatureCard>



					<FeatureCard
						icon={<Desktop className="h-8 w-8" />}
						title="Terminal First"
						description="Boots to a login prompt, like Arch. No desktop preinstalled. Install one if you want, or don't."
					/>
				</div>
			</section>

			{/* Local LLM Section */}
			<section className="container py-16">
				<h2 className="text-2xl font-bold text-center mb-8">Recipe Assistant</h2>
				<p className="text-muted-foreground text-center mb-8">
					Optional local LLM helps write and maintain recipes. Runs entirely on your machine.
				</p>

				<div className="bg-card border p-4 mb-8 max-w-lg mx-auto">
					<h3 className="font-semibold mb-2">Recipe LoRA</h3>
					<p className="text-sm text-muted-foreground mb-3">
						Sandboxed to the recipes folder. Can only create and edit .rhai recipe files. Cannot run
						commands or access anything else.
					</p>
					<div className="bg-muted/50 p-3 text-sm">
						<p className="text-muted-foreground mb-1">You:</p>
						<p>"create a recipe for htop"</p>
						<p className="text-muted-foreground mt-2 mb-1">Assistant:</p>
						<p className="text-primary">Writes: /recipes/htop.rhai</p>
					</div>
				</div>

				<div className="bg-muted/50 border p-4">
					<h3 className="font-semibold mb-3">This is NOT Windows Copilot</h3>
					<div className="grid grid-cols-2 gap-6 text-sm">
						<div>
							<p className="text-muted-foreground mb-2">What it is:</p>
							<ul className="space-y-1">
								<li>+ Local model (no cloud, no telemetry)</li>
								<li>+ Specialized for recipe writing</li>
								<li>+ Fully sandboxed to recipes folder</li>
								<li>+ Automated package maintainer</li>
							</ul>
						</div>
						<div>
							<p className="text-muted-foreground mb-2">What it isn't:</p>
							<ul className="space-y-1">
								<li>- Not a general assistant</li>
								<li>- Not watching your activity</li>
								<li>- Not sending data anywhere</li>
								<li>- Not integrated into the whole OS</li>
							</ul>
						</div>
					</div>
				</div>
			</section>

			{/* Installation Preview */}
			<section className="container py-16">
				<h2 className="text-2xl font-bold text-center mb-8">Quick Start</h2>
				<div className="space-y-6">
					<div>
						<h3 className="font-semibold mb-2">1. Download the ISO</h3>
						<CodeBlock language="bash">{`curl -LO https://releases.levitateos.org/latest/LevitateOS.iso
sha256sum -c SHA256SUMS`}</CodeBlock>
					</div>
					<div>
						<h3 className="font-semibold mb-2">2. Boot (USB or VM)</h3>
						<CodeBlock language="bash">{`# USB
sudo dd if=LevitateOS.iso of=/dev/sdX bs=4M status=progress

# QEMU
qemu-system-x86_64 -m 4G -enable-kvm -cdrom LevitateOS.iso`}</CodeBlock>
					</div>
					<div>
						<h3 className="font-semibold mb-2">3. Install</h3>
						<CodeBlock language="bash">{`# Partition, format, and install the base system
# See docs/installation for full guide
recipe bootstrap /dev/sda`}</CodeBlock>
					</div>
					<div>
						<h3 className="font-semibold mb-2">4. You're done</h3>
						<CodeBlock language="bash">{`# You're at a terminal. Install packages:
recipe install ripgrep fd htop`}</CodeBlock>
					</div>
				</div>
			</section>

			{/* Download Section */}
			<section id="download" className="container py-16">
				<div className="text-center">
					<h2 className="text-2xl font-bold mb-3">Download</h2>
					<p className="text-sm text-muted-foreground mb-4">x86_64, 2GB+ RAM, 10GB+ disk</p>
					<div className="bg-card border p-4 inline-block">
						<p className="font-semibold mb-1">LevitateOS 1.0</p>
						<p className="text-sm text-muted-foreground mb-3">
							Coming soon. Star the repo to get notified.
						</p>
						<a
							href="https://github.com/LevitateOS/LevitateOS"
							className="text-primary hover:underline text-sm"
						>
							github.com/LevitateOS/LevitateOS
						</a>
					</div>
				</div>
			</section>
		</>
	)
}
