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
    <div className="bg-card border rounded-lg p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        {hasLLM ? (
          <Robot className="h-5 w-5 text-primary" />
        ) : (
          <Terminal className="h-5 w-5 text-muted-foreground" />
        )}
        <h3 className="font-semibold">{title}</h3>
      </div>

      <p className="text-xs font-mono text-muted-foreground mb-2">{stack}</p>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>

      <ul className="space-y-0.5 text-xs mb-4 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-1.5">
            <span className="text-primary">+</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {available ? (
        <a
          href={downloadUrl}
          className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-3 py-1.5 rounded-md hover:bg-primary/90 transition-colors text-sm"
        >
          <Download className="h-4 w-4" />
          Download
        </a>
      ) : (
        <span className="inline-flex items-center justify-center gap-2 bg-muted text-muted-foreground px-3 py-1.5 rounded-md text-sm">
          Coming Soon
        </span>
      )}
    </div>
  );
}

function DownloadPage() {
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-3">Download LevitateOS</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Choose your variant based on init system and LLM preference.
      </p>

      {/* Variant explanation */}
      <div className="bg-muted/50 rounded-lg p-4 mb-8">
        <h2 className="font-semibold mb-3">Understanding the Variants</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium flex items-center gap-2 mb-1">
              <Cpu className="h-4 w-4" />
              Init System
            </h3>
            <ul className="space-y-0.5 text-muted-foreground text-xs">
              <li><strong>systemd + glibc:</strong> Traditional</li>
              <li><strong>runit + musl:</strong> Minimal</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium flex items-center gap-2 mb-1">
              <Robot className="h-4 w-4" />
              LLM Assistant
            </h3>
            <ul className="space-y-0.5 text-muted-foreground text-xs">
              <li><strong>With:</strong> AI installer + recipe helper</li>
              <li><strong>Without:</strong> Manual, smaller ISO</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Variant cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <VariantCard
          title="Standard"
          stack="systemd + glibc + GNU"
          description="Traditional Linux stack. Maximum compatibility."
          features={[
            "systemd service management",
            "glibc for compatibility",
            "Manual installation",
          ]}
          hasLLM={false}
          available={false}
        />

        <VariantCard
          title="Standard + LLM"
          stack="systemd + glibc + GNU + SmolLM3"
          description="Traditional stack with AI installer."
          features={[
            "Everything in Standard",
            "Natural language installer",
            "LLM recipe assistant",
          ]}
          hasLLM={true}
          available={false}
        />

        <VariantCard
          title="Minimal"
          stack="runit + musl + GNU"
          description="Lightweight stack. Smaller footprint."
          features={[
            "runit simple init",
            "musl libc (~1MB)",
            "Manual installation",
          ]}
          hasLLM={false}
          available={false}
        />

        <VariantCard
          title="Minimal + LLM"
          stack="runit + musl + GNU + SmolLM3"
          description="Lightweight stack with AI installer."
          features={[
            "Everything in Minimal",
            "Natural language installer",
            "LLM recipe assistant",
          ]}
          hasLLM={true}
          available={false}
        />
      </div>

      {/* Manual installation note */}
      <div className="bg-card border rounded-lg p-4 mb-8">
        <h2 className="font-semibold mb-2 flex items-center gap-2">
          <Package className="h-4 w-4" />
          Installing Without LLM
        </h2>
        <p className="text-sm text-muted-foreground">
          Without the LLM assistant, follow the{" "}
          <Link to="/docs/manual-install" className="text-primary hover:underline">
            Manual Installation Guide
          </Link>.
        </p>
      </div>

      {/* Requirements */}
      <div>
        <h2 className="text-xl font-semibold mb-3">System Requirements</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-1.5 pr-4">Component</th>
              <th className="text-left py-1.5 pr-4">Without LLM</th>
              <th className="text-left py-1.5">With LLM</th>
            </tr>
          </thead>
          <tbody className="text-muted-foreground">
            <tr className="border-b">
              <td className="py-1.5 pr-4">Architecture</td>
              <td className="py-1.5 pr-4">x86_64</td>
              <td className="py-1.5">x86_64</td>
            </tr>
            <tr className="border-b">
              <td className="py-1.5 pr-4">RAM</td>
              <td className="py-1.5 pr-4">2GB</td>
              <td className="py-1.5">8GB (or 6GB VRAM)</td>
            </tr>
            <tr className="border-b">
              <td className="py-1.5 pr-4">Disk</td>
              <td className="py-1.5 pr-4">10GB</td>
              <td className="py-1.5">20GB</td>
            </tr>
            <tr>
              <td className="py-1.5 pr-4">ISO Size</td>
              <td className="py-1.5 pr-4">~500MB</td>
              <td className="py-1.5">~3GB</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
