// The colours of a page. Each distro declares its own light and dark look in
// distro/variants/<id>/distro.toml; @levitate/docs-content/distros carries them. This file
// turns the current flavour's two looks into the --fn-* colour custom properties, so
// the site keeps no palette of its own. Site-only colours (the red action, the syntax
// colours) live in styles/field-notes/tokens.json.
import { DISTROS, type DistroId } from "@levitate/docs-content/distros"

type Mode = "light" | "dark"

function distro(id: DistroId) {
	return DISTROS.find((d) => d.id === id)!
}

/** The mode a flavour's pages open in. */
export function defaultAppearance(id: DistroId): Mode {
	return distro(id).profile.appearance
}

/** The page surface of a flavour in a mode, for <meta name="theme-color">. */
export function surfaceOf(id: DistroId, mode: Mode): string {
	return distro(id).look[mode].surface
}

function declarations(id: DistroId, mode: Mode): string {
	const look = distro(id).look[mode]
	const code = distro(id).look.dark // code panels stay dark in both modes
	const accent = (other: DistroId) => distro(other).look[mode].accent
	const props: Record<string, string> = {
		"color-scheme": mode,
		"--fn-surface": look.surface,
		"--fn-surface-raised": look.surfaceRaised,
		"--fn-text": look.text,
		"--fn-text-secondary": look.textSecondary,
		"--fn-rule": look.rule,
		"--fn-boundary": look.textMuted,
		"--fn-brand": look.accent,
		"--fn-annotation": look.bad,
		"--fn-levitate": accent("levitate"),
		"--fn-acorn": accent("acorn"),
		"--fn-ending": look.band,
		"--fn-frame": look.band,
		"--fn-on-ending": look.onBand,
		"--fn-on-ending-secondary": `color-mix(in srgb, ${look.onBand} 78%, ${look.band})`,
		"--fn-code-surface": code.surfaceSunken,
		"--fn-code-bar": code.surface,
		"--fn-code-rule": code.hairline,
		"--fn-code-text": code.text,
		"--fn-code-secondary": code.textMuted,
		"--fn-code-gutter": `color-mix(in srgb, ${code.textMuted} 65%, ${code.surfaceSunken})`,
		"--fn-code-selection": `color-mix(in srgb, ${code.accent} 25%, ${code.surfaceSunken})`,
	}
	return Object.entries(props)
		.map(([name, value]) => `${name}:${value};`)
		.join("")
}

/**
 * The colour custom properties of `id`'s pages: both modes, chosen by data-theme on
 * <html> ("light", "dark", or "system" following the OS).
 */
export function lookCss(id: DistroId): string {
	const system = ':root[data-theme="system"]'
	return [
		`:root[data-theme="light"]{${declarations(id, "light")}}`,
		`:root[data-theme="dark"]{${declarations(id, "dark")}}`,
		`${system}{${declarations(id, "light")}}`,
		`@media (prefers-color-scheme: dark){${system}{${declarations(id, "dark")}}}`,
	].join("\n")
}
