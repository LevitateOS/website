import type { ReleaseNotes } from "./types"

export const notes: ReleaseNotes = {
	os: "levitateos",
	version: "1.0",
	what: [
		"LevitateOS is an independent operating system. Its userland is built from Fedora 45 RPM packages. The installer, the rec* tools, A/B booting and Recipe, its package manager, are our own, and its kernel is built from pinned upstream source.",
		"1.0 is a preview: the first public release. It is built for people who want to try it and report what they find, not yet for a computer they depend on.",
	],
	contents: [
		"A live UEFI ISO for x86_64. It boots into the install screen: a root terminal beside the installation guide.",
		"The installer: the helper apps `disk-plan`, `base-system` and `system-setup`, or the manual tools `recpart`, `recstrap`, `recfstab` and `recsetup`.",
		"The base system: kernel, systemd, the GNU tools, the rec* tools and Recipe.",
		"The default software is not on the ISO. It downloads during installation, from this release's own signed parts: KDE Plasma and its apps, Firefox, audio, network, printing, fonts and the rec desktop apps. The installer checks the release's signature with the key on the ISO and each part's hash before it installs anything.",
	],
	install: [
		"Download the ISO, check it as shown below, and write it to a USB stick.",
		"Boot the computer from the stick in UEFI mode with Secure Boot disabled.",
		"Connect to a network. The live session runs NetworkManager. Without a network, download the release's parts beforehand and give their folder to the installer with `--parts-from DIR`.",
		"Follow the installation guide on the install screen: partition (the A/B layout is the default; mutable, one root, is an explicit choice), extract the system, write the fstab, configure the system and its boot entries.",
		"Reboot into the installed system. The first boot shows the login screen.",
	],
	tested: [
		"Everything was run in virtual machines under libvirt: the ISO build, the installed desktop booting, A/B and mutable installs, and an update from 1.0 to 1.1 through a signed channel.",
		"No real computer has run it yet.",
	],
	limits: [
		"Preview release: expect rough edges.",
		"x86_64 only, UEFI only, Secure Boot off (the boot files are unsigned).",
		"No disk encryption.",
		"Tested in virtual machines only. No real hardware has been tried, so Wi-Fi, graphics, suspend and laptop audio are unverified.",
		"Graphics on NVIDIA cards use the open nouveau driver only.",
		"H.264 and AAC playback need the `codecs` recipe. It is not part of the image and installing it has not been run yet.",
		"The installer needs a network, or the release's parts downloaded beforehand, to get the default software.",
	],
}
