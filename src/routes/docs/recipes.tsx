import { createFileRoute } from "@tanstack/react-router";
import { DocsLayout } from "@/components/layout";
import { CodeBlock } from "@/components/CodeBlock";

export const Route = createFileRoute("/docs/recipes")({
  component: RecipesPage,
});

function RecipesPage() {
  return (
    <DocsLayout>
      <h1 className="text-3xl font-bold mb-6">Recipe Format</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-muted-foreground mb-4">
          LevitateOS uses <strong>S-expression recipes</strong> - a Lisp-like format that's both human-readable
          and easy for LLMs to generate. The parser is only 30 lines, making it simple and reliable.
        </p>
        <p className="text-muted-foreground mb-4">
          A single recipe can handle both <strong>binary</strong> and <strong>source</strong> builds,
          with version constraints, conditional dependencies, and split packages.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Basic Structure</h2>
        <CodeBlock language="lisp">{`(package "name" "version"
  (acquire ...)     ; How to get the package
  (build ...)       ; How to build (optional for binaries)
  (install ...)     ; How to install
  (configure ...)   ; Post-install configuration (optional)
  (deps ...)        ; Dependencies (optional)
)`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Examples</h2>

        <h3 className="text-xl font-medium mb-3">Binary Package</h3>
        <p className="text-muted-foreground mb-2">
          Simple binary download and install:
        </p>
        <CodeBlock language="lisp">{`(package "ripgrep" "14.1.0"
  (acquire
    (binary
      (x86_64 "https://github.com/BurntSushi/ripgrep/releases/download/14.1.0/ripgrep-14.1.0-x86_64-unknown-linux-musl.tar.gz")))
  (build
    (extract tar-gz))
  (install
    (to-bin "rg")
    (to-man "doc/rg.1")))`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">Source Package</h3>
        <p className="text-muted-foreground mb-2">
          Build from source with dependencies:
        </p>
        <CodeBlock language="lisp">{`(package "htop" "3.3.0"
  (acquire
    (source "https://github.com/htop-dev/htop/releases/download/3.3.0/htop-3.3.0.tar.xz"
      (sha256 "abc123...")))
  (deps
    (build "gcc" "make" "ncurses-dev")
    (runtime "ncurses"))
  (build
    (extract tar-xz)
    (run "./configure --prefix=/usr")
    (run "make"))
  (install
    (run "make install DESTDIR=$PKG")))`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">Package with Features</h3>
        <p className="text-muted-foreground mb-2">
          Conditional dependencies based on features:
        </p>
        <CodeBlock language="lisp">{`(package "firefox" "133.0"
  (acquire
    (binary
      (x86_64 "https://...")))
  (deps
    (runtime
      "gtk3 >= 3.24"
      "dbus"
      (if wayland "wayland >= 1.20")
      (if pulseaudio "pulseaudio")
      (if pipewire "pipewire")))
  (features
    (default wayland pulseaudio)
    (optional pipewire))
  (install
    (to-prefix "lib/firefox")))`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Actions Reference</h2>

        <h3 className="text-xl font-medium mb-3">acquire</h3>
        <p className="text-muted-foreground mb-2">How to download the package:</p>
        <CodeBlock language="lisp">{`(acquire
  ; Binary: pre-built binaries per architecture
  (binary
    (x86_64 "URL")
    (aarch64 "URL"))

  ; Source: tarball with optional checksum
  (source "URL"
    (sha256 "HASH"))

  ; Git: clone from repository
  (git "URL"
    (tag "v1.0.0"))
    ; or (branch "main")
    ; or (commit "abc123")))`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">build</h3>
        <p className="text-muted-foreground mb-2">Build steps:</p>
        <CodeBlock language="lisp">{`(build
  ; Extract archives
  (extract tar-gz)   ; .tar.gz
  (extract tar-xz)   ; .tar.xz
  (extract tar-bz2)  ; .tar.bz2
  (extract zip)      ; .zip

  ; Run commands
  (run "./configure --prefix=/usr")
  (run "make -j$(nproc)")

  ; Apply patches
  (patch "fix-musl.patch")

  ; Set environment
  (env "CFLAGS" "-O2 -pipe"))`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">install</h3>
        <p className="text-muted-foreground mb-2">Installation locations:</p>
        <CodeBlock language="lisp">{`(install
  ; Install to /usr/bin
  (to-bin "binary-name")

  ; Install to /usr/lib
  (to-lib "libfoo.so")

  ; Install man pages
  (to-man "doc/program.1")

  ; Install to custom prefix
  (to-prefix "lib/program")

  ; Run make install
  (run "make install DESTDIR=$PKG"))`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">deps</h3>
        <p className="text-muted-foreground mb-2">Dependency specification:</p>
        <CodeBlock language="lisp">{`(deps
  ; Build-time only
  (build "gcc" "make" "cmake")

  ; Runtime dependencies
  (runtime
    "glibc"
    "openssl >= 3.0"      ; Minimum version
    "libpng ~= 1.6"       ; Compatible release (1.6.x)
    "zlib >= 1.2, < 2.0"  ; Version range
  )

  ; Conditional dependencies
  (runtime
    (if wayland "wayland-protocols")
    (if !x11 "xorg-libs")))`}</CodeBlock>

        <h3 className="text-xl font-medium mb-3 mt-6">configure</h3>
        <p className="text-muted-foreground mb-2">Post-install configuration:</p>
        <CodeBlock language="lisp">{`(configure
  ; Create config file
  (config "/etc/program.conf"
    "setting=value")

  ; Create symlink
  (link "/usr/bin/program" "/usr/bin/prog")

  ; Set file permissions
  (chmod "/usr/bin/program" "755")

  ; Run post-install script
  (run "ldconfig"))`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Version Constraints</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4">Operator</th>
                <th className="text-left py-2 pr-4">Example</th>
                <th className="text-left py-2">Meaning</th>
              </tr>
            </thead>
            <tbody className="text-muted-foreground">
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">&gt;=</td>
                <td className="py-2 pr-4 font-mono">&gt;= 1.0</td>
                <td className="py-2">1.0 or higher</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">&lt;=</td>
                <td className="py-2 pr-4 font-mono">&lt;= 2.0</td>
                <td className="py-2">2.0 or lower</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">~=</td>
                <td className="py-2 pr-4 font-mono">~= 1.4</td>
                <td className="py-2">Compatible release (1.4.x, &lt; 2.0)</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-mono">=</td>
                <td className="py-2 pr-4 font-mono">= 1.0.0</td>
                <td className="py-2">Exact version</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-mono">,</td>
                <td className="py-2 pr-4 font-mono">&gt;= 1.0, &lt; 2.0</td>
                <td className="py-2">Multiple constraints (AND)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Split Packages</h2>
        <p className="text-muted-foreground mb-2">
          Create subpackages for development files, documentation, etc:
        </p>
        <CodeBlock language="lisp">{`(package "openssl" "3.2.0"
  (acquire (source "..."))
  (build ...)
  (install ...)

  (split "openssl-dev"
    (files
      "usr/include/*"
      "usr/lib/*.a"
      "usr/lib/pkgconfig/*")
    (deps (runtime "openssl"))))`}</CodeBlock>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">LLM Generation</h2>
        <p className="text-muted-foreground mb-4">
          The S-expression format was specifically designed for small LLMs (3B parameters) to generate reliably.
          The simple grammar and consistent structure mean fewer hallucinations compared to YAML or TOML.
        </p>
        <p className="text-muted-foreground">
          To generate a recipe, ask the AI installer:
        </p>
        <div className="bg-muted/50 p-4 rounded-lg mt-2 text-sm">
          <span className="text-primary font-medium">You:</span>
          <span className="ml-2">create a recipe for ripgrep 14.1.0</span>
        </div>
      </section>
    </DocsLayout>
  );
}
