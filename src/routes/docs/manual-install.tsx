import { createFileRoute } from "@tanstack/react-router"
import { DocsPage, type DocsContent } from "@/components/docs"

export const Route = createFileRoute("/docs/manual-install")({
	component: ManualInstallPage,
})

const manualInstallContent: DocsContent = {
	title: "Manual Installation Guide",
	intro: "This guide walks through installing LevitateOS by hand. Use this if you prefer full control or are installing without the AI assistant.",
	sections: [
		{
			title: "Prerequisites",
			content: [
				{
					type: "list",
					items: [
						"**Architecture:** x86_64",
						"**Disk:** 8GB minimum (20GB recommended)",
						"**RAM:** 512MB minimum (2GB recommended)",
						"**Boot mode:** UEFI (this guide assumes UEFI)",
					],
				},
			],
		},
		{
			title: "1. Boot the Live Environment",
			content: [
				{
					type: "text",
					content:
						"Boot from the LevitateOS ISO. You'll be dropped into a root shell.",
				},
				{
					type: "code",
					language: "bash",
					content: `# Verify you booted in UEFI mode
ls /sys/firmware/efi/efivars`,
				},
				{
					type: "text",
					content:
						"If the directory exists, you're in UEFI mode. If not, reboot and select UEFI boot in your firmware settings.",
				},
			],
		},
		{
			title: "2. Connect to the Internet",
			content: [
				{
					type: "text",
					content: "Wired connections should work automatically. For WiFi:",
				},
				{
					type: "code",
					language: "bash",
					content: `# Connect using nmcli
nmcli device wifi list
nmcli device wifi connect "YourNetwork" password "YourPassword"

# Verify connectivity
ping -c 3 levitateos.org`,
				},
			],
		},
		{
			title: "3. Identify Target Disk",
			content: [
				{
					type: "text",
					content: "List all disks and identify your installation target:",
				},
				{
					type: "code",
					language: "bash",
					content: `lsblk -d -o NAME,SIZE,MODEL,TRAN

# Example output:
# NAME      SIZE MODEL                   TRAN
# sda       500G Samsung SSD 860         sata
# nvme0n1     1T WD Black SN850X         nvme`,
				},
				{
					type: "text",
					content:
						"This guide uses `/dev/sda`. **Replace with your actual device** (e.g., `/dev/nvme0n1` for NVMe).",
				},
			],
		},
		{
			title: "4. Partition the Disk",
			content: [
				{
					type: "text",
					content:
						"Create a 512MB EFI partition and use the rest for root:",
				},
				{
					type: "code",
					language: "bash",
					content: `# Wipe existing partition table
wipefs -a /dev/sda

# Create GPT partition table and partitions
parted /dev/sda --script \\
  mklabel gpt \\
  mkpart "EFI" fat32 1MiB 513MiB \\
  set 1 esp on \\
  mkpart "root" ext4 513MiB 100%

# Verify
lsblk /dev/sda`,
				},
				{
					type: "text",
					content: "For NVMe drives, partitions are named `/dev/nvme0n1p1`, `/dev/nvme0n1p2`, etc.",
				},
			],
		},
		{
			title: "5. Format Partitions",
			content: [
				{
					type: "code",
					language: "bash",
					content: `# Format EFI partition
mkfs.fat -F32 -n EFI /dev/sda1

# Format root partition
mkfs.ext4 -L root /dev/sda2`,
				},
			],
		},
		{
			title: "6. Mount Filesystems",
			content: [
				{
					type: "code",
					language: "bash",
					content: `# Mount root partition
mount /dev/sda2 /mnt

# Create mount point and mount EFI
mkdir -p /mnt/boot
mount /dev/sda1 /mnt/boot`,
				},
			],
		},
		{
			title: "7. Install Base System",
			content: [
				{
					type: "text",
					content: "Install the base system using dnf:",
				},
				{
					type: "code",
					language: "bash",
					content: `dnf --installroot=/mnt --releasever=41 groupinstall -y core

dnf --installroot=/mnt install -y \\
  kernel \\
  kernel-modules \\
  grub2-efi-x64 \\
  shim-x64 \\
  systemd-boot \\
  NetworkManager`,
				},
			],
		},
		{
			title: "8. Generate fstab",
			content: [
				{
					type: "code",
					language: "bash",
					content: `# Generate fstab using UUIDs
cat > /mnt/etc/fstab << EOF
UUID=$(blkid -s UUID -o value /dev/sda2)  /      ext4  defaults  0 1
UUID=$(blkid -s UUID -o value /dev/sda1)  /boot  vfat  defaults  0 2
EOF

cat /mnt/etc/fstab`,
				},
			],
		},
		{
			title: "9. Enter the New System",
			content: [
				{
					type: "code",
					language: "bash",
					content: `# Bind mount system directories and chroot
mount --bind /dev /mnt/dev
mount --bind /proc /mnt/proc
mount --bind /sys /mnt/sys
mount --bind /sys/firmware/efi/efivars /mnt/sys/firmware/efi/efivars
chroot /mnt /bin/bash`,
				},
			],
		},
		{
			title: "10. Set Timezone",
			content: [
				{
					type: "code",
					language: "bash",
					content: `# List timezones
timedatectl list-timezones | grep America

# Set your timezone
ln -sf /usr/share/zoneinfo/America/New_York /etc/localtime
hwclock --systohc`,
				},
			],
		},
		{
			title: "11. Set Locale",
			content: [
				{
					type: "code",
					language: "bash",
					content: `# Set locale
echo "LANG=en_US.UTF-8" > /etc/locale.conf
echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
locale-gen`,
				},
			],
		},
		{
			title: "12. Set Hostname",
			content: [
				{
					type: "code",
					language: "bash",
					content: `echo "levitate" > /etc/hostname

cat > /etc/hosts << 'EOF'
127.0.0.1   localhost
::1         localhost
127.0.1.1   levitate.localdomain levitate
EOF`,
				},
			],
		},
		{
			title: "13. Set Root Password",
			content: [
				{
					type: "code",
					language: "bash",
					content: `passwd`,
				},
			],
		},
		{
			title: "14. Create User Account",
			content: [
				{
					type: "code",
					language: "bash",
					content: `# Create user with sudo access
useradd -m -G wheel -s /bin/bash yourname
passwd yourname

# Enable sudo for wheel group
echo "%wheel ALL=(ALL:ALL) ALL" > /etc/sudoers.d/wheel`,
				},
			],
		},
		{
			title: "15. Install Bootloader",
			content: [
				{
					type: "text",
					content: "Install and configure systemd-boot:",
				},
				{
					type: "code",
					language: "bash",
					content: `# Install systemd-boot
bootctl install

# Create loader config
cat > /boot/loader/loader.conf << 'EOF'
default levitate.conf
timeout 3
editor no
EOF

# Create boot entry
cat > /boot/loader/entries/levitate.conf << EOF
title   LevitateOS
linux   /vmlinuz-$(uname -r)
initrd  /initramfs-$(uname -r).img
options root=UUID=$(blkid -s UUID -o value /dev/sda2) rw quiet
EOF`,
				},
			],
		},
		{
			title: "16. Enable Services",
			content: [
				{
					type: "code",
					language: "bash",
					content: `# Enable networking
systemctl enable NetworkManager`,
				},
			],
		},
		{
			title: "17. Exit and Reboot",
			content: [
				{
					type: "code",
					language: "bash",
					content: `# Exit chroot
exit

# Unmount all partitions
umount -R /mnt

# Reboot
reboot`,
				},
				{
					type: "text",
					content: "Remove the installation media when prompted.",
				},
			],
		},
		{
			title: "Post-Installation",
			content: [
				{
					type: "text",
					content:
						"Log in with your user account and install packages with `recipe`:",
				},
				{
					type: "code",
					language: "bash",
					content: `# List available recipes
recipe list

# Install a package
recipe install ripgrep`,
				},
			],
		},
		{
			title: "Troubleshooting",
			content: [],
		},
		{
			title: "System fails to boot",
			level: 3,
			content: [
				{
					type: "text",
					content:
						"Boot from the ISO again and verify your installation:",
				},
				{
					type: "code",
					language: "bash",
					content: `# Mount your partitions
mount /dev/sda2 /mnt
mount /dev/sda1 /mnt/boot

# Check fstab has correct UUIDs
cat /mnt/etc/fstab
blkid

# Re-enter chroot and reinstall bootloader
mount --bind /dev /mnt/dev
mount --bind /proc /mnt/proc
mount --bind /sys /mnt/sys
chroot /mnt /bin/bash
bootctl install`,
				},
			],
		},
		{
			title: "No network after reboot",
			level: 3,
			content: [
				{
					type: "code",
					language: "bash",
					content: `# Check NetworkManager status
systemctl status NetworkManager

# Start if not running
sudo systemctl enable --now NetworkManager

# Connect to WiFi
nmcli device wifi connect "YourNetwork" password "YourPassword"`,
				},
			],
		},
	],
}

function ManualInstallPage() {
	return <DocsPage content={manualInstallContent} />
}
