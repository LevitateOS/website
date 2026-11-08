// One description of each variant, used by the homepage entries and the downloads page.
// Keep status honest: nothing here is released until a published artifact exists.
// The hardware both need is the docs' one baseline.
import { HARDWARE } from "@levitate/docs-content/pages"

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

export const variants: Variant[] = [
	{
		id: "levitate",
		name: "LevitateOS",
		lockup: { light: "/brand/levitate-lockup-ink.svg", dark: "/brand/levitate-lockup-paper.svg", width: 213.026 },
		role: "The broad-compatibility choice, on a core system from signed Fedora RPMs.",
		description:
			"Run Linux software without patching, use familiar GNU tools, and find answers to most questions online. Choose it if you want the widest software compatibility.",
		stack: "glibc · systemd · GNU",
		base: "Fedora 45 RPMs, signed and locked",
		init: "systemd",
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
		stack: "musl · OpenRC · busybox",
		base: "Alpine Linux 3.24 APKs",
		init: "OpenRC",
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
