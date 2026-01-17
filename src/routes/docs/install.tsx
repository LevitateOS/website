import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/layout";
import { CodeBlock } from "@/components/CodeBlock";

export const Route = createFileRoute("/docs/install")({
  component: InstallPage,
});

function InstallPage() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold mb-6">Installation Guide</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Requirements</h2>

        <h3 className="text-xl font-medium mb-3">System</h3>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground mb-4">
          <li><strong>Architecture:</strong> x86_64</li>
          <li><strong>Disk:</strong> 20GB minimum</li>
          <li><strong>Boot:</strong> UEFI recommended</li>
        </ul>

        <h3 className="text-xl font-medium mb-3">AI Installer (SmolLM3-3B)</h3>
        <p className="text-muted-foreground mb-2">
          The LLM requires GPU acceleration or sufficient RAM:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Hardware</th>
                <th className="text-left py-2 pr-4">VRAM/RAM</th>
                <th className="text-left py-2">Notes</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="py-2 pr-4">NVIDIA GPU</td>
                <td className="py-2 pr-4">6GB+ VRAM</td>
                <td className="py-2">CUDA, best compatibility</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">NVIDIA GPU (4-bit)</td>
                <td className="py-2 pr-4">2GB+ VRAM</td>
                <td className="py-2">With bitsandbytes quantization</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">AMD GPU</td>
                <td className="py-2 pr-4">6GB+ VRAM</td>
                <td className="py-2">ROCm 5.6+, RX 6000/7000 series</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">Intel Arc</td>
                <td className="py-2 pr-4">6GB+ VRAM</td>
                <td className="py-2">Via IPEX-LLM</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">Apple Silicon</td>
                <td className="py-2 pr-4">8GB+ unified</td>
                <td className="py-2">Metal/MPS acceleration</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">CPU only</td>
                <td className="py-2 pr-4">8GB+ RAM</td>
                <td className="py-2">Slow, fallback option</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Download</h2>
        <p className="text-muted-foreground mb-4">
          Download the latest ISO and verify the checksum:
        </p>
        <CodeBlock language="bash">{`curl -LO https://releases.levitateos.org/latest/LevitateOS.iso
curl -LO https://releases.levitateos.org/latest/SHA256SUMS
sha256sum -c SHA256SUMS`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Creating Bootable Media</h2>

        <h3 className="text-xl font-medium mb-3">USB Drive (Linux/macOS)</h3>
        <CodeBlock language="bash">{`# Find your USB device (usually /dev/sdX or /dev/diskX)
lsblk  # Linux
diskutil list  # macOS

# Write the ISO (CAUTION: this erases the drive)
sudo dd if=LevitateOS.iso of=/dev/sdX bs=4M status=progress oflag=sync`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">USB Drive (Windows)</h3>
        <p className="text-muted-foreground mb-2">
          Use <a href="https://rufus.ie" className="text-primary hover:underline">Rufus</a> with DD image mode.
        </p>

        <h3 className="text-xl font-medium mb-3 mt-6">Virtual Machine (QEMU)</h3>
        <CodeBlock language="bash">{`qemu-system-x86_64 \\
  -m 4G \\
  -enable-kvm \\
  -cpu host \\
  -cdrom LevitateOS.iso \\
  -drive file=disk.qcow2,format=qcow2,if=virtio \\
  -boot d`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Using the AI Installer</h2>
        <p className="text-muted-foreground mb-4">
          LevitateOS features a natural language installer powered by SmolLM3-3B running locally.
          Just type what you want in plain English.
        </p>

        <h3 className="text-xl font-medium mb-3">Example Conversation</h3>
        <div className="bg-muted/50 p-4 rounded-lg space-y-3 text-sm mb-4">
          <div>
            <span className="text-primary font-medium">You:</span>
            <span className="ml-2">install to the 500gb nvme drive</span>
          </div>
          <div>
            <span className="text-muted-foreground font-medium">AI:</span>
            <span className="ml-2">I found /dev/nvme0n1 (500GB). I'll create a GPT partition table with:</span>
            <ul className="list-disc list-inside ml-4 mt-1">
              <li>512MB EFI partition</li>
              <li>Rest as ext4 root</li>
            </ul>
            <span className="ml-2">Proceed?</span>
          </div>
          <div>
            <span className="text-primary font-medium">You:</span>
            <span className="ml-2">yes, and create user vince with sudo</span>
          </div>
          <div>
            <span className="text-muted-foreground font-medium">AI:</span>
            <span className="ml-2">Partitioning... Formatting... Installing base system... Creating user vince with sudo privileges... Done!</span>
          </div>
        </div>

        <h3 className="text-xl font-medium mb-3">Slash Commands</h3>
        <p className="text-muted-foreground mb-2">
          For advanced control, use slash commands:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Command</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">/disks</td>
                <td className="py-2">List available disks</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">/partition &lt;disk&gt;</td>
                <td className="py-2">Create partitions on disk</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">/user &lt;name&gt;</td>
                <td className="py-2">Create user account</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">/install</td>
                <td className="py-2">Begin installation</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono">/help</td>
                <td className="py-2">Show all commands</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Post-Installation</h2>

        <h3 className="text-xl font-medium mb-3">Install Desktop Environment</h3>
        <p className="text-muted-foreground mb-2">
          After booting into your new system, install the Sway Wayland desktop:
        </p>
        <CodeBlock language="bash">{`levitate desktop`}</CodeBlock>
        <p className="text-muted-foreground mt-2">
          This installs the complete Sway stack: wayland, wlroots, sway, foot terminal, waybar, wofi launcher, and mako notifications.
        </p>

        <h3 className="text-xl font-medium mb-3 mt-6">Install Additional Packages</h3>
        <CodeBlock language="bash">{`# Search for packages
levitate search firefox

# Install a package
levitate install firefox

# View package info
levitate info ripgrep`}</CodeBlock>
      </section>
    </DocsLayout>
  );
}
