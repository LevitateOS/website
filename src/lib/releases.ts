// What has been released, read from src/data/releases.json. That file is written by
// `cargo xtask release site <distro>`: a distro's entry is null until its release exists.
// The release notes are the markdown files under src/releases/<os>/<version>.md.
import data from "../data/releases.json"
import type { DistroId } from "./flavor"
import type { ReleaseNotes } from "../releases/types"

export interface Release {
	version: string
	serial: number
	date: string
	iso: { url: string; sha512: string; size: number }
	notes: string
	parts: { name: string; size: number }[]
}

type OsKey = "levitateos" | "acornos"

/** The key of a flavour in releases.json and in the notes URLs. */
export const osKey = (distro: DistroId): OsKey => (distro === "levitate" ? "levitateos" : "acornos")

export const distroOfOs = (os: string): DistroId | undefined => (os === "levitateos" ? "levitate" : os === "acornos" ? "acorn" : undefined)

/** The first releases are previews; every released version is labelled so. */
export const RELEASE_LABEL = "preview"

const releases = data as Record<OsKey, Release | null>

/** The distro's release, or null when it has none yet. */
export const releaseOf = (distro: DistroId): Release | null => releases[osKey(distro)]

/** The distros that have a release. */
export const released = (): DistroId[] => (["levitate", "acorn"] as const).filter((d) => releaseOf(d) !== null)

/** A byte count for people: 1.1 GiB, 640 MiB. */
export function formatSize(bytes: number): string {
	const gib = bytes / 2 ** 30
	if (gib >= 1) return `${gib.toFixed(1)} GiB`
	return `${Math.max(1, Math.round(bytes / 2 ** 20))} MiB`
}

/** The ISO's file name, from its URL. */
export const isoFileName = (release: Release): string => decodeURIComponent(new URL(release.iso.url).pathname.split("/").pop() ?? "")

/** The command that checks a downloaded ISO against the published SHA-512. */
export const verifyCommand = (release: Release): string => `echo "${release.iso.sha512}  ${isoFileName(release)}" | sha512sum -c -`

// ---------- Release notes ----------

const modules = import.meta.glob<{ notes: ReleaseNotes }>("../releases/*-*.ts", { eager: true })

/** Every written release note. */
export const allNotes: ReleaseNotes[] = Object.values(modules).map((mod) => mod.notes)

/** The notes of one release, when they are written. */
export const notesFor = (os: string, version: string): ReleaseNotes | undefined => allNotes.find((n) => n.os === os && n.version === version)

/** The route of one release's notes, in a flavour. */
export const notesPath = (os: string, version: string) => `/releases/${os}/${version}/`

/** A text with `code` between backticks, split into plain and code pieces. */
export function inline(text: string): { code: boolean; text: string }[] {
	return text.split("`").map((piece, index) => ({ code: index % 2 === 1, text: piece }))
}
