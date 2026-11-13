// One description of each variant, used by the homepage entries and the downloads page.
// Keep status honest: nothing here is released until a published artifact exists.
// The hardware both need is the docs' one baseline.
// The stack, init, privilege tool, desktop and kernel come from the generated DISTROS
// (`cargo xtask gen`); the base release is typed here until the generator emits it.
import { DISTROS } from "@levitate/docs-content/distros"
import { desktopOn, HARDWARE, INIT_NAME, KERNEL_LINE_NAME } from "@levitate/docs-content/pages"

export type ReleaseStatus = "available" | "in-development" | "planned"

export interface Variant {
	id: "levitate" | "acorn"
	name: string
	lockup: { light: string; dark: string; width: number }
	/** The mark alone, for the header switch on compact widths and the hero. */
	mark: { light: string; dark: string }
	/** The homepage's meta tags. */
	meta: { title: string; description: string }
	/** The homepage's opening: eyebrow, the headline in two spans (the second ends in an emphasised phrase) and the deck. */
	hero: { eyebrow: string; title: { first: string; second: string; emphasis: string }; deck: string }
	desktopStory: { title: string; text: string }
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
		desktop: desktopOn(d.profile.desktop),
		kernel: `${d.kernel.version} (${KERNEL_LINE_NAME[d.profile.kernel_line]})`,
	}
}

export const variants: Variant[] = [
	{
		id: "levitate",
		name: "LevitateOS",
		lockup: { light: "/brand/levitate-lockup-ink.svg", dark: "/brand/levitate-lockup-paper.svg", width: 213.026 },
		mark: { light: "/brand/levitate-ink.svg", dark: "/brand/levitate-paper.svg" },
		meta: {
			title: "LevitateOS: know what you run",
			description:
				"A Linux distribution built around readable package recipes and explicit control: recipes built in isolated Ginux domains and atomic A/B updates by default.",
		},
		hero: {
			eyebrow: "Be your own package maintainer",
			title: { first: "Know what", second: "you", emphasis: "run." },
			deck: "Choose your software in Recipe. Read what it will do, review what it may use, and prepare system changes beside the system you are running.",
		},
		desktopStory: {
			title: "A familiar place to make it yours.",
			text: "KDE Plasma gives you the desktop. Recipe gives you a clear view of the software you put on it. The leaf in the panel opens your applications.",
		},
		role: "The broad-compatibility choice, on a core system from signed Fedora RPMs.",
		description:
			"A Fedora-derived base with glibc, systemd and GNU tools, with KDE Plasma on the desktop. Choose it for broad software compatibility; Recipe manages the software you add.",
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
		mark: { light: "/brand/acorn-ink.svg", dark: "/brand/acorn-paper.svg" },
		meta: {
			title: "AcornOS: the fewest parts that do the job",
			description:
				"The small, strict sibling of LevitateOS: musl, OpenRC and busybox, with the same readable package recipes, isolated Ginux builds and atomic A/B updates.",
		},
		hero: {
			eyebrow: "The small, strict sibling of LevitateOS",
			title: { first: "The fewest parts", second: "", emphasis: "that do the job." },
			deck: "A smaller Linux base, with the same Recipe tools. Find what you want to run, inspect it before installing, and try system changes in the other slot.",
		},
		desktopStory: {
			title: "A small base. Your own desktop.",
			text: "LXQt sits on AcornOS's musl, OpenRC and busybox base. The acorn in the panel opens your applications; Recipe is where you choose what to add.",
		},
		role: "The musl and OpenRC sibling in the LevitateOS family.",
		description:
			"An Alpine-derived base with musl, OpenRC and busybox, with LXQt on the desktop. Choose it if you prefer a smaller base and are willing to adapt software that expects glibc.",
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

export const variantOf = (id: Variant["id"]) => variants.find((v) => v.id === id)!
