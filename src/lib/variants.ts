// One description of each variant, used by the homepage entries and the downloads page.
// Keep status honest: nothing here is released until a published artifact exists.
// The hardware both need is the docs' one baseline.
// The stack, init, privilege tool, desktop and kernel come from the generated DISTROS
// (`cargo xtask gen`); the base release is typed here until the generator emits it.
import { DISTROS } from "@levitate/docs-content/distros"
import { DESKTOP_NAME, HARDWARE, INIT_NAME, KERNEL_LINE_NAME } from "@levitate/docs-content/pages"

export type ReleaseStatus = "available" | "in-development" | "planned"

export interface Variant {
	id: "levitate" | "acorn"
	name: string
	lockup: { light: string; dark: string; width: number }
	role: string
	description: string
	stack: string
	base: string
	init: string
	admin: string
	desktop: string
	kernel: string
	status: ReleaseStatus
	statusLabel: string
	release: string
	architectures: string
	format: string
	strengths: string[]
	tradeoffs: string[]
	ram: string
	disk: string
}

const distro = (id: Variant["id"]) => DISTROS.find((d) => d.id === id)!
const stack = (id: Variant["id"], userland: string) => {
	const { profile } = distro(id)
	return `${profile.libc} · ${INIT_NAME[profile.init]} · ${userland}`
}
const derived = (id: Variant["id"]) => {
	const d = distro(id)
	return {
		init: INIT_NAME[d.profile.init],
		admin: d.profile.privilege,
		desktop: DESKTOP_NAME[d.profile.desktop],
		kernel: `${d.kernel.version} (${KERNEL_LINE_NAME[d.profile.kernel_line]})`,
	}
}

export const variants: Variant[] = [
	{
		id: "levitate",
		name: "LevitateOS",
		lockup: { light: "/brand/levitate-lockup-ink.svg", dark: "/brand/levitate-lockup-paper.svg", width: 213.026 },
		role: "The broad-compatibility choice, on a core system from signed Fedora RPMs.",
		description:
			"Run Linux software without patching, use familiar GNU tools, and find answers to most questions online. Choose it if you want the widest software compatibility.",
		stack: stack("levitate", "GNU"),
		base: "Fedora 45 RPMs, signed and locked",
		...derived("levitate"),
		status: "in-development",
		statusLabel: "In development",
		release: "Planned for 2027",
		architectures: "x86_64 first; AArch64 after",
		format: "Live UEFI ISO",
		strengths: ["Broad Linux software compatibility", "Core system from signed Fedora 45 RPMs", "systemd service management", "Familiar GNU tools"],
		tradeoffs: ["Larger binaries", "Slower boot", "Higher memory use"],
		ram: HARDWARE.ram,
		disk: HARDWARE.disk,
	},
	{
		id: "acorn",
		name: "AcornOS",
		lockup: { light: "/brand/acorn-lockup-ink.svg", dark: "/brand/acorn-lockup-paper.svg", width: 180.947 },
		role: "The musl and OpenRC sibling in the LevitateOS family.",
		description:
			"A smaller, simpler base built by the same pipeline. Some software needs patching or compiling yourself, and you can see exactly what is running.",
		stack: stack("acorn", "busybox"),
		base: "Alpine Linux 3.24 APKs",
		...derived("acorn"),
		status: "in-development",
		statusLabel: "In development",
		release: "Planned for 2027",
		architectures: "x86_64 first; AArch64 after",
		format: "Live UEFI ISO",
		strengths: ["Faster boot", "Lower memory use", "Smaller disk footprint", "Simpler init system"],
		tradeoffs: ["Some software needs patching", "Fewer pre-built packages", "Less documentation online"],
		ram: HARDWARE.ram,
		disk: HARDWARE.disk,
	},
]
