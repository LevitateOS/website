// The site's two flavours, LevitateOS and AcornOS. A page's flavour is fixed by its URL:
// LevitateOS pages live at the root, AcornOS pages under /acorn. This file is the one
// place that knows the prefixes.
import { DISTROS, type DistroId } from "@levitate/docs-content/distros"

export type { DistroId }

const PREFIX: Record<DistroId, string> = { levitate: "", acorn: "/acorn" }

/** The flavours, LevitateOS first. */
export const FLAVORS = [...DISTROS].sort((a, b) => Number(b.id === "levitate") - Number(a.id === "levitate"))

export const DEFAULT_DISTRO: DistroId = "levitate"

export function distroName(distro: DistroId): string {
	return DISTROS.find((d) => d.id === distro)!.osName
}

/** An internal site path (`/docs/x/#a`) in `distro`'s flavour. */
export function href(path: string, distro: DistroId): string {
	return `${PREFIX[distro]}${path}`
}

/** The other flavour than `distro`. */
export function otherFlavor(distro: DistroId) {
	return FLAVORS.find((f) => f.id !== distro)!
}

/** The page at `pathname` (in `distro`'s flavour) as it is in the other flavour. */
export function siblingHref(pathname: string, distro: DistroId): string {
	const prefix = PREFIX[distro]
	const path = prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`)) ? pathname.slice(prefix.length) : pathname
	return href(path || "/", otherFlavor(distro).id)
}

/** The path of the current page without its flavour prefix. */
export function unprefixed(pathname: string, distro: DistroId): string {
	const prefix = PREFIX[distro]
	if (!prefix) return pathname
	return pathname === prefix ? "/" : pathname.startsWith(`${prefix}/`) ? pathname.slice(prefix.length) : pathname
}
