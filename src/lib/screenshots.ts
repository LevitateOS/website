import type { DocsSlug } from "@levitate/docs-content";
import { distroName, type DistroId } from "./flavor";

// Lossless, uncropped captures. Desktop frames retain the wallpaper and bottom panel.
const images = {
	desktop: {
		width: 1920,
		height: 1080,
		title: "The desktop.",
		caption: "The wallpaper and the icon start button, with the full panel in view.",
	},
	"desktop-recipe": {
		width: 1920,
		height: 1080,
		title: "Recipe on the desktop.",
		caption: "Browse software while the wallpaper and start button stay in view.",
	},
	"desktop-apps": {
		width: 1920,
		height: 1080,
		title: "The desktop apps.",
		caption: "Recipe for software, Recab for the system, and Recdirstat for disk usage.",
	},
	"recipe-browse": {
		width: 1100,
		height: 700,
		title: "Find software in Recipe.",
		caption: "Browse the collection, search for an app, and choose what to inspect.",
	},
	"recipe-detail": {
		width: 1100,
		height: 700,
		title: "Read before installing.",
		caption:
			"The program page shows what comes with it, what the recipe may use, and its build steps.",
	},
	"recipe-before-install": {
		width: 1100,
		height: 700,
		title: "Choose where software goes.",
		caption:
			"Review the destination, what will happen, and the resources the recipe may use before starting.",
	},
	"recipe-installed": {
		width: 1100,
		height: 700,
		title: "Installed software.",
		caption: "See installed versions and the actions available for each program.",
	},
	"recipe-updates": {
		width: 1100,
		height: 700,
		title: "Software updates.",
		caption: "Review which installed programs have a newer recipe in the collection.",
	},
	"recab-overview": {
		width: 1100,
		height: 700,
		title: "Know which system is running.",
		caption: "Recab names the running system and the role of the other slot.",
	},
	"recab-ready": {
		width: 1100,
		height: 700,
		title: "The next system is ready.",
		caption: "Recab keeps the running system beside the prepared one and offers a trial restart.",
	},
	"disk-browse": {
		width: 1100,
		height: 700,
		title: "See where disk space goes.",
		caption: "The folder list and treemap show which places take the most room.",
	},
	"disk-compare": {
		width: 1100,
		height: 700,
		title: "Compare the two systems.",
		caption: "Recdirstat shows the files and space each system holds, including what differs.",
	},
} as const;

export type ScreenshotId = keyof typeof images;

export function screenshot(id: ScreenshotId, distro: DistroId) {
	const image = images[id];
	const icon = distro === "levitate" ? "leaf" : "acorn";
	const desktop = distro === "levitate" ? "Plasma" : "LXQt";
	const caption =
		id === "desktop" || id === "desktop-recipe"
			? `${distroName(distro)} on ${desktop}, with its own wallpaper and the ${icon} start button at the bottom left.`
			: image.caption;
	return {
		...image,
		caption,
		src: `/screenshots/${distro}/${id}.webp`,
		alt: `Screenshot: ${image.title}`,
	};
}

// Website illustrations stay with the website; terminal docs keep their text-only model.
export const docsScreenshots = {
	"post-installation": {
		desktop: ["desktop-apps"],
		"software-with-recipe": ["recipe-browse", "recipe-before-install"],
		"system-updates": ["recab-ready"],
		"disk-usage": ["disk-browse", "disk-compare"],
	},
	"cli-reference": { "user-package-lifecycle": ["recipe-installed", "recipe-updates"] },
	"recipe-format": { "two-uses-one-format": ["recipe-detail"] },
	"atomic-updates": {
		"two-equivalent-initial-systems": ["recab-overview"],
		"required-continuation-and-update-lifecycle": ["recab-ready"],
	},
	recab: {
		"required-update-lifecycle": ["recab-overview"],
		"current-release-image-staging": ["recab-ready"],
	},
} as const satisfies Partial<Record<DocsSlug, Record<string, readonly ScreenshotId[]>>>;
