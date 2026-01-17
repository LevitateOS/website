import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { CodeBlock } from "@/components/CodeBlock";
import {
  Brain,
  Package,
  Desktop,
  Memory,
  Terminal,
  Code
} from "@phosphor-icons/react";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  return (
    <>
      <Hero />

      {/* Features Section */}
      <section className="container py-16 px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            icon={<Brain className="h-8 w-8" />}
            title="AI-Powered Installer"
            description="SmolLM3-3B runs locally. Chat naturally to partition disks, create users, and configure your system."
          >
            <div className="bg-muted/50 p-3 rounded-lg text-sm">
              <p className="text-muted-foreground mb-1">You:</p>
              <p>"use the whole 500gb drive"</p>
              <p className="text-muted-foreground mt-2 mb-1">Installer:</p>
              <p>"Creating GPT partition table on /dev/sda..."</p>
            </div>
          </FeatureCard>

          <FeatureCard
            icon={<Package className="h-8 w-8" />}
            title="S-Expression Recipes"
            description="LLM-friendly Lisp-like syntax. 30-line parser. Small models can generate packages reliably."
          >
            <CodeBlock language="lisp">{`(package "ripgrep" "14.1.0"
  (acquire (binary (x86_64 "URL")))
  (build (extract tar-gz))
  (install (to-bin "rg")))`}</CodeBlock>
          </FeatureCard>

          <FeatureCard
            icon={<Terminal className="h-8 w-8" />}
            title="levitate Package Manager"
            description="No apt, dnf, or pacman dependency. Full lifecycle from acquire to remove."
          >
            <CodeBlock language="bash">{`levitate install ripgrep
levitate deps firefox
levitate desktop  # Sway stack`}</CodeBlock>
          </FeatureCard>

          <FeatureCard
            icon={<Desktop className="h-8 w-8" />}
            title="Pure Wayland"
            description="Complete Sway compositor stack. 17 recipes including wlroots, foot, waybar, wofi. No X11."
          />

          <FeatureCard
            icon={<Memory className="h-8 w-8" />}
            title="musl + GNU"
            description="Unusual combo: lightweight musl libc (~1MB vs ~10MB glibc) with full GNU tools."
          />

          <FeatureCard
            icon={<Code className="h-8 w-8" />}
            title="Reference-Driven"
            description="vendor/ contains systemd, util-linux, brush shell references. Don't invent, copy what works."
          />
        </div>
      </section>

      {/* Installation Preview */}
      <section className="container py-16 px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Quick Start</h2>
        <div className="max-w-2xl mx-auto">
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
              <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                <p><span className="text-primary">You:</span> install to the 500gb drive with user vince</p>
                <p><span className="text-muted-foreground">AI:</span> I'll partition /dev/sda (500GB) with ext4 and create user "vince".</p>
                <p><span className="text-primary">You:</span> yes, make vince a sudo user</p>
                <p><span className="text-muted-foreground">AI:</span> Done. Rebooting into LevitateOS...</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4. Install the desktop</h3>
              <CodeBlock language="bash">{`levitate desktop`}</CodeBlock>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="container py-16 px-4 md:px-6">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Download</h2>
          <p className="text-muted-foreground mb-6">
            Requires x86_64, 4GB RAM, 20GB disk.
          </p>
          <div className="bg-card border rounded-lg p-6">
            <p className="text-lg font-semibold mb-2">LevitateOS 1.0</p>
            <p className="text-sm text-muted-foreground mb-4">
              Coming soon. Star the repo to get notified.
            </p>
            <a
              href="https://github.com/LevitateOS/LevitateOS"
              className="text-primary hover:underline"
            >
              github.com/LevitateOS/LevitateOS
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
