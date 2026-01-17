import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { CodeBlock } from "@/components/CodeBlock";
import {
  Package,
  Terminal,
  Brain,
  Desktop,
  Memory
} from "@phosphor-icons/react";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <>
      <Hero />

      {/* Features Section */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
        <div className="grid gap-4 grid-cols-2">
          <FeatureCard
            icon={<Package className="h-8 w-8" />}
            title="Your Own Packages"
            description="Write simple S-expression recipes. Be the maintainer. No waiting for upstream repos."
          >
            <CodeBlock language="lisp">{`(package "ripgrep" "14.1.0"
  (acquire (binary (x86_64 "URL")))
  (build (extract tar-gz))
  (install (to-bin "rg")))`}</CodeBlock>
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
            icon={<Terminal className="h-8 w-8" />}
            title="Natural Language Installer"
            description="Just tell it what you want. 'Install to the 500GB drive with user vince' — no memorizing partition commands."
          />

          <FeatureCard
            icon={<Memory className="h-8 w-8" />}
            title="Choose Your Stack"
            description="Standard (systemd + glibc) for compatibility, or Minimal (runit + musl) for a lighter footprint. Your call."
          />

          <FeatureCard
            icon={<Desktop className="h-8 w-8" />}
            title="Terminal First"
            description="Boots to a login prompt, like Arch. No desktop preinstalled. Install one if you want, or don't."
          />
        </div>
      </section>

      {/* Local LLM Section */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Local LLM: SmolLM3</h2>
        <p className="text-muted-foreground text-center mb-8">
          Optional AI assistant powered by SmolLM3 from Hugging Face. Runs entirely on your machine.
        </p>

        <div className="grid gap-6 grid-cols-2 mb-8">
          <div className="bg-card border p-4">
            <h3 className="font-semibold mb-2">Installer LoRA</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Focused on installation. Understands your hardware and generates the right commands to partition, format, and install LevitateOS.
            </p>
            <div className="bg-muted/50 p-3 text-sm">
              <p className="text-muted-foreground mb-1">You:</p>
              <p>"install to the nvme drive, use ext4, create user vince"</p>
              <p className="text-muted-foreground mt-2 mb-1">Installer:</p>
              <p className="text-primary">Runs: parted, mkfs.ext4, pacstrap...</p>
            </div>
          </div>

          <div className="bg-card border p-4">
            <h3 className="font-semibold mb-2">Recipe LoRA</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Sandboxed to the recipes folder. Can only create and edit .recipe files. Cannot run commands or access anything else.
            </p>
            <div className="bg-muted/50 p-3 text-sm">
              <p className="text-muted-foreground mb-1">You:</p>
              <p>"create a recipe for htop"</p>
              <p className="text-muted-foreground mt-2 mb-1">Recipe:</p>
              <p className="text-primary">Writes: /recipes/htop.recipe</p>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 border p-4">
          <h3 className="font-semibold mb-3">This is NOT Windows Copilot</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-2">What it is:</p>
              <ul className="space-y-1">
                <li>+ Local model (no cloud, no telemetry)</li>
                <li>+ Two specialized LoRAs for specific tasks</li>
                <li>+ Recipe LoRA is fully sandboxed</li>
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
      <section className="container py-12">
        <h2 className="text-2xl font-bold text-center mb-8">Quick Start</h2>
        <div>
          <div className="space-y-4">
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
              <h3 className="font-semibold mb-2">3. Chat with the installer</h3>
              <div className="bg-muted/50 p-4 space-y-2 text-sm">
                <p><span className="text-primary">You:</span> install to the 500gb drive with user vince</p>
                <p><span className="text-muted-foreground">AI:</span> I'll partition /dev/sda (500GB) with ext4 and create user "vince".</p>
                <p><span className="text-primary">You:</span> yes, make vince a sudo user</p>
                <p><span className="text-muted-foreground">AI:</span> Done. Rebooting into LevitateOS...</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4. You're done</h3>
              <CodeBlock language="bash">{`# You're at a terminal. Install packages as needed:
recipe install ripgrep fd`}</CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="container py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-3">Download</h2>
          <p className="text-sm text-muted-foreground mb-4">
            x86_64, 2GB+ RAM, 10GB+ disk
          </p>
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
  );
}
