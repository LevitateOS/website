import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/layout";
import { CodeBlock } from "@/components/CodeBlock";

export const Route = createFileRoute("/docs/levitate")({
  component: LevitatePage,
});

function LevitatePage() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold mb-6">levitate CLI Reference</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-muted-foreground mb-4">
          <code className="bg-muted px-1.5 py-0.5">levitate</code> is the self-sufficient package manager for LevitateOS.
          It handles the full package lifecycle without depending on apt, dnf, pacman, or any other package manager.
        </p>
        <CodeBlock language="bash">{`levitate <command> [options] [arguments]`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Commands</h2>

        <h3 className="text-xl font-medium mb-3">install</h3>
        <p className="text-muted-foreground mb-2">Install one or more packages:</p>
        <CodeBlock language="bash">{`levitate install <package> [packages...]

# Examples
levitate install ripgrep
levitate install firefox chromium
levitate install "openssl >= 3.0"  # With version constraint`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">remove</h3>
        <p className="text-muted-foreground mb-2">Remove installed packages:</p>
        <CodeBlock language="bash">{`levitate remove <package> [packages...]

# Examples
levitate remove firefox
levitate remove --purge firefox  # Also remove config files`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">search</h3>
        <p className="text-muted-foreground mb-2">Search for packages:</p>
        <CodeBlock language="bash">{`levitate search <query>

# Examples
levitate search browser
levitate search "text editor"`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">info</h3>
        <p className="text-muted-foreground mb-2">Show package details:</p>
        <CodeBlock language="bash">{`levitate info <package>

# Output includes:
# - Name, version, description
# - Dependencies
# - Installed files
# - Features`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">list</h3>
        <p className="text-muted-foreground mb-2">List packages:</p>
        <CodeBlock language="bash">{`levitate list              # List installed packages
levitate list --available  # List all available packages
levitate list --upgradable # List packages with updates`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">deps</h3>
        <p className="text-muted-foreground mb-2">Show dependency tree:</p>
        <CodeBlock language="bash">{`levitate deps <package>

# Example output:
# firefox
# ├── gtk3 >= 3.24
# │   ├── glib2
# │   ├── pango
# │   └── cairo
# ├── dbus
# └── wayland >= 1.20`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">update</h3>
        <p className="text-muted-foreground mb-2">Update package database and upgrade packages:</p>
        <CodeBlock language="bash">{`levitate update            # Update package database
levitate upgrade           # Upgrade all packages
levitate upgrade firefox   # Upgrade specific package`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">desktop</h3>
        <p className="text-muted-foreground mb-2">Install the complete Sway Wayland desktop:</p>
        <CodeBlock language="bash">{`levitate desktop

# Installs:
# - wayland, wlroots
# - sway (compositor)
# - foot (terminal)
# - waybar (status bar)
# - wofi (launcher)
# - mako (notifications)
# - swaylock, swayidle
# - grim, slurp (screenshots)`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Options</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Option</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">-y, --yes</td>
                <td className="py-2">Assume yes to all prompts</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">-n, --dry-run</td>
                <td className="py-2">Show what would be done without doing it</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">-v, --verbose</td>
                <td className="py-2">Increase output verbosity</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">--no-deps</td>
                <td className="py-2">Don't install dependencies</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">--with-features &lt;f&gt;</td>
                <td className="py-2">Enable specific features</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">--without-features &lt;f&gt;</td>
                <td className="py-2">Disable specific features</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono">--root &lt;path&gt;</td>
                <td className="py-2">Install to alternate root</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <p className="text-muted-foreground mb-4">
          Packages can have optional features that enable additional functionality or dependencies.
        </p>
        <CodeBlock language="bash">{`# Install with specific features
levitate install firefox --with-features wayland,pipewire

# Install without certain features
levitate install firefox --without-features pulseaudio

# List package features
levitate info firefox | grep Features`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
        <p className="text-muted-foreground mb-2">
          Configuration is stored in <code className="bg-muted px-1.5 py-0.5">/etc/levitate/config</code>:
        </p>
        <CodeBlock language="bash">{`# Recipe repository URL
REPO_URL=https://recipes.levitateos.org

# Package cache directory
CACHE_DIR=/var/cache/levitate

# Installation prefix
PREFIX=/usr

# Default features (comma-separated)
DEFAULT_FEATURES=wayland,pipewire`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Exit Codes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Code</th>
                <th className="text-left py-2">Meaning</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">0</td>
                <td className="py-2">Success</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">1</td>
                <td className="py-2">General error</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">2</td>
                <td className="py-2">Package not found</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">3</td>
                <td className="py-2">Dependency resolution failed</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">4</td>
                <td className="py-2">Download failed</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono">5</td>
                <td className="py-2">Build failed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocsLayout>
  );
}
