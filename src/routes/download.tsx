import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Download, Robot, Terminal, Cpu, Package } from "@phosphor-icons/react";

export const Route = createFileRoute("/download")({ component: DownloadPage });

interface VariantCardProps {
  title: string;
  stack: string;
  description: string;
  features: string[];
  hasLLM: boolean;
  available: boolean;
  downloadUrl?: string;
}

function VariantCard({ title, stack, description, features, hasLLM, available, downloadUrl }: VariantCardProps) {
  return (
    <div className="bg-card border rounded-lg p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        {hasLLM ? (
          <Robot className="h-6 w-6 text-primary" />
        ) : (
          <Terminal className="h-6 w-6 text-muted-foreground" />
        )}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>

      <p className="text-sm font-mono text-muted-foreground mb-3">{stack}</p>
      <p className="text-muted-foreground mb-4">{description}</p>

      <ul className="space-y-1 text-sm mb-6 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="text-primary">+</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {available ? (
        <a
          href={downloadUrl}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Download className="h-4 w-4" />
          Download ISO
        </a>
      ) : (
        <span className="inline-flex items-center justify-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-md">
          Coming Soon
        </span>
      )}
    </div>
  );
}

function DownloadPage() {
  return (
    <div className="container py-16 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Download LevitateOS</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Choose your variant based on your init system preference and whether you want the LLM assistant.
        </p>

        {/* Variant explanation */}
        <div className="bg-muted/50 rounded-lg p-6 mb-12">
          <h2 className="text-lg font-semibold mb-4">Understanding the Variants</h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <Cpu className="h-4 w-4" />
                Init System
              </h3>
              <ul className="space-y-1 text-muted-foreground">
                <li><strong>systemd + glibc:</strong> Traditional, maximum compatibility</li>
                <li><strong>runit + musl:</strong> Minimal, lightweight, static-friendly</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium flex items-center gap-2 mb-2">
                <Robot className="h-4 w-4" />
                LLM Assistant
              </h3>
              <ul className="space-y-1 text-muted-foreground">
                <li><strong>With LLM:</strong> Natural language installer, recipe helper</li>
                <li><strong>Without LLM:</strong> Manual install, smaller download</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Variant cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <VariantCard
            title="Standard"
            stack="systemd + glibc + GNU coreutils"
            description="Traditional Linux stack. Maximum software compatibility."
            features={[
              "systemd service management",
              "glibc for broad compatibility",
              "Full GNU coreutils",
              "Manual installation",
            ]}
            hasLLM={false}
            available={false}
          />

          <VariantCard
            title="Standard + LLM"
            stack="systemd + glibc + GNU coreutils + SmolLM3"
            description="Traditional stack with AI-powered installer and recipe assistant."
            features={[
              "Everything in Standard",
              "Natural language installer",
              "LLM recipe assistant",
              "Requires 6GB+ VRAM or 8GB RAM",
            ]}
            hasLLM={true}
            available={false}
          />

          <VariantCard
            title="Minimal"
            stack="runit + musl + GNU coreutils"
            description="Lightweight stack. Smaller footprint, better static linking."
            features={[
              "runit for simple init",
              "musl libc (~1MB vs ~10MB)",
              "Patched GNU coreutils",
              "Manual installation",
            ]}
            hasLLM={false}
            available={false}
          />

          <VariantCard
            title="Minimal + LLM"
            stack="runit + musl + GNU coreutils + SmolLM3"
            description="Lightweight stack with AI-powered installer and recipe assistant."
            features={[
              "Everything in Minimal",
              "Natural language installer",
              "LLM recipe assistant",
              "Requires 6GB+ VRAM or 8GB RAM",
            ]}
            hasLLM={true}
            available={false}
          />
        </div>

        {/* Manual installation note */}
        <div className="bg-card border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <Package className="h-5 w-5" />
            Installing Without LLM Assistant
          </h2>
          <p className="text-muted-foreground mb-4">
            If you choose a variant without the LLM assistant, you'll need to install manually.
            See the <Link to="/docs/manual-install" className="text-primary hover:underline">Manual Installation Guide</Link> for
            step-by-step instructions.
          </p>
        </div>

        {/* Requirements */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Component</th>
                  <th className="text-left py-2 pr-4">Without LLM</th>
                  <th className="text-left py-2">With LLM</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b">
                  <td className="py-2 pr-4">Architecture</td>
                  <td className="py-2 pr-4">x86_64</td>
                  <td className="py-2">x86_64</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">RAM</td>
                  <td className="py-2 pr-4">2GB</td>
                  <td className="py-2">8GB (or 6GB VRAM)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">Disk</td>
                  <td className="py-2 pr-4">10GB</td>
                  <td className="py-2">20GB</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4">Boot</td>
                  <td className="py-2 pr-4" colSpan={2}>UEFI recommended</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">ISO Size</td>
                  <td className="py-2 pr-4">~500MB</td>
                  <td className="py-2">~3GB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
